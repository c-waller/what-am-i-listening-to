import { loginUrl } from "../pages/Authenticate";

function AuthenticationBox()
{
  return (
        <a href={loginUrl}> 
          <button id="auth-button"><img src="src/assets/images/spotify-logo.png" width={25}></img>Connect with Spotify</button>
        </a>
  )
}
export default AuthenticationBox;