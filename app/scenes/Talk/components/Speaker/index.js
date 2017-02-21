import React, { Component, PropTypes } from 'react';
import { Image, PixelRatio, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Avatar from '../../../../components/Avatar';
import Modal from '../../../../components/Modal';
import theme from '../../../../theme';
import { attemptToOpenUrl } from '../../../../utils';

function Button ({ bordered, icon, onPress, text }) {
	const touchableProps = {
		activeOpacity: 1,
		onPress: onPress,
		style: styles.buttonTouchable,
		underlayColor: theme.color.gray05,
	};

	return (
		<TouchableHighlight {...touchableProps}>
			<View style={[styles.button, styles.button__bordered]}>
				<Icon
					name={icon}
					size={24}
					style={styles.buttonIcon}
				/>
				<Text style={styles.buttonText}>{text}</Text>
			</View>
		</TouchableHighlight>
	);
};
Button.propTypes = {
	bordered: PropTypes.bool,
	icon: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
};

export default function Speaker ({
	avatar,
	github,
	name,
	onClose,
	summary,
	twitter,
}) {
	const showButtons = !!(github || twitter);

	return (
		<Modal onClose={onClose}>
			<View style={styles.wrapper}>
				<View style={styles.main}>
					<Avatar source={avatar} size={75} />
					<Text style={styles.mainTitle}>{name}</Text>
					<Text style={styles.mainText}>{summary}</Text>
				</View>
				{showButtons && (
					<View style={styles.buttons}>
						{!!twitter && (
							<Button
								icon="logo-twitter"
								onPress={() => attemptToOpenUrl('https://twitter.com/' + twitter)}
								text={'@' + twitter}
							/>
						)}
						{!!github && (
							<Button
								bordered
								icon="logo-github"
								onPress={() => attemptToOpenUrl('https://github.com/' + github)}
								text={github}
							/>
						)}
					</View>
				)}
			</View>
		</Modal>
	);
};

Speaker.propTypes = {
	avatar: PropTypes.string.isRequired,
	github: PropTypes.string,
	name: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	summary: PropTypes.string.isRequired,
	twitter: PropTypes.string,
};
Speaker.defaultProps = {
	onPress: () => {},
};

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOffset: { height: 1, width: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 12,
	},

	// main
	main: {
		alignItems: 'center',
		padding: theme.fontSize.large,
	},
	mainTitle: {
		color: theme.color.text,
		fontSize: theme.fontSize.large,
		fontWeight: '300',
		marginVertical: theme.fontSize.default,
	},
	mainText: {
		color: theme.color.text,
		fontSize: 15,
		fontWeight: '300',
		lineHeight: 21,
		textAlign: 'center',
	},

	// buttons
	buttons: {
		flexDirection: 'row',
	},
	buttonTouchable: {
		backgroundColor: 'white',
		flex: 1,
	},
	button: {
		alignItems: 'center',
		borderTopColor: theme.color.gray20,
		borderTopWidth: 1 / PixelRatio.get(),
		paddingVertical: theme.fontSize.large,
	},
	button__bordered: {
		borderLeftColor: theme.color.gray20,
		borderLeftWidth: 1 / PixelRatio.get(),
	},
	buttonIcon: {
		color: theme.color.blue,
	},
	buttonText: {
		color: theme.color.gray60,
	},
});