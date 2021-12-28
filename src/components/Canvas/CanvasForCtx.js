import React, { useEffect } from "react";
import { useCanvas } from '../../containers/CanvasContext/CanvasContext';

const CanvasForCtx = () => {
    const OPENCV_URL = "https://docs.opencv.org/master/opencv.js";
    const TENSORFLOW_URL = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js";

    const {
        numb,
        canvasRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        paint,
        loadScript,
        nextQuestion,
        clickHandler,
        timerForLoadModel: waitingModel,
    } = useCanvas();

    useEffect(() => {
        loadScript('opencv-injected-js', OPENCV_URL);
        loadScript('tensorflow-injected-js', TENSORFLOW_URL);
        prepareCanvas();
        nextQuestion();
        const clearTimer = waitingModel(2000);
        return () => {
            console.log("clearTimeout useEffect"); 
            clearTimer();
        };
    }, []);

    return (
        <div className="canvas-container">
            <div className="container-flex">
                <h2 className='question'>
                    <span id='n1'>{numb.n1}</span>+ 
                    <span id='n2'>{numb.n2}</span>= 
                </h2>      
            
                <canvas className="my-canvas"
                    onMouseDown={startDrawing} 
                    onMouseMove={paint}
                    onMouseUp={finishDrawing}
                    ref={canvasRef}
                />
                <button className="btn btn-primary btn-large toggle" onClick={clickHandler}>Check Answer</button>    
            </div>
        </div>
    );
}

export default CanvasForCtx;