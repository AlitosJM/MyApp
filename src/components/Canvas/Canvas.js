import React, { useEffect, useRef, useState } from "react";
import InjectScript from "../OpenCv/InjectScript";
import "./Canvas.css";
// var cv = require('opencv.js');

const Canvas = () => {
    // const OPENCV_URL = 'vendor/opencv.js';
    const OPENCV_URL = "https://docs.opencv.org/master/opencv.js";
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [ previousX, setPreviousX ] = useState(0);
    const [ previousY, setPreviousY ] = useState(0);
    const [ isDrawing, setIsDrawing ] = useState(false);

    const draw = (currentx, currenty) => {
        contextRef.current.beginPath();
        contextRef.current.moveTo(previousX, previousY);
        contextRef.current.lineTo(currentx, currenty);
        contextRef.current.stroke();
        contextRef.current.closePath();

        setPreviousX(currentx);
        setPreviousY(currenty);
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

        const loadOpenCv = () => {
            const promise = InjectScript('opencv-injected-js', OPENCV_URL);
            promise
            .then((resp) => {
              console.log(`success to load ${OPENCV_URL}`, resp.window, '1');
              // eslint-disable-next-line no-undef
              // console.log('1', cv.getBuildInformation());
              // this.playerRef.trigger('opencvReady');
            })
            .catch(() => {
              // eslint-disable-next-line no-console
              console.log(`Failed to load ${OPENCV_URL}`);
            });
        };
        console.log("useEffect");
        loadOpenCv();
        prepareCanvas();

    }, []);

    const startDrawing = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;
        console.log("onMouseDown");
        
        setPreviousX(offsetX);
        setPreviousY(offsetY);
        console.log(offsetX, offsetY);
        // console.log('canvas', canvas.offsetLeft, canvas.offsetTop);
        // console.log('client', event.clientX, event.clientY);
        // contextRef.current.beginPath();
        // contextRef.current.moveTo(offsetX, offsetY);

        setIsDrawing(true);
    };

    const finishDrawing = (event) => {
        console.log("onMouseUp");
        // contextRef.current.closePath();
        setIsDrawing(false);
    };
    
    const paint = (event) => {
        const { offsetX, offsetY } = event['nativeEvent'];

        if (!isDrawing) {return;}

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

        // contextRef.current.lineTo(offsetX, offsetY);
        // contextRef.current.stroke();
        draw(offsetX, offsetY);
    };

    const clickHandler = () => {
        const canvas = canvasRef.current;   
        let image = cv.imread(canvas);

        cv.cvtColor(image, image, cv.COLOR_RGBA2GRAY, 0);
        cv.threshold(image, image, 175, 255, cv.THRESH_BINARY);

        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        // You can try more different parameters
        cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

        let cnt = contours.get(0);
        let rect = cv.boundingRect(cnt);
        image = image.roi(rect);

        let height = image.rows;
        let width = image.cols;
    
        if (height > width) {
            height = 20;
            const scaleFactor = image.rows / height;
            width = Math.round(image.cols / scaleFactor);
        } else {
            width = 20;
            const scaleFactor = image.cols / width;
            height = Math.round(image.rows / scaleFactor);
        }
        
        let newSize = new cv.Size(width, height);
        cv.resize(image, image, newSize, 0, 0, cv.INTER_AREA)

        const LEFT = Math.ceil(4 + (20 - width) / 2);
        const RIGHT = Math.floor(4 + (20 - width) / 2);
        const TOP = Math.ceil(4 + (20 - height) / 2);
        const BOTTOM = Math.floor(4 + (20 - height) / 2);
        
        // Padding
        const BLACK = new cv.Scalar(0, 0, 0, 0);
        cv.copyMakeBorder(image, image, TOP, BOTTOM, LEFT, RIGHT, cv.BORDER_CONSTANT, BLACK);

        // Centre of Mass
        cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
        cnt = contours.get(0);
        const Moments = cv.moments(cnt, false);

        const cx = Moments.m10 / Moments.m00;
        const cy = Moments.m01 / Moments.m00;

        const X_SHIFT = Math.round(image.cols / 2.0 - cx);
        const Y_SHIFT = Math.round(image.rows / 2.0 - cy);

        newSize = new cv.Size(image.cols, image.rows);
        const M = cv.matFromArray(2, 3, cv.CV_64FC1, [1, 0, X_SHIFT, 0, 1, Y_SHIFT]);
        cv.warpAffine(image, image, M, newSize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, BLACK);
        
        // cv.imwrite("test_image_out.png", image);

        // normalise
        let pixelValues = image.data;

        pixelValues = Float32Array.from(pixelValues);
        console.log(`pixel values: ${pixelValues}`);

        pixelValues = pixelValues.map( item => item/255.0 );
        console.log(`scaled array: ${pixelValues}`);     

    
        const outputCanvas = document.createElement('CANVAS');
        cv.imshow(outputCanvas, image);
        document.body.appendChild(outputCanvas);

        contextRef.current.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        setPreviousX(0);
        setPreviousY(0); 

        // Cleanup
        image.delete();
        contours.delete();
        cnt.delete();
        hierarchy.delete();
        M.delete();

    };


    return (
        <div className="canvas-container">
            <canvas id="my-canvas"
                onMouseDown={startDrawing} 
                onMouseMove={paint}
                onMouseUp={finishDrawing}
                ref={canvasRef}
            />
            <button onClick={clickHandler}>Test</button>
        </div>
    )
}

export default Canvas;