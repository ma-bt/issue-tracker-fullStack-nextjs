import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validation-schema";

export async function POST(request: NextRequest) {
  //this method parses the JSON-formatted body into a JavaScript object
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
      statusText: "Bad request",
    });

  //inserting new issue into the database after validating the request
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  //returning response to the client
  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest) {
  const result = await prisma.issue.findMany();
  return NextResponse.json({ status: 200, data: result, message: "ok" });
}
