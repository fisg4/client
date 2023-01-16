import { useState, useEffect } from 'react';

export default function UsernameListener() {
  const [username, setUsername] = useState("Log in");

  useEffect(() => {
    const checkUser = setInterval(() => {
      let user = localStorage.getItem('user');
      if (user) {
        // wait 1 second to avoid flickering
        user = JSON.parse(user);
        setUsername(user.username);
        clearInterval(checkUser);
      }else {
        setUsername("Log in");
      }
    }, 2000);

    return () => clearInterval(checkUser);
  }, []);

return <a href='#user'>{username}</a>;

}
