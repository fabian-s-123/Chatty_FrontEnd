import React, { Component } from 'react';
import './UserNameInput.components.css';
import { Redirect } from 'react-router-dom';
import SignInHttpService from '../../services/signIn.http.services';
import HttpService, { HTTPMETHOD } from '../../services/http.services';

export default class UserNameInput extends Component <{}, { userName: string, redirect: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            userName: '',
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }
    
    handleChange(e: any) {
        this.setState ({ userName: e.target.value})
    }

    handleSubmit(e: any) {
        e.preventDefault();
        console.log(this.state.userName)
        SignInHttpService.signIn(this.state.userName)
        .then(res => {
            this.setState ({ redirect: true })
            sessionStorage.setItem("userName", this.state.userName)
            sessionStorage.setItem("userId", res.data)
            alert("Signed in to the chatroom!")
        })
        .catch (err => {
            console.log(err)
            alert("Username is already in use!")
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/chat-room' />
        }
    }

    render () {
        return(
            <div>
                <form onSubmit={this.handleSubmit} >
                    <input className="user-name" type="text" name="userName" value={this.state.userName} onChange={this.handleChange} placeholder="enter your user name here" />
                    <input className="btn" type="submit" value="Go" />
                 </form>
                 <div>
                    {this.renderRedirect()}
                </div>
            </div>
        )
    }
}