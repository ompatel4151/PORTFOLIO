import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/content";

export const runtime = "nodejs";
export const alt = siteConfig.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read the bundled fonts at build time (this image is statically prerendered).
const fontDir = join(process.cwd(), "src/app/_og");
const regular = readFileSync(join(fontDir, "IBMPlexMono-Regular.ttf"));
const semibold = readFileSync(join(fontDir, "IBMPlexMono-SemiBold.ttf"));

// Site-wide Open Graph / Twitter image, generated in the terminal identity.
export default async function OpengraphImage() {

  const bg = "#16150f";
  const ink = "#e8e6df";
  const muted = "#8a8578";
  const accent = "#c8823c";
  const border = "#2e2c25";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: bg,
          color: ink,
          padding: 80,
          fontFamily: "IBM Plex Mono",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: accent }}>
          {siteConfig.hero.availability}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 108,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            {siteConfig.name}
            <span style={{ color: accent }}>_</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: muted,
              marginTop: 28,
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {siteConfig.hero.intro}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: muted,
            borderTop: `1px solid ${border}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
          <div style={{ display: "flex", color: accent }}>
            github.com/ompatel4151
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "IBM Plex Mono", data: regular, weight: 400, style: "normal" },
        { name: "IBM Plex Mono", data: semibold, weight: 600, style: "normal" },
      ],
    }
  );
}
