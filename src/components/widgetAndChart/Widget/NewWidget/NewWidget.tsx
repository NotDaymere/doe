import WidgetButton from "../../Component/WidgetButton/WidgetButton";
import "./NewWidget.less";
function NewWidget() {
  return (
    <div className="newWidgetContainer">
      <WidgetButton icon="/icons/norton.svg" text="Microsoft" />
      <WidgetButton icon="/icons/google.svg" text="Google" />
      <WidgetButton icon="/icons/mirro.svg" text="Miro" />
      <WidgetButton icon="/icons/norton.svg" text="Microsoft" />
    </div>
  );
}

export default NewWidget;
