import { NextRequest } from "next/server";
import { z } from "zod";

 const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  //this method parses the JSON-formatted body into a JavaScript object
}
