// this function is responsible for refreshing the access token

import { cookies } from 'next/headers';

type TokenResponse = 
{
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
}

export async function refreshAccessToken(refreshToken: string, spotifyUserId: string): Promise<TokenResponse | null>
{
  try 
  {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!; // just using ! so ts doesnt yell at me
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
    const base64Auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64'); // encode client id and secret together

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${base64Auth}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) // failure :(
    {
      return null;
    }

    const responseData = await response.json();
    const accessTokenExpiresAt = Date.now() + responseData.expires_in * 1000; // expires in an hour

    const cookieStore = await cookies();
    cookieStore.set('userID', spotifyUserId, { // http cookie!
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(accessTokenExpiresAt),
      path: '/',
    });

    return {
      accessToken: responseData.access_token,
      refreshToken: responseData.refresh_token || refreshToken, // if i dont get a new refresh
      accessTokenExpiresAt,
    };
  } 
  catch (error) // something must have happened...
  {
    console.error('Error refreshing token:', error);
    return null;
  }
}