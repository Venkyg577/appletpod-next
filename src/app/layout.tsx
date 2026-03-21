import type { Metadata } from "next";
import { Outfit, Work_Sans, Inter } from "next/font/google";
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

const inter = Inter({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: ["600", "700"],
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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
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
        className={`${outfit.variable} ${workSans.variable} ${inter.variable} font-body antialiased bg-white text-charcoal`}
      >
        {children}
      </body>
    </html>
  );
}
