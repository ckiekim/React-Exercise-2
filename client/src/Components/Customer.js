import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';
import CustomerUpdate from './CustomerUpdate';

class Customer extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile" height="32"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell>{this.props.createdDate}</TableCell>
                <TableCell>
                    <CustomerUpdate id={this.props.id}></CustomerUpdate>&nbsp;&nbsp;&nbsp;
                    <CustomerDelete /* stateRefresh={this.props.stateRefresh} */
                                    id={this.props.id}
                    ></CustomerDelete>
                </TableCell>
            </TableRow>   
        )
    }
}
//<button onClick={() => this.handleClick()}>Click Me</button>
export default Customer;