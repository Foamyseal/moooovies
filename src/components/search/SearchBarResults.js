import React from "react";
import MovieCard from "../cards/MovieCard";

const SearchBarResults = ({ movies, nominateMovie}) => { 
  return (
    <>
      {movies.map((movie, index) => {
        return <MovieCard  card={movie} key={index} id={index} nominateMovie={nominateMovie}/>;
      })}
    </>

  );
};

export default SearchBarResults;
