
import React, { Component } from "react";
import API from "../../Api";
import FavouriteMovies from "../FavouriteMovies";
import SearchBarResults from "../search/SearchBarResults";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      loading: false,
      movies: [],
      favouriteMovies: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.nominateMovie = this.nominateMovie.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      searchQuery: event.target.value,
    });
  }

  searchMovies = async () => {
    try {
      this.setState({ loading: true });
      await API.get(`${this.state.searchQuery}`).then((res) => {
        const movies = res.data.Search;
        this.setState({ movies: movies, loading: false });
      });
    } catch (err) {
      console.log(err);
    }
  };

  nominateMovie(movie) {
    console.log(movie); 
    this.setState({
      favouriteMovies: this.state.favouriteMovies.concat([movie]),
    });
    console.log(this.state.favouriteMovies); 
    console.log("ran"); 
  }

  removeMovie(event, movie) {
    this.setState({
      favouriteMovies: [...this.state.favouriteMovies, movie],
    });
    event.preventDefault();
  }

  render() {
    console.log(this.state.movies);
    return (
      <div>
        <div class="p-8">
          <div class="max-w-md">
            <div
              class="bg-white flex items-center rounded-full shadow-xl"
              onSubmit={this.searchMovies}
            >
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
                  class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
                  onClick={this.searchMovies}
                >
                  {" "}
                  b
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-5">
          {this.state.movies.length !== 0 && (
            <SearchBarResults
              nominateMovie={this.nominateMovie}
              movies={this.state.movies}
            />
          )}
        </div>
        <div>
          {this.state.favouriteMovies.length !== 0 && (
            <FavouriteMovies
              nominateMovie={this.nominateMovie.bind(this)}
              movies={this.state.favouriteMovies}
            />
          )}
        </div>
      </div>
    );
  }
}