import React,{ useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Cropper from "../src/index";

function App() {
  console.log(Cropper)
  const [img, setImg] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const oncrop = (e: string) => {
    setImg(e);
  };

  const onSelectImage = (e: any) => {
    // console.log(e.target.files[0])
    let reader = new FileReader();
    reader.onload = function () {
      let image = "";
      if (typeof this.result === "string")
        image = this.result;
      setImage(image)
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div>
      <input type="file" onChange={onSelectImage} />
      {/* <div>
        <a onClick={handleClickButton1}>Button1{count1}</a>
        <a onClick={handleClickButton2}>Button2{count2}</a>
        <a  onClick={() => {setCount3(count3 + 1);     }}>
          Button3{count3}
        </a>
    </div> */}
      <Cropper onResult={oncrop} type="rectangle" nodesNum={10} image={image} style={{ width: "100%", height: "40vh" }} />
      {/* <Cropper onResult={oncrop} type="square" nodesNum={10} image={image} style={{width:"60%",height:"40vh"}}/> */}
      {/* <Cropper onResult={oncrop} type="circle" nodesNum={10} image={image} style={{width:"60%",height:"40vh"}}/> */}
      {/* <Cropper onResult={oncrop} type="polygon" nodesNum={10} image={image} style={{width:"60%",height:"40vh"}}/> */}
      <img src={img.toString()} />
    </div>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
