import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../../types/IIconProps"

function LogOut(props: IIconProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M7.417 6.3c.258-3 1.8-4.225 5.175-4.225h.108c3.725 0 5.217 1.492 5.217 5.217v5.433c0 3.725-1.492 5.217-5.217 5.217h-.108c-3.35 0-4.892-1.209-5.167-4.159M12.5 10H3.017M4.875 7.208L2.083 10l2.792 2.792"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default LogOut
