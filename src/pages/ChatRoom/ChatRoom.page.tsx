import React, { Component } from 'react'
import './ChatRoom.page.css'
import DisplayChat from '../../components/DisplayChat/DisplayChat.components'
import EnterMessage from '../../components/EnterMessage/EnterMessage.components'

export default class ChatRoom extends Component {

    render () {
        return (
            <div className="chat">
                <DisplayChat />
                <EnterMessage />
            </div>
        )
    }
}