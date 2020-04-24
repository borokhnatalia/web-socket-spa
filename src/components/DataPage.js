import * as React from "react";
import API from '../api';
import { format } from "date-fns/esm";

export default class DataPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnect: false,
            error: false,
            errorMessage: ""
        };
    }

    componentDidMount = () => {
        this.connectSoket();
    }

    // componentWillUnmount = () => {
    //     socket.close();
    // }

    connectSoket = async () => {
        try {
            const subscribeRes = await API.get('/subscribe', { headers: { "x-test-app-jwt-token": this.props.token } });
            const socket = new WebSocket(subscribeRes.data.url);
            socket.onopen = () => {
                this.setState({ isConnect: true, error: false });
            }
            socket.onmessage = (message) => {
                try {
                    const newDate = format(new Date(JSON.parse(message.data)["server_time"]  * 1000), "dd-LL-yy HH:mm:ss");
                    this.setState({ date: newDate });
                } catch (error) {
                    this.setState({ errorMessage: error.description, error: true });
                }
            }
            socket.onerror = (error) => {
                this.setState({ errorMessage: error.description, error: true });
                this.connectSoket();
            }
            socket.onclose = () => {
                this.setState({ isConnect: false });
                this.connectSoket();
            }
        } catch (error) {
            this.props.logout();
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