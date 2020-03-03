import React, { Component } from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '', name: '', birthday: '', gender: '', job: '', fileName: '', file: null,
            open: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
    }
    handleClickOpen() {
        console.log('handleClickOpen()');
        this.callApi()
            .then(res => this.setState({
                image: res[0].image, name: res[0].name, birthday: res[0].birthday,
                gender: res[0].gender, job: res[0].job, open: true
            }))
            .catch(err => console.log(err));
    }
    callApi = async () => {
		const response = await fetch('/api/customer/' + this.props.id);
        const body = await response.json();
        console.log(body);
		return body;
	}
    handleClickClose() {
        this.setState({
            image: '', name: '', birthday: '', gender: '', job: '', fileName: '', file: null,
            open: false
        });
    }
    handleFormSubmit(e) {
        e.preventDefault();
        this.updateCustomer()
            .then(function(response) {
                console.log(response.data);
                //this.props.stateRefresh();    // Uncaught (in promise) TypeError: Cannot read property 'props' of undefined 발생 시킴
                window.location.reload();
        });
        this.setState({
            image: '', name: '', birthday: '', gender: '', job: '', fileName: '', file: null,
            open: false
        });
    }
    handleFileChange(e) {
        e.preventDefault();
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    }
    handleValueChange(e) {
        e.preventDefault();
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        //console.log(`handleValueChange(e): ${e.target.name}, ${e.target.value}`);
    }
    updateCustomer() {
        if (this.state.fileName === '') {   // 이미지가 바뀌지 않았을 때
            return post('/api/customer', {
                id: this.props.id, image: this.state.image, name: this.state.name,
                birthday: this.state.birthday, gender: this.state.gender, job: this.state.job
            });
        } else {                            // 이미지가 바뀌었을 때
            const url = '/api/customer2';
            const formData = new FormData();
            formData.append('id', this.props.id);
            formData.append('image', this.state.file);
            formData.append('name', this.state.name);
            formData.append('birthday', this.state.birthday);
            formData.append('gender', this.state.gender);
            formData.append('job', this.state.job);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            return post(url, formData, config);
        }
    }
    /* updateCustomer() { 
        return post('/api/customer', {
            id: this.props.id, image: this.state.image, name: this.state.name,
            birthday: this.state.birthday, gender: this.state.gender, job: this.state.job
        });
    } */
    render() {
        const { classes } = this.props;
        return (
            <span>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>수정</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>고객 수정</DialogTitle>
                    <DialogContent>
                        <TextField disabled label="ID" name="id" defaultValue={this.props.id} /><br/>
                        <div>
                        <img src={this.state.image} alt="profile" height="64"/>&nbsp;&nbsp;&nbsp;
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} 
                                        value={this.state.fileName} onChange={this.handleFileChange}/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === ""? "프로필 변경" : this.state.fileName}
                            </Button>
                        </label></div>
                        <TextField label="이름" type="text" name="name" defaultValue={this.state.name} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" type="text" name="birthday" defaultValue={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type="text" name="gender" defaultValue={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" type="text" name="job" defaultValue={this.state.job} onChange={this.handleValueChange}/><br/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>수정</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </span>
        )
    }
}

export default withStyles(styles)(CustomerUpdate);