import { useMagicMenuStore } from "src/shared/providers/useMagicApplicationStore";
import WidgetButton from "../../Component/WidgetButton/WidgetButton";
import "./NewWidget.less";
function NewWidget() {


    const {menuActive, setMenu} = useMagicMenuStore();
    return (
        <div className="newWidgetContainerOne">
            <button onClick={()=>setMenu(true)} className="connectApplicationbutton">
              
                <p>Connect Applications</p> <img src="/img/icons/purplePlus.svg" />
            </button>

            <div className="newWidgetContainerInner">
             
                <WidgetButton icon="/img/icons/norton.svg" text="Microsoft" />

                <WidgetButton icon="/img/icons/google.svg" text="Google" />
                <WidgetButton icon="/img/icons/mirro.svg" text="Miro" />
               
                <WidgetButton icon="/img/icons/norton.svg" text="Microsoft" />
            </div>
        </div>
    );

}

export default NewWidget;
