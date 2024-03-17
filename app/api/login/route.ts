import { z } from "zod";
import { Prisma } from "@prisma/client";
import { SHA256 as sha256 } from "crypto-js";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "../register/route";
import jwt from "jsonwebtoken";

const secretKey = process.env.AUTH_SECRET;
export const generateJWTToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: "1h", // Token expires in 1 hour, you can adjust this as per your requirements
  };

  return jwt.sign(payload, secretKey, options);
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const validation = loginSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
      statusText: "Bad Request",
    });
  }

  try {
    const user = await prisma?.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user?.email) {
      return NextResponse.json({
        status: 401,
        statusbar: "User Not Found",
      });
    }

    const Password = hashPassword(body.password);
    console.log(Password,user.password, "pass");

    if (Password !== user.password) {
      return NextResponse.json({
        status: 401,
        statusText: "Incorrect password",
      });
    }

    const token = generateJWTToken(user);
    console.log(token, "token");
    return NextResponse.json({ token }, { status: 200 });
  } catch (e) {
    return NextResponse.json({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
