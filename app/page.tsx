import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Vision from "@/components/Vision";
import Achievements from "@/components/Achievements";
import Gallery from "@/components/Gallery";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Vision />
      <Achievements />
      <Gallery />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
