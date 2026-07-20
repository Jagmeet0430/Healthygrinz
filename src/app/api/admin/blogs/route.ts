import { NextResponse } from "next/server";
import { isValidAdminToken } from "@/lib/admin";
import { getBlogs, saveBlogs, type BlogPost } from "@/lib/blogs";

export async function GET(request: Request) {
  if (!isValidAdminToken(request.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const blogs = await getBlogs();
  return NextResponse.json(blogs);
}

export async function PUT(request: Request) {
  if (!isValidAdminToken(request.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const blogs = (await request.json().catch(() => null)) as BlogPost[] | null;

  if (!Array.isArray(blogs)) {
    return NextResponse.json({ error: "Invalid blogs payload." }, { status: 400 });
  }

  const saved = await saveBlogs(blogs);
  return NextResponse.json(saved);
}
