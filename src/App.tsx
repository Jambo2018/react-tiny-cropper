import { useState ,useCallback} from "react";
import Cropper from "./Cropper";
import image from  "./assets/test.jpeg";
import "./App.css";

function App() {
  const [img, setImg] = useState<string>("");
  const oncrop = (e:string) => {
    setImg(e);
  };
  // const [count1, setCount1] = useState(0);
  // const [count2, setCount2] = useState(0);
  // const [count3, setCount3] = useState(0);

  // const handleClickButton1 = () => {setCount1(count1 + 1)};

  // const handleClickButton2 = useCallback(() => {
  //   setCount2(count2 + 1);
  // }, [count2]);
  return (
    <div className="App">
    {/* <div>
        <a onClick={handleClickButton1}>Button1{count1}</a>
        <a onClick={handleClickButton2}>Button2{count2}</a>
        <a  onClick={() => {setCount3(count3 + 1);     }}>
          Button3{count3}
        </a>
    </div> */}
      <Cropper onResult={oncrop} type="polygon" nodesNum={10} image={image}/>
      <img src={img.toString()}/>
    </div>
  );
}

export default App;
 