import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { database } from "@/lib/firebase.config";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function GET(req: NextRequest) 
{
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code"); // seach for code and extract it from url of req

  if (!code) // code not in url, 9 times out of 10 shouldn't happen
  {
    return NextResponse.redirect("http://localhost:3000");
  }

  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("codeVerifier")?.value; // retrieve the cookie we stored, check login api route for more details

  if (!codeVerifier) // typically only fails because our cookie expired
  {
    return NextResponse.redirect("http://localhost:3000");
  }

  // prepare the authorization header -> "Basic base64(clientId:clientSecret)"
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const base64Auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
 
  try 
  {
    // exchange authorization code for access token
    const response = await fetch("https://accounts.spotify.com/api/token", 
    {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded", "Authorization": `Basic ${base64Auth}`},
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!,
        code_verifier: codeVerifier
      }),
    });

    if (!response.ok) // token exchange failure
    {
      return NextResponse.redirect("http://localhost:3000");
    }

    // ---------------------------------------------------------------------------------------------|
    //                                        USER DATA                                             |
    // ---------------------------------------------------------------------------------------------|

    const responseData = await response.json();
    const { access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn } = responseData; // destructure tokens
    const userResponse = await fetch("https://api.spotify.com/v1/me", // fetch user profile
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    
    if (!userResponse.ok) // user fetch failure
    {
      return NextResponse.redirect("http://localhost:3000");
    }

    const userData = await userResponse.json();
    const spotifyUserId = userData.id;
    const spotifyUserDisplayName = userData.display_name;

    // store access and refresh tokens in Firestore
    const userRef = doc(database, "users", spotifyUserId);
    const existingUser = await getDoc(userRef);
    const accessTokenExpiresAt = Date.now() + expiresIn * 1000; // seconds (expiresIn) -> milliseconds (Date.now)

    // store userID in a cookie
    const cookieStore = await cookies();
    cookieStore.set("userID", spotifyUserId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(accessTokenExpiresAt), // matches token expiry 
      path: '/', 
    })
    
    if (existingUser.exists())
    {
      await setDoc(userRef, { spotifyUserDisplayName, accessToken, refreshToken, accessTokenExpiresAt }, { merge: true });
    } 
    else 
    {
      await setDoc(userRef, { spotifyUserId, spotifyUserDisplayName, accessToken, refreshToken, accessTokenExpiresAt});
    }
    // redirect to dashboard after storing tokens
    return NextResponse.redirect("http://localhost:3000/dashboard");
  } 
  catch (error: any) // this is the end of my huge try, something must've gone wrong
  {
    return NextResponse.redirect("http://localhost:3000");
  }
}