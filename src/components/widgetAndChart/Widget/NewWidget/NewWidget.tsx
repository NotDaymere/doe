import WidgetButton from "../../Component/WidgetButton/WidgetButton";
import "./NewWidget.less";
function NewWidget() {
  return (
    <div className="newWidgetContainer">
      <WidgetButton icon="/img/icons/norton.svg" text="Microsoft" />
      <WidgetButton icon="/img/icons/google.svg" text="Google" />
      <WidgetButton icon="/img/icons/mirro.svg" text="Miro" />
      <WidgetButton icon="/img/icons/norton.svg" text="Microsoft" />
    </div>
  );
}

export default NewWidget;
