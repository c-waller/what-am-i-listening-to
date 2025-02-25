import { useState, useEffect } from 'react';
import AuthenticationBox from '../components/AuthenticationBox';
import '../styles/styles.css';

function Authenticate()
{
  const [showBox, setShowBox] = useState(false);
  useEffect(() => {setTimeout(() => {setShowBox(true)}, 3000)}, []); // setShowBox to true after 3 secs

  return (
    <div className="container">
      {/* Only show AuthenticatinBox when showBox is True (after 3 seconds)*/}
      {showBox ? (<AuthenticationBox />) : (<p id="content">🤔 Let's get you started...</p>)}
    </div>
  );
}
export default Authenticate;