import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
import { IIconProps } from "../../types/IIconProps"

function Sun(props: IIconProps) {
    return (
        <Svg
            width={props.size}
            height={props.size}
            viewBox="0 0 48 48"
            {...props}
        >
            <G data-name="Layer 2">
                <Path fill="none" data-name="invisible box" d="M0 0H48V48H0z" />
                <G data-name="Q3 icons">
                    <Path fill={props.color} d="M24 10a2 2 0 002-2V4a2 2 0 00-4 0v4a2 2 0 002 2zM24 38a2 2 0 00-2 2v4a2 2 0 004 0v-4a2 2 0 00-2-2zM36.7 14.1l2.9-2.8a2.3 2.3 0 000-2.9 2.3 2.3 0 00-2.9 0l-2.8 2.9a2 2 0 102.8 2.8zM11.3 33.9l-2.9 2.8a2.3 2.3 0 000 2.9 2.3 2.3 0 002.9 0l2.8-2.9a2 2 0 10-2.8-2.8zM44 22h-4a2 2 0 000 4h4a2 2 0 000-4zM10 24a2 2 0 00-2-2H4a2 2 0 000 4h4a2 2 0 002-2zM36.7 33.9a2 2 0 10-2.8 2.8l2.8 2.9a2.1 2.1 0 102.9-2.9zM11.3 14.1a2 2 0 002.8-2.8l-2.8-2.9a2.3 2.3 0 00-2.9 0 2.3 2.3 0 000 2.9zM24 14a10 10 0 1010 10 10 10 0 00-10-10zm0 16a6 6 0 116-6 6 6 0 01-6 6z" />
                </G>
            </G>
        </Svg>
    )
}

export default Sun
