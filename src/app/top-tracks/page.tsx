// page responsible for displaying top tracks

"use client";
import { useState, useEffect } from "react";
import styles from "./top-tracks.module.css";
import MainButton from "@/components/MainButton";
import Link from "next/link";

type Track = 
{
  name: string;
  artists: { name: string }[]; // array of artists
  external_urls: { spotify: string };
};

export default function TopTracks() 
{
  const [tracks, setTracks] = useState<Track[]>([]); // initialize an empty array of type "Track"  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchTracks(); }, []); // call fetchTracks on load

  async function fetchTracks()
  {
    try 
    {
      const response = await fetch("/api/user/tracks");
      if (!response.ok)
      {
        console.error("Failed to fetch tracks");
        setError("Failed to fetch tracks");
        setLoading(false); // stop loading
        return;
      }
      const data = await response.json();
      setTracks(data.items); // set tracks to returned json data
      setLoading(false);
    } 
    catch (err: any) 
    {
      setError(err.message);
      setLoading(false);
    }
  }

  if (loading) // this displays initially, but should go away after my component loads (i hope LOL)
  {
    return <div>Loading...</div>;
  }

  if (error) 
  {
    return <div> {`Error: ${error}`} </div>;
  }

  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.pageContainer}>
        <h2 className={styles.title}> Top Tracks </h2>
        <div className={styles.trackList}>
          { tracks.map((track, index) => ( // loop thru tracks array and map attributes
            <div key={index} className={styles.trackItem}>
              <div className={styles.trackDetails}>
                <span className={styles.trackRank}> { index + 1 }. </span>
                <span className={styles.trackName}> { track.name } </span>
                <span className={styles.trackArtist}>
                  {track.artists.map((artist, i) => (
                    <span key={i}> { artist.name } </span>
                  ))}
                </span>
              </div>
              <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <img src="./spotify-logo.png" width={25} className={styles.spotify} />
              </a>
            </div>
          ))}
        </div>
        <Link href="/top-artists">
          <MainButton className={styles.artistsButton}> See Top Artists </MainButton>
        </Link>
      </div>
    </div>
  );
}