"use client"; 
import { useState } from "react";
import styles from "./AuthButton.module.css";
import getSpotifyLoginUrl from "@/lib/auth";

export default function AuthButton() 
{
  const [loading, setLoading] = useState(false);
  async function handleClick()
  {
    setLoading(true);
    const authData = await getSpotifyLoginUrl();
    if (authData)
    {
      sessionStorage.setItem("codeVerifier", authData.codeVerifier);
      setTimeout(() => {window.location.href = authData.url;}, 1000);
    }
  }
  return (
      <button className={styles.authButton} onClick={handleClick}>
        <img src="spotify-logo.png" width={25} alt="Spotify Logo"/>
        {loading ? "Authorizing...": "Connect with Spotify"}
      </button>
  );
}