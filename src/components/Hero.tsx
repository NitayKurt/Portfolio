import './Hero.css';

export default function Hero() {
  const handleCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Hello, I'm Nitay</h1>
        <p className="subtitle">Full Stack & Mobile Developer</p>
        <a href="#projects" className="cta-button" onClick={handleCTA}>View My Work</a>
      </div>
    </section>
  );
}
