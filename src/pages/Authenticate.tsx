import { useState, useEffect } from 'react';
import AuthenticationBox from '../components/AuthenticationBox';
import slideOut from '../transitions/slideOut';
import '../styles/authentication.css';

function Authenticate()
{
  const [showBox, setShowBox] = useState(false);
  useEffect(() => {setTimeout(() => {setShowBox(true)}, 3000)}, []); // setShowBox to true after 3 secs

  return (
    <div className="container-authentication">
      {/* Only show AuthenticatinBox when showBox is True (after 3 seconds)*/}
      {showBox ? (<AuthenticationBox />) : (<p id="content">First we're going to need your spotify...</p>)}
    </div>
  );
}
export default slideOut(Authenticate);