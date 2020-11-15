import React from "react";
import './Flower.scss';


function Flower(props) {
  return (
    <div className="flower" style={props.position}>
      <div className="circle">
        <div>
          {props.children}
        </div>
      </div>
      <div className="ovaltopright" style={props.style}>
        <div>
          {props.children}
        </div>
      </div>
      <div className="ovaltopleft" style={props.style}>
        <div>
          {props.children}
        </div>
      </div>
      <div className="ovalbottomright" style={props.style}>
        <div>
          {props.children}
        </div>
      </div>
      <div className="ovalbottomleft" style={props.style}>
        <div>
          {props.children}
        </div>
      </div>
      <div className="ovaltop" style={props.style}>
        <div>
          {props.children}
        </div>
      </div>
      <div className="ovalbottom" style={props.style}>
        <div>
          {props.children}
        </div>
      </div>
      <div className="ovalright" style={props.style}>
        <div>
          {props.children}
        </div>
      </div>
      <div className="ovalleft" style={props.style}>
        <div>
          {props.children}
        </div>
      </div>
      <div className="rectangle">
        <div>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Flower;