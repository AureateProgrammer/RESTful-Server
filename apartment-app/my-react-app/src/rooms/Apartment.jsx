import Bedroom from "./rooms/Bedroom"
import Bathroom from "./rooms/Bathroom"
import Kitchen from "./rooms/Kitchen"
import LivingRoom from "./rooms/LivingRoom"

export default function Apartment() {
return (
<main className="apartment">
<Bedroom />
<Bathroom />
<Kitchen />
<LivingRoom />
</main>
)
}