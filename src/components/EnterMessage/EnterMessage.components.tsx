import React, { Component } from 'react';
import './EnterMessage.components.css';
import Message from '../../models/Message';

export default class EnterMessage extends Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }


    render() {
        return(
            <div className="user-input-container">test
                <h2>Write your message</h2>
                
            </div>
        )
    }
}