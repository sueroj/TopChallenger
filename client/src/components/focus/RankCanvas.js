// RankCanvas
// Purpose: Draws rank images on html canvas to be display to left and right of progress bar.
// Export: Profile
// --TBD-- 
// Circile color changes on different ranks, by reference to color scheme.
// Text gradient and/or fill.
import React, { useEffect } from "react";
import './css/RankCanvas.css';

function RankCanvas(props) {
    const rank = props.rank;
    const id = props.id;

    useEffect(() => {
        let canvas = document.getElementById(id);
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, 50, 50);
        context.beginPath();
        context.arc(25,25,24,0,2*Math.PI);
        context.strokeStyle = "#00FF00";
        context.lineWidth = 2;
        context.stroke();
        context.font = "32px Arial";
        context.fillText(rank, 16, 35);

    }, [id, rank]
    );



    return(
        <div className="rankCanvas">
        <canvas id={id} width="50" height="50"/>
        </div>

    );
}

export default RankCanvas;