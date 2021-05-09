import React from "react";

const MovieCard = (props) => {

  function handleSubmit() {
    props.nominateMovie(props.card); 
  }

    return (
      <div key={props.id} class="shadow-lg flex flex-wrap max-w-md lg:w-4/5 mx-auto">
        <div
          class="bg-cover bg-bottom border w-full md:w-1/3 h-64 md:h-auto relative"
          style={{backgroundImage: `url(${props.card.Poster})`}} title="Movie Image"
        >
          <div class="absolute text-xl">
            <i class="fa fa-heart text-white hover:text-red-light ml-4 mt-4 cursor-pointer"></i>
          </div>
        </div>

        <div class="bg-white w-full md:w-2/3">
          <div class="h-full mx-auto px-6 md:px-0 md:pt-6 md:-ml-6 relative w-full">
            <div class="bg-white lg:h-full p-6 -mt-6 md:mt-0 relative mb-4 md:mb-0 flex flex-wrap md:flex-wrap items-center">
              <div class="w-full lg:border-right lg:border-solid text-center md:text-left">
                <h3>{props.card.Title}</h3>
                <p class="mb-0 mt-3 text-grey-dark text-sm italic">
                  {props.card.Year}
                </p>
                <hr class="w-1/4 md:ml-0 mt-4  border lg:hidden" />
              </div>
              <div class="w-full lg:w-3/5 lg:px-3">
                <p class="text-md mt-4 lg:mt-0 text-justify md:text-left text-sm">
                    {props.card.description}
                </p>
              </div>
              <div class="w-full lg:w-1/5 mt-6 lg:mt-0 lg:px-4 text-center md:text-left">
                <button class="bg-blue-500 hover:bg-blue-700 -mx-2 text-white py-2 px-4 rounded-full" onClick={handleSubmit} >
                  Nominate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default MovieCard; 