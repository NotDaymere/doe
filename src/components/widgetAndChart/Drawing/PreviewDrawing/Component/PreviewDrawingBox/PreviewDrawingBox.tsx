import "./PreviewDrawingBox.less";
function PreviewDrawingBox() {
  return (
    <div className="drawingpreview">
      <div className="previewHead">
        <div className="previewtitle">
          <p>Drawing #1</p>
          <button>
            <img src="/icons/setting.svg" />
          </button>
        </div>
        <button className="previewClose">
          <img src="/icons/closePreview.svg" />
        </button>
      </div>
      <div className="previewBody"></div>
    </div>
  );
}

export default PreviewDrawingBox;
