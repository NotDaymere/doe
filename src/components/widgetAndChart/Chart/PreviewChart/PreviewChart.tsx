import ChartButton from "../../Component/ChartButton/ChartButton";
import ChartPreviewBox from "./Component/ChartPreviewBox/ChartPreviewBox";
import "./PreviewChart.less";
function PreviewChart() {
  return (
    <div>
      <div className="chartscreated">
        <div className="chartscreated_inner">
          <ChartButton
            icon="/img/colorChartIcons/line.svg"
            text="Codeforces El.."
          />
          <ChartButton icon="/img/colorChartIcons/bar.svg" text="Codeforces El.." />
          <ChartButton
            icon="/img/colorChartIcons/area.svg"
            text="Codeforces El.."
          />
          <ChartButton
            icon="/img/colorChartIcons/area.svg"
            text="Codeforces El.."
          />
          <ChartButton
            icon="/img/colorChartIcons/area.svg"
            text="Codeforces El.."
          />
        </div>
      </div>
      <ChartPreviewBox />
    </div>
  );
}

export default PreviewChart;
