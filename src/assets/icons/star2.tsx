


import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Animated from "react-native-reanimated";
import { IIconProps } from "../../types/IIconProps";


function Star2(props: IIconProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 64 64"
      {...props}
    >
      <Path
        fill={props.color}
        d="M62.799 23.737a3.941 3.941 0 00-3.139-2.642l-16.969-2.593-7.622-16.237a3.938 3.938 0 00-7.13 0l-7.623 16.238-16.969 2.593a3.937 3.937 0 00-2.222 6.642l12.392 12.707-2.935 17.977a3.94 3.94 0 005.797 4.082l15.126-8.365 15.126 8.365a3.94 3.94 0 005.796-4.082l-2.935-17.977 12.393-12.707a3.942 3.942 0 00.914-4.001z"
      />
    </Svg>
  )
}

export default Star2
