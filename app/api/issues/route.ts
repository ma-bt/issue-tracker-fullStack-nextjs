import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  //this method parses the JSON-formatted body into a JavaScript object
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, {
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
