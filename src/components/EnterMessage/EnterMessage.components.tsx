import React, { Component } from 'react';
import './EnterMessage.components.css';

import Message from '../../models/Message';
import PostMessageService from '../../services/postMessage.http.services';

export default class EnterMessage extends Component<{}, { message: string }> {
    constructor(props: any) {
        super(props);

        this.state = {
            message: ''
        }
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

    render() {
        return(
            <div className="user-input-container">
                <h2>Write your message</h2>
                <form className="message-input" onSubmit={this.handleSubmit}>
                    <input className="message" type="text" name="content" value={this.state.message} onChange={this.handleChange} placeholder="..." />
                    <input className="btn" type="submit" value="post" />
                </form>
            </div>
        )
    }
}