import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Cropper from "../src/index";
import "./index.css"

function App() {
  const [img, setImg] = useState<string>('');
  const [image, setImage] = useState<string>('https://jambo2018.github.io/img/top_img.jpeg');
  const oncrop = (e: string) => {
    setImg(e);
  };


  const onSelectImage = (e: any) => {
    let reader = new FileReader();
    reader.onload = function () {
      let image = '';
      if (typeof this.result === 'string') image = this.result;
      setImage(image);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const styles = { width: "50%", height: "50%", border: '1px solid #f40', boxSizing: "border-box" };
  return (
    <div>
      <input type="file" onChange={onSelectImage} />
      <div className="container">
        <Cropper
          onResult={oncrop}
          type="rectangle"
          image={image}
          style={styles}
        />
        <Cropper
          onResult={oncrop}
          type="square"
          image={image}
          style={styles}
        />
        <Cropper
          onResult={oncrop}
          type="circle"
          image={image}
          style={styles}
        />
        <Cropper
          onResult={oncrop}
          type="polygon"
          nodesNum={5}
          image={image}
          style={styles}
        />
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
