import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

async function loadFont(): Promise<ArrayBuffer> {
  try {
    // Works on Netlify/Vercel with bundled assets
    const res = await fetch(
      new URL("../../../../public/fonts/TiemposHeadline-Bold.ttf", import.meta.url)
    );
    return res.arrayBuffer();
  } catch {
    // Fallback for local dev
    const buf = await readFile(
      join(process.cwd(), "public", "fonts", "TiemposHeadline-Bold.ttf")
    );
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  }
}

export async function GET() {
  const fontData = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          backgroundColor: "#1A1A2E",
          color: "#FFFFFF",
        }}
      >
        {/* AppletPod */}
        <div
          style={{
            fontSize: "56px",
            fontFamily: "Tiempos",
            fontWeight: 700,
            color: "#E87B35",
          }}
        >
          AppletPod
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "rgba(255,255,255,0.2)",
          }}
        />

        {/* Tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              fontFamily: "Tiempos",
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}
          >
            Interactive Learning, Built Fast.
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Turn your curriculum into interactive applets.</span>
            <span>AI-powered, human-reviewed. Starting at $175/applet.</span>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: "24px",
            color: "#E87B35",
            fontWeight: 600,
          }}
        >
          appletpod.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Tiempos",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
