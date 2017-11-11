import React, { Component } from 'react';
import {
	Router,
	Scene,
	Actions
} from 'react-native-router-flux';

/* define required screens */
import Calculator from '@screens/calculator';

export default class RouterScene extends Component{
	
	_renderScene(){
		return Actions.create(
			<Scene key='root'>
				<Scene 
					component={Calculator} key='calculatorScreen' title='PlusMin'
					hideNavBar={true} initial={true} />
			</Scene>
		);
	}

	render(){
		return (
			<Router scenes={this._renderScene()} />
		);
	}

}

