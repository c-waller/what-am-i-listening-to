import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleSpan from '../components/TitleSpan';
import AnimatedEmoji from '../components/AnimatedEmoji';
import slideIn from '../transitions/slideIn';
import '../styles/landing.css';

function Landing() 
{
  const navigate = useNavigate();
  const [shouldTransition, setShouldTransition] = useState(false);

  function handleClick(): void
  {
    setShouldTransition(true); // Enable transition
    setTimeout(() => navigate('/quiz'), 1500); // Navigate after transition duration
  }

  const LandingContent = (
    <>
    <div className="image-container">
      <img src="src/assets/vinylcover.png" width={1500} className="floating-image" />
    </div>
    <div className="container-landing">
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
    </>
  );
  return shouldTransition ? slideIn(() => LandingContent)() : LandingContent;
}
export default Landing;