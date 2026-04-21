export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: "https://jiaweing.com/api/blog/preview",
        "service-doc": [{ href: "https://jiaweing.com" }],
      },
      {
        anchor: "https://jiaweing.com/api/og",
        "service-doc": [{ href: "https://jiaweing.com" }],
      },
      {
        anchor: "https://jiaweing.com/mcp",
        "service-desc": [
          {
            href: "https://jiaweing.com/.well-known/mcp/server-card.json",
          },
        ],
      },
    ],
  };

  return Response.json(catalog, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "s-maxage=86400",
    },
  });
}
