import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email ) {
      return NextResponse.json(
        { error: "Email user must be provided" },
        { status: 400 }
      );
    }

    const dbUser = await prismaClient.user.findFirst({
      where: { email: email ?? "" },
    });

  

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
      picture: dbUser.image ?? null,
    });
  } catch (error) {
    console.error("Error fetching user token data:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
