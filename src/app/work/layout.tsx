import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
