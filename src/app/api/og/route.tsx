import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET() {
  const tiemposBold = await readFile(
    join(process.cwd(), "Tiempos-Font/TiemposHeadline-Bold.ttf")
  );

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
        {/* Logo + AppletPod */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Logo icon */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
          >
            <rect x="5" y="5" width="38" height="38" rx="6" fill="#E87B35" />
            <rect x="57" y="5" width="38" height="38" rx="6" fill="#E87B35" />
            <rect x="5" y="57" width="38" height="38" rx="6" fill="#E87B35" />
            <rect x="62" y="20" width="8" height="28" rx="4" fill="#E87B35" />
            <rect
              x="53"
              y="29"
              width="8"
              height="28"
              rx="4"
              fill="#E87B35"
              transform="rotate(-90 53 29)"
            />
          </svg>
          <span
            style={{
              fontSize: "56px",
              fontFamily: "Tiempos",
              fontWeight: 700,
              color: "#E87B35",
            }}
          >
            AppletPod
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "rgba(255,255,255,0.2)",
            marginTop: "-20px",
          }}
        />

        {/* Tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "-40px" }}>
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
            }}
          >
            Turn your curriculum into interactive applets.
            <br />
            AI-powered, human-reviewed. Starting at $175/applet.
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
          data: tiemposBold,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
