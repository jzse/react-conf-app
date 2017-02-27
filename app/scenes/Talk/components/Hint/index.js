import React, { Component } from 'react';
import {
	Animated,
	Dimensions,
	Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const Gradient = Animated.createAnimatedComponent(LinearGradient);

import theme from '../../../../theme';
import { fade } from '../../../../utils/color';

const animationDefault = (val) => ({
	toValue: val,
	duration: 550,
	easing: Easing.inOut(Easing.quad),
});

export default class Hint extends Component {
	constructor (props) {
		super(props);

		this.state = {
			arrowVal: new Animated.Value(0),
			containerVal: new Animated.Value(1),
		};
	}
	componentDidMount () {
		const { arrowVal, containerVal } = this.state;
		const sequence = [];

		for (let i = 0; i < 6; i++) {
			if (i % 2) {
				sequence.push(Animated.timing(arrowVal, animationDefault(0)));
			} else {
				sequence.push(Animated.timing(arrowVal, animationDefault(1)));
			}
		}

		Animated.sequence(sequence).start(() => Animated.timing(containerVal, {
			toValue: 0,
			duration: 220,
			easing: Easing.in(Easing.quad),
		}).start(() => this.props.onClose()));
	}
	render () {
		const { arrowVal, containerVal } = this.state;
		const arrowStyle = {
			opacity: arrowVal.interpolate({
				inputRange: [0, 1],
				outputRange: [0.2, 1],
			}),
			transform: [{
				translateY: arrowVal.interpolate({
					inputRange: [0, 1],
					outputRange: [0, -10],
				}),
			}],
		};
		const containerStyle = {
			alignItems: 'center',
			backgroundColor: 'transparent',
			bottom: 0,
			left: 0,
			height: 80,
			justifyContent: 'flex-end',
			opacity: containerVal,
			paddingBottom: 10,
			position: 'absolute',
			width: Dimensions.get('window').width,
		};

		const gradientColors = [fade(theme.color.sceneBg, 10), theme.color.sceneBg];

		return (
			<Gradient colors={gradientColors} locations={[0, 0.66]} pointerEvents="none" style={containerStyle}>
				<Animated.View style={arrowStyle}>
					<Icon
						color={theme.color.text}
						name="ios-arrow-up"
						size={20}
					/>
				</Animated.View>
			</Gradient>
		);
	}
};
