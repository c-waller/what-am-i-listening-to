"use client";
import { useState } from "react";
import styles from "./top-artists.module.css";

export default function TopArtists() {
  const [artists, setArtists] = useState([
    { name: "Artist 1", imgSrc: "./hellp.jpeg", link: "https://spotify.com" },
    { name: "Artist 2", imgSrc: "./alice.jpeg", link: "https://spotify.com" },
    { name: "Artist 3", imgSrc: "./keshi.jpeg", link: "https://spotify.com" },
    { name: "Artist 4", imgSrc: "./example4.jpeg", link: "https://spotify.com" },
    { name: "Artist 5", imgSrc: "./hellp.jpeg", link: "https://spotify.com" },
    { name: "Artist 6", imgSrc: "./alice.jpeg", link: "https://spotify.com" },
    { name: "Artist 7", imgSrc: "./keshi.jpeg", link: "https://spotify.com" },
    { name: "Artist 8", imgSrc: "./keshi.jpeg", link: "https://spotify.com" },
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
            <a href={artist.link} target="_blank" rel="noopener noreferrer">
              <img src="./spotify-logo.png" width={25} className={styles.spotify} alt="Spotify Logo" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}