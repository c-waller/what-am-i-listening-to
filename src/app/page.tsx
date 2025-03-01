import Image from "next/image";
import styles from "./page.module.css";
import TitleSpan from "@/components/TitleSpan";

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
        <h1 className={styles.title}>
          <TitleSpan> What </TitleSpan>
          <TitleSpan> Music </TitleSpan>
          <TitleSpan> Am </TitleSpan>
          <TitleSpan> I </TitleSpan>
          <br/>
          <TitleSpan> Even </TitleSpan>
          <TitleSpan> Listening </TitleSpan>
          <TitleSpan> To</TitleSpan>
          <TitleSpan>?</TitleSpan>
        </h1>
        <p className={styles.content}>
          Analyze your personal taste in music.
        </p>
        <button className={styles.quizButton} type="button"> Let's Get Started </button>
      </div>
    </>
  );
}
