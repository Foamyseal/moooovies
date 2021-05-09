import React from "react";
import MovieCard from "../cards/MovieCard";

const SearchBarResults = ({ movies, nominateMovie, favMovies }) => {
    // console.log(favMovies); 
  return (
    <>
      {movies.map((movie, index) => {
        return (
          <MovieCard
            card={movie}
            key={index}
            id={index}
            nominateMovie={nominateMovie}
            favMoviesId={favMovies}
          />
        );
      })}
    </>
  );
};

export default SearchBarResults;
