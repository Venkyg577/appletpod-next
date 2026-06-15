import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { FlipbooksHero } from "@/components/flipbooks/hero";
import { FlipbooksProblem } from "@/components/flipbooks/problem";
import { TheShift } from "@/components/flipbooks/the-shift";
import { FlipbooksHowItWorks } from "@/components/flipbooks/how-it-works";
import { FlipbooksProof } from "@/components/flipbooks/proof";
import { FlipbooksWhoItsFor } from "@/components/flipbooks/who-its-for";
import { FlipbooksWhatYouGet } from "@/components/flipbooks/what-you-get";
import { FlipbooksFaq } from "@/components/flipbooks/faq";
import { FlipbooksFinalCta } from "@/components/flipbooks/final-cta";

export const metadata: Metadata = {
  title: "Flipbooks by AppletPod — turn any book into interactive learning",
  description:
    "Reading creates the illusion of learning. Flipbooks take the book you already have and add an interactive layer — so the same page talks back, checks understanding, and makes students practice. Your first live page back in 24 hours.",
  alternates: {
    canonical: "https://appletpod.com",
  },
  openGraph: {
    title: "Flipbooks by AppletPod — turn any book into interactive learning",
    description:
      "Your existing book, with an interactive layer — so students actually learn it instead of just reading it.",
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
        <FlipbooksHero />
        <FlipbooksProblem />
        <TheShift />
        <FlipbooksHowItWorks />
        <FlipbooksProof />
        <FlipbooksWhoItsFor />
        <FlipbooksWhatYouGet />
        <FlipbooksFaq />
        <FlipbooksFinalCta />
      </main>
      <Footer />
    </>
  );
}
