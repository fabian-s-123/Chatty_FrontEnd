import React, { Component } from 'react'
import './ChatRoom.page.css'
import DisplayChat from '../../components/DisplayChat/DisplayChat.components'
import EnterMessage from '../../components/EnterMessage/EnterMessage.components'
import ExitChat from '../../components/ExitChat/ExitChat.components'

export default class ChatRoom extends Component {

    render () {
        return (
            <div className="chat">
                <ExitChat />
                <DisplayChat />
                <EnterMessage />
            </div>
        )
    }
}