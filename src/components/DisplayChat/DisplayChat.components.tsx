import React, { Component } from 'react';
import './DisplayChat.components.css';
import Message from '../../models/Message';
import GetChatsHttpService from '../../services/getChats.http.services';

export default class DisplayChat extends Component<{}, { searchData: any }> {
    constructor(props: any) {
        super(props);

        this.state = {
            searchData: null
        }

        this.getDataFromDb = this.getDataFromDb.bind(this);
        this.loadMessages = this.loadMessages.bind(this);
        /* this.displayTime = this.displayTime.bind(this); */
    }

    componentDidMount() {
        setInterval(async() => {
            this.loadMessages()
        }, 1000)
    }

    loadMessages() {
        GetChatsHttpService.getChats((response: any) => {
            this.getDataFromDb(response)
        })
    }

    getDataFromDb(response: any) {
        if (!response.data) {
            return;
        }

        let arr = [];
        if (Array.isArray(response.data)) {
            arr = response.data;
        } else {
            arr.push(response.data);
        }
        this.setState({ searchData: arr })
        //console.log(this.state.searchData)
    }

    /*      displayTime() {
            var time = new Date(Date.parse(this.state.searchData.postedOn));
            console.log(time)
            var formattedTime = time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
            console.log(formattedTime)
            return(formattedTime)
        } */

    render() {
        return (
            <div className="chat-container">
                <h2>Chat History</h2>
                <section className="chat-logs">
                <div className="background"></div>
                    <table style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                    <th scope="col">Username</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">posted on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.searchData && this.state.searchData.map(function (item: Message, key: number) {
                                return (
                                    <tr key={key}>
                                        <td style={{ width: '12%', paddingRight: '4px', verticalAlign: 'top' }}>{item.userName} says:</td>
                                        <td style={{ paddingBottom: '12px', paddingRight: '4px', textAlign: 'left' }}>{item.content}</td>
                                        <td style={{ verticalAlign: 'top' }}>{item.postedOn}</td>
                                        <td>{}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }
}