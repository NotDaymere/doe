import { Page } from "../../../../Enums/Page.enum";
import { useChartWidgets } from "../../../../Window/ChartWidgetsWindow";
import CustomChartBar from "../CustomChartBar/CustomChartBar";
import "./ChartPreviewBox.less";

function ChartPreviewBox() {


  const {setPage} = useChartWidgets();
  return (
    <div className="chartpreview">
      <div className="previewHead">
        <div className="previewtitle">
          <p>Codeforces Elo/percentile</p>
          <button>
            <img src="/img/icons/setting.svg" />
          </button>
        </div>
        <button className="previewClose" onClick={()=>setPage(Page.NEW_CHART)}>
          <img src="/img/icons/closePreview.svg" />
        </button>
      </div>
      <div className="previewBody">
        <CustomChartBar />
      </div>
    </div>
  );
}

export default ChartPreviewBox;
