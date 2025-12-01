import './About.css';

const skills = [
  {
    icon: '⚛️',
    title: 'React & React Native',
    description: 'Building responsive web applications and cross-platform mobile apps'
  },
  {
    icon: '⚡',
    title: 'JavaScript & TypeScript',
    description: 'Modern ES6+ JavaScript and TypeScript for robust, type-safe applications'
  },
  {
    icon: '🚀',
    title: 'Node.js & Express',
    description: 'Server-side development and RESTful API creation'
  },
  {
    icon: '🗄️',
    title: 'MongoDB & SQL',
    description: 'Database design and management for both NoSQL and relational databases'
  },
  {
    icon: '📱',
    title: 'Mobile Development',
    description: 'Native-like mobile experiences with React Native'
  },
  {
    icon: '🎨',
    title: 'Frontend Technologies',
    description: 'HTML5, CSS3, and modern styling frameworks'
  }
];

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2>About Me</h2>
        <p className="about-intro">
          I'm a passionate full-stack developer specializing in modern web and mobile applications.
          I love creating efficient, scalable solutions using cutting-edge technologies.
        </p>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <span className="skill-icon">{skill.icon}</span>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
