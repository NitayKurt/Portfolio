import { useState, useEffect, useRef } from 'react';
import './GameWindow.css';

export default function GameWindow() {
  const [score, setScore] = useState(0);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(true);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const respawnDot = () => {
    if (gameAreaRef.current) {
      const maxX = gameAreaRef.current.clientWidth - 20;
      const maxY = gameAreaRef.current.clientHeight - 20;
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      setDotPosition({ x: randomX, y: randomY });
    }
  };

  useEffect(() => {
    respawnDot();
  }, []);

  const handleDotClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setScore(score + 1);
    createExplosion(e.clientX, e.clientY);
    respawnDot();
  };

  const createExplosion = (x: number, y: number) => {
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = '#06b6d4';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '10000';

      const angle = (i * 60) * (Math.PI / 180);
      const velocity = 50;

      document.body.appendChild(particle);

      particle.animate(
        [
          {
            transform: 'translate(0, 0) scale(1)',
            opacity: '1'
          },
          {
            transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
            opacity: '0'
          }
        ],
        {
          duration: 500,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }
      ).onfinish = () => {
        document.body.removeChild(particle);
      };
    }
  };

  if (!isOpen) return (
    <button
      className="game-open-btn"
      aria-label="Open game"
      title="Open Game"
      onClick={() => setIsOpen(true)}
    >
      🎮
    </button>
  );

  return (
    <div className="game-section">
      <button
        className="game-close"
        aria-label="Close game"
        title="Close"
        onClick={() => setIsOpen(false)}
      >
        X
      </button>
      <div className="game-header">🎮 Click the Moving Dots!</div>
      <div className="mouse-game" ref={gameAreaRef}>
        <div className="score">Score: {score}</div>
        <div
          className="game-dot"
          style={{
            left: dotPosition.x + 'px',
            top: dotPosition.y + 'px'
          }}
          onClick={handleDotClick}
        />
      </div>
    </div>
  );
}
