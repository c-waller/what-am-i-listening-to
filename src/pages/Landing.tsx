import '../styles/styles.css';
import TitleSpan from '../components/TitleSpan';
import AnimatedEmoji from '../components/AnimatedEmoji';
import { useNavigate } from 'react-router-dom';


function Landing() 
{
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 id ="title"> 
      <TitleSpan> What </TitleSpan>
      <TitleSpan> Music </TitleSpan>
      <TitleSpan> Am </TitleSpan>
      <TitleSpan> I </TitleSpan>
      <br />
      <TitleSpan> Even </TitleSpan>
      <TitleSpan> Listening </TitleSpan>
      <TitleSpan> To </TitleSpan>
      <TitleSpan> ? </TitleSpan>
      </h1>
      <p id="content"> Let's test your knowledge of your personal taste in <AnimatedEmoji> 🎵 </AnimatedEmoji><br /></p>
      <button id="quiz-button" type='button' onClick={() => navigate('/quiz')}> Are You Ready? </button>
    </div>
  )
}
export default Landing
