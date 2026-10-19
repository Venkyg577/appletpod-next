import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { StudioHero } from "@/components/studio/hero";
import { YourWeek } from "@/components/studio/your-week";
import { ThreeSizes } from "@/components/studio/three-sizes";
import { BuildList } from "@/components/studio/build-list";
import { Learning } from "@/components/studio/learning";
import { StudioAbout } from "@/components/studio/about";
import { StudioFinalCta } from "@/components/studio/final-cta";

export const metadata: Metadata = {
  title: "AppletPod: AI agents and builds for founder-led firms",
  description:
    "Your team does the same work by hand every morning. I build the agent that does it, with a person checking the parts that matter. Plus interactive learning content: Flipbooks and Applets.",
  alternates: {
    canonical: "https://appletpod.com",
  },
  openGraph: {
    title: "AppletPod: AI agents and builds for founder-led firms",
    description:
      "Your team does the same work by hand every morning. I build the agent that does it.",
    url: "https://appletpod.com",
    siteName: "AppletPod",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <StudioHero />
        <YourWeek />
        <ThreeSizes />
        <BuildList />
        <Learning />
        <StudioAbout />
        <StudioFinalCta />
      </main>
      <Footer />
    </>
  );
}
