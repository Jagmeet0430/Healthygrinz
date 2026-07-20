import { promises as fs } from "fs";
import path from "path";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  coverImage: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

const blogsPath = path.join(process.cwd(), "src", "data", "blogs.json");

export async function getBlogs(): Promise<BlogPost[]> {
  const raw = await fs.readFile(blogsPath, "utf8");
  return JSON.parse(raw) as BlogPost[];
}

export async function saveBlogs(blogs: BlogPost[]) {
  await fs.writeFile(blogsPath, `${JSON.stringify(blogs, null, 2)}\n`, "utf8");
  return blogs;
}

export function getPublishedBlogs(blogs: BlogPost[]) {
  return blogs
    .filter((blog) => blog.published)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}
