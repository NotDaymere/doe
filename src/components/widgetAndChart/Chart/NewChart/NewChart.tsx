import ChartButton from "../../Component/ChartButton/ChartButton";
import { Page } from "../../Enums/Page.enum";
import { useChartWidgets } from "../../Window/ChartWidgetsWindow";
import "./NewChart.less";
function NewChart() {



  const {setFullWindow, setPage} = useChartWidgets();
  return (
    
    <div className="newChartContainer">
      
      <ChartButton icon="/img/colorChartIcons/line.svg" text="Line" onClick={()=>{console.log("Clicked for page");setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
      <ChartButton icon="/img/colorChartIcons/bar.svg" text="Bar" onClick={()=>{setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
     
      <ChartButton icon="/img/colorChartIcons/area.svg" text="Area" onClick={()=>{setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
      <ChartButton icon="/img/colorChartIcons/pie.svg" text="Pie" onClick={()=>{setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
      <ChartButton icon="/img/colorChartIcons/buble.svg" text="Buble" onClick={()=>{setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
      <ChartButton icon="/img/colorChartIcons/scatter.svg" text="Scater" onClick={()=>{setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
     
      <ChartButton icon="/img/colorChartIcons/donut.svg" text="Donut" onClick={()=>{setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
    </div>
  );
}

export default NewChart;
