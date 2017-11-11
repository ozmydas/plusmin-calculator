import React, { Component } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';


export default class CalcButton extends Component{

	render(){
		let { number, special, onPress } = this.props;

		return (
			<TouchableOpacity style={[styles.btnContainer, special && {backgroundColor: '#d00'}]} onPress={() => onPress(number)}>
				<Text style={[styles.btnTxt, special && {color: '#fff'}]}>{number}</Text>
			</TouchableOpacity>
		);
	}

} 


const styles = StyleSheet.create({
	btnContainer: {
		flex: 1, 
		display: 'flex',
		justifyContent: 'center',
		borderWidth: 0.5,
		borderColor: '#ddd'
	},
	btnTxt: {
		alignSelf: 'center',
		fontSize: 30,
	},
});
