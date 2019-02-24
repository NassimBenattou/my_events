import React, { Component } from 'react';
import './App.css';
import Location from './components/location.js';
import Category from './components/listCategory.js';
import SearchCity from './components/searchPerCity.js';
import LoginFacebook from './components/loginFacebook.js';



class App extends Component {
  
  constructor(props){
    
    super(props);

    this.state = {
      city: '',
      id_category: '',
    }
  }

  sendIdCategory(event){
    this.setState({
      id_category: event
    })
  }

  sendCity(event){
    this.setState({
      city: event
    })
  }

  render() {
    return (
      <div className="App">
      
        <h1>My Events</h1>
          <ul className="header">
            <li><a href="/">Home</a></li>
          </ul>
          <div className="location">
          <LoginFacebook />
          <Category handleCategory={this.sendIdCategory.bind(this)} />
          <SearchCity handleCity={this.sendCity.bind(this)} />
          <Location idCategory={this.state.id_category} dataCity={this.state.city} />
          </div>
      </div>
    );
  }
}

export default App;
