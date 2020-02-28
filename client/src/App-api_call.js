import React, { Component } from 'react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: ''
		};
	}
	callApi() {
		fetch('https://jsonplaceholder.typicode.com/todos/1')
			.then(res => res.json())
			.then(json => {
				this.setState({
					data: json.title
				});
			});
	}
	componentDidMount() {
		this.callApi();
	}
	render() {
		return (
			<div className="App">			
				<h3>
					{this.state.data? this.state.data : '데이터를 불러오는중'}
				</h3>
			</div>
		);
	}
}

export default App;