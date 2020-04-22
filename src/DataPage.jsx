import * as React from "react";
import API from './API';
import { format } from "date-fns/esm";

export class DataPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getURL = async () => {
        try {
            const a = await API.get('/subscribe', { headers: { "x-test-app-jwt-token": localStorage.getItem('SPAToken') } });
            let socket = new WebSocket(a.data.url);
            this.setState({ url: a.data.url, socket: socket });
        } catch (error) {
            this.props.logout();
        }
    }

    componentDidMount = async () => {
        await this.getURL();
    }


    componentDidUpdate = async () => {
        const { socket } = this.state;
        socket.onopen = () => {
            this.setState({ isConnect: true, error: false });
        }
        socket.onmessage = (message) => {
            this.setState({ date: format(new Date(message.data.substr(15, message.data.length - 16) * 1000), "dd-LL-yy HH:mm:ss") });
        }
        socket.onerror = (error) => {
            this.setState({ errorMessage: error.message, error: true })
            this.getURL();
        }
        socket.onclose = () => {
            this.setState({ isConnect: false });
            this.getURL();
        }
    }

    render() {
        return (
            <div className="data-container">
                <div>
                    WebSoket:
                    <span
                        className={`message ${this.state.isConnect ? "message-connect" : "message-disconnect"}`}
                    >
                        {this.state.isConnect ? "Connected" : "Disconnected"}
                    </span>
                    <div className="time">
                        {this.state.date}
                    </div>
                    {this.state.error &&
                        <div className="error-text">{this.state.errorMessage}</div>
                    }
                </div>
                <button
                    className="btn btn-logout"
                    onClick={() => this.props.logout()}
                >
                    Logout
                </button>
            </div>
        );
    }
}