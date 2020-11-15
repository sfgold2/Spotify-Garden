import React from "react";
import './Garden.scss';

function Garden(props) {
  return (
    <div className="card box-shadow" style={props.style}>
      <div>
        {props.children}
      </div>
    </div>
  );
}

export default Garden;
