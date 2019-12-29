import React, { Component } from 'react';
import './DisplayChat.components.css';
import HttpService, { HTTPMETHOD } from '../../services/http.services';
import Message from '../../models/Message';

export default class DisplayChat extends Component <{}, {searchData: any}> {
    constructor(props: any){
        super(props);

        this.state = {
            searchData: null
        }

        //this.displayMessages = this.displayMessages.bind(this);
        this.getDataFromDb = this.getDataFromDb.bind(this);
    }

    componentDidMount() {
        this.getDataFromDb()
    }

    getDataFromDb() {
        console.log(HttpService.request(HTTPMETHOD.GET, "/messages"))
        let a = HttpService.request(HTTPMETHOD.GET, "/messages")
        .then(res => {
            this.setState ({
                searchData: a
            })                
            console.log(a)
        })
        .catch (err => {
            console.log(err)
        })
    }

/*     displayMessages(response: any) {
        let arr = [];
        if (Array.isArray(response.data)) {
            arr = response.data;
        } else {
            arr.push(response.data);
        }
        this.setState ({ searchData: arr })
    }
 */
    render() {
        return(
            <div className="chat-container">
                <h2>Chat History</h2>
                <section className="chat-logs">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Message</th>
                                <th scope="col">posted on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {this.state.searchData && this.state.searchData.map((item: Message, key: number) => {
                                console.log(key)
                                return(
                                    <tr key= {key}>
                                        <th scope="row">{key + 1}</th>
                                        <td>{item.userName}</td>
                                        <td>{item.content}</td>
                                        <td>{item.postedOn}</td>
                                    </tr>
                                );
                            })} */}
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }
}