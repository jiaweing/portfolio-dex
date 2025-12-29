import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic params
    const title = searchParams.get("title") || "Jia Wei Ng";
    const subtitle =
      searchParams.get("subtitle") || "Software Engineer & Designer";

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          backgroundImage: "linear-gradient(to bottom right, #ffffff, #f5f5f5)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 50px",
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "80%",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              margin: "0",
              lineHeight: "1.2",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "30px",
              margin: "10px 0 0",
              color: "#666",
            }}
          >
            {subtitle}
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: "24px", color: "#666" }}>jiaweing.com</p>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`Error generating OG image: ${e}`);
    return new Response("Failed to generate image", {
      status: 500,
    });
  }
}
