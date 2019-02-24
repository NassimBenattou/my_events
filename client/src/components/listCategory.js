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

  handleChange(event){
    
    this.setState({value: event.target.value}, () => {

      this.props.handleCategory(this.state.value);
    })
  }

  render() {
    return (
      <div className="category">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="">Catégories</option>
          {        
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
