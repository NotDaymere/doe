import WidgetButton from "../../Component/WidgetButton/WidgetButton";
import { Page } from "../../Enums/Page.enum";
import { useChartWidgets } from "../../Window/ChartWidgetsWindow";
import PreviewWidgetBox from "./components/PreviewWidgetBox/PreviewWidgetBox";
import "./PreviewWidget.less";
function PreviewWidget() {
  const { setPage } = useChartWidgets();
  return (
    <div>
      <div className="widgetscreated">
        <div className="widgetscreated_inner">
          <WidgetButton
            icon="/img/icons/norton.svg"
            text="Microsoft"
            onClick={() => {
              setPage(Page.PREVIEW_WIDGET, "Microsoft");
            }}
          />
          <WidgetButton
            icon="/img/icons/google.svg"
            text="Google"
            onClick={() => {
              setPage(Page.PREVIEW_WIDGET, "Google");
            }}
          />
          <WidgetButton
            icon="/img/icons/mirro.svg"
            text="Miro"
            onClick={() => {
              setPage(Page.PREVIEW_WIDGET, "Miro");
            }}
          />
          <WidgetButton
            icon="/img/icons/norton.svg"
            text="Microsoft"
            onClick={() => {
              setPage(Page.PREVIEW_WIDGET, "Microsoft");
            }}
          />
        </div>
      </div>
      <PreviewWidgetBox />
    </div>
  );
}

export default PreviewWidget;
