import { allPosts } from "@/.contentlayer/generated";

const BASE_URL = "http://www.ivanleo.com";

export async function GET(request: Request) {
  request.headers.set("Cache-Control", "public, max-age=3600");

  const categorySet = Array.from(
    new Set(allPosts.flatMap((item) => item.categories))
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${BASE_URL}/posts</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${BASE_URL}/notes/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  ${allPosts.map((post) => {
    return `
    <url>
        <loc>${BASE_URL}/blog/${post.slug}</loc>
        <lastmod>${post.date}</lastmod>
    </url>`;
  })}
  ${categorySet.map((category) => {
    return `<url>
        <loc>${BASE_URL}/category/${category}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`;
  })}
  </urlset>`;

  return new Response(xml);
}
