import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
import { IIconProps } from "../../types/IIconProps"

function Eye(props: IIconProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M21.335 11.407l.933-.36-.933.36zm0 1.186l-.933-.36.933.36zm-18.67-1.186l-.933-.36.933.36zm0 1.186l-.933.36.933-.36zm.933-.827A9.004 9.004 0 0112 6V4C7.316 4 3.319 6.927 1.732 11.047l1.866.72zM12 6a9.004 9.004 0 018.402 5.766l1.866-.719C20.681 6.927 16.683 4 12 4v2zm8.402 6.234A9.004 9.004 0 0112 18v2c4.683 0 8.681-2.927 10.268-7.047l-1.866-.72zM12 18a9.004 9.004 0 01-8.402-5.766l-1.866.719C3.319 17.073 7.316 20 12 20v-2zm8.402-6.234a.65.65 0 010 .468l1.866.719a2.65 2.65 0 000-1.906l-1.866.72zm-18.67-.719a2.651 2.651 0 000 1.906l1.866-.72a.65.65 0 010-.467l-1.866-.719z"
        fill={props.color}
      />
      <Circle
        cx={12}
        cy={12}
        r={3}
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Eye
