import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/db";
import { RegisterInputProps } from "@/types/types";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/Email/EmailTemplete";

export async function POST(req: Request) {
  try {
    const data: RegisterInputProps = await req.json();
    const { email, name, password, phone, role } = data;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        data: null,
        error: `User with this email (${email}) already exists.`,
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const generateToken = () => {
      const min = 100000;
      const max = 999999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const userToken = generateToken();

    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role,
        token: userToken,
      },
    });

    const firstName = newUser.name?.split(" ")[0] || "User";
    const linkText = "Verify your Account";
    const message =
      "Thank you for registering with Gecko. Please enter the 6-digit verification code on our website:";

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify Your Email Address",
      react: EmailTemplate({
        name: firstName,
        token: userToken,
        linkText,
        message,
      }),
    });

    return NextResponse.json({
      data: newUser,
      message: "User Created Successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      error: "Something went wrong while creating user.",
      status: 500,
    });
  }
}
