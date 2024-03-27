import  {React, useEffect, useState} from 'react';
import useFavorites from './useFavorites';
import { FaTrashAlt } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import AudioPlayer from './Audioplayer';

const Favorites = () => {
  const { favoriteEpisodes, toggleFavorite } = useFavorites();
  const [selectedEpisode, setSelectedEpisode] = useState('');
  const [favs, setFavs] = useState([])
  let navigate = useNavigate()

  console.log("Favorite Episodes:", favoriteEpisodes);

  const location = useLocation();

  const { episodeData, showData, selectedSeason } = location.state || {};

  if (!favoriteEpisodes || favoriteEpisodes.length === 0) {
    return <div>No favorite episodes yet.</div>;
  }

console.log("Show data:", showData)
    
const handleEpisodeClick = (episode) => {
  setSelectedEpisode(episode);
};


const handleRemoveToggle = (episode, index) => {
  toggleFavorite(episode, index, showData, selectedSeason);
};

const handleBack = () => {
  navigate(-1); // Navigate back to the previous page
};

const filters = <div>
<select id="filters" >
     <option value="">Filters all</option>
     <option value="All" >All shows</option>
     <option value="AtoZ">A - Z</option>
     <option value="ZtoA">Z - A</option>
     <option value="Latest">Latest shows</option>
     <option value="Oldest">Oldest shows</option>
</select>
            </div> 

console.log("Filters:" , filters)
  return (
    <div>
      <h2>Favorite Episodes</h2>
      <button onClick={handleBack}>Back</button>
      <div>{filters}</div>
      <ul>
      {favoriteEpisodes.map(episode => (
  <li key={episode.title}>
      <h3>{episode.title}</h3>
      <button onClick={() => handleRemoveToggle(episode, showData, selectedSeason)}>Remove from Favorites</button>
      <img src={showData.image} width="100px"/>
      <p>Added: {new Date(episode.timestamp).toLocaleString()}</p>
      <p>Description: {episode.description}</p>
      <h4>Show: {showData.title}</h4>
      <h4>Season: {selectedSeason}</h4>
      <p>Episode Number: {episode.episode}</p>
      <p>Genre: {showData.genres}</p>
      <button onClick={() => handleEpisodeClick(episode)} >Play</button>
  </li>
))}
      </ul>
      {selectedEpisode && <AudioPlayer episode={selectedEpisode} />}
    </div>
  );
};

export default Favorites;


