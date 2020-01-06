import React, { Component } from 'react';
import './DisplayChat.components.css';
import Message from '../../models/Message';
import GetChatsHttpService from '../../services/getChats.http.services';
import ScrollIntoView from 'react-scroll-into-view';

export default class DisplayChat extends Component<{}, { isLoading: boolean, searchData: any }> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            isLoading: true,
            searchData: [],
        }

        this.getDataFromDb = this.getDataFromDb.bind(this);
        this.loadMessages = this.loadMessages.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        //this.displayTime = this.displayTime.bind(this);
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
        //this.displayTime();
    }

/*     displayTime = () => {
        var time = new Date(Date.parse(this.state.searchData[0].postedOn));
        console.log(time)
        var formattedTime = time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        console.log(formattedTime)
        return(formattedTime)
    } */
    
    render() {
        return (
            <div className="chat-container">
                {this.state.isLoading &&
                    <div className="loading-message">Loading messages ...</div>
                }
                <h2>Chat History</h2>
                <div className="chat-logs">
                <div className="background"></div>
                    <table style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th className="table-row1" scope="col">Username</th>
                                <th className="table-row2" scope="col">Message</th>
                                <th className="table-row3" scope="col">posted on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.searchData && this.state.searchData.map(function (item: Message, key: number) {
                                return (
                                    <tr key={key}>
                                        <td className="table-row1" style={{fontWeight: 'bold'}}>{item.userName}:</td>
                                        <td className="table-row2">{item.content}</td>
                                        <td className="table-row3">{item.postedOn}</td>
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