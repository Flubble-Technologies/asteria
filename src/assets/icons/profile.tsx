import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../../types/IIconProps"

function Profile(props: IIconProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M12 12a5 5 0 100-10 5 5 0 000 10zM12 14.5c-5.01 0-9.09 3.36-9.09 7.5 0 .28.22.5.5.5h17.18c.28 0 .5-.22.5-.5 0-4.14-4.08-7.5-9.09-7.5z"
        fill={props.color}
      />
    </Svg>
  )
}

export default Profile
