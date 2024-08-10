import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../../types/IIconProps"

function Zzz(props: IIconProps) {
    return (
        <Svg
            height={props.size}
            width={props.size}
            viewBox="0 0 512 512"
            {...props}
        >
            <Path
                fill={props.color}
                d="M0.525 412.7L60.889 412.7 0 489.258 0 502.514 116.931 502.514 116.931 467.749 59.208 467.749 118.25 393.521 118.25 377.934 0.525 377.934z"
            />
            <Path
                fill={props.color}
                d="M150.434 244.368L225.888 244.368 149.775 340.068 149.775 356.629 295.938 356.629 295.938 313.175 223.79 313.175 297.591 220.39 297.591 200.914 150.434 200.914z"
            />
            <Path
                fill={props.color}
                d="M512 9.486L335.41 9.486 335.41 61.629 425.954 61.629 334.617 176.471 334.617 196.337 510.013 196.337 510.013 144.194 423.438 144.194 512 32.851z"
            />
        </Svg>
    )
}

export default Zzz
