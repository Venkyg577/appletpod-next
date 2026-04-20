import { Header } from "@/components/sections/header";
import { Hero } from "@/components/ui/animated-hero";
import { BeforeAfter } from "@/components/sections/before-after";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyAppletPod } from "@/components/sections/why-appletpod";
import { Proof } from "@/components/sections/proof";
import { WhoItsFor } from "@/components/sections/who-its-for";
import { Pricing } from "@/components/sections/pricing";
import { Pilot } from "@/components/sections/pilot";
import { About } from "@/components/sections/about";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
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
        <Pricing />
        <Pilot />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
