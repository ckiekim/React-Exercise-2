import React, { Component } from 'react';
import Clock from './Components/Clock';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date()
		};
	}
	goBack() {
		let nextDate = this.state.date;
		nextDate.setSeconds(nextDate.getSeconds() - 10);
		this.setState({
			date: nextDate
		});
	}
	render() {
		return (
			<div className="App">			
				<h3>현재시각: {this.state.date.toLocaleTimeString()}</h3>
				<button onClick={this.goBack.bind(this)}>10초 뒤로가기</button>
				<Clock/>
			</div>
		);
	}
}

export default App;