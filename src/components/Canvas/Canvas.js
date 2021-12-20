import React, { useEffect, useRef, useState } from "react";
import "./Canvas.css";

const Canvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [ previousX, setPreviousX ] = useState(0);
    const [ previousY, setPreviousY ] = useState(0);
    const [ currentX, setCurrentX ] = useState(0);
    const [ currentY, setCurrentY ] = useState(0);
    const [ isDrawing, setIsDrawing ] = useState(false);

    const draw = () => {
        contextRef.current.beginPath();
        contextRef.current.moveTo(previousX, previousY);
        contextRef.current.lineTo(currentX, currentY);
        contextRef.current.stroke();
        contextRef.current.closePath();
    }

    useEffect(() => {
        const prepareCanvas = () => {
            const canvas = canvasRef.current
            canvas.width = 150;
            canvas.height = 150;
            // canvas.width = window.innerWidth * 2;
            // canvas.height = window.innerHeight * 2;
            // canvas.style.width = `${window.innerWidth}px`;
            // canvas.style.height = `${window.innerHeight}px`;

            // canvas.style.width = `${150}px`;
            // canvas.style.height = `${150}px`;

        
            const context = canvas.getContext("2d");
            context.fillStyle = '#000000';
            context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            // context.scale(2, 2);
            context.lineCap = "round";
            context.lineJoin = 'round';
            context.strokeStyle = '#FFFFFF';
            context.lineWidth = 5;
            contextRef.current = context;
        };
        console.log("useEffect")
        prepareCanvas();

    }, []);

    const startDrawing = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;
        console.log("onMouseDown");
        
        setCurrentX(offsetX);
        setCurrentY(offsetY);
        console.log(offsetX, offsetY);
        // console.log('canvas', canvas.offsetLeft, canvas.offsetTop);
        // console.log('client', event.clientX, event.clientY);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);

        setIsDrawing(true);
    };

    const finishDrawing = (event) => {
        console.log("onMouseUp");
        contextRef.current.closePath();
        setIsDrawing(false);
    };
    
    const paint = (event) => {
        const { offsetX, offsetY } = event['nativeEvent'];

        if (isDrawing) {

            if (offsetX<1 || offsetX>148)
            {
                contextRef.current.closePath();
                setIsDrawing(false);
                return;
            }

            if (offsetY<1 || offsetY>148)
            {
                contextRef.current.closePath();
                setIsDrawing(false);
                return;
            }

            console.log("onMouseMove");
            setPreviousX(currentX);
            setCurrentX(offsetX);

            setPreviousY(currentY);
            setCurrentY(offsetY);

            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
            // draw();            
        }

    };

    return (
        <div className="canvas-container">
            <canvas id="my-canvas"
                onMouseDown={startDrawing} 
                onMouseMove={paint}
                onMouseUp={finishDrawing}
                ref={canvasRef}
            />       
        </div>
    )
}

export default Canvas;
