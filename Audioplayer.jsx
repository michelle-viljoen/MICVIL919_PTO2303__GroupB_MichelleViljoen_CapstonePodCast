import React, { useState, useEffect, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = ({episode}) => {
  const [audioSrc, setAudioSrc] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = useRef(null);

  useEffect(() => {
    if (episode) {
      setAudioSrc(episode.file);
      setIsPlaying(false)
    }
  }, [episode]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.audioEl.play();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.audioEl.pause();
    }
  };

  if (!episode || !audioSrc) {
    return null;
  }

console.log('Episode.file' , episode.file)
console.log('Audiosrc', audioSrc)

  return (
    <div className="audio-player">
        <h2>{episode.title}</h2>
        <ReactAudioPlayer className="audio__player"
  src={audioSrc}
  controls
  autoPlay={isPlaying} // Auto play when isPlaying state is true
        onPlay={handlePlay} // Set isPlaying to true when the audio starts playing
        onPause={handlePause}
        ref={audioPlayerRef}
/>
    </div>
  );
};

export default AudioPlayer;