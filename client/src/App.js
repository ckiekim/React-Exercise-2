import React, { Component } from 'react';
import Customer from './Components/Customer';
import CustomerAdd from './Components/CustomerAdd';
import './App.css'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import styles from './myStyles';

/*
 * 실행 순서
 * 1) consturctor()
 * 2) componentWillMount()
 * 3) render()
 * 4) componentDidMount()
 */
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customers: "",
			completed: 0,
			searchKeyword: ''
		};
		this.stateRefresh = this.stateRefresh.bind(this);
	}

	stateRefresh = () => {
		this.setState({
			customers: "",
			completed: 0,
			searchKeyword: ''
		});
		this.callApi()
			.then(res => this.setState({customers: res}))
			.catch(err => console.log(err));
	}

	componentDidMount() {
		this.timer = setInterval(this.progress, 20);
		this.callApi()
			.then(res => this.setState({customers: res}))
			.catch(err => console.log(err));
	}

	callApi = async () => {
		const response = await fetch('/api/customers');
		const body = await response.json();
		return body;
	}

	progress = () => {
		const { completed } = this.state;
		this.setState({ completed: completed >= 100 ? 0 : completed + 1});
	}

	handleValueChange = (e) => {
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}

	render() {
		const filteredComponents = (data) => {
			data = data.filter((c) => {
				return c.name.indexOf(this.state.searchKeyword) >= 0;
			});
			return data.map((c) => {
				return (
					<Customer
						stateRefresh={() => this.stateRefresh()}
						key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} createdDate={c.createdDate}
					></Customer>
				);
			});
		}
		const { classes } = this.props;
		const cellList = ['번호', '사진', '이름', '생년월일', '성별', '직업', '생성시각', '명령'];
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="open drawer"
							>
							<MenuIcon />
						</IconButton>
						<Typography className={classes.title} variant="h6" noWrap>
							고객관리 시스템
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="검색하기"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								name="searchKeyword"
								value={this.state.searchKeyword}
								onChange={this.handleValueChange}
								/* inputProps={{ 'aria-label': 'search' }} */
							/>
						</div>
					</Toolbar>
				</AppBar>
				<div className={classes.menu}>
					<CustomerAdd stateRefresh={this.stateRefresh}></CustomerAdd>
				</div>
				<Paper className={classes.paper}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								{cellList.map(c => {
									return <TableCell className={classes.tableHead}>{c}</TableCell>
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.customers? 
								filteredComponents(this.state.customers) :
								<TableRow>
									<TableCell colSpan="8" align="center">
										<CircularProgress 
											className={classes.progress} 
											variant="determinate" 
											value={this.state.completed}
										/>
									</TableCell>
								</TableRow>
							}						
						</TableBody>
					</Table>
				</Paper>				
			</div>
		);
	}
}
// stateRefresh={this.stateRefresh}  ====> stateRefresh={() => this.stateRefresh()}
export default withStyles(styles)(App);