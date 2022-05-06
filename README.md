# React-polygon-cropper

> A React cropper component which supports rectangle,square,circle,polygon

## Demo

[Example](https://stackblitz.com/edit/react-ts-cdfjzd)

## Install

```
$ npm install react-tiny-cropper
or
$ yarn add react-tiny-cropper
```

## properties

| name     | type                | default   | description                                                                                |
| -------- | ------------------- | --------- | ------------------------------------------------------------------------------------------ |
| type     | string              | rectangle | the shap of cropper,circle,square,rectangle and polygon are allowed                        |
| image    | string              | -         | the image need to crop                                                                     |
| style    | object              | -         | the custom style of cropper box                                                            |
| nodesNum | numberd             | 4         | the number of nodes which could press to move(it's not effective unless type is "polygon") |
| configs  | object              | -         | [configs](#configs)                                                                        |
| onResult | fuction(url:base64) | -         | The callback function that is triggered when CropperBox is moving or resizing              |

### configs

| name            | type   | default                                                        | description             |
| --------------- | ------ | -------------------------------------------------------------- | ----------------------- |
| backgroundColor | string | <a style="color:rgba(24,144,255,0.5)">rgba(24,144,255,0.5)</a> | The color of background |
| maskColor       | string | <a style="color:rgba(0,0,0,0.6)">rgba(0,0,0,0.6)</a>           | The color of mask       |
| cropColor       | string | <a style="color:rgba(24,144,255,0.6)">rgba(24,144,255,0.6)</a> | The color of CropperBox |

## Usage

```javascript
import Cropper from "../src/index";

function Demo() {
  const oncrop = (e: string) => {
      // e:base64
  };

  return(
         <Cropper
            image={customImage}
            onResult={oncrop}
            type="polygon"
            nodesNum={10}
            style={{width:"200px",height:"200px"}}
          />
    )
}
```
