import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import styles from "./AnimatedText.module.css";

type AnimatedTextProps =
{
  text: string;
}

export default function AnimatedText({ text }: AnimatedTextProps)
{
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => 
  {
    if (typeof window === "undefined" || !titleRef.current) return;

    const heroText = new SplitType(titleRef.current, { types: "chars" });

    gsap.set(heroText.chars, { y: 90, opacity: 0, visibility: "visible" });

    gsap.to(heroText.chars, {
      y: 0,
      duration: 1,
      stagger: 0.05,
      delay: 1,
      opacity: 1,
      onComplete: () => {gsap.to(heroText.chars, 
        {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.05,
          delay: 1,
        });
      },
    });
  }, [text]);

  return (
    <h1 className={styles.title} ref={titleRef}>
      {text}
    </h1>
  );
};
