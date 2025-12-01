import { useEffect } from 'react';
import Navbar from './components/Navbar';
import GameWindow from './components/GameWindow';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './styles/globalStyles.css';
import './App.css';

function App() {
  useEffect(() => {
    // Smooth reveal animations for sections
    const sections = document.querySelectorAll<HTMLElement>('.section');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.2 });

    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      sectionObserver.observe(section);
    });

    return () => {
      sections.forEach(section => sectionObserver.unobserve(section));
    };
  }, []);

  return (
    <>
      <div className="bg-animation"></div>
      <Navbar />
      <GameWindow />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

export default App;
