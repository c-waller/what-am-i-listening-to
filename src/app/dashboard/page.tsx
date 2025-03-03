"use client"
import { useRef } from "react";
import { useEffect, useState } from "react";
import AnimatedText from "@/components/AnimatedText";
import styles from "./dashboard.module.css";

export default function Home() 
{
  async function fetchDisplayName() 
  {
    try 
    {
      const response = await fetch("/api/user");
      const data = await response.json();
      return data.displayName;
    } 
    catch (error) 
    {
      console.error("Error fetching display name:", error);
    }
  }
  const [displayName, setDisplayName] = useState("user");
  const container = useRef(null);

  useEffect(() => {
    fetchDisplayName().then((name) => setDisplayName(name));
  }, []);

  return (
      <div className={styles.pageContainer} ref={container}>
        <AnimatedText text={`Welcome, ${displayName}`} />
      </div>
  );
}