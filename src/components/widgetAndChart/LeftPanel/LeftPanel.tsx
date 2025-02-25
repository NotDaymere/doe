import { useState } from "react";
import "./LeftPanel.less";
import { Page } from "../Enums/Page.enum";
import { useChartWidgets } from "../Window/ChartWidgetsWindow"; 



function LeftPanel() {


 
  const {page,setPage} = useChartWidgets()

  const [openSections, setOpenSections] = useState<any>({
    charts: false,
    widgets: true,
    drawing:false,
    games:false
  });

 const toggleSection = (section: string) => {
  setOpenSections({ charts: false, widgets: false, drawing: false, games: false, [section]: true });
};

  return (
    <div className="leftpanel">
      <ul>
        <li className={openSections.charts  ? "active" : ""}>
          <div className="list_container">
            <div
              className={`list_button_container ${
                openSections.charts ? "expanded" : ""
              }`}
              onClick={() => toggleSection("charts")}
            >
              <div>
                <img src="/img/icons/chart.svg" alt="Charts" />
                <p>Charts</p>
              </div>
              <button>
                <img
                  src={
                    openSections.charts
                      ? "/img/icons/decollapsed.svg"
                      : "/img/icons/collapsed.svg"
                  }
                  alt="Toggle"
                />
              </button>
            </div>
            {openSections.charts && (
              <div className="list_sub_child">
                <ul>
                  <li
                    onClick={() => {
                      setPage(Page.NEW_CHART);
                    }}
                  >
                    Create New Chart
                  </li>
                  <li
                    onClick={() => {
                      setPage(Page.PREVIEW_CHART);
                    }}
                    // className={page == Page.PREVIEW_CHART ? 'active': ''}
                  >
                    Charts Created by Doe
                  </li>
                  <li>Drafts</li>
                </ul>
              </div>
            )}
          </div>
        </li>

        <li
          className={openSections.drawing ? "active" : ""}
          onClick={() => {
            setPage(Page.DRAWING);
            toggleSection("drawing")
          }}
        >
          <div className="list_container">
            <div className="list_button_container">
              <div>
                <img src="/img/icons/drawicon.svg" />
                <p>Drawings</p>
              </div>
            </div>
          </div>
        </li>

         <li
           className={openSections.games ? "active" : ""}
          onClick={() => {
            setPage(Page.GAMES);
            toggleSection("games")
          }}
        >
          <div className="list_container">
            <div className="list_button_container">
              <div>
                <img src="/img/icons/game_icon.svg" />
                <p>Games</p>
              </div>
            </div>
          </div>
        </li>

        <li className={openSections.widgets ? "active" : ""}>
          <div className="list_container">
            <div
              className={`list_button_container ${
                openSections.widgets ? "expanded" : ""
              }`}
              onClick={() => toggleSection("widgets")}
            >
              <div>
                <img src="/img/icons/widgetIcon.svg" alt="Widgets" />
                <p>Widgets</p>
              </div>
              <button>
                <img
                  src={
                    openSections.widgets 
                      ? "/img/icons/decollapsed.svg"
                      : "/img/icons/collapsed.svg"
                  }
                  alt="Toggle"
                />
              </button>
            </div>
            {openSections.widgets && (
              <div className="list_sub_child">
                <ul>
                  <li
                    onClick={() => {
                      setPage(Page.NEW_WIDGET);
                    }}
                  >
                    New Widget
                  </li>
                  <li
                    onClick={() => {
                      setPage(Page.WIDGET_IN_CHAT);
                    }}
                  >
                    Widgets in this Chat
                  </li>
                  <li>Drafts</li>
                </ul>
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default LeftPanel;
