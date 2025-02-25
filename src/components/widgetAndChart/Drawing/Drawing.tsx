import ChartButton from "../Component/ChartButton/ChartButton";
import { Page } from "../Enums/Page.enum";
import { useChartWidgets } from "../Window/ChartWidgetsWindow";
import "./Drawing.less";
function Drawing() {



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
        <ChartButton icon="/img/drawingicon/line.svg" text="Drawing #1"  onClick={()=>{setPage(Page.NEW_DRAWING);setFullWindow(true)}}/>
        <ChartButton icon="/img/drawingicon/bar.svg" text="Drawing #2" onClick={()=>{setPage(Page.NEW_DRAWING);setFullWindow(true)}}/>
        <ChartButton icon="/img/drawingicon/area.svg" text="Drawing #3" onClick={()=>{setPage(Page.NEW_DRAWING);setFullWindow(true)}}/>
        <ChartButton icon="/img/drawingicon/pie.svg" text="Drawing #4" onClick={()=>{setPage(Page.NEW_DRAWING);setFullWindow(true)}}/> 
        <ChartButton icon="/img/drawingicon/buble.svg" text="Drawing #1" onClick={()=>{setPage(Page.NEW_DRAWING);setFullWindow(true)}}/>
        <ChartButton icon="/img/drawingicon/scater.svg" text="Drawing #2" onClick={()=>{setPage(Page.NEW_DRAWING);setFullWindow(true)}}/>
        <ChartButton icon="/img/drawingicon/donut.svg" text="Drawing #3" onClick={()=>{setPage(Page.NEW_DRAWING);setFullWindow(true)}}/>
        <ChartButton icon="/img/drawingicon/bar.svg" text="Drawing #4" onClick={()=>{setPage(Page.NEW_DRAWING);setFullWindow(true)}}/>
      </div>
    </div>
  );
}

export default Drawing;
