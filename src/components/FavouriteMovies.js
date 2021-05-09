import React from 'react';
import NominatedMovieCard from "./cards/NominatedMovieCard";


const FavouriteMovies = ({ movies, nominateMovie }) => {

    return (
        <>
        {movies.map((movie, i) => {
          return <NominatedMovieCard card={movie} key={i} nominate={nominateMovie} />;
        })}
      </>
    )
}

export default FavouriteMovies; 