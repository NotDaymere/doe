import "./Databox.less";

type DataboxProps = {
  title: string;
  color: string;
  valueNumber: number;
};

function Databox({ title, color, valueNumber }: DataboxProps) {
  return (
    <div className="Databox">
      <div className="top">
        <div className="box" style={{ backgroundColor: color }}></div>
        <p>{title}</p>
      </div>
      <div className="bottom">
        <p>Value</p>
        <p className="valueNumber">{valueNumber}</p>
      </div>
    </div>
  );
}

export default Databox;
