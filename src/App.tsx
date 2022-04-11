import { useState, useCallback } from "react";
import Cropper from "./Cropper";
// import image from "./assets/test.jpeg";
import "./App.css";

type imageProps={
  image:string,
  canvasWidth:number,
  canvasHeight:number
}
function App() {
  const [preview, setPreview] = useState<string>("");
  const [img, setImage] = useState<imageProps>();
  const oncrop = (e: string) => {
    setPreview(e);
  };
  // const [count1, setCount1] = useState(0);
  // const [count2, setCount2] = useState(0);
  // const [count3, setCount3] = useState(0);

  // const handleClickButton1 = () => {setCount1(count1 + 1)};

  // const handleClickButton2 = useCallback(() => {
  //   setCount2(count2 + 1);
  // }, [count2]);
  const onSelectImage = (e: any) => {
    console.log(e.target.files[0])
    let reader = new FileReader();
    reader.onload = function () {
      if (typeof this.result === "string") {
        let image = this.result;
        let imgEle = new Image();
        imgEle.src = image;
        imgEle.onload = function () {
          const config = {
            canvasWidth: imgEle.width,
            canvasHeight: imgEle.height,
            image
          }
          setImage(config)
        }
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div className="App">
      <input type="file" onChange={onSelectImage} />
      {/* <div>
        <a onClick={handleClickButton1}>Button1{count1}</a>
        <a onClick={handleClickButton2}>Button2{count2}</a>
        <a  onClick={() => {setCount3(count3 + 1);     }}>
          Button3{count3}
        </a>
    </div> */}
      <Cropper onResult={oncrop} type="square" nodesNum={10} {...img} style={{ width: "50%", height: "30vh" }} />
      <img src={preview.toString()} />
    </div>
  );
}

export default App;
