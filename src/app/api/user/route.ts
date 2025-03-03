import { NextResponse } from "next/server";
import { getDoc, doc } from "firebase/firestore";
import { database } from "@/lib/firebase.config";
import { cookies } from "next/headers";

export async function GET()
{
  const cookieStore = await cookies();
  const userID = cookieStore.get("userID")?.value;

  if (!userID) 
  {
    return NextResponse.redirect("http://localhost:3000");
  }

  try 
  {
    const userRef = doc(database, "users", userID);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) 
    {
      return NextResponse.redirect("http://localhost:3000");
    }

    const userData = userDoc.data();
    const displayName = userData.spotifyUserDisplayName;

    return NextResponse.json({ displayName }, { status: 200 });
  } 
  catch (error) 
  {
    return NextResponse.redirect("http://localhost:3000");
  }
}