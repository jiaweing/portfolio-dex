export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://jiaweing.com";

  const body = [
    "User-agent: *",
    "Allow: /",
    "Content-Signal: ai-train=no, search=yes, ai-input=yes",
    `Sitemap: ${baseUrl}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
