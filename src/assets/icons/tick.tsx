import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../../types/IIconProps"

function Tick(props: IIconProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.82 6.195c.24.26.24.683 0 .943L9.974 17.805c-.24.26-.63.26-.87 0L4.18 12.47a.707.707 0 010-.942c.24-.26.63-.26.87 0l4.488 4.861L18.95 6.195c.24-.26.63-.26.87 0z"
        fill={props.color}
      />
    </Svg>
  )
}

export default Tick
