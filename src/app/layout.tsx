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
  title: "AppletPod: AI agents and interactive learning",
  description:
    "AppletPod is a build studio. AI agents and small tools for founder-led firms, and interactive learning content (Flipbooks and Applets) for publishers and EdTech teams.",
  metadataBase: new URL("https://appletpod.com"),
  openGraph: {
    title: "AppletPod: AI agents and interactive learning",
    description:
      "AppletPod is a build studio. AI agents and small tools for founder-led firms, and interactive learning content (Flipbooks and Applets) for publishers and EdTech teams.",
    url: "https://appletpod.com",
    siteName: "AppletPod",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "AppletPod: AI agents and interactive learning",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AppletPod: AI agents and interactive learning",
    description:
      "AppletPod is a build studio. AI agents and small tools for founder-led firms, and interactive learning content (Flipbooks and Applets) for publishers and EdTech teams.",
    images: ["/api/og"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AppletPod",
  url: "https://appletpod.com",
  logo: "https://appletpod.com/logo.png",
  description: "AppletPod is a build studio. AI agents and small tools for founder-led firms, and interactive learning content (Flipbooks and Applets) for publishers and EdTech teams.",
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
