import React, { useState } from 'react';
// NOT USED
function LikeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleClick() {
    // try {
    //   setLoading(true);
    //   setError(null);
    //   const response = await axios.post('https://example.com/api/endpoint', {
    //     data: 'some data to send in the request body'
    //   });
    //   console.log(response.data);
    //   setLoading(false);
    // } catch (error) {
    //   setError(error);
    //   setLoading(false);
    // }
  }

  return (
    <button className="btn border-purple text-purple bg-blue" onClick={handleClick}>
        
      {loading ? 'Loading...' : 'Make POST like request from user'}
    </button>
  );
}

export default LikeButton;