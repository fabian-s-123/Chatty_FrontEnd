import React, { Component } from 'react'
import './ChatRoom.page.css'
import DisplayChat from '../../components/DisplayChat/DisplayChat.components'

export default class ChatRoom extends Component {

    render () {
        return (
            <div className="chat">
                <DisplayChat />
            </div>
        )
    }
}