import { useRef, useState, useEffect } from "react"
import { useChartWidgets } from "../../Window/ChartWidgetsWindow"
import "./DrawingModal.less"
import FabricCanvasWindow from "../Create/Components/SvgEditor2"
import Draggable from "react-draggable"

function DrawingModal({ id }: any) {
  const { prevPage, setPage, setFullWindow } = useChartWidgets()
  const nodeRef = useRef(null)
  const [drawingData, setDrawingData] = useState(null)

  useEffect(() => {
    if (id) {
      const savedDrawings = JSON.parse(localStorage.getItem("drawings") || "[]")
      const foundDrawing = savedDrawings.find((drawing) => drawing.id === id)
    
      if (foundDrawing) {
        setDrawingData(foundDrawing.drawingData)
        console.log("Loaded drawing:", foundDrawing)
      }
    
    }
  }, [id])

  const handleSave = () => {
     
    
    
    const canvasRef = document.getElementById("save-canvas-button")
    if (canvasRef) {


      
      canvasRef.click()
     
     
      setTimeout(() => { 
        setPage(prevPage)
        setFullWindow(false)
      }, 10) 
    } else {
      console.error("Save canvas button not found")
    }
  }

 
  return (
    <Draggable nodeRef={nodeRef} handle=".drag-handle">
      <div className="modalDrawing" ref={nodeRef}>
        <div className="modalHead drag-handle">
          <p>{id ? id : "New Drawing"}</p>
          <div className="containerBtns">
            <button
              className="cancelBtn"
              onClick={() => {
      
                setPage(prevPage)
                setFullWindow(false)
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
          <FabricCanvasWindow drawingData={drawingData} id={id}/>
        </div>
      </div>
    </Draggable>
  
)
}



export default DrawingModal