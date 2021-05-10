import React, { Component } from "react";
import API from "../../Api";
import FavouriteMovies from "../nominations/FavouriteMovies";
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

  handleEnterKeyDown(e) {
    if (e.keyCode === 13) {
      this.searchMovies();
    }
  }

  searchMovies = async () => {
    try {
    await API.get(`${this.state.searchQuery}`)
      .then((res) => {
        const movies = res.data.Search;
        this.setState({ movies: movies });
      })
    } catch(e) {
      console.log(e); 
    }
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
    var tempFavMovies = [...this.state.favouriteMovies];
    var tempFavMovieIds = [...this.state.favouriteMoviesId];
    if (index !== -1) {
      tempFavMovies.splice(index, 1);
      for (var i = 0; i < tempFavMovieIds.length; i++) {
        if (tempFavMovieIds[i] === id) {
          tempFavMovieIds.splice(i, 1);
        }
      }
      if (this.state.favouriteMovies.length === 5) {
        this.setState((prevState) => ({
          fullyNominated: prevState.fullyNominated === false,
        }));
      }
      this.setState({
        favouriteMovies: tempFavMovies,
        favouriteMoviesId: tempFavMovieIds,
      });
    }
  }

  sucessfulNominations() {
    if(this.state.favouriteMovies.length === 5) {
      window.scrollTo(0,0); 
      return true; 
    }
  }

  render() {
    return (
      <div>
        <div class="grid grid-cols-2 grid-flow-col p-8 md:grid-cols-1">
          <div class="text-6xl p-8">The Shoppies</div>
          <div class="max-w-md mt-8 mr-12 justify-end">
            <div
              class="bg-white flex items-center rounded-full shadow-xl w-full"
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
                  class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-10 h-8 flex items-center justify-center"
                  onClick={this.searchMovies}
                >
                  {" "}
                  💖
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {this.sucessfulNominations() && (
            <div class="bg-green-500 -mx-2 ml-12 p-10 text-white py-2 w-1/2 px-4 rounded-full justify-center">
              Succesfully nominated 5 movies!! Take a screenshot or something :)
            </div>
          )}
        </div>
        <div>
              {this.state.fullyNominated && (
                <div class="bg-red-500 -mx-2 ml-12 p-10 text-white py-2 w-1/2 px-4 rounded-full">
                  Please delete movies off nomination list before adding new ones!
                </div>
              )}
            </div>
        <div class="grid grid-cols-2 grid-flow-col gap-4flex justify-start">
            <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 col-start-1 col-end-2 gap-5">
              Search Results:
              {this.state.movies ? (
              <>
              {this.state.movies.length !== 0 ? (
                <SearchBarResults
                  nominateMovie={this.nominateMovie}
                  movies={this.state.movies}
                  favMovies={this.state.favouriteMoviesId}
                />
              ) : (
                <div class="text-gray-400">Search something!!</div>
              )}
              </>
              ) : (
                <div class="text-red-500" >ERROR: Please enter a valid movie title! That one wasn't one :( </div>
                )
                }
            </div>
          <div class="container">
            <div class="p-10 grid grid-cols-1 grid-flow-row sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
              <div>Nominated:</div>
              {this.state.favouriteMovies.length !== 0 ? (
                <FavouriteMovies
                  removeMovie={this.removeMovie.bind(this)}
                  movies={this.state.favouriteMovies.slice(0, 5)}
                />
              ) : (
                <div class="text-gray-400">
                  {" "}
                  You have no current nominations! Search for a movie and
                  nominate!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
