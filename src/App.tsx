import { useState } from "react";
import Cropper from "./Cropper";
import "./App.css";

const url = "https://jambo2018.github.io/img/top_img.jpeg";
function App() {
  const [img, setImg] = useState<string>("");
  const oncrop = (e:string) => {
    setImg(e);
  };
  return (
    <div className="App">
      <Cropper onResult={oncrop} type="circle" image={url}/>
      <img src={img.toString()}/>
    </div>
  );
}

export default App;
