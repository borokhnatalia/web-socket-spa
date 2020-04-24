import * as React from "react";
import LoadingBar from "./Loading";
import LoginInput from "./LoginInput";

export default class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    handleChangeInput = (e) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    }

    handleKeyPress = (e) => {
        if (e.keyCode === 13 && e.currentTarget.name==="password") {
            this.props.handleCheckLogin(this.state.username, this.state.password);
        }
    }

    render() {
        const { username, password } = this.state;
        return (
            <div className="login-container">
                <div className="login-input-container">
                    <LoginInput
                        error={this.state.error}
                        field="Username"
                        type="text"
                        value={this.state.username}
                        handleKeyPress={this.handleKeyPress}
                        handleChangeInput={this.handleChangeInput} />
                    <LoginInput
                        error={this.state.error}
                        field="Password"
                        type="password"
                        value={this.state.password}
                        handleKeyPress={this.handleKeyPress}
                        handleChangeInput={this.handleChangeInput} />
                    {this.props.error && <div className="error-text">{this.props.errorMessage}</div>}
                </div>
                <button
                    className="btn btn-login"
                    disabled={!username || !password || this.props.isLoading}
                    onClick={() => this.props.handleCheckLogin(username, password)}
                >
                    Login
                </button>
                <div className="loading-container">
                    <LoadingBar visible={this.props.isLoading} />
                </div>
            </div>
        );
    }
}