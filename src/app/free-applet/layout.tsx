import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Applet Builder — AppletPod",
  description:
    "Build your first interactive learning applet for free. No credit card required. See how AppletPod transforms curriculum into hands-on learning.",
  openGraph: {
    title: "Free Applet Builder — AppletPod",
    description:
      "Create your first interactive applet free. No credit card. Try AppletPod now.",
    url: "https://appletpod.com/free-applet",
    siteName: "AppletPod",
    type: "website",
  },
  alternates: {
    canonical: "https://appletpod.com/free-applet",
  },
};

export default function FreeAppletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
