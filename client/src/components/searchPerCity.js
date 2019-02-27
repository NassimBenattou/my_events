import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';


class SearchCity extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      eventsSearch: [],
      city: ''
    }
  }

  //Récupère la ville entrée et l'envoie vers le parent "App.js"

  handleChange(event){

    this.setState({
      city: event.target.value
    }, () => {
      this.props.handleCity(this.state.city);
    })

    
  }

  render() {
    
    return (
      
      <div id="city" class="col col-lg-2">
        <input class="form-control" type="text" placeholder="Ville" onChange={this.handleChange.bind(this)} value={this.state.city}/>
      </div>
    
    );
  }
}

export default SearchCity;
