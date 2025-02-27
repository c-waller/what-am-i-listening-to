import { useState, useEffect } from 'react';
import AuthenticationBox from '../components/AuthenticationBox';
import slideOut from '../transitions/slideOut';
import '../styles/authentication.css';

const scopes = [
  "playlist-read-private",
  "user-read-private", // account type
  "user-read-recently-played",
  "user-library-read", 
  "user-follow-read",
  "user-top-read"
];

const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:5173/quiz";
const clientId = ""; // MOVE THIS BEFORE PUSHING LMFAO
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

function Authenticate()
{
  const [showBox, setShowBox] = useState(false);
  useEffect(() => {setTimeout(() => {setShowBox(true)}, 3000)}, []); // setShowBox to true after 3 secs
  return (
    <div className="container-authentication">
      {/* Only show AuthenticatinBox when showBox is True (after 3 seconds)*/}
      {showBox ? (<AuthenticationBox />) : (<p id="content"> First let's take a look at your spotify... </p>)}
    </div>
  );
}
export default slideOut(Authenticate);