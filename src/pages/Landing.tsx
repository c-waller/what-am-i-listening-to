import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';

function Landing() 
{
  let navigate = useNavigate(); // Create new navigation function
  
  return (
    <div className="container">
      <h1 id ="title"> <span id = "title-text">What </span><span id = "title-text">Music</span><span id = "title-text"> Am </span> <span id = "title-text"> I </span><br /> <span id = "title-text"> Even </span><span id = "title-text">Listening</span> <span id = "title-text"> To</span><span id = "title-text">?</span></h1>
      <p id="content"> Let's test your knowledge of your personal taste in <span id = "note-emoji"> 🎵 </span><br /></p>
      <button id="quiz-button" onClick={() => {navigate('/quiz')}}> Are You Ready? </button>
    </div>
  )
}
export default Landing
