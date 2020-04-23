import * as React from "react";

export default class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    handleChangeInput = (e) => {
        this.setState({ [e.currentTarget.id]: e.currentTarget.value });
    }

    handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            this.props.handleCheckLogin(this.state.username, this.state.password);
        }
    }

    render() {
        const { username, password } = this.state;
        return (
            <div className="login-container">
                <div className="login-input-container">
                    <div className="input-container">
                        <label>Username</label>
                        <input
                            className={this.props.error ? "input-error" : ""}
                            type="text"
                            placeholder="user name"
                            value={username}
                            onChange={this.handleChangeInput}
                            id="username" />
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input
                            className={this.props.error ? "input-error" : ""}
                            type="password"
                            placeholder="password"
                            value={password}
                            onKeyDown={this.handleKeyPress}
                            onChange={this.handleChangeInput}
                            id="password" />
                    </div>
                    {this.props.error && <div className="error-text">{this.props.errorMessage}</div>}
                </div>
                <button
                    className="btn btn-login"
                    disabled={!username || !password}
                    onClick={() => this.props.handleCheckLogin(username, password)}
                >
                    Login
                </button>
            </div>
        );
    }
}