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
                        setPage(Page.PREVIEW_WIDGET, "Microsoft", "www.notion.com/");
                    }}
                />
                <WidgetButton
                    icon="/img/icons/google.svg"
                    text="Google"
                    onClick={() => {
                        setPage(
                            Page.PREVIEW_WIDGET,
                            "Google",
                            "https://docs.google.com/document/d/1bfUdYe_hUMERVwgIUO0jW8EEFNs5jSml9nOdUA_fikg/edit?usp=sharing"
                        );
                    }}
                />
                <WidgetButton
                    icon="/img/icons/mirro.svg"
                    text="Miro"
                    onClick={() => {
                        setPage(
                            Page.PREVIEW_WIDGET,
                            "Miro",
                            "https://miro.com/app/board/uXjVL_0dl7Q=/?share_link_id=661110526142"
                        );
                    }}
                />
                <WidgetButton
                    icon="/img/icons/norton.svg"
                    text="Microsoft"
                    onClick={() => {
                        setPage(Page.PREVIEW_WIDGET, "Microsoft", "https://developers.notion.com/");
                    }}
                />

                <WidgetButton
                    icon="/img/icons/norton.svg"
                    text="Microsoft"
                    onClick={() => {
                        setPage(Page.PREVIEW_WIDGET, "Microsoft", "https://developers.notion.com/");
                    }}
                />
                <WidgetButton
                    icon="/img/icons/google.svg"
                    text="Google"
                    onClick={() => {
                        setPage(
                            Page.PREVIEW_WIDGET,
                            "Google",
                            "https://docs.google.com/document/d/1bfUdYe_hUMERVwgIUO0jW8EEFNs5jSml9nOdUA_fikg/edit?usp=sharing"
                        );
                    }}
                />
                <WidgetButton
                    icon="/img/icons/mirro.svg"
                    text="Miro"
                    onClick={() => {
                        setPage(
                            Page.PREVIEW_WIDGET,
                            "Miro",
                            "https://miro.com/app/board/uXjVL_0dl7Q=/?share_link_id=661110526142"
                        );
                    }}
                />
                <WidgetButton
                    icon="/img/icons/norton.svg"
                    text="Microsoft"
                    onClick={() => {
                        setPage(Page.PREVIEW_WIDGET, "Microsoft", "https://developers.notion.com/");
                    }}
                />
            </div>
        </>
    );
}

export default WidgetInChat;
