import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import FacebookLogin from 'react-facebook-login';


class LoginFacebook extends Component {

  constructor(props){
    
    super(props);

    this.state = {

      isLoggedIn: false,
      userID: '',
      name: '',
      email: '',
      picture: ''
    }

  }

  responseFacebook = response => {

    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    })

    var data = {
      id_user: this.state.userID,
      name: this.state.name,
      email: this.state.email,
      picture: this.state.picture
    }

    axios.post("http://localhost:5000/user_connect", { data });
    console.log(response);
  }

  componentClicked = () => console.log("clicked");
  
  render() {

    let fbContent;

    if(this.state.isLoggedIn){
      fbContent = null;
    }

    else{
      fbContent = (<FacebookLogin
        appId="2084174285030037"
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.componentClicked.bind(this)}
        callback={this.responseFacebook.bind(this)} />);
    }
    
    return (
      
      <div>{fbContent}</div>
    
    );
  }
}

export default LoginFacebook;
