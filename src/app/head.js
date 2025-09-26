// app/head.jsx
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ""; // e.g. "/auto-shop" on GH Pages

export default function Head() {
  return (
    <>
      {/* Favicons */}
      <link rel="icon" href={`${BASE_PATH}/favicon.ico`} />
      <link rel="shortcut icon" href={`${BASE_PATH}/favicon.ico`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`${BASE_PATH}/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${BASE_PATH}/favicon-16x16.png`} />

      {/* Apple Touch Icon (iOS Home Screen) */}
      <link rel="apple-touch-icon" href={`${BASE_PATH}/apple-touch-icon.png`} />

      {/* Optional: theme color for mobile UI chrome */}
      <meta name="theme-color" content="#0f172a" />
    </>
  );
}
