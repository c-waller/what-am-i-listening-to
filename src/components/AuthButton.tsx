"use client"
import { useState } from "react";
import styles from "./AuthButton.module.css";

export default function AuthButton() 
{
  const [loading, setLoading] = useState(false);
  async function handleClick()
  {
    setLoading(true);
    setTimeout(() => window.location.href = "/api/auth/login", 1500); // call our login api route on button click
  }
  return (
      <button className={styles.authButton} onClick={handleClick}>
        <img src="spotify-logo.png" width={25} alt="Spotify Logo"/>
        {loading ? "Authorizing...": "Connect with Spotify"}
      </button>
  );
}