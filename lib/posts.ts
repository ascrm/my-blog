import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getPosts() {
  const postsDir = path.join(process.cwd(), "content", "posts");
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const full = path.join(postsDir, file);
    const raw = fs.readFileSync(full, "utf-8");
    const { data } = matter(raw);
    return {
      id: file.replace(/\.mdx?$/, ""),
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || "",
      tags: data.tags || [],
      cover: data.cover || null,
    };
  });
  // sort by date desc
  posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return posts;
}

export default getPosts;

