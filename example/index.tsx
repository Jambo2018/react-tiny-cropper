import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Cropper from "../src/index";
import "./index.css"
function App() {
  const [img, setImg] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const oncrop = (e: string) => {
    setImg(e);
  };
  // console.log(Cropper);
  const onSelectImage = (e: any) => {
    // console.log(e.target.files[0])
    let reader = new FileReader();
    reader.onload = function () {
      let image = '';
      if (typeof this.result === 'string') image = this.result;
      setImage(image);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={onSelectImage} />
      <div className="container">
        <div className="cropper">
          <Cropper
            onResult={oncrop}
            type="rectangle"
            nodesNum={10}
            image={image}
          />
        </div>
        <div className="cropper">
          <Cropper
            onResult={oncrop}
            type="square"
            nodesNum={10}
            image={image}
          />
        </div>
        <div className="cropper">
          <Cropper
            onResult={oncrop}
            type="circle"
            nodesNum={10}
            image={image}
          />
        </div>
        <div className="cropper">
          <Cropper
            onResult={oncrop}
            type="polygon"
            nodesNum={10}
            image={image}
          />
        </div>
      </div>
      <img src={img.toString()} alt="预览" />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
