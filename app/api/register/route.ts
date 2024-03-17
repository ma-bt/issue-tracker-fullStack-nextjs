import { Prisma } from "@prisma/client";
import { SHA256 as sha256 } from "crypto-js";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name is required").max(255),
    email: z.string().email(),
    password: z
      .string()
      .min(5, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z
      .string()
      .min(5, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export const hashPassword = (string) => {
  return sha256(string).toString();
};

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const validation = registerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
      statusText: "Bad Request",
    });
  }

  try {
    const newUser = await prisma?.user.create({
      data: {
        name: body.name,
        email: body.email,

        password: hashPassword(body.password),
        confirmPassword: hashPassword(body.password),
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json({
          status: 400,
          statusText: e.message,
        });
      }
      return NextResponse.json({
        status: 400,
        statusText: e.message,
      });
    }
  }
}
