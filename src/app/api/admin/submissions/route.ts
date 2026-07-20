import { NextResponse } from "next/server";
import { isValidAdminToken } from "@/lib/admin";
import { getSubmissions } from "@/lib/submissions";

export async function GET(request: Request) {
  if (!isValidAdminToken(request.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await getSubmissions();
  return NextResponse.json(submissions);
}
