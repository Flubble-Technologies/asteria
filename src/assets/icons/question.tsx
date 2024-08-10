import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../../types/IIconProps"

function Question(props: IIconProps) {
  return (
    <Svg
      height={props.size}
      width={props.size}
      id="_x32_"
      viewBox="0 0 512 512"
      {...props}
    >
      <Path
        d="M396.138 85.295c-13.172-25.037-33.795-45.898-59.342-61.03C311.26 9.2 280.435.001 246.98.001c-41.238-.102-75.5 10.642-101.359 25.521-25.962 14.826-37.156 32.088-37.156 32.088a19.471 19.471 0 00-6.721 15.056 19.425 19.425 0 007.273 14.784l35.933 28.78c7.324 5.864 17.806 5.644 24.875-.518 0 0 4.414-7.978 18.247-15.88 13.91-7.85 31.945-14.173 58.908-14.258 23.517-.051 44.022 8.725 58.016 20.717 6.952 5.941 12.145 12.594 15.328 18.68 3.208 6.136 4.379 11.5 4.363 15.574-.068 13.766-2.742 22.77-6.603 30.442-2.945 5.729-6.789 10.813-11.738 15.744-7.384 7.384-17.398 14.207-28.634 20.479-11.245 6.348-23.365 11.932-35.612 18.68-13.978 7.74-28.77 18.858-39.701 35.544-5.449 8.249-9.71 17.686-12.416 27.641-2.742 9.964-3.98 20.412-3.98 31.071v20.708c0 10.719 8.69 19.41 19.41 19.41h46.762c10.719 0 19.41-8.691 19.41-19.41v-20.708c0-4.107.467-6.755.917-8.436.773-2.512 1.206-3.14 2.47-4.668 1.29-1.452 3.895-3.674 8.698-6.331 7.019-3.946 18.298-9.276 31.07-16.176 19.121-10.456 42.367-24.646 61.972-48.062 9.752-11.686 18.374-25.758 24.323-41.968 6.001-16.21 9.242-34.431 9.226-53.96-.018-19.784-5.382-38.574-14.123-55.25zM228.809 406.44c-29.152 0-52.788 23.644-52.788 52.788 0 29.136 23.637 52.772 52.788 52.772 29.136 0 52.763-23.636 52.763-52.772 0-29.144-23.627-52.788-52.763-52.788z"
        fill={props.color}
      />
    </Svg>
  )
}

export default Question