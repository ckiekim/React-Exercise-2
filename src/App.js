import React, { Component } from 'react';
import Customer from './Components/Customer';
import './App.css'

const customers = [
	{	'id': 1,
		'image': 'https://placeimg.com/64/64/1',
		'name': '홍길동',
		'birthday': '961222',
		'gender': '남자',
		'job': '프로그래머'	},
	{	'id': 2,
		'image': 'https://placeimg.com/64/64/2',
		'name': '이승엽',
		'birthday': '861222',
		'gender': '남자',
		'job': '야구선수'	},
	{	'id': 3,
		'image': 'https://placeimg.com/64/64/3',
		'name': '최혜진',
		'birthday': '991222',
		'gender': '여자',
		'job': '프로골퍼'	}
];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggleOn: true
		};
	}
	render() {
		return (
			<div>
				{
					customers.map(function(c) {
						return (
							<Customer
								key={c.id}
								id={c.id}
								image={c.image}
								name={c.name}
								birthday={c.birthday}
								gender={c.gender}
								job={c.job}
							></Customer>
						);
					})
				}						
			</div>
		);
	}
}

export default App;