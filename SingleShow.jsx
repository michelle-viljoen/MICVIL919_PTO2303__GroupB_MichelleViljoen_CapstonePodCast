import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
//import { supabase } from '@supabase/auth-ui-shared';
import  useFavorites from './useFavorites';
import FavoritesCard from './FavoritesCard';
import Favorites from './Favorites';
import AudioPlayer from './Audioplayer';



const SingleShow = ({episodeData, podcastData, filters}) => {
    let navigate = useNavigate()
    const { id } = useParams();
    const [showData, setShowData] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState('');
    const [selectedSeasonEpisodes, setSelectedSeasonEpisodes] = useState([]);
    const [favorite, setFavorite] = useState(false)
    const { favoriteEpisodes, toggleFavorite } = useFavorites();

    useEffect(() => {
        // Check if the current episode is already in favorites
        setFavorite(favoriteEpisodes.includes(id));
    }, [favoriteEpisodes, id]);

  //   const handleFavoriteToggle = () => {
  //     // Toggle favorite status
  //     setFavorite(!favorite);
  //     toggleFavorite(episodeData, showData, selectedSeason);
  // };
    
    const EpisodesList = ({ episodes, onSelectEpisode}) => {
      const { favoriteEpisodes, toggleFavorite } = useFavorites();
      
      const handleFavoriteToggle = (episode, index) => {
        toggleFavorite(episode, index, showData, selectedSeason);
      };
    
      return (
        <div>
          <h3>Episodes ({episodes.length}):</h3>
          <ol>
            {episodes.map((episode, index) => (
              <li key={`${episode.title}-${index}`}>
                <button onClick={() => handleFavoriteToggle(episode, index, showData, selectedSeason)}>
                  {/* {favoriteEpisodes.includes(episode) ? 'Unfavorite' : 'Favorite'} */}
                  {favoriteEpisodes.some(favEpisode => favEpisode.title === episode.title) ? 'Unfavorite' : 'Favorite'}
                </button>
                <h4>{episode.title}</h4>
                <p>{episode.description}</p>
                
                {/* <audio controls>
                  <source src={episode.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio> */}
                <button  onClick={() => onSelectEpisode(episode)}>Play Audio</button>
              </li>
            ))}
          </ol>
        </div>
      );
    };

    const EpisodesListRender = ({ episodes }) => {
      const [selectedEpisode, setSelectedEpisode] = useState('');
    
      const handleEpisodeClick = (episode) => {
        setSelectedEpisode(episode);
      };
    console.log('Selected episode:', selectedEpisode)

      return (
        <div>
          <EpisodesList episodes={episodes} onSelectEpisode={handleEpisodeClick} />
          <AudioPlayer episode={selectedEpisode} />
        </div>
      );
    };

    

const SeasonsList = ({ seasons, selectedSeason, onSeasonChange }) => {
  const handleSeasonClick = (season) => {
    onSeasonChange(season.title);
  };

  return (
    <div>
      <h3>Select a season:</h3>
      <ul >
       
        {seasons.map(season => (
          <li key={season.title}  onClick={() => handleSeasonClick(season)}>
             <button >
            <img src={season.image} alt={season.title} style={{ width: '50px', marginRight: '10px' }} value={selectedSeason} />
           
            {season.title}
            </button>
          </li>
        
        ))}
        
      </ul>
    </div>
  );
};

    const handleHomeClick = () => {
        navigate('/homepage')
    }

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then(res => res.json())
            .then(data => {
                setShowData(data);
            })
            .catch(error => {
                console.error('Error fetching show data:', error);
            });
    }, [id]);

    useEffect(() => {
        if (showData && selectedSeason) {
            const season = showData.seasons.find(season => season.title === selectedSeason);
            if (season) {
                setSelectedSeasonEpisodes(season.episodes);
            }
        }
    }, [showData, selectedSeason]);

    const handleSeasonChange = (seasonTitle) => {
        setSelectedSeason(seasonTitle);
    };

    if (!showData) {
        return <div>Loading...</div>;
    }

    const handleFav = () => {
        // Toggle favorite status
        setFavorite(!favorite);
    
        toggleFavorite(id);
    };
    
        
    const collapseEpisodes = () => {
        setSelectedSeason(false)
    }
  
  const handleFavClicks = () => {
    if (!showData || !selectedSeason) {
      alert("Show data or selected season is not available yet.");
      // Optionally, you can show a loading indicator or return early
      return;
    }
    navigate("/favorites", {
      state: { episodeData, showData, selectedSeason }
    });
  };
  
  

    console.log("Show data:", showData)
    console.log("Selected season:", selectedSeason)
    console.log("Selected episode:", selectedSeasonEpisodes)
    console.log("Fav episodes:", favorite)
    console.log("Episode data:" , episodeData)
    console.log("Podcast data:", podcastData)

    const renderFavs = () => {
      if (showData.length > 0 && podcastData.length > 0) {
          return <Favorites episodeData={episodeData} podcastData={podcastData} showData={showData} filters={filters}/>;
      }
      // Return a loading indicator or null if data is not ready
      return null;
  };


    return (
        <div>
            <header className="home__header">
            <img src=".\src\images\3.png" width="100px" className="logoImage" />
           
           <div className="top__buttons">
            <button onClick={handleHomeClick}>Home</button>
            {/* <button onClick={handleFavClicks}>Favourites</button> */}
            <button onClick={() => handleFavClicks({ episodeData, showData, selectedSeason })}>Favourites</button>
           </div>
           </header>
           <div className="singleshow__content">
            <h2 onClick={collapseEpisodes} className="single__title">{showData.title}</h2>
           { favorite ? <MdFavorite onClick={() => handleFav()} /> : <MdFavoriteBorder onClick={() => handleFav()} /> }

            <img className='preview__image' src={showData.image} width="150px"/>
            <p className='preview__updated'>Last updated: {new Date(showData.updated).toDateString()}</p>
            <p className='preview__genres'>{showData.genres.join(', ')} </p>
            <p>{showData.description}</p>
                     <SeasonsList
                    seasons={showData.seasons}
                    selectedSeason={selectedSeason}
                    onSeasonChange={handleSeasonChange}
             />
              {/* {selectedSeason && <EpisodesList episodes={selectedSeasonEpisodes} />} */}
              {selectedSeason && <EpisodesListRender episodes={selectedSeasonEpisodes} />}
           {/* <Favorites episodeData={episodeData} showData={showData} selectedSeason={selectedSeason} /> */}
       {renderFavs()}
        </div>
        </div>
    );
};

export default SingleShow;
