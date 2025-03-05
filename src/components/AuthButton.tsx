"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
import styles from "./AuthButton.module.css";

export default function AuthButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ Works in Next.js 13+ App Router

  async function handleClick() {
    setLoading(true);
    setTimeout(() => router.push("/api/auth/login"), 1500);
  }

  return (
    <button className={styles.authButton} onClick={handleClick}>
      <img src="spotify-logo.png" width={25} alt="Spotify Logo" />
      {loading ? "Authorizing..." : "Connect with Spotify"}
    </button>
  );
}