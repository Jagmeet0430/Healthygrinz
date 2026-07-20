import { NextResponse } from "next/server";
import { isValidAdminToken } from "@/lib/admin";
import { getSiteContent, saveSiteContent } from "@/lib/content";

export async function GET(request: Request) {
  if (!isValidAdminToken(request.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!isValidAdminToken(request.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await request.json().catch(() => null);

  if (!content || typeof content !== "object") {
    return NextResponse.json({ error: "Invalid content payload." }, { status: 400 });
  }

  const saved = await saveSiteContent(content);
  return NextResponse.json(saved);
}
