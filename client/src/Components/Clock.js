import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
		super(props);
		this.state = {
			date: new Date()
		};
	}
	tick() {
		this.setState({
			date: new Date()
		});
	}
	componentDidMount() {
        //this.timerID = setInterval(() => this.tick(), 1000);
        this.timerID = setInterval(this.tick.bind(this), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
	render() {
		return (
			<h3>현재시각: {this.state.date.toLocaleTimeString()}</h3>
		);
	}
}

export default Clock;