import React from "react";
import './Flower.scss';

function Flower(props) {
  return (
    <div className="circle" style={props.style}>
      <div>
        {props.children}
      </div>
    </div>
  );
}

export default Flower;