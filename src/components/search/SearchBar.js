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
      fullyNominated: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.nominateMovie = this.nominateMovie.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      searchQuery: event.target.value,
    });
  }

  handleEnterKeyDown (e) {
    if(e.keyCode === 13) {
      this.searchMovies(); 
    }
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
    if (this.state.favouriteMovies.length === 5) {
      this.setState((prevState) => ({
        fullyNominated: !prevState.fullyNominated,
      }));
    } else {
      this.setState({
        favouriteMovies: this.state.favouriteMovies.concat([movie]),
        favouriteMoviesId: this.state.favouriteMoviesId.concat([movie.imdbID]),
      });
    }
  }

  removeMovie(index, id) {
    if (this.state.favouriteMovies.length <= 5) {
      this.setState((prevState) => ({
        fullyNominated: prevState.fullyNominated === false,
      }));
    } 
    var tempFavMovies = [...this.state.favouriteMovies];
    var tempFavMovieIds = [...this.state.favouriteMoviesId];
    if (index !== -1) {
      tempFavMovies.splice(index, 1);
      for (var i = 0; i < tempFavMovieIds.length; i++) {
        if (tempFavMovieIds[i] === id) {
          tempFavMovieIds.splice(i, 1);
        }
      }
      this.setState({
        favouriteMovies: tempFavMovies,
        favouriteMoviesId: tempFavMovieIds,
      });
    }
  }

  render() {
    return (
      <div>
        <div class="grid grid-flow-col p-8">
          <div class="text-6xl p-8">The Shoppies</div>
          <div class="max-w-md mt-4">
            <div
              class="bg-white flex items-center rounded-full shadow-xl"
              onSubmit={this.searchMovies}
            >
              <input
                class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
                id="search"
                type="text"
                placeholder="Try 'Batman'"
                value={this.state.searchQuery}
                onChange={this.handleInputChange}
                onKeyDown={(e) => this.handleEnterKeyDown(e)}
              />
              <div class="p-4">
                <button
                  class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-20 h-8 flex items-center justify-center"
                  onClick={this.searchMovies}
                >
                  {" "}
                  search
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
        <div class="grid grid-cols-2 grid-flow-col gap-4flex justify-start">
          {this.state.movies ? (
            <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 col-start-1 col-end-2 gap-5">
              Search Results:
              {this.state.movies.length !== 0 && (
                <SearchBarResults
                  nominateMovie={this.nominateMovie}
                  movies={this.state.movies}
                  favMovies={this.state.favouriteMoviesId}
                />
              )}
            </div>
          ) : (
            <div> ERROR: Please enter a valid movie title! </div>
          )}
          <div class="p-10 grid grid-cols-1 grid-flow-row sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
            <div>
              {this.state.fullyNominated && (
                <button class="bg-blue-500 hover:bg-blue-700 -mx-2 text-white py-2 px-4 rounded-full">
                  Please delete movies off nomination list before adding new ones!
                </button>
              )}
            </div>
            <div class="">
            Nominated:
            </div>
            {this.state.favouriteMovies.length !== 0 && (
              <FavouriteMovies
                removeMovie={this.removeMovie.bind(this)}
                movies={this.state.favouriteMovies.slice(0, 5)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
