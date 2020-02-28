import React, { Component } from 'react';
import Customer from './Components/Customer';
import './App.css'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: "auto"
	},
	table: {
		minWidth: 1080
	}
})

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
		const { classes } = this.props;
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>번호</TableCell>
							<TableCell>사진</TableCell>
							<TableCell>이름</TableCell>
							<TableCell>생년월일</TableCell>
							<TableCell>성별</TableCell>
							<TableCell>직업</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
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
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

export default withStyles(styles)(App);