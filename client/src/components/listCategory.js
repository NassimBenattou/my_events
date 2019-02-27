import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';


class Category extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      value: '',
      categories: [],
      eventsCategory: [],
    }

    this.handleChange = this.handleChange.bind(this);
  }

  //Récupération de la liste des catégories

  componentDidMount(){

    var url = "https://www.eventbriteapi.com/v3/categories/?token=Y32PY3YKFBEXGAB5IZVR";

    axios.get(url)
    .then(response => {
        
        for(var i = 0; i < response.data.categories.length; i++){

          this.setState({
              categories: [...this.state.categories, response.data.categories[i]]
          })
        }
    })
  }

  //Récupère l'id de la catégorie séléctionnée et l'envoi vers le parent "App.js"

  handleChange(event){
    
    this.setState({value: event.target.value}, () => {

      this.props.handleCategory(this.state.value);
    })
  }

  render() {
    return (
      <div id="list-category" class="col col-lg-2">
        <select class="form-control" value={this.state.value} onChange={this.handleChange}>
          <option value="">Catégories</option>
          {        
            //Listing des catégories

            this.state.categories.map((categories, index) =>
              <option key={index} value={categories.id}>{categories.name}</option>
            )
          }
        </select>
      </div>
    );
  }
}

export default Category;
