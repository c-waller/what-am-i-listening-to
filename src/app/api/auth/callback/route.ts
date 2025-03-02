import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) 
{
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) 
  {
    // return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 });
    return NextResponse.redirect("http://localhost:3000");
  }

  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("codeVerifier")?.value; // retrieve the cookie we stored

  if (!codeVerifier) // typically only fails because our cookie expired
  {
    // return NextResponse.json({ error: "Code verifier is missing" }, { status: 400 });
    return NextResponse.redirect("http://localhost:3000");
  }

  // prepare the authorization header -> base64(clientId:clientSecret)
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const base64Auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const authHeader = `Basic ${base64Auth}`;
 
  try 
  {
    // exchange authorization code for access token
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
      // return NextResponse.json(
      //   { error: errorData.error_description || "Failed to exchange token" },
      //   { status: response.status }
      // );
      return NextResponse.redirect("http://localhost:3000");
    }
    const responseData = await response.json();
    const { access_token, refresh_token } = responseData;
    // return NextResponse.json({ success: true, access_token, refresh_token }, { status: 200 }); // success!!!
    // WILL DO FIREBASE STUFF HERE!!!!!!!
    return NextResponse.redirect("http://localhost:3000/dashboard");
  } 
  
  catch (error: any) 
  {
    // return NextResponse.json({ error: "Failed to exchange token" }, { status: 500 });
    return NextResponse.redirect("http://localhost:3000");
  }
}