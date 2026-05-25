import { useState,useEffect  } from "react";
import ChartButton from "../Component/ChartButton/ChartButton";
import { Page } from "../Enums/Page.enum";
import { useChartWidgets } from "../Window/ChartWidgetsWindow";

import "./Drawing.less";
const Drawing=()  => {
   const [drawings, setDrawings] = useState([]);
    
 useEffect(() => {
    // Retrieve saved drawings from localStorage
    const savedDrawings = JSON.parse(localStorage.getItem("drawings") || "[]");
    setDrawings(savedDrawings);
  }, []);


  const {setFullWindow,setPage} = useChartWidgets();

  
  return (
    <div>
      <div className="createDrawingBox">
        <img src="/img/drawingnewimg.svg" />
        <button onClick={()=>{
          setFullWindow(true);
          
          setPage(Page.NEW_DRAWING)
        }}>
          <p>Create new drawing</p>
          <img src="/img/icons/addicon.svg" />
        </button>
      </div>
      <div className="drawingTab">
        <button className="active">Created Drawing</button>
        <button>Drafts</button>
      </div>
      <div className="createdDrawings">
        
        {drawings.map((drawing, index) => (
          <>
        <ChartButton key={index} icon={drawing.imageUrl} text={`Drawing # ${index +1}`}  onClick={()=>{setPage(Page.NEW_DRAWING,drawing.id);setFullWindow(true)}}/>
          </>
))}
      </div>
    </div>
  );
}

export default Drawing;
