import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "AppletPod — AI-Powered Interactive Learning Studio",
  description:
    "Your curriculum. Interactive applets. 5 days. AI-powered interactive learning applets reviewed by an experienced instructional designer.",
  metadataBase: new URL("https://appletpod.com"),
  openGraph: {
    title: "AppletPod — AI-Powered Interactive Learning Studio",
    description:
      "Your curriculum. Interactive applets. 5 days. Built by a 10-year BYJU'S veteran.",
    type: "website",
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
        className={`${outfit.variable} ${workSans.variable} font-body antialiased bg-white text-charcoal`}
      >
        {children}
      </body>
    </html>
  );
}
