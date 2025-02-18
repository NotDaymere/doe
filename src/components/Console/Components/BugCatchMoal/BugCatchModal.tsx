import "./BugCatchModal.less";

function BugCatchModal() {
  return (
    <div className="bugbox">
      <div className="head">
        Bug Catch <img src="/icons/bug_on.svg" />
      </div>
      <div className="body">
        <p>
          This bug appreared because your code is{" "}
          <span className="medium">
            {" "}
            not optimized to handle natural language inputs
          </span>{" "}
          into the chess simulator
        </p>
        <p>
          We should fix this by{" "}
          <span className="medium">mapping natural language to chess </span>
          coordianates and parsing theme into moves with a{" "}
          <span className="go-1">G0-1</span> call.
        </p>
      </div>
      <div className="footer">
        <button>
          <p>Discuss</p>
          <img src="/icons/discuss.svg" />
        </button>
        <button>
          <p>Swat</p>
          <img src="/icons/swat.svg" />
        </button>
      </div>
    </div>
  );
}

export default BugCatchModal;
