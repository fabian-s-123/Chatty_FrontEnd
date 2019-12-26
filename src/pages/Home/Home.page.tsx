import React, { Component } from 'react';
import './Home.page.css';
import UserNameInput from '../../components/UserNameInput/UserNameInput.components';

export default class Home extends Component {

    render () {
        return (
            <div className="enter">
                <h1>Welcome to Chatty!</h1>
                <UserNameInput />
            </div>
        )
    }
}