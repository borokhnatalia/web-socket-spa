import React from 'react';
import { LogIn } from './LogIn';
import API from './API';
import { DataPage } from "./DataPage";
import './Style.scss';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: localStorage.getItem('SPAToken') ? true : false
    };
  }


  handleCheckLogin = async (username, password) => {
    for (let i = 0; i < 4; i++) {
      try {
        const res = await API.post('/login', {
          username, password
        });
        localStorage.setItem("SPAToken", res.headers["x-test-app-jwt-token"]);
        this.setState({ isLogin: true, error: false });
        i = 4;
      } catch (error) {
        if (error.message.includes('401')) {
          this.setState({ error: true, errorMessage:"Wrong username or password" });
        }else if(i===3){
          this.setState({errorMessage:"Server error. Please try again late", error:true});
        }
      }
    }
  }

  handleLogout = async () => {
    localStorage.removeItem("SPAToken");
    this.setState({ isLogin: false });
  }

  render() {
    return (
      <div className="App" >
        {this.state.isLogin ?
          <DataPage
            logout={this.handleLogout}
          />
          :
          <LogIn
            error={this.state.error}
            errorMessage={this.state.errorMessage}
            handleCheckLogin={this.handleCheckLogin}
          />
        }

      </div>
    )
  }
}