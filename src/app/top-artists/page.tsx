// page for displaying top artists

"use client";
import { useState, useEffect } from "react";
import styles from "./top-artists.module.css";
import MainButton from "@/components/MainButton";
import Link from "next/link";

type Artist = 
{
  name: string;
  external_urls: { spotify: string }; // array of profile urls
  images: { url: string }[]; // array of artist images
};

export default function TopArtists() 
{
  const [artists, setArtists] = useState<Artist[]>([]); // initialize an empty array of type "Artist"  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchArtists() }, []); // call fetchArtists on load
    
  async function fetchArtists()
  {
    try
    {
      const response = await fetch("/api/user/artists");
      if (!response.ok) 
      {
        console.error("Failed to fetch artists");
        setError("Failed to fetch artists");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setArtists(data.items);
      setLoading(false);
    } 

    catch (err: any) 
    {
      console.error("Error fetching artists:", err);
      setError("Error fetching artists");
      setLoading(false);
    }
  }

  if (loading) // displays on first load
  {
    return <div>Loading...</div>;
  }

  if (error) // failure 
  {
    return <div>{`Error: ${error}`}</div>;
  }

  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.pageContainer}>
        <h2 className={styles.title}>Top Artists</h2>
        <ul className={styles.artistList}>
          {artists.map((artist, index) => ( // loop thru artist array and map vals
            <li key={index} className={styles.artistItem}>
              <span className={styles.rankNumber}>{index + 1}.</span>
              <img
                src={artist.images[0]?.url || "./image.jpg"}
                alt={artist.name}
                className={styles.artistImage}
              />
              <span className={styles.artistName}>{artist.name}</span>
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="./spotify-logo.png"
                  width={25}
                  className={styles.spotify}
                  alt="Spotify Logo"
                />
              </a>
            </li>
          ))}
        </ul>
        <Link href="/top-tracks">
          <MainButton className={styles.tracksButton}> See Top Tracks </MainButton>
        </Link>
      </div>
    </div>
  );
}