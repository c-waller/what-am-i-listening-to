// route responsible for generating the login url and setting the codeVerifier 

import { NextResponse } from "next/server";
import getSpotifyLoginUrl from "@/lib/auth";

export async function GET() 
{
  const authData = await getSpotifyLoginUrl(); // generate spotify authorization url
  if (!authData) 
  {
    return NextResponse.json({ error: "Failed to generate login URL" }, { status: 500 });
  }
  try
  {
    const response = NextResponse.redirect(authData.url);
    response.cookies.set("codeVerifier", authData.codeVerifier, { // create a cookie to store our codeVerifier in
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // https only cookie
        path: "/",
        sameSite: "lax", // CSRF protection
        maxAge: 300,     // 5 minutes
    });
    return response;
  }
  catch // shouldnt happen tbh
  {
    return NextResponse.json({ error: "Failed to set cookie" }, { status: 500 });
  }
}