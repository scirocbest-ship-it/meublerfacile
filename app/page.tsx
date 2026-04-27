import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Advantages from "@/components/Advantages";
import Packs from "@/components/Packs";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import FurnitureList from "@/components/FurnitureList";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Advantages />
        <Packs />
        <Process />
        <Projects />
        <FurnitureList />
        <ContactForm />
      </main>
    </>
  );
}
