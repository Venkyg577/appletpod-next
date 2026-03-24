import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { ClusterFilter } from "@/components/blog/cluster-filter";
import { BookCallCTA } from "@/components/blog/book-call-cta";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Blog — AppletPod",
  description:
    "Practitioner insights on interactive learning design, AI in education, and building EdTech products. From the team that ships 100+ applets.",
  openGraph: {
    title: "Blog — AppletPod",
    description:
      "Practitioner insights on interactive learning design, AI in education, and building EdTech products.",
    url: "https://appletpod.com/blog",
    siteName: "AppletPod",
    type: "website",
  },
  alternates: {
    canonical: "https://appletpod.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal tracking-tight mb-4">
              Blog
            </h1>
            <p className="text-charcoal/50 text-lg max-w-2xl leading-relaxed">
              Actionable insights on interactive learning design, AI in education, and building EdTech products that work.
            </p>
          </div>

          <ClusterFilter posts={posts} />

          <div className="mt-16">
            <BookCallCTA />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
