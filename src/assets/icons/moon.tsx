import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../../types/IIconProps"
import { BlurView } from "@react-native-community/blur"
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native"

const { width } = Dimensions.get('window');

function SvgComponent(props: IIconProps) {
	return (
		<TouchableOpacity style={styles.moonContainer}>
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
					d="M8.231 2.24c1.012-.453 1.89.571 1.573 1.461-1.075 3.018-.415 6.446 1.815 8.675 2.242 2.241 5.692 2.9 8.72 1.806.882-.318 1.878.55 1.443 1.538l-.04.087c-.775 1.72-2.015 3.336-3.62 4.42A10.345 10.345 0 0112.333 22h-.001a10.344 10.344 0 01-10.143-8.376 10.335 10.335 0 011.07-6.905c1.089-1.998 2.918-3.55 4.944-4.465l.03-.014z"
					fill="#fff"
				/>
			</Svg>
			<BlurView style={styles.blurContainer} blurAmount={1}>
				<Text style={styles.dateText}>{props.date}</Text>
			</BlurView>
		</TouchableOpacity>

	)
}

export default SvgComponent

const styles = StyleSheet.create({
	moonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	star: {
		alignItems: 'center',
		gap: 2,
	},
	blurContainer: {
		paddingHorizontal: 15,
		paddingVertical: 6,
		borderRadius: 10,
		marginTop: 2
	},
	dateText: {
		color: '#fff',
		fontFamily: 'Outfit-Regular',
		fontSize: width * 0.032,
	},
});
