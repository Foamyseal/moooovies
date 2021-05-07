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
    });
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
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <div>
        <div class="p-8">
          <div class="bg-white flex items-center rounded-full shadow-xl">
            <input
              class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
              id="search"
              type="text"
              placeholder="Search for your fav movie <3 ..."
              value={this.state.searchQuery}
              onChange={this.handleInputChange}
            />

            <div class="p-4">
              <button
                lass="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
                onClick={searchMovies}
              >
                {" "}
                enter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
