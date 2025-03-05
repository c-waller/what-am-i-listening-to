import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { database } from "@/lib/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { refreshAccessToken } from "@/app/api/auth/refresh/route";

export async function GET() 
{
  const cookieStore = await cookies();
  const userID = cookieStore.get("userID")?.value;

  if (!userID) // will use validate logic here but just dont have time rn
  {
    return NextResponse.redirect("http://localhost:3000");
  }

  try 
  {
    // retrieve user from firestore
    const userRef = doc(database, "users", userID);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) // user doesn't exist
    {
      return NextResponse.redirect("http://localhost:3000");
    }

    let { accessToken, refreshToken, accessTokenExpiresAt } = userDoc.data();

    // check if access token is expired
    if (Date.now() >= accessTokenExpiresAt) 
    {
      const refreshedTokens = await refreshAccessToken(refreshToken, userID);

      if (!refreshedTokens) 
      {
        return NextResponse.redirect("http://localhost:3000");
      }

      // update firestore with new tokens
      await setDoc(userRef, {
        accessToken: refreshedTokens.accessToken,
        refreshToken: refreshedTokens.refreshToken,
        accessTokenExpiresAt: refreshedTokens.accessTokenExpiresAt}, { merge: true });

      accessToken = refreshedTokens.accessToken;
    }

    // get top artists
    const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=8", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) throw new Error("Failed to fetch top artists");

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } 
  
  catch (error) // end of my huge try, something must've gone wrong
  {
    console.error("Error fetching top artists:", error);
    return NextResponse.redirect("http://localhost:3000");
  }
}