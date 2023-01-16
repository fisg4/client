import React, { useEffect, useState } from 'react';
import SimpleSong from './SimpleSong';

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
    return (
      <div class="text-center mb-3">No songs liked yet</div>
      
    );


  }else{
      return (
        <div className='justify-content-center mx-auto text-center'>
            <ul className='list-group d-flex flex-row flex-wrap'>
              {songs.map(song => (
                <div className='col-12 col-md-4 text-center d-flex p-2'>
                <SimpleSong key={song.Id} song={song} />
                </div>
              ))}
            </ul>
        </div>
      );
      // make a return of the songs but with a grid

  }

}

export default LikedSongs;
