import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../../types/IIconProps"

function ArrowLeft(props: IIconProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M12.5 16.6l-5.433-5.433a1.655 1.655 0 010-2.334L12.5 3.4"
        stroke={props.color}
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ArrowLeft
