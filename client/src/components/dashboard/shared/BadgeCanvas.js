// RankCanvas
// Purpose: Draws rank images on html canvas to be display to left and right of progress bar.
// Export: Profile
// --TBD-- 
// Circile color changes on different ranks, by reference to color scheme.
// Text gradient and/or fill.
import React, { useEffect } from "react";
import './css/Badge.css';

function BadgeCanvas(props) {
    const challenge = props.challenge;
    const useDefault = props.useDefault;
    const rank = props.rank;
    const id = props.id;

    function colorSelect(difficulty) {
        switch (difficulty){
            case 1: 
                return "#f0f0f0";
            case 2: 
                return "#b0f785";
            case 3: 
                return "#85e6f7";
            case 4: 
                return "#bc85f7";
            case 5: 
                return "#f1a941";
            default:
                return "#f0f0f0";
        }
    }

    function convertDifficultly(difficulty) {
        let output = [];
        for (let i = 0; i < difficulty; i++) {
            output.push(<span>&#x2605;</span>);
        }
        return output;
    }

    useEffect(() => {
        let canvas = document.getElementById(id);
        let context = canvas.getContext("2d");
        context.beginPath();
        // Border
        // context.arc(25,25,24,0,2*Math.PI);
        // context.strokeStyle = "#000000";
        context.moveTo(0,25);
        context.lineTo(10,5);
        context.lineTo(40,5);
        context.lineTo(50,25);
        context.lineTo(40,45);
        context.lineTo(10,45);
        context.lineTo(0,25);
        context.lineWidth = 2;
        context.stroke();

        // Fill
        context.fillStyle = colorSelect(challenge.Difficulty);
        context.fill();

        // Center text
        context.fillStyle = "#000000";
        context.font = "32px Arial";
        context.fillText(challenge.Difficulty, 16, 35);

    }, [id, rank]
    );



    return(
        <div className="badgeCanvas">
        <canvas id={id} width="50" height="50"/>
        </div>
    );
}

export default BadgeCanvas;