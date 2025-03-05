"use client";
import { useState } from "react";
import styles from "./top-artists.module.css";

export default function TopArtists() {
  const [artists] = useState([
    { name: "Artist 1", imgSrc: "./hellp.jpeg" },
    { name: "Artist 2", imgSrc: "./alice.jpeg" },
    { name: "Artist 3", imgSrc: "./keshi.jpeg" },
    { name: "Artist 4", imgSrc: "./example4.jpeg" },
    { name: "Artist 5", imgSrc: "./hellp.jpeg" },
    { name: "Artist 6", imgSrc: "./alice.jpeg" },
    { name: "Artist 7", imgSrc: "./keshi.jpeg" },
    { name: "Artist 8", imgSrc: "./keshi.jpeg" },
    { name: "Artist 9", imgSrc: "./keshi.jpeg" },
    { name: "Artist 10", imgSrc: "./keshi.jpeg" }
  ]);

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Top Artists</h2>
      <ul className={styles.artistList}>
        {artists.map((artist, index) => (
          <li key={index} className={styles.artistItem}>
            <span className={styles.rankNumber}> {index + 1}.</span>
            <img src={artist.imgSrc} alt={artist.name} className={styles.artistImage} />
            <span className={styles.artistName}>{artist.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}