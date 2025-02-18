import PreviewChart from "../Chart/PreviewChart/PreviewChart";
import PreviewDrawing from "../Drawing/PreviewDrawing/PreviewDrawing";
import Drawing from "../Drawing/Drawing";
import NewWidget from "../Widget/NewWidget/NewWidget";
import NewChart from "../Chart/NewChart/NewChart";

import { Page } from "../Enums/Page.enum";
import "./RightPanel.less";
import PreviewWidget from "../Widget/PreviewWidget/PreviewWidget";
import { useChartWidgets } from "../Window/ChartWidgetsWindow";
import WidgetInChat from "../Widget/WidgetInChat/WidgetInChat";

function RightPanel() {

  const {page} = useChartWidgets();
  return (
    <div className="rightpanel">
      {page === Page.NEW_CHART && <NewChart />}
      {page === Page.DRAWING && <Drawing />}
      {page === Page.NEW_WIDGET && <NewWidget />}
      {page === Page.WIDGET_IN_CHAT && <WidgetInChat />}
     
      {page === Page.PREVIEW_WIDGET && <PreviewWidget/>}
      {page === Page.PREVIEW_CHART && <PreviewChart/>}
    </div>
  );
  
}

export default RightPanel;
