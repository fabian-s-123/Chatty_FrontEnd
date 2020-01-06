import React, { Component } from 'react';
import './EnterMessage.components.css';
import { Redirect } from 'react-router-dom';
import Message from '../../models/Message';
import PostMessageService from '../../services/postMessage.http.services';

export default class EnterMessage extends Component<{}, { message: string, redirect: boolean }> {
    constructor(props: any) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);

        this.state = {
            message: '',
            redirect: false
        }
    }

    componentDidMount() {
        setTimeout(this.checkUser, 2000)
    }

    handleChange(e: any) {
        this.setState ({message: e.target.value})
    }

    handleSubmit(e: any) {
        e.preventDefault();
        if (this.state.message=='') {
            alert("Please enter a message before posting it!")
        } else {
            PostMessageService.postMessage(this.state.message)
            .then(res => {
                this.setState ({message: ''})
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    checkUser() {
        if (sessionStorage.length===0) {
            alert("You must first sign in to post messages")
            this.setState ({ redirect: true });
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render() {
        return(
            <div className="user-input-container">
                <h2>Write your message</h2>
                <form className="message-input" onSubmit={this.handleSubmit}>
                    <input className="message" type="text" name="content" value={this.state.message} onChange={this.handleChange} placeholder="..." />
                    <input className="btn" type="submit" value="post" />
                </form>
                <div>
                    {this.renderRedirect()}
                </div>
            </div>
        )
    }
}