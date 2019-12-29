import React, { Component } from 'react';
import './UserNameInput.components.css';
import { Redirect } from 'react-router-dom';
import SignInHttpService from '../services/SignIn.http.service';
import HttpService, { HTTPMETHOD } from '../services/http.services';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class UserNameInput extends Component <{}, {userName: string, redirect: boolean }> {
    constructor(props: any) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            userName: '',
            redirect: false
        }
    }

    handleChange = (e: any) => {
        this.setState ({
            userName: e.target.value
        })
    }

    handleSubmit(e: any) {
        e.preventDefault();
        console.log(this.state.userName)
        console.log(HttpService.request(HTTPMETHOD.GET, '/user'))
        SignInHttpService.signIn(this.state.userName)
        .then(res => {
            this.setState ({
                redirect: true
            })
            localStorage.setItem("userName", this.state.userName)
            alert("Signed in to the chatroom!")
        })
        .catch (err => {
            console.log(err)
            alert("Username is already in use!")
        })
    }

    render () {
        return(
            <div>
                <form onSubmit={this.handleSubmit} >
                    <input className="user-name" type="text" name="userName" value={this.state.userName} onChange={this.handleChange} placeholder="enter your user name here" />
                    <input className="btn" type="submit" value="Go" />
                 </form>
                 <div>
                    {this.state.redirect && 
                        <Redirect to="/chat-room" />
                    }
                 </div>
            </div>
        )
    }
}