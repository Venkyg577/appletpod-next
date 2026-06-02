import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
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
  title: "AppletPod — Your Curriculum, Made Interactive",
  description:
    "Your slides aren't landing. AppletPod turns the curriculum you already have into interactive modules learners actually work through. Reviewed by a 10-year EdTech veteran.",
  metadataBase: new URL("https://appletpod.com"),
  openGraph: {
    title: "AppletPod — Your Curriculum, Made Interactive",
    description:
      "Your slides aren't landing. AppletPod turns the curriculum you already have into interactive modules learners actually work through. Reviewed by a 10-year EdTech veteran.",
    url: "https://appletpod.com",
    siteName: "AppletPod",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "AppletPod — Your Curriculum, Made Interactive",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AppletPod — Your Curriculum, Made Interactive",
    description:
      "Your slides aren't landing. AppletPod turns the curriculum you already have into interactive modules learners actually work through. Reviewed by a 10-year EdTech veteran.",
    images: ["/api/og"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AppletPod",
  url: "https://appletpod.com",
  logo: "https://appletpod.com/logo.png",
  description: "Your slides aren't landing. AppletPod turns the curriculum you already have into interactive modules learners actually work through. Reviewed by a 10-year EdTech veteran.",
  sameAs: [
    "https://twitter.com/appletpod",
    "https://linkedin.com/company/appletpod",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "hello@appletpod.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JCFPPPL4S4"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-JCFPPPL4S4', { debug_mode: true });
`}</Script>
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${workSans.variable} ${tiempos.variable} font-body antialiased bg-white text-charcoal`}
      >
        {children}
      </body>
    </html>
  );
}
