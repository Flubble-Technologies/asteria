import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../../types/IIconProps"

function Calendar(props: IIconProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path fill={props.color} d="M6 22h12a3 3 0 003-3V7a2 2 0 00-2-2h-2V3a1 1 0 00-2 0v2H9V3a1 1 0 00-2 0v2H5a2 2 0 00-2 2v12a3 3 0 003 3zm-1-9.5a.5.5 0 01.5-.5h13a.5.5 0 01.5.5V19a1 1 0 01-1 1H6a1 1 0 01-1-1z" />
    </Svg>
  )
}

export default Calendar
