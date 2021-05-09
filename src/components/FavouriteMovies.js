import React from 'react';
import NominatedMovieCard from "./cards/NominatedMovieCard";


const FavouriteMovies = ({ movies, removeMovie }) => {

    return (
        <>
        {movies.map((movie, index) => {
          return <NominatedMovieCard card={movie} key={index} id={index} removeMovie={removeMovie} />;
        })}
      </>
    )
}

export default FavouriteMovies; 