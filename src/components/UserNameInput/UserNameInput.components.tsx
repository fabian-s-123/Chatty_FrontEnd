import React, { Component } from 'react';
import './UserNameInput.components.css';
import { Redirect } from 'react-router-dom';

export default class UserNameInput extends Component <{}, {userName: string, redirect: boolean, showSuccessAlert: boolean, showFailAlert: boolean }> {

    constructor(props: any) {
        super(props);

        this.handleChange.bind(this);
        this.handleSubmit.bind(this);

        this.state = {
            userName: '',
            redirect: false,
            showSuccessAlert: false,
            showFailAlert: false
        }
    }

    handleChange(event: any){
        this.setState({
            userName: event.target.value
        })
    }

    handleSubmit(){

    }

    render () {
        return(
            <div>
                <input className="user-name" type="text" value={this.state.userName} onChange={this.handleChange} placeholder="enter your user name here" />
                <input className="btn" type="submit" value="Go" />
            </div>
        )
    }
}