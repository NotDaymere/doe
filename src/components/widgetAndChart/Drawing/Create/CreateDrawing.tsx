import { useState } from "react";

import "./CreateDrawing.less";
import FabricCanvasWindow from "./Components/SvgEditor2";


function CreateDrawing({drawingData}:any) {

  return (
    <div className="canvas">
         
            <FabricCanvasWindow/>
    </div>
  );
}


export default CreateDrawing; 