// Notify Player Turn

export default function PlayerStatus(){
    const currentPlayer = "X"

    // Color and Message
    let backgroundColor = "";
    let message = "";

    if(currentPlayer === "X"){
        backgroundColor = "blue"
        message = "Its Player X's Turn!"
    } else {
        backgroundColor = "red"
        message = "Its Player O's Turn!"
    }

    return(
        <div style={{ backgroundColor: backgroundColor, padding: "20px", color: "white" }}>
            <p>{message}</p>
        </div>
    )

}