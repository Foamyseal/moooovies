import React from "react";
import MovieCard from "../cards/MovieCard";

const SearchBarResults = ({ movies, nominateMovie}) => { 
  return (
    <>
      {movies.map((movie, i) => {
        return <MovieCard  card={movie} key={i} nominateMovie={nominateMovie}/>;
      })}
    </>

  );
};

export default SearchBarResults;
