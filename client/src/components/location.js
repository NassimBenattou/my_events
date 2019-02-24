import React, { Component } from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import '../App.css';


class Location extends Component {

  constructor(props){
    
    super(props);

    this.state = {
        latitude: '',
        longitude: '',
        events: [],
        id_events: '',
        singleEvent: []
    }

    this.showPosition = this.showPosition.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }
  
  getLocation(position) {

    if (navigator.geolocation) {

      if(this.props.dataCity){
        
        console.log(this.props.dataCity);
        var url = "https://www.eventbriteapi.com/v3/events/search?token=Y32PY3YKFBEXGAB5IZVR&q="+this.props.dataCity+"&categories="+this.props.idCategory;
        axios.get(url)
        .then(response =>  {

          this.setState({
            events: [],
          });

          for(var i = 0; i < response.data.events.length; i++){

            this.setState({
              events: [...this.state.events, response.data.events[i]],
            })
          }
        })
      }

      else{
        
        var url = "https://www.eventbriteapi.com/v3/events/search?token=Y32PY3YKFBEXGAB5IZVR&location.latitude="+position.coords.latitude+"&location.longitude="+position.coords.longitude+"&categories="+this.props.idCategory

        axios.get(url)
        .then(response =>  {

          this.setState({
            
            events: []
          });

          for(var i = 0; i < response.data.events.length; i++){

            this.setState({
              events: [...this.state.events, response.data.events[i]]
            })
          }
        })
      }
    } 
  }

  showPosition() {
    navigator.geolocation.getCurrentPosition(this.getLocation);

    this.setState({
      singleEvent: []
    })
  }

  handleClick(event){

    event.preventDefault();
    
    this.setState({id_events: event.target.id}, () => {
      
      this.setState({
        events: []
      })

      var url = "https://www.eventbriteapi.com/v3/events/"+this.state.id_events+"?token=Y32PY3YKFBEXGAB5IZVR";

      axios.get(url)
      .then(response => {

        this.setState({
          singleEvent: [],
        })

        this.setState({
          singleEvent: [...this.state.singleEvent, response.data]
        }, () => {
          console.log(this.state.singleEvent)
        })
      })

      
    })
  }

  render() {
    
    return (
      
      <div className="location">
        <p>Trouvez des événements autour de chez vous</p>
        <button onClick={this.showPosition}>Chercher</button>
      
        <p id="demo"></p>
        {        
          this.state.events.map((events, index) =>
              <li key={index} value='test' id="connect">
                <h2>{events.name.text}</h2> 
                <p>{events.description.text.substring(0, 200)+"..."}</p>
                {events.logo === null ? '' : <img src={events.logo.url} /> }
                <button id={events.id} onClick={this.handleClick.bind(this)}>En savoir +</button>
              </li>
          )
        }
        {        
          this.state.singleEvent.map((events, index) =>
              <li key={index} value='test' id="connect">
                <h2>{events.name.text}</h2> 
                <p>{events.description.text}</p>
                {events.logo === null ? '' : <img src={events.logo.url} /> }
                <button id={events.id} onClick={this.handleClick.bind(this)}>En savoir +</button>
              </li>
          )
        }
        
        
      </div>
    
    );
  }
}

export default Location;
