import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const tiempos = localFont({
  src: "../../Tiempos-Font/TiemposHeadline-Bold.otf",
  variable: "--font-wordmark",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AppletPod — Interactive Learning, Built Fast",
  description:
    "Turn your curriculum into interactive applets. AI-powered, human-reviewed. Starting at $175/applet.",
  metadataBase: new URL("https://appletpod.com"),
  openGraph: {
    title: "AppletPod — Interactive Learning, Built Fast",
    description:
      "Turn your curriculum into interactive applets. AI-powered, human-reviewed. Starting at $175/applet.",
    url: "https://appletpod.com",
    siteName: "AppletPod",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "AppletPod — Interactive Learning, Built Fast",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AppletPod — Interactive Learning, Built Fast",
    description:
      "Turn your curriculum into interactive applets. AI-powered, human-reviewed. Starting at $175/applet.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${workSans.variable} ${tiempos.variable} font-body antialiased bg-white text-charcoal`}
      >
        {children}
      </body>
    </html>
  );
}
