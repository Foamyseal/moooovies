import React, { Component } from "react";
import API from "../../Api";

export default class SearchBar extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            searchQuery: "",
            movies: [],
          };
        this.handleInputChange = this.handleInputChange.bind(this); 
    }


  handleInputChange(event) {
      this.setState({
          searchQuery: event.target.value,
      })
  }

  render() {
    const searchMovies = async () => {
      try {
        await API.get(`${this.state.searchQuery}`).then((res) => {
          const movies = res.data;
          console.log(res.data);
          this.setState({ movies });
          console.log(movies); 
        });
      } catch(err) {
          console.log(err)
      }
    };
    return (
        <div>
        <form>
            <input type="text" id="filter" placeholder="Search for your fav movie <3 ..." value={this.state.searchQuery} onChange={this.handleInputChange}/>
        </form>
        <button onClick={searchMovies}> cheese </button>
        </div>
    )

  }
}
