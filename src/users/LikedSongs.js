import React, { useEffect, useState } from 'react';
import Song from '../songs/components/Song';

function LikedSongs() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('/api/v1/users/likes', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const songs = data.map(item => item.song);
        setSongs(songs);
      })
      .catch(err => setError(err));
  }, []);

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  if (!songs || !songs.length) {
    return <div>No songs liked yet</div>;
  }else{
      return (
        <div>
          {songs.map(song => (
            <Song key={song.Id} song={song} />
          ))}
        </div>
      );
  }

}

export default LikedSongs;
