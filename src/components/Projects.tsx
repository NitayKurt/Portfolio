import { useState, useEffect } from 'react';
import './Projects.css';

interface Project {
  icon: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
}

const projectsData: Project[] = [
  {
    icon: '🛍️',
    title: 'E-Commerce Mobile App',
    description: 'A comprehensive mobile commerce solution built with React Native, featuring seamless user experience, secure payment processing, and real-time inventory management. The app includes advanced features like wishlist management, push notifications, and social login integration.',
    features: [
      'User authentication and profile management',
      'Product catalog with advanced search and filters',
      'Shopping cart and secure checkout process',
      'Payment gateway integration (Stripe, PayPal)',
      'Push notifications for orders and promotions',
      'Real-time inventory tracking',
      'Social media integration',
      'Admin dashboard for product management'
    ],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Express', 'Stripe API', 'Firebase']
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'A powerful web application for data visualization and business intelligence. Built with modern React and TypeScript, featuring interactive charts, real-time data processing, and comprehensive reporting tools for data-driven decision making.',
    features: [
      'Interactive charts and graphs with Chart.js',
      'Real-time data updates and live dashboards',
      'Custom report generation and exports',
      'User role management and permissions',
      'Advanced filtering and data manipulation',
      'Responsive design for all devices',
      'API integration for external data sources',
      'Performance monitoring and alerts'
    ],
    technologies: ['React', 'TypeScript', 'SQL', 'Chart.js', 'Node.js', 'PostgreSQL']
  },
  {
    icon: '🎮',
    title: 'Browser Games Collection',
    description: 'An engaging collection of interactive browser games including a Mario-style platformer, puzzle games, and arcade classics. Built with vanilla JavaScript and HTML5 Canvas, featuring smooth animations, sound effects, and progressive difficulty levels.',
    features: [
      'Mario-style platformer with multiple levels',
      'Puzzle games with increasing difficulty',
      'Arcade-style mini games',
      'High score tracking and leaderboards',
      'Smooth 60fps animations',
      'Sound effects and background music',
      'Mobile-responsive touch controls',
      'Save game progress locally'
    ],
    technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Web APIs', 'LocalStorage', 'Web Audio API']
  },
  {
    icon: '🏠',
    title: 'Real Estate Platform',
    description: 'A full-stack real estate platform offering comprehensive property management solutions for both web and mobile. Features advanced search capabilities, virtual tours, and integrated communication tools for buyers, sellers, and agents.',
    features: [
      'Property listings with detailed information',
      'Advanced search with map integration',
      'Virtual tour and photo galleries',
      'User profiles for buyers, sellers, and agents',
      'Messaging system and appointment booking',
      'Mortgage calculator and financial tools',
      'Mobile app with synchronized data',
      'Admin panel for property management'
    ],
    technologies: ['React', 'React Native', 'Express', 'MongoDB', 'Google Maps API', 'Socket.io']
  }
];

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="project-modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-image">{project.icon}</div>
        <div className="modal-body">
          <h3 className="modal-title">{project.title}</h3>
          <p className="modal-description">{project.description}</p>
          <div className="modal-features">
            <h4>Key Features</h4>
            <ul className="modal-features-list">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="modal-tech">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const totalSlides = projectsData.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const openProjectModal = (index: number) => {
    setSelectedProject(projectsData[index]);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      } else if (e.key === 'Escape') {
        closeProjectModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2>My Projects</h2>
        <div className="projects-container">
          <div className="carousel-3d">
            <div
              className="carousel-stage"
              style={{
                transform: `translateX(-50%) translateY(-50%) rotateY(${currentSlide * -90}deg)`
              }}
            >
              {projectsData.map((project, index) => (
                <div
                  key={index}
                  className={`project-card-3d ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => openProjectModal(index)}
                  style={{
                    opacity: index === currentSlide ? 1 : 0.7,
                    pointerEvents: index === currentSlide ? 'auto' : 'none',
                    filter: index === currentSlide ? 'brightness(1.1)' : 'brightness(0.8)'
                  }}
                >
                  <div className="project-image">{project.icon}</div>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-controls">
            <button className="carousel-btn" onClick={previousSlide} aria-label="Previous project">‹</button>
            <button className="carousel-btn" onClick={nextSlide} aria-label="Next project">›</button>
          </div>

          <div className="carousel-dots">
            {projectsData.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={closeProjectModal}
      />
    </section>
  );
}
