import { useRef, useState,useEffect } from "react";
import { useChartWidgets } from "../../Window/ChartWidgetsWindow";
import "./DrawingModal.less";
import FabricCanvasWindow from "../Create/Components/SvgEditor2";
// import Draggable from "react-draggable";
function DrawingModal({id}:any) {
  const { prevPage, setPage, setFullWindow } = useChartWidgets();
  const nodeRef = useRef(null);
  const [drawingData, setDrawingData] = useState(null);
  const [imageData,SetImageData]=useState(null);


useEffect(() => {
  console.log("id",id);
  if(id){
   var savedDrawing = JSON.parse(localStorage.getItem("drawings") || "[]");
   var foundDrawing = savedDrawing.find(drawing => drawing.id === id);
   setDrawingData(foundDrawing.drawingData);
   console.log(foundDrawing);
  }
   }, []);

   const handleSave = () => {
    alert(imageData);

     //const imageUrl = drawingData.toDataURL();
    const savedDrawings = JSON.parse(localStorage.getItem("drawings") || "[]");
    const newDrawing = {
    id: `Drawing_${new Date().toISOString()}`, // Generates a unique name
    drawingData: drawingData,
    imageUrl:imageData
};
    const updatedDrawings = [...savedDrawings, newDrawing];
    localStorage.setItem("drawings", JSON.stringify(updatedDrawings));
    alert("saved")

    setPage(prevPage);
    setFullWindow(false);
  };

    const saveDrawingData = ( fabricCanvas:any) => {
      const jsonData = fabricCanvas.current.toJSON();
      const imageUrl = fabricCanvas.current.toDataURL();
      setDrawingData(jsonData);
      SetImageData(imageUrl)
      //alert(imageUrl);
    };
  

  
  return (
    // <Draggable nodeRef={nodeRef} handle=".drag-handle">
      <div className="modal" ref={nodeRef}>
        <div className="modalHead drag-handle">
          <p>{id ? id : "New Drawing"}</p>
          <div className="containerBtns">
            <button
              className="cancelBtn"
              onClick={() => {
                setPage(prevPage);
                setFullWindow(false);
              }}
            >
              <p>Cancel</p>
            </button>
            <button className="saveBtn" onClick={handleSave}>
              <img src="/img/icons/coge.svg" alt="Settings" />
              <p>Save Changes</p>
            </button>
          </div>
        </div>
        <div className="canvas">
         
            <FabricCanvasWindow drawingData={drawingData} setDrawingData={setDrawingData} setImageData={SetImageData} />
    </div>
     
      </div>
    // </Draggable>
  );
}

export default DrawingModal;
