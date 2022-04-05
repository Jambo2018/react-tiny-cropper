import { useState } from "react";
import Cropper from "./Cropper";
import image from  "./assets/test.jpeg";
import "./App.css";

function App() {
  const [img, setImg] = useState<string>("");
  const oncrop = (e:string) => {
    setImg(e);
  };
  return (
    <div className="App">
      <Cropper onResult={oncrop} type="circle" nodesNum={10} image={image}/>
      <img src={img.toString()}/>
    </div>
  );
}

export default App;
 