import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./components/Loader";
import ParticleField from "./components/ParticleField";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import SkillsFactory from "./components/SkillsFactory";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="relative min-h-screen bg-ink-950">
      <ParticleField />
      <CursorGlow />

      <AnimatePresence>{!booted && <Loader onDone={() => setBooted(true)} />}</AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
        aria-hidden={!booted}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <SkillsFactory />
          <Projects />
          <Certifications />
          <Education />
          <Contact />
        </main>
        <Footer />
      </motion.div>

      {/* global vignette + noise */}
      <div className="bg-noise pointer-events-none fixed inset-0 z-[70] opacity-[0.32] mix-blend-overlay" aria-hidden />
    </div>
  );
}
