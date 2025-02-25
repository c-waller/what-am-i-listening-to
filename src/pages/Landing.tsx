import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';

function Landing() 
{
  let navigate = useNavigate(); // Create new navigation function

  function handleClick()
  {
    navigate('/quiz');
  }

  return (
    <>
      <div className="container">
        <h1 id ="title"> What Music Am I <br /> Even Listening To? </h1>
        <p id ="content"> Let's test your knowledge of your personal taste in <span id = "note-emoji"> 🎵 </span><br /></p>
        <button id="quiz-button" onClick={handleClick}> Are You Ready? </button>
      </div>
    </>
  )
}
export default Landing
