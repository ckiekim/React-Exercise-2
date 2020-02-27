import React, { Component } from 'react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggleOn: true
		};
	}
	render() {
		return (
			<div className="App">			
				<button onClick={function() {
					this.setState({isToggleOn: !this.state.isToggleOn});
				}.bind(this)}>
					{this.state.isToggleOn? 'ON': 'OFF'}
				</button>				
			</div>
		);
	}
}

export default App;