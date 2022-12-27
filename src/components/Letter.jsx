import React from "react"

export default function Letter(props) {
    let color = ""
    if (props.state === "green") {
        color = "#6ca965"
    } else if (props.state === "yellow") {
        color = "#c8b653"
    } else if (props.state === "miss") {
        color = "rgb(50,50,50)";
    }

    const styles = {
        backgroundColor: color
    }

    return (
        <div 
            className="letter-box" 
            style={styles}
        >
            <h2 className="letter">{props.value}</h2>
        </div>
    )
}