import WidgetButton from "../../Component/WidgetButton/WidgetButton";
import { Page } from "../../Enums/Page.enum";
import { useChartWidgets } from "../../Window/ChartWidgetsWindow";
import "./WidgetInChat.less";
function WidgetInChat() {
  const { setPage } = useChartWidgets();
  return (
    <>
      <div className="newWidgetContainer">
        {/* <button onClick={() => {setPage(Page.PREVIEW_WIDGET,"microsoft")}}>test</button> */}
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
            alert("hi");
            setPage(Page.PREVIEW_WIDGET, "Microsoft");
          }}
        />
      </div>
    </>
  );
}

export default WidgetInChat;
