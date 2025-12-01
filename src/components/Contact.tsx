import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create mailto link
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:nitay@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Show success message
    setSubmitStatus('success');

    setTimeout(() => {
      setSubmitStatus('idle');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2>Let's Connect</h2>
        <div className="contact-content">
          <div className="contact-form">
            <h3>Send me a message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                style={{
                  background: submitStatus === 'success'
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : 'var(--gradient)'
                }}
              >
                {submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="social-links">
            <h3>Connect with me</h3>
            <div className="social-buttons">
              <a href="https://www.linkedin.com/in/nitay-kurt/" target="_blank" rel="noopener noreferrer" className="social-btn">
                <span className="social-icon">💼</span>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/NitayKurt" target="_blank" rel="noopener noreferrer" className="social-btn">
                <span className="social-icon">🐙</span>
                <span>GitHub</span>
              </a>
            </div>
            <p>
              I'm always interested in new opportunities and collaborations.
              Feel free to reach out through any of these channels!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
