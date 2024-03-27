// import React, { createContext, useContext, useState } from 'react';

// export const FavoritesContext = createContext();

// export const FavoritesProvider = ({ children }) => {
//   const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

// const toggleFavorite = (episode, showData, selectedSeason) => {
//   const timestamp = new Date().toISOString(); // Get the current timestamp

//   const isFavorite = favoriteEpisodes.some(favorite => favorite.title === episode.title);
//   if (isFavorite) {
//     setFavoriteEpisodes(favoriteEpisodes.filter(favorite => favorite.title !== episode.title));
//   } else {
//     // Include timestamp when adding a new favorite episode
//     setFavoriteEpisodes([...favoriteEpisodes, { ...episode, showData, selectedSeason, timestamp }]);
//   }
// };


//   return (
//     <FavoritesContext.Provider value={{ favoriteEpisodes, toggleFavorite }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

//export default FavoritesProvider 

import { useState, createContext, useEffect } from 'react';

// Create a context for managing favorites
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Initialize state for favorite episodes
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  // Load favorites from local storage when component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavoriteEpisodes(storedFavorites);
    }
  }, []);

  // Update favorites in state and local storage when toggling
  const toggleFavorite = (episode, showData, selectedSeason) => {
    const timestamp = new Date().toISOString(); // Get the current timestamp

    const isFavorite = favoriteEpisodes.some(favorite => favorite.title === episode.title);
    if (isFavorite) {
      const updatedFavorites = favoriteEpisodes.filter(favorite => favorite.title !== episode.title);
      setFavoriteEpisodes(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const newFavorite = { ...episode, showData, selectedSeason, timestamp };
      const updatedFavorites = [...favoriteEpisodes, newFavorite];
      setFavoriteEpisodes(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };
  

  return (
    <FavoritesContext.Provider value={{ favoriteEpisodes, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider


