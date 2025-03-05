"use client";
import { useState } from "react";
import styles from "./top-tracks.module.css";

export default function TopTracks() {
  const [tracks, setTracks] = useState([
    { trackName: "Track 1", artist: "Artist 1", link: "https://spotify.com" },
    { trackName: "Track 2", artist: "Artist 2", link: "https://spotify.com" },
    { trackName: "Track 3", artist: "Artist 3", link: "https://spotify.com" },
    { trackName: "Track 4", artist: "Artist 4", link: "https://spotify.com" },
    { trackName: "Track 4", artist: "Artist 4", link: "https://spotify.com"},
    { trackName: "Track 5", artist: "Artist 5", link: "https://spotify.com"},
  ]);

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Top Tracks</h2>
      <div className={styles.trackList}>
        {tracks.map((track, index) => (
          <div key={index} className={styles.trackItem}>
            <div className={styles.trackDetails}>
              <span className={styles.trackRank}>{index + 1}. </span>
              <span className={styles.trackName}>{track.trackName}</span>
              <span className={styles.trackArtist}>{track.artist}</span>
            </div>
            <a href={track.link} target="_blank" rel="noopener noreferrer">
              <img src="./spotify-logo.png" width={25} className={styles.spotify} alt="Spotify Logo" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}