import React, { useState, useEffect } from 'react';
import AuthenticationBox from '../components/AuthenticationBox';
import '../styles/styles.css';

function Authenticate()
{
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {setTimeout(() => {setShowBox(true)}, 3000)}, []);

  return (
    <div className="container">
      {showBox ? (<AuthenticationBox />) : (<p id="content">🤔 Let's Get Started...</p>)}
    </div>
  );
}

export default Authenticate;