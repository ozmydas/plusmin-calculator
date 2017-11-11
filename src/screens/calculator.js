import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ToastAndroid,
	ScrollView,
	StyleSheet,
} from 'react-native';

/* required components */
import Button from '@components/buttons/calcbutton';


class Calculator extends Component{
	constructor(props){
		super(props);

		this.state = {
			prevInput: 0,
			currentInput: 0,
			input: '',
			output: 0,
			result: 0,
			operator: null,
			finish: false,
		};

		this._btnPressed = this._btnPressed.bind(this);
		this._updateInput = this._updateInput.bind(this);
		this._clearInput = this._clearInput.bind(this);
		this._deleteInput = this._deleteInput.bind(this);
		this._setOperator = this._setOperator.bind(this);
		this._count = this._count.bind(this);
	}

	_btnPressed(num){
		if( ! isNaN(num)){
			this._updateInput(num);
		} else{
			switch(num){
				case 'C':
					this._clearInput();
					break;
				case 'DEL':
					this._deleteInput();
					break;
				case '/':
				case 'x':
				case '-':
				case '+':
					this._setOperator(num);
					break
				case '=':
					this._count();
					break;
				default:
					alert(num + ' not yet supported');
			}
		}
	}

	_updateInput(num){
		let { prevInput, currentInput, input, finish } = this.state;
		let x = eval((currentInput * 10) + Number(num));
		if(x >= 9999999999){ return; }
		
		if(finish){
			this.setState({
				input: '',
				finish: false,
			});
		}

		this.setState({
			currentInput: x,
			output: x,
		})
	}


	_setOperator(operator){
		let { prevInput, currentInput, input, output, finish } = this.state;
		if(operator=='x'){operator = '*';}

		let tmpinput = input;
		let tmpcurrent = currentInput;

		if(finish){
			this.setState({ finish: false });
			tmpinput = output;
			tmpcurrent = '';
		}

		if(input.length<1 && output==0){
			return;
		}

		if(isNaN(output)){
			if(isNaN(input.substr(input.length - 1))){
				return this.setState({ 
					input: input.slice(0, -1) + operator,
					output: operator, 
				});
			} else{
				return this.setState({
					input: tmpinput + '' + tmpcurrent + '' + operator,
					output: operator,
				});
			}
		}	

		this.setState({
			operator,
			prevInput: currentInput,
			currentInput: 0,
			input: tmpinput + '' + tmpcurrent + '' + operator,
			output: operator,
		});
	}

	_count(){
		let { prevInput, currentInput, input, finish } = this.state;
		let xinput = input + '' + currentInput;
		let count = Math.round(eval(xinput));

		if(finish){
			return;
		}

		if(count >= 9999999999){
			alert('out of number');
			this._clearInput();
			return; 
		}

		this.setState({
			prevInput: currentInput,
			currentInput: 0,
			input: xinput,
			output: count,
			finish: true,
		});	
	}

	_deleteInput(){
		let { prevInput, currentInput, input, output, finish } = this.state;
		let x = Math.floor(eval(currentInput / 10));

		if(finish){
			this.setState({
				input: '',
				finish: false,
			});
		}

		if(isNaN(output)){
			this.setState({
				input: input.slice(0, -1),
				output: 0,
			})
		}

		this.setState({
			currentInput: x,
			output: x,
		})
	}
	
	_clearInput(){
		this.setState({
			prevInput: 0,
			currentInput: 0,
			output: 0,
			input: '',
		})
	}


	render(){
		let { input, output } = this.state;

		return (
			<View style={styles.container}>
				<View style={styles.outputContainer}>
					<View style={styles.prevNumber}>
						<Text style={styles.prevTxt}>{input}</Text>
					</View>
					<View style={styles.resultNumber}>
						<Text style={styles.resultTxt}>{output}</Text>
					</View>
				</View>

				<View style={styles.inputContainer}>

					<View style={[styles.inputRow, {flex: 0.5}]}>
						<Button number='C' onPress={this._btnPressed} />
						<Button number='DEL' onPress={this._btnPressed} />
					</View>

					<View style={styles.inputRow}>
						<Button number='7' onPress={this._btnPressed} />
						<Button number='8' onPress={this._btnPressed} />
						<Button number='9' onPress={this._btnPressed} />
						<Button number='/' onPress={this._btnPressed} />
					</View>

					<View style={styles.inputRow}>
						<Button number='4' onPress={this._btnPressed} />
						<Button number='5' onPress={this._btnPressed} />
						<Button number='6' onPress={this._btnPressed} />
						<Button number='x' onPress={this._btnPressed} />
					</View>

					<View style={styles.inputRow}>
						<Button number='1' onPress={this._btnPressed} />
						<Button number='2' onPress={this._btnPressed} />
						<Button number='3' onPress={this._btnPressed} />
						<Button number='-' onPress={this._btnPressed} />
					</View>

					<View style={styles.inputRow}>
						<Button number='0' onPress={this._btnPressed} />
						<Button number='.' onPress={this._btnPressed} />
						<Button number='=' onPress={this._btnPressed} special={true} />
						<Button number='+' onPress={this._btnPressed} />
					</View>

				</View>
			</View>
		);
	}

}


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	outputContainer: {
		flex: 0.3,
		backgroundColor: '#f0f0f0',
		borderBottomWidth: 2,
		borderBottomColor: '#0000df',
	},
	prevNumber: {
		flex: 1,
		paddingHorizontal: 7,
		justifyContent: 'center',
	},
	prevTxt: {
		color: '#666',
		textAlign: 'right',
		fontSize: 20,
	},
	resultNumber: {
		flex: 1,
		paddingHorizontal: 7,
	},
	resultTxt: {
		color: '#000',
		fontSize: 60,
		textAlign: 'right',
	},
	inputContainer: {
		flex: 0.7,
		backgroundColor: '#fff',
	},
	inputRow: {
		flex: 1, 
		flexDirection: 'row'
	}
})

export default Calculator;
