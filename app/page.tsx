import Hero from "@/components/Hero";
import Advantages from "@/components/Advantages";
import Packs from "@/components/Packs";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Advantages />
      <Packs />
      <Process />
      <Projects />
      <ContactForm />
    </main>
  );
}
