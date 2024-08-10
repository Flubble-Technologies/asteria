import * as React from "react";
import Svg, { Defs, RadialGradient, Stop, Circle as SvgCircle, G } from "react-native-svg";

function Circle(props) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Defs>
        <RadialGradient
          id="grad"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <Stop offset="0%" stopColor={props.color} stopOpacity="1" />
          <Stop offset="25%" stopColor={props.color} stopOpacity="0.7" />
          <Stop offset="50%" stopColor={props.color} stopOpacity="0.5" />
          <Stop offset="75%" stopColor={props.color} stopOpacity="0.3" />
          <Stop offset="100%" stopColor={props.color} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <G>
        <SvgCircle cx="12" cy="12" r="14" fill="url(#grad)" />
        <SvgCircle cx="12" cy="12" r="8" fill={props.color} />
      </G>
    </Svg>
  );
}

export default Circle;
