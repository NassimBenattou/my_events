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

    var url = "http://localhost:5000/user-connect"

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

    //Envoi des données facebook vers le back pour insérer en bdd et les envoient vers le parent "App.js"

    axios.post(url, {data});

    this.props.handleProfil(data);
  }

  componentClicked = () => console.log("clicked");
  
  render() {

    let fbContent;

    ///Affichage du bouton login si vous êtes connecté

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
      
      //Bouton login

      <div>{fbContent}</div>
    
    );
  }
}

export default LoginFacebook;
