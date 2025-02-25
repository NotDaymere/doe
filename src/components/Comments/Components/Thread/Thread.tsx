import "./Thread.less";
function Thread({comment}:any) {
  return (
    <div className="thread">
      <div className="th-header">
        <img src="/img/profile_pic.png" />
        <div>
          <h4>{comment.user.name}</h4>
          <p>{comment.timestamp}</p>
        </div>
      </div>
      <div className="th-body">
        <p>{comment.message}</p>
      </div>
    </div>
  );
}

export default Thread;
