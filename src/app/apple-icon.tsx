import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: "#ce0000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 900,
          borderRadius: 40,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-4px",
          boxShadow: "inset 0 -10px 20px rgba(0,0,0,0.15)",
        }}
      >
        AF
      </div>
    ),
    {
      ...size,
    },
  );
}
