import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.imageContainer}>
        <img src="vinyl-albums.png" 
          width={1500} 
          className={styles.floatingImage} 
        />
      </div>
      <div className={styles.containerLanding}>
        <h1 className={styles.title}> What Music Am I <br/> Even Listening To? </h1>
        <p className={styles.content}> Analyze your personal taste in music. </p>
        <button className={styles.quizButton} type="button"> Let's Get Started </button>
      </div>
    </>
  );
}
