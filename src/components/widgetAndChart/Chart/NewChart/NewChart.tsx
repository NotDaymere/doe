import ChartButton from "../../Component/ChartButton/ChartButton";
import { Page } from "../../Enums/Page.enum";
import { useChartWidgets } from "../../Window/ChartWidgetsWindow";
import "./NewChart.less";
function NewChart() {



  const {setFullWindow, setPage} = useChartWidgets();
  return (
    
    <div className="newChartContainer">
      
      <ChartButton icon="/colorChartIcons/line.svg" text="Line" onClick={()=>{console.log("Clicked for page");setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
      <ChartButton icon="/colorChartIcons/bar.svg" text="Bar" onClick={()=>{setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
     
      <ChartButton icon="/colorChartIcons/area.svg" text="Area" onClick={()=>{setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
      <ChartButton icon="/colorChartIcons/pie.svg" text="Pie" onClick={()=>{setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
      <ChartButton icon="/colorChartIcons/buble.svg" text="Buble" onClick={()=>{setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
      <ChartButton icon="/colorChartIcons/scatter.svg" text="Scater" onClick={()=>{setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
     
      <ChartButton icon="/colorChartIcons/donut.svg" text="Donut" onClick={()=>{setPage(Page.EDIT_TEMPLATE);setFullWindow(true)}}/>
    </div>
  );
}

export default NewChart;
