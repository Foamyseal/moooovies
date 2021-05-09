import React from "react";
import MovieCard from "../cards/MovieCard";

const SearchBarResults = ({ movies }) => { 
    console.log(movies); 
    console.log(movies[0].Title); 
  return (
    <>
      {movies.map((movie, i) => {
        return <MovieCard card={movie} index={i} />;
      })}
    </>

  );
};

export default SearchBarResults;
