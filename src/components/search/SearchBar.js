import React, { Component } from "react";
import API from "../../Api";
import FavouriteMovies from "../FavouriteMovies";
import SearchBarResults from "../search/SearchBarResults";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      error: false,
      movies: [],
      favouriteMovies: [],
      favouriteMoviesId: [],
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
    await API.get(`${this.state.searchQuery}`)
      .then((res) => {
        const movies = res.data.Search;
        this.setState({ movies: movies });
      })
      .catch((error) => {
        console.log(error); 
      });
  };



  nominateMovie(movie) {
    this.setState({
      favouriteMovies: this.state.favouriteMovies.concat([movie]),
      favouriteMoviesId: this.state.favouriteMoviesId.concat([movie.imdbID]),
    });
  }

  removeMovie(index) {
    var tempFavMovies = [...this.state.favouriteMovies];
    if (index !== -1) {
      tempFavMovies.splice(index, 1);
      this.setState({ favouriteMovies: tempFavMovies });
    }
  }

  render() {
    return (
      <div>
        <div class="p-8">
          <div>The Shoppies</div>
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
        <div>
          {this.state.favouriteMovies.length === 5 && (
            <button class="bg-blue-500 hover:bg-blue-700 -mx-2 text-white py-2 px-4 rounded-full">
              Nominated 5!!
            </button>
          )}
        </div>
        {this.state.movies ? (
          <div class="grid grid-rows-2 grid-flow-col gap-4flex justify-start">
            <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 row-start-1 row-end-3  gap-5">
              {this.state.movies.length !== 0 && (
                <SearchBarResults
                  nominateMovie={this.nominateMovie}
                  movies={this.state.movies}
                  favMovies={this.state.favouriteMoviesId}
                />
              )}
            </div>
            <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 row-start-1 row-end-3 gap-5">
              {this.state.favouriteMovies.length !== 0 && (
                <FavouriteMovies
                  removeMovie={this.removeMovie.bind(this)}
                  movies={this.state.favouriteMovies.slice(0, 5)}
                />
              )}
            </div>
          </div>
        ) : (
          <div> ERROR: Please enter a valid movie title! </div>
        )}
      </div>
    );
  }
}
