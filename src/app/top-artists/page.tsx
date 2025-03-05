"use client";
import { useState, useEffect } from "react";
import styles from "./top-artists.module.css";

type Artist = 
{
  name: string;
  external_urls: {spotify: string}
  images: { url: string }[];
};

export default function TopArtists() 
{
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        setError(err.message);
        setLoading(false);
      }
    }
    fetchArtists();
  }, []);

  if (loading) 
  {
    return <div>Loading...</div>;
  }

  if (error) 
  {
    return <div>{`Error: ${error}`}</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}> Top Artists</h2>
      <ul className={styles.artistList}>
        {artists.map((artist, index) => (
          <li key={index} className={styles.artistItem}>
            <span className={styles.rankNumber}> {index + 1}.</span>
            <img
              src={artist.images[0]?.url || "./image.jpg"} // image doesn't even exist, will display if i cant fetch images for some reason
              alt={artist.name}
              className={styles.artistImage}
            />
            <span className={styles.artistName}>{artist.name}</span>
            <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
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
    </div>
  );
}