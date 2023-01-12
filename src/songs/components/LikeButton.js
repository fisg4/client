import React, { useState, useEffect } from 'react';
import '../../css/users/LikeButton.css'

const LikeButton = ({ id }) => {
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const URL_BASE = window.location.origin;

  useEffect(() => {
    // Make GET request to "api/v1/user/likes" to check if the song has already been liked by the user
    const token = localStorage.getItem('token');
    if (token) {
      fetch(URL_BASE+'/api/v1/users/likes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        // Iterate through the liked songs and check if the current song is in the list
        if(!data){
          setLiked(false);
          return;
        }
        const likedSongs = data.map(item => item.song);
        for (let i = 0; i < likedSongs.length; i++) {
          if (likedSongs[i].id === id) {
            // If the song is in the list, set liked to true
            setLiked(true);
            // Set the likeId to the id of the like
            setLikeId(data[i].id);
            break;
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [liked]); // The empty array ensures that this effect only runs on mount

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setShowButton(true);
    }
  }, []);
  
  const handleClick = () => {
    if (liked) {
      // Make DELETE request to "api/v1/user/likes"
      const token = localStorage.getItem('token');
      if (token) {
        fetch(URL_BASE+'/api/v1/users/likes/' + likeId, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          if (response.ok) {
            // If the DELETE request was successful, set liked to false
            setLiked(false);
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
    } else {
      // Make POST request to "api/v1/user/likes"
      const token = localStorage.getItem('token');
      if (token) {
        fetch(URL_BASE+'/api/v1/users/likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({songId: id})
        })
        .then(response => {
          if (response.ok) {
            // If the POST request was successful, set liked to true
            setLiked(true);
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
    }
  }

  const handleMouseEnter = () => {
    const heart = document.querySelector('.bi');
    heart.classList.add('heart-hover');
  };
  
  const handleMouseLeave = () => {
    const heart = document.querySelector('.bi');
    heart.classList.remove('heart-hover');
  };
  
  return (
    showButton &&
    <span className="likeIcon" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {liked ? (
        <i className="bi bi-heart-fill heart-filled" />
      ) : (
        <i className="bi bi-heart heart" />
      )}
    </span>
  );

};

export default LikeButton;
