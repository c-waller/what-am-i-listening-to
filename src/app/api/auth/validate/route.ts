// this route is responsible for validating the user

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
    return NextResponse.redirect("http://localhost:3000");
  }

  try 
  {
    const userRef = doc(database, "users", userID);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) // if it isnt an actual user id, make them log in
    {
      return NextResponse.redirect("http://localhost:3000");
    }
    return NextResponse.json({ isValidated: "Yes" }, { status: 200 });
  } 
  catch (error) 
  {
    return NextResponse.redirect("http://localhost:3000");
  }
}