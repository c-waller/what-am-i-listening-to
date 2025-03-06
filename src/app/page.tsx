import styles from "./page.module.css";
import Link from "next/link";
import MainButton from "@/components/MainButton";

export default function Home() 
{
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
        <p className={styles.content}> View your top songs, artists, and more! </p>
        <Link href="/auth">
          <MainButton> Let's Get Started </MainButton>
        </Link>
      </div>
    </>
  );
}
