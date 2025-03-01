import styles from "./AuthButton.module.css"; 

export default function AuthButton()
{
  return (
    <button className={styles.authButton}>
      <img src="spotify-logo.png" width={25} alt="Spotify Logo" />
      Connect with Spotify
    </button>
  )
}