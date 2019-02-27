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
        singleEvent: [],
        profil: []
    }

    this.showPosition = this.showPosition.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }
  
  getLocation(position) {

    //Récupération des événements par ville et catégories

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

      //Récupération des événements par géolocalisation et catégories

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

  //Récupère la position actuelle

  showPosition() {
    navigator.geolocation.getCurrentPosition(this.getLocation);

    this.setState({
      singleEvent: []
    })
  }

  //Choisir un événements avec son id

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
        <div class="col col-lg-2">
          <button class="btn btn-primary" id="search" onClick={this.showPosition}>Chercher</button>
        </div>
        <p id="demo"></p>
        {      
          //Listing des événements

          this.state.events.map((events, index) =>
              <li className="border rounded" key={index} id="connect">
                <div className='row'>
                <h2>{events.name.text}</h2>
                {events.description.text === null ? '' :<div><p id="desc">{events.description.text.substring(0, 200)+"...Lire la suite..."}</p></div>}
                {events.logo === null ? '' : <div className="col-6"><img src={events.logo.url} /></div> }
                
                
                </div> <button class="btn btn-warning" id={events.id} onClick={this.handleClick.bind(this)}>En savoir +</button>
              </li>
          )
        }
        {      
          //Affichage d'un seul événement
            
          this.state.singleEvent.map((events, index) =>
              <li key={index} id="connect">
                <h2>{events.name.text}</h2> 
                <p>{events.description.text}</p>
                {events.logo === null ? '' : <img src={events.logo.url} /> }
                <button class="btn btn-warning" id={events.id} onClick={this.handleClick.bind(this)}>En savoir +</button>
              </li>
          )
        }
      </div>
    
    );
  }
}

export default Location;
