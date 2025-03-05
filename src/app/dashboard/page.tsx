"use client"
import { useRef } from "react";
import { useEffect, useState } from "react";
import AnimatedText from "@/components/AnimatedText";
import styles from "./dashboard.module.css";
import Card from "@/components/Card";

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
    catch (error: any) 
    {
      console.log("Error fetching display name");
    }
  }
  const [displayName, setDisplayName] = useState("user");
  const container = useRef(null);

  useEffect(() => {
    fetchDisplayName().then((name) => setDisplayName(name));
  }, []);

  return (
      <div className={styles.pageContainer} ref={container}>
        {/* <AnimatedText text={`Welcome, ${displayName}!`} /> */}
        <Card 
          imgSrc="./hellp.jpeg" 
          title="Top Artists" 
          showButton={false}
          // description="Check out your Top Artists "
        />
        <Card 
          imgSrc="./keshi.jpeg" 
          title="Top Genres" 
          showButton={false}
          // description="Check out your Top Genres "
        />

        <Card 
          imgSrc="./alice.jpeg" 
          title="Top Albums" 
          showButton={false}
          // description="Check out your Top Albums "
        />
      </div>
  );
}