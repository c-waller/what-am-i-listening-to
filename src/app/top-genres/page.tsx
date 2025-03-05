"use client";
import { useState } from "react";
import styles from "./top-genres.module.css";

export default function TopGenres() {
  const [genres, setGenres] = useState([
    { name: "Genre 1", imgSrc: "./hellp.jpeg" },
    { name: "Genre 2", imgSrc: "./alice.jpeg" },
    { name: "Genre 3", imgSrc: "./keshi.jpeg" },
    { name: "Genre 4", imgSrc: "./example4.jpeg" },
    { name: "Genre 5", imgSrc: "./hellp.jpeg" },
    { name: "Genre 6", imgSrc: "./alice.jpeg" },
    { name: "Genre 7", imgSrc: "./keshi.jpeg" },
    { name: "Genre 8", imgSrc: "./keshi.jpeg" },
    { name: "Genre 9", imgSrc: "./keshi.jpeg" },
    { name: "Genre 10", imgSrc: "./keshi.jpeg" },
  ]);

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Top Genres</h2>
      <ul className={styles.genreList}>
        {genres.map((genre, index) => (
          <li key={index} className={styles.genreItem}>
            <span className={styles.rankNumber}> {index + 1}.</span>
            <span className={styles.genreName}>{genre.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}