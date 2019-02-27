import React, { Component } from 'react';
import './App.css';
import Location from './components/location.js';
import Category from './components/listCategory.js';
import SearchCity from './components/searchPerCity.js';
import LoginFacebook from './components/loginFacebook.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  
  constructor(props){
    
    super(props);

    this.state = {
      city: '',
      id_category: '',
      profilNav: [],
    }
  }

  //Envoi de l'id de la catégorie du component "Category" vers le component "Location"

  sendIdCategory(event){
    this.setState({
      id_category: event
    })
  }

  //Récéption des données Facebook du component "LoginFacebook"

  getProfilFacebook(event){

    this.setState({
      profilNav: event
    })
  }

  //Envoi de la ville du component "SearchCity" vers le component "Location"

  sendCity(event){
    this.setState({
      city: event
    })
  }

  handleClick(event){
    
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
      
        <h1>My Events</h1>
          <ul className="header">
            <li>
              <a onClick={this.handleClick.bind(this)} id='profil' href="/">
                <img src={this.state.profilNav.picture} />
                {this.state.profilNav.name}
              </a>
            </li>
          </ul>
          <div className="location">
          <LoginFacebook handleProfil={this.getProfilFacebook.bind(this)} />
          <Category handleCategory={this.sendIdCategory.bind(this)} />
          <SearchCity handleCity={this.sendCity.bind(this)} />
          <Location dataProfil={this.state.infoProfil} idCategory={this.state.id_category} dataCity={this.state.city} />
          </div>
      </div>
    );
  }
}

export default App;
