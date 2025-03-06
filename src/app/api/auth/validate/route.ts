// this route is responsible for validating the user
// because users' tokens are required to analyze track data, you can't use the site anyway if you aren't validated, userID or not
// was supposed to use this to bounce people out of the track and artists pages, for now it just displays "could not fetch artist/track data"

import { NextResponse } from "next/server";
import { getDoc, doc } from "firebase/firestore";
import { database } from "@/lib/firebase.config";
import { cookies } from "next/headers";

export async function GET()
{
  const cookieStore = await cookies();
  const userID = cookieStore.get("userID")?.value; // check to see if userId cookie is stored

  if (!userID) // make them log in
  {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  }

  try 
  {
    const userRef = doc(database, "users", userID);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) // if it isnt an actual user id, make them log in
    {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    }
    return NextResponse.json({ isValidated: "Yes" }, { status: 200 });
  } 
  catch (error) 
  {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  }
}