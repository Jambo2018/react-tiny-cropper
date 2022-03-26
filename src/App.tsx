import { useState } from "react";
import Cropper from "./Cropper";
import "./App.css";

function App() {
  const [img, setImg] = useState<string>("");
  const oncrop = (e:string) => {
    setImg(e);
  };
  return (
    <div className="App">
      <Cropper onResult={oncrop} />
      <img src={img.toString()} />
    </div>
  );
}

export default App;
