import React from "react";

const LikeComponent = (props) => {
  let classes = "fa fa-heart";
  classes += props.liked ? "" : "-o";
  return (
    <div>
      <i
        style={{
          cursor: "pointer",
        }}
        onClick={props.onClick}
        className={classes}
        aria-hidden="true"
      ></i>
    </div>
  );
};

export default LikeComponent;
