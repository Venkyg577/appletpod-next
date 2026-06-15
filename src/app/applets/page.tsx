import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/ui/animated-hero";
import { BeforeAfter } from "@/components/sections/before-after";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyAppletPod } from "@/components/sections/why-appletpod";
import { Proof } from "@/components/sections/proof";
import { WhoItsFor } from "@/components/sections/who-its-for";
import { Pilot } from "@/components/sections/pilot";
import { About } from "@/components/sections/about";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Applets — Custom Interactive Modules | AppletPod",
  description:
    "Applets are the interactive layer — fully custom modules built from the curriculum you already have. Reviewed by a 10-year EdTech veteran, in your hands in days. You own the code.",
  alternates: {
    canonical: "https://appletpod.com/applets",
  },
  openGraph: {
    title: "Applets — Custom Interactive Modules | AppletPod",
    description:
      "Applets are the interactive layer — fully custom modules built from the curriculum you already have. You own the code.",
    url: "https://appletpod.com/applets",
    siteName: "AppletPod",
    type: "website",
  },
};

export default function AppletsPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BeforeAfter />
        <Problem />
        <HowItWorks />
        <WhyAppletPod />
        <Proof />
        <WhoItsFor />
        <Pilot />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
