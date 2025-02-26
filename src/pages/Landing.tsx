import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import TitleSpan from '../components/TitleSpan';
import AnimatedEmoji from '../components/AnimatedEmoji';
import slideIn from '../transitions/slideIn';

function Landing() 
{
  const navigate = useNavigate();
  const [shouldTransition, setShouldTransition] = useState(false);

  function handleClick() 
  {
    setShouldTransition(true); // Enable transition
    setTimeout(() => navigate('/quiz'), 1500); // Navigate after transition duration
  }

  const LandingContent = (
    <div className="container">
      <h1 id="title"> 
        <TitleSpan> What </TitleSpan>
        <TitleSpan> Music </TitleSpan>
        <TitleSpan> Am </TitleSpan>
        <TitleSpan> I </TitleSpan>
        <br />
        <TitleSpan> Even </TitleSpan>
        <TitleSpan> Listening </TitleSpan>
        <TitleSpan> To</TitleSpan>
        <TitleSpan>?</TitleSpan>
      </h1>
      <p id="content">
        Let's see what your personal taste in <AnimatedEmoji> 🎵 </AnimatedEmoji> is.<br />
      </p>
      <button id="quiz-button" type='button' onClick={handleClick}> Are You Ready? </button>
    </div>
  );
  return shouldTransition ? slideIn(() => LandingContent)() : LandingContent;
}
export default Landing;