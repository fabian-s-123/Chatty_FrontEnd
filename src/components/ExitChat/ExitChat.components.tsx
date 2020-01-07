import React, { Component } from 'react';
import './ExitChat.components.css';
import { Redirect } from 'react-router-dom';
import SignOutHttpService from '../../services/signOut.http.services';

export default class ExitChat extends Component<{}, { redirect: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            redirect: false
        }
    }
    
    handleSignOut(e: any) {
        e.preventDefault();
        SignOutHttpService.signOut()
        .then(res => {
            this.setState({ redirect: true })
            sessionStorage.clear();
            alert("Signed out of the chatroom!")
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render() {
        return(
            <div className="exit-btn">
                <form onSubmit={this.handleSignOut}>
                    <input className="btn" type="submit" value="Sign out" />
                </form>
                <div>
                    {this.renderRedirect()}
                </div>
            </div>
        )
    }
}