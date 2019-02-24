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

  handleChange(event){

    this.setState({
      city: event.target.value
    }, () => {
      this.props.handleCity(this.state.city);
    })

    
  }

  /*handleSubmit(event){
    
    event.preventDefault();

    
  }*/
  
  render() {
    
    return (
      
      <div className="location">
        <input type="text" placeholder="Ville" onChange={this.handleChange.bind(this)} value={this.state.city}/>
        <p id="demo"></p>
      </div>
    
    );
  }
}

export default SearchCity;
