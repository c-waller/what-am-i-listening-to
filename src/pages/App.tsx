import '../styles/styles.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() 
{

  let navigate = useNavigate();

  function handleClick()
  {
    navigate('/quiz');
  }

  return (
    <>
      {/* <header></header> */}
      <div className="container">
        <h1 id ="title"> What Music Am I <br /> Even Listening To? </h1>
        <p id ="artists"> Let's test your knowledge of your personal taste in <span id = "note"> 🎵 </span><br /></p>
        {/* <p id ="artists"> Come test your knowledge of your <br />personal taste in  "The Hellp"... <br /></p> */}
        <button id="quiz-button" onClick={handleClick}> Are You Ready? </button>
      </div>
    </>
  )
}
export default App
