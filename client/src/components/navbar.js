import React, { Component } from 'react';
import '../App.css';

class Navbar extends Component {
  
    render(){
        return(
            <div>
                <h1>My Events</h1>
                <ul className="header">
                <li><a href="/">Home</a></li>
                </ul>
                <div className="location">
                
                </div>
            </div>
        )
    }
}

export default Navbar;
