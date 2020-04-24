import React from 'react';
import LogIn from './components/LogIn';
import API from './api';
import DataPage from "./components/DataPage";
import './style.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('SPAToken'),
      isLoading: false,
      error: false,
      errorMessage: "",
      loginTry: 0
    };
  }

  handleCheckLogin = async (username, password) => {
    this.setState({ isLoading: true })
    try {
      const res = await API.post('/login', {
        username, password
      });
      localStorage.setItem("SPAToken", res.headers["x-test-app-jwt-token"]);
      this.setState({ token: res.headers["x-test-app-jwt-token"], error: false, isLoading: false, loginTry: 0 });
    } catch (error) {
      if (error.message.includes('500')) {
        if (this.state.loginTry < 3) {
          this.setState({ isLoading: true, loginTry: this.state.loginTry + 1 });
          this.handleCheckLogin(username, password);
        } else {
          this.setState({ errorMessage: error.response.data.description, error: true, isLoading: false, loginTry: 0 });
        }
      } else {
        this.setState({ error: true, errorMessage: error.response.data.description, isLoading: false, loginTry: 0 });
      }
    }
  }

  handleLogout = () => {
    localStorage.removeItem("SPAToken");
    this.setState({ token: null });
  }

  render() {
    return (
      <div className="App" >
        {this.state.token ?
          <DataPage
            logout={this.handleLogout}
            token={this.state.token}
          />
          :
          <LogIn
            error={this.state.error}
            errorMessage={this.state.errorMessage}
            handleCheckLogin={this.handleCheckLogin}
            isLoading={this.state.isLoading}
          />
        }

      </div>
    )
  }
}