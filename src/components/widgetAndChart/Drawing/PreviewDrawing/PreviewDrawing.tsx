import ChartButton from "../../Component/ChartButton/ChartButton";
import PreviewDrawingBox from "./Component/PreviewDrawingBox/PreviewDrawingBox";
import "./PreviewDrawing.less";
function PreviewDrawing() {
  return (
    <div>
      <div className="chartscreated">
        <div className="chartscreated_inner">
          <ChartButton icon="/img/drawingicon/line.svg" text="Drawing #1" />
          <ChartButton icon="/img/drawingicon/bar.svg" text="Drawing #2" />
          <ChartButton icon="/img/drawingicon/area.svg" text="Drawing #3" />
          <ChartButton icon="/img/drawingicon/area.svg" text="Drawing #4" />
          <ChartButton icon="/img/drawingicon/area.svg" text="Drawing #5" />
          <ChartButton icon="/img/drawingicon/area.svg" text="Drawing #5" />
        </div>
      </div>
      <PreviewDrawingBox />
    </div>
  );
}

export default PreviewDrawing;
