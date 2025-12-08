import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { portfolio } from './data/portfolio';

export default function App() {
  useEffect(() => {
    // inject Google Font (Inter) once
    const ID = 'gf-inter';
    if (!document.getElementById(ID)) {
      const link = document.createElement('link');
      link.id = ID;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap';
      document.head.appendChild(link);
    }
    // set a sane fallback stack and prefer Inter
    document.body.style.fontFamily = `"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`;
  }, []);

  return (
    <div className="site">
      <Header name={portfolio.name} />
      <main>
        <Hero name={portfolio.name} title={portfolio.title} />
        <Projects projects={portfolio.projects} />
        <About bio={portfolio.bio} skills={portfolio.skills} />
        <Contact email={portfolio.contact.email} phone={portfolio.contact.phone} />
      </main>
      <Footer />
    </div>
  );
}
