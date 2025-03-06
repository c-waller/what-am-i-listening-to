// button responsible for authorization

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AuthButton.module.css";

export default function AuthButton() 
{
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClick() 
  {
    setLoading(true);
    setTimeout(() => router.push("/api/auth/login"), 1500); // redirect after 1.5 seconds
  }

  return (
    <button className={styles.authButton} onClick={handleClick}>
      <img src="spotify-logo.png" width={25} alt="Spotify Logo" />
      {loading ? "Authorizing..." : "Connect with Spotify"}
    </button>
  );
}