"use client";

import { useRef, useEffect } from "react";
import styles from "./dashboard.module.css";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import SplitType from "split-type";

export default function Home() 
{
  const container = useRef(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => 
  {
    if (typeof window === "undefined" || !titleRef.current) return;

    const heroText = new SplitType(titleRef.current, { types: "chars" });

    // fade in animation
    gsap.set(heroText.chars, { y: 600, opacity: 1, visibility:"visible" });

    gsap.to(heroText.chars, {
      y: 0,
      duration: 1.4,
      stagger: 0.065,
      delay: 1,
      onComplete: () => {
        // fade out animation
        gsap.to(heroText.chars, {
          y: 50, // moves down slightly
          opacity: 0, // fades out
          duration: 1,
          stagger: 0.05,
          delay: 1, // wait 2s after fade-in before fading out
        });
      },
    });

  }, []);
  return (
    <ReactLenis root>
      <div className={styles.pageContainer} ref={container}>
        <h1 className={styles.title} ref={titleRef}>
          Welcome, user12345678.
        </h1>
      </div>
    </ReactLenis>
  );
}