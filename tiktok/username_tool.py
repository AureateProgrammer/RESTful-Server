import argparse
import json
import re
from pathlib import Path

EMAIL_PATTERN = re.compile(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+")
USERNAME_PATTERN = re.compile(r"^[A-Za-z0-9._]{2,24}$")

PLATFORM_URLS = {
    "tiktok": "https://www.tiktok.com/@{username}",
    "instagram": "https://www.instagram.com/{username}",
    "x": "https://x.com/{username}",
    "github": "https://github.com/{username}",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Username utility: validate username, build profile URL, and scan local JSON for public emails."
    )
    parser.add_argument("username", nargs="?", help="Username to process.")
    parser.add_argument(
        "--platform",
        default="tiktok",
        choices=sorted(PLATFORM_URLS.keys()),
        help="Platform used to build the profile URL.",
    )
    parser.add_argument(
        "--data",
        help="Optional path to a local JSON file containing user/post objects.",
    )
    return parser.parse_args()


def prompt_username_if_missing(username: str | None) -> str:
    if username:
        return username.strip()
    return input("Enter username: ").strip()


def validate_username(username: str) -> bool:
    return bool(USERNAME_PATTERN.fullmatch(username))


def build_profile_url(username: str, platform: str) -> str:
    return PLATFORM_URLS[platform].format(username=username)


def normalize_json_to_list(payload):
    # Support common response envelopes from different tools/APIs.
    if isinstance(payload, list):
        return payload
    if isinstance(payload, dict):
        if isinstance(payload.get("items"), list):
            return payload["items"]
        if isinstance(payload.get("data"), list):
            return payload["data"]
        if isinstance(payload.get("aweme_list"), list):
            return payload["aweme_list"]
    return []


def load_json_records(json_path: str):
    path = Path(json_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {path}")
    payload = json.loads(path.read_text(encoding="utf-8"))
    return normalize_json_to_list(payload)


def collect_possible_user_fields(item: dict) -> dict:
    # Different datasets use different key names for the same user fields.
    author = item.get("author", {}) if isinstance(item, dict) else {}
    user = item.get("user", {}) if isinstance(item, dict) else {}

    return {
        "unique_id": author.get("uniqueId")
        or author.get("unique_id")
        or user.get("username")
        or user.get("uniqueId"),
        "signature": author.get("signature")
        or user.get("bio")
        or item.get("description")
        or "",
    }


def scan_public_emails(records, target_username: str):
    found_emails = set()
    matched_rows = 0

    for row in records:
        if not isinstance(row, dict):
            continue

        fields = collect_possible_user_fields(row)
        row_username = (fields["unique_id"] or "").strip()

        # Match rows only for the target username (case-insensitive).
        if row_username.lower() != target_username.lower():
            continue

        matched_rows += 1
        signature = fields["signature"] or ""
        # Deduplicate emails across matched rows by storing in a set.
        for email in EMAIL_PATTERN.findall(signature):
            found_emails.add(email)

    return {
        "matched_rows": matched_rows,
        "emails": sorted(found_emails),
    }


def main() -> None:
    args = parse_args()
    username = prompt_username_if_missing(args.username)

    print("--- Username Report ---")
    print(f"Username: {username}")
    print(f"Looks valid: {'yes' if validate_username(username) else 'no'}")
    print(f"Profile URL: {build_profile_url(username, args.platform)}")

    if not args.data:
        print("No JSON file supplied. Tip: use --data path/to/file.json to scan local public data.")
        return

    try:
        records = load_json_records(args.data)
    except Exception as error:
        print(f"Could not load JSON: {error}")
        return

    result = scan_public_emails(records, username)
    print(f"Rows matched for username: {result['matched_rows']}")

    if result["emails"]:
        print("Public emails found:")
        for email in result["emails"]:
            print(f"- {email}")
    else:
        print("No public emails found for that username in the provided JSON.")


if __name__ == "__main__":
    main()
