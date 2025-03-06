// route for getting top tracks
// we either return json from cache, or return it from the api

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { database } from "@/lib/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { refreshAccessToken } from "@/app/api/auth/refresh/refreshAccessToken";

export async function GET() 
{
  const cookieStore = await cookies();
  const userID = cookieStore.get("userID")?.value; // check if userID cookie is present

  if (!userID) // validate user ID
  {
    return NextResponse.redirect("http://localhost:3000");
  }

  try 
  {
    // retrieve user from firestore
    const userRef = doc(database, "users", userID);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) // user doesnt exist
    {
      return NextResponse.redirect("http://localhost:3000");
    }

    // retrieve user data including cached tracks and expiration
    const userData = userDoc.data();
    const cachedTracks = userData?.cachedTracks; // get cached tracks
    const cachedTracksExpiry = userData?.cachedTracksExpiry; // get cache expiration

    const currentTime = Date.now();

    // return cached tracks if they arent expired
    if (cachedTracks && cachedTracksExpiry && currentTime < cachedTracksExpiry) 
    {
      console.log("sent cached track data 🐐");
      return NextResponse.json({ items: cachedTracks }, { status: 200 });
    }
    
    let { accessToken, refreshToken, accessTokenExpiresAt } = userData;

    // check if access token is expired, if it is, refresh it
    if (Date.now() >= accessTokenExpiresAt) 
    {
      const refreshedTokens = await refreshAccessToken(refreshToken, userID);

      if (!refreshedTokens) 
      {
        return NextResponse.redirect("http://localhost:3000");
      }

      // use refreshed tokens in firestore
      await setDoc(userRef, {
        accessToken: refreshedTokens.accessToken,
        refreshToken: refreshedTokens.refreshToken,
        accessTokenExpiresAt: refreshedTokens.accessTokenExpiresAt
      }, { merge: true });

      accessToken = refreshedTokens.accessToken;
    }

    // fetch top tracks from api, caching didnt work
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=8", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) throw new Error("Failed to fetch top tracks");

    const data = await response.json();

    // cache the api data in firestore
    const cacheExpiryTime = Date.now() + 3600000; // 1 hour
    await setDoc(userRef, {
      cachedTracks: data.items,
      cachedTracksExpiry: cacheExpiryTime
    }, { merge: true });

    // return the fetched data in the desired format
    console.log("sent api track data 💔");
    return NextResponse.json({ items: data.items }, { status: 200 });
  } 
  catch (error) // end of my big try something mustve happened lol
  {
    console.error("Error fetching top tracks:", error);
    return NextResponse.redirect("http://localhost:3000");
  }
}