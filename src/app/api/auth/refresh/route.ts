import { cookies } from "next/headers";

export async function refreshAccessToken(refreshToken: string, spotifyUserId: string) 
{
  try 
  {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
    const base64Auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64Auth}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok)
    {
      return null; 
    }

    const responseData = await response.json();
    const accessTokenExpiresAt = Date.now() + responseData.expires_in * 1000;

    // refresh user session
    const cookieStore = await cookies();
    cookieStore.set("userID", spotifyUserId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(accessTokenExpiresAt), // matches token expiry 
        path: '/', 
    })

    return {
      accessToken: responseData.access_token,
      refreshToken: responseData.refresh_token || refreshToken, // if spotify doesnt send me one
      accessTokenExpiresAt: Date.now() + responseData.expires_in * 1000,
    };
  } 
  
  catch (error) 
  {
    console.error("Error refreshing token:", error);
    return null;
  }
}