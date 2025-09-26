import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Configure these in .env.production
// NEXT_PUBLIC_SITE_URL=https://<username>.github.io/<repo>
// NEXT_PUBLIC_BASE_PATH=/<repo>            // e.g. /auto-shop  ("" for user/org sites)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Des Plaines Auto Clinic | Honest, Expert Auto Care",
    template: "%s | Des Plaines Auto Clinic",
  },
  description:
    "Family-owned auto repair in Des Plaines, IL. ASE-certified technicians for oil changes, brakes, tires, diagnostics, A/C, and more. Transparent estimates, fast turnaround, and friendly service.",
  keywords: [
    "auto repair","mechanic","Des Plaines","oil change","brake service",
    "tire alignment","check engine light","A/C repair","car diagnostics","Illinois"
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/", // resolved against metadataBase
    siteName: "Des Plaines Auto Clinic",
    title: "Des Plaines Auto Clinic | Honest, Expert Auto Care",
    description:
      "ASE-certified auto repair in Des Plaines, IL. Transparent pricing and fast service for brakes, tires, diagnostics, and more.",
    images: [
      {
        url: `${BASE_PATH}/og-cover.jpg`, // ✅ basePath-safe
        width: 1200,
        height: 630,
        alt: "Des Plaines Auto Clinic service bay",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Des Plaines Auto Clinic | Honest, Expert Auto Care",
    description:
      "Family-owned, ASE-certified auto repair in Des Plaines, IL. Honest estimates and fast turnaround.",
    images: [`${BASE_PATH}/og-cover.jpg`],
  },

  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  category: "Automotive",
  authors: [{ name: "Des Plaines Auto Clinic" }],

  // ✅ Prefix icons with BASE_PATH so they resolve on GH Pages project sites
  icons: {
    icon: [
      { url: `${BASE_PATH}/favicon.ico` }
    ],
    apple: `${BASE_PATH}/apple-touch-icon.png`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
