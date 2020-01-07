import React, { Component } from 'react'
import './ChatRoom.page.css'
import DisplayChat from '../../components/DisplayChat/DisplayChat.components'
import EnterMessage from '../../components/EnterMessage/EnterMessage.components'
import ExitChat from '../../components/ExitChat/ExitChat.components'
import { Redirect } from 'react-router-dom';
import SignOutHttpService from '../../services/signOut.http.services';

export default class ChatRoom extends Component<{}, { redirect: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        setTimeout(this.checkUser, 2000)
    }

    /* componentWillUnmount() {
        debugger;
        window.addEventListener('beforeunload', function(event) {
            event.preventDefault();
            SignOutHttpService.signOut()
            .then(res => {
                sessionStorage.clear();
            })
            .catch(err => {
                console.log(err)
            })
        })
    } */

    handleSignOut(e: any) {
        e.preventDefault();
        SignOutHttpService.signOut()
        .then(res => {
            this.setState({ redirect: true })
            sessionStorage.clear();
        })
        .catch(err => {
            console.log(err)
        })
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

    render () {
        return (
            <div className="chat">
                <ExitChat />
                <DisplayChat />
                <EnterMessage />
                <div>
                    {this.renderRedirect()}
                </div>
            </div>
        )
    }
}