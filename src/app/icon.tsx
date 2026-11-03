import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#ce0000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 800,
          borderRadius: 6,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-1px",
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
