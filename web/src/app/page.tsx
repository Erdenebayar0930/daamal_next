import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Services } from "@/components/Services";
import { Barter } from "@/components/Barter";
import { Industries } from "@/components/Industries";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Ticker />
        <Services />
        <Barter />
        <Industries />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
