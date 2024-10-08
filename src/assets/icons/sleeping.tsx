import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../../types/IIconProps"

function Sleeping(props: IIconProps) {
    return (
        <Svg
            height={props.size}
            width={props.size}
            viewBox="0 0 512 512"
            {...props}
        >
            <Path
                d="M378.435 233.739c0 24.588-19.933 44.522-44.522 44.522s-44.522-19.934-44.522-44.522 19.933-44.522 44.522-44.522 44.522 19.934 44.522 44.522z"
                fill="#f4c064"
            />
            <Path
                d="M289.391 233.739h89.043c0 24.588-19.933 44.522-44.522 44.522s-44.521-19.934-44.521-44.522z"
                fill="#f4ab53"
            />
            <Path
                d="M512 503.652a8.349 8.349 0 01-8.348 8.348H8.348a8.349 8.349 0 010-16.696h495.304a8.349 8.349 0 018.348 8.348z"
                fill="#c1c1c1"
            />
            <Path
                d="M100.174 411.826h66.783v77.913c0 12.295-9.966 22.261-22.261 22.261h-22.261c-12.295 0-22.261-9.966-22.261-22.261v-77.913zm267.13 0v77.913c0 12.295 9.966 22.261 22.261 22.261h22.261c12.295 0 22.261-9.966 22.261-22.261v-77.913h-66.783z"
                fill="#cea05d"
            />
            <Path
                d="M100.174 422.957h66.783v55.652h-66.783v-55.652zm267.13 0v55.652h66.783v-55.652h-66.783z"
                fill="#99774f"
            />
            <Path
                d="M467.478 333.913h22.261c12.295 0 22.261 9.966 22.261 22.261v66.783c0 12.295-9.966 22.261-22.261 22.261H44.522c-12.295 0-22.261-9.966-22.261-22.261v-66.783c0-12.295 9.966-22.261 22.261-22.261h278.261v-55.652c0-24.588 19.934-44.522 44.522-44.522h100.174c24.588 0 44.522 19.933 44.522 44.522v11.13c-.001 24.589-19.935 44.522-44.523 44.522z"
                fill="#b5e1f4"
            />
            <Path
                d="M512 356.174v22.261H22.261v-22.261c0-12.295 9.966-22.261 22.261-22.261h278.261v-44.522H512c0 24.588-19.933 44.522-44.522 44.522h22.261c12.295 0 22.261 9.966 22.261 22.261z"
                fill="#d7f3ff"
            />
            <Path
                d="M512 278.261v11.13c0 24.588-19.933 44.522-44.522 44.522H322.783v-55.652c0-24.588 19.934-44.522 44.522-44.522h100.174c24.587 0 44.521 19.934 44.521 44.522z"
                fill="#a2ccdb"
            />
            <Path
                d="M322.783 289.391H512c0 24.588-19.933 44.522-44.522 44.522H322.783v-44.522z"
                fill="#90b5bf"
            />
            <Path
                d="M345.043 289.391v77.913c0 12.295-9.966 22.261-22.261 22.261H22.261C9.966 389.565 0 379.599 0 367.304v-77.913c0-12.295 9.966-22.261 22.261-22.261h300.522c12.294 0 22.26 9.967 22.26 22.261z"
                fill="#8e5b8e"
            />
            <Path
                d="M345.043 289.391v77.913c0 12.295-9.966 22.261-22.261 22.261H244.87V267.13h77.913c12.294 0 22.26 9.967 22.26 22.261z"
                fill="#af7aae"
            />
            <Path
                d="M217.043 166.957h-44.522c-46.103 0-83.478-37.375-83.478-83.478C89.043 37.375 126.418 0 172.522 0h44.522c46.103 0 83.478 37.375 83.478 83.478 0 46.104-37.375 83.479-83.479 83.479z"
                fill="#90b5bf"
            />
            <Path
                d="M300.522 150.261c0 15.368-12.458 27.826-27.826 27.826s-27.826-12.458-27.826-27.826 12.458-27.826 27.826-27.826 27.826 12.458 27.826 27.826z"
                fill="#b5e1f4"
            />
            <Path
                d="M211.478 125.125a49.85 49.85 0 01-27.826 8.44c-27.662 0-50.087-22.424-50.087-50.087s22.424-50.087 50.087-50.087a49.843 49.843 0 0127.826 8.44c-13.422 8.986-22.261 24.282-22.261 41.647s8.839 32.661 22.261 41.647z"
                fill="#ffe77c"
            />
        </Svg>
    )
}

export default Sleeping
