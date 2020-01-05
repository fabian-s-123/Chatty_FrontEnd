import React, { Component } from 'react';
import './DisplayChat.components.css';
import Message from '../../models/Message';
import GetChatsHttpService from '../../services/getChats.http.services';
import ScrollIntoView from 'react-scroll-into-view';

export default class DisplayChat extends Component<{}, { isLoading: boolean, searchData: [] }> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            isLoading: true,
            searchData: [],
        }

        this.getDataFromDb = this.getDataFromDb.bind(this);
        this.loadMessages = this.loadMessages.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        /* this.displayTime = this.displayTime.bind(this); */
    }

    componentDidMount() {
        setInterval(async() => {
            this.loadMessages()
        }, 1000)
        //this.scrollToBottom();
        this.setState({ isLoading: false })
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        //scrollIntoView({ behaviour: 'smooth '});
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

        let arr = [] as any;
        if (Array.isArray(response.data)) {
            arr = response.data;
        } else {
            arr.push(response.data);
        }
        this.setState({ searchData: arr })
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
                {/* {this.state.isLoading &&
                    <div className="loading-message">Loading messages ...</div>
                } */}
                <h2>Chat History</h2>
                <div className="chat-logs">
                <div className="background"></div>
                    <table style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '15%', paddingRight: '6px', verticalAlign: 'top' }} scope="col">Username</th>
                                <th style={{ width: '85%', paddingBottom: '12px', paddingRight: '6px', textAlign: 'left' }} scope="col">Message</th>
                                <th style={{ width: '20%', verticalAlign: 'top' }} scope="col">posted on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.searchData && this.state.searchData.map(function (item: Message, key: number) {
                                return (
                                    <tr key={key}>
                                        <td style={{ width: '15%', paddingRight: '6px', verticalAlign: 'top' }}>{item.userName} says:</td>
                                        <td style={{ width: '85%', paddingBottom: '12px', paddingRight: '6px', textAlign: 'left' }}>{item.content}</td>
                                        <td style={{ width: '20%', verticalAlign: 'top' }}>{item.postedOn}</td>
                                        <td>{}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}