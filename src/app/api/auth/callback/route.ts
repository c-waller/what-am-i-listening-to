import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) 
{
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) 
  {
    return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("codeVerifier")?.value;

  if (!codeVerifier) 
  {
    return NextResponse.json({ error: "Code verifier is missing" }, { status: 400 });
  }

  // Prepare the Authorization header with the correct format
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const base64Auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const authHeader = `Basic ${base64Auth}`;

  try 
  {
    // Exchange authorization code for access token
    const response = await fetch("https://accounts.spotify.com/api/token", 
    {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded", "Authorization": authHeader},
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!,
        code_verifier: codeVerifier
      }),
    });

    if (!response.ok) 
    {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error_description || "Failed to exchange token" },
        { status: response.status }
      );
    }
    const responseData = await response.json();
    const { access_token, refresh_token } = responseData;

    // If token exchange is successful, return success message
    return NextResponse.json({ success: true, access_token, refresh_token }, { status: 200 });
  } 
  catch (error: any) 
  {
    console.error("Error exchanging token:", error.message);
    return NextResponse.json(
      { error: "Failed to exchange token" },
      { status: 500 }
    );
  }
}