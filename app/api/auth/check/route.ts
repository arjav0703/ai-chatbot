import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    return NextResponse.json({ authenticated: !!session });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
    console.error(error);
  }
}
