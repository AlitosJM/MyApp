import React, { useContext, useRef, useState } from "react";
import InjectScript from "../../components/InjectScript/InjectScript";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
    const OPENCV_URL = "https://docs.opencv.org/master/opencv.js";
    const TENSORFLOW_URL = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js";

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [ previousX, setPreviousX ] = useState(0);
    const [ previousY, setPreviousY ] = useState(0);
    const [ model, setModel ] = useState(null);
    const [ numb, setNumb ] = useState({n1: 0, n2: 0, suma: 0, output: 0});
    const [ isDrawing, setIsDrawing ] = useState(false);
    const [ backgroundImages, setBackgroundImages ] = useState([]);
    const [ score, setScore ]= useState(0);

    const loadModel = async () => {
        const model = await tf.loadGraphModel(process.env.PUBLIC_URL + '/model.json');
        console.log("in loadModel");
        setModel(model);
    };

    const nextQuestion = () => {
        const n1 = Math.floor(Math.random() * 5);
        const n2 = Math.floor(Math.random() * 6);
        const suma = n1 + n2;
        setNumb(previous => ({...previous, n1, n2, suma}));
    };

    const loadScript = (id, URL) => {
        console.log("loadScript");
        const promise = InjectScript(id, URL);
        promise
        .then((resp) => {
          console.log(`success to load ${URL}`, resp, '1');
          // eslint-disable-next-line no-undef
          // console.log('1', cv.getBuildInformation());
          // this.playerRef.trigger('opencvReady');
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(`Failed to load ${URL}: `,error.message);
        });
    };

    const prepareCanvas = () => {
        console.log("prepareCanvas");
        const canvas = canvasRef.current
        canvas.width = 150;
        canvas.height = 150;
       
        const context = canvas.getContext("2d");
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        context.lineCap = "round";
        context.lineJoin = 'round';
        context.strokeStyle = '#FFFFFF';
        context.lineWidth = 5;
        contextRef.current = context;
    };

    const startDrawing = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;
        console.log("onMouseDown");
        
        setPreviousX(offsetX);
        setPreviousY(offsetY);
        console.log(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = (event) => {
        console.log("onMouseUp");
        setIsDrawing(false);
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
        draw(offsetX, offsetY);
    };

    const draw = (currentx, currenty) => {
        contextRef.current.beginPath();
        contextRef.current.moveTo(previousX, previousY);
        contextRef.current.lineTo(currentx, currenty);
        contextRef.current.stroke();
        contextRef.current.closePath();

        setPreviousX(currentx);
        setPreviousY(currenty);
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
    }

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
        // console.log(`pixel values: ${pixelValues}`);

        pixelValues = pixelValues.map( item => item/255.0 );
        // console.log(`scaled array: ${pixelValues}`);   
        
        const X = tf.tensor([pixelValues]);

        const result = model.predict(X);
        result.print();
        const output = result.dataSync()[0];

        setNumb(previous => ({...previous, output}));
    
        // const outputCanvas = document.createElement('CANVAS');
        // cv.imshow(outputCanvas, image);
        // document.body.appendChild(outputCanvas);
        contextRef.current.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        setPreviousX(0);
        setPreviousY(0); 

        // Cleanup
        image.delete();
        contours.delete();
        cnt.delete();
        hierarchy.delete();
        M.delete();
        X.dispose();
        result.dispose();

        checkAnswer(output);
    };    

    const checkAnswer = (output) =>{
        numb.suma === output? alert("Ok"):alert("No Ok");
        let backgroundImageslocal = backgroundImages;
        let scoreLocal = score;

        console.log("scoreLocal: ", scoreLocal);

        if (numb.suma === output) {
            scoreLocal++;
            backgroundImageslocal = new Array(scoreLocal).fill(null)
            .map(
                (item, index) => `url(${process.env.PUBLIC_URL + `/background${index+1}.svg`})`
            ); // .push()
            
            console.log(backgroundImageslocal);
            
            if (scoreLocal < 7){
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundImage = backgroundImageslocal; // .slice(0, score+1)
                console.log(backgroundImageslocal.slice(0, score+1));
            }
            else{
                scoreLocal = 0;    
                document.body.style.backgroundSize = '';
                document.body.style.backgroundRepeat = '';
                document.body.style.backgroundPosition = '';  
                document.body.style.backgroundImage = [];          
            }
        }
        else{
            if (scoreLocal !== 0){ scoreLocal--; }

            if (scoreLocal===0){
                document.body.style.backgroundSize = '';
                document.body.style.backgroundRepeat = '';
                document.body.style.backgroundPosition = '';
                document.body.style.backgroundImage = [];
            }
            else{
                backgroundImageslocal.splice(-1,1); // .pop()
                // backgroundImageslocal = backgroundImageslocal.slice(0, -1);
                // backgroundImageslocal = backgroundImageslocal.filter(
                //     (element, index) => index < backgroundImageslocal.length - 1);
                console.log('error: ', backgroundImageslocal);
                document.body.style.backgroundImage = backgroundImageslocal;
            }
        }
        setBackgroundImages(backgroundImageslocal);
        setScore(scoreLocal);
        nextQuestion();       
    };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        paint,
        loadScript,
        nextQuestion,
        loadModel,
        clickHandler,
        checkAnswer,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);