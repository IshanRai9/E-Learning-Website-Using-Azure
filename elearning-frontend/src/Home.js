import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Your Learning Journey</h1>
          <p className="hero-subtitle">Discover, Learn, and Grow with Our Interactive Courses</p>
          <Link to="/login" className="cta-button">
            Get Started
          </Link>
        </div>
        <div className="hero-image">
          <img src="/images/hero-image.jpg" alt="Students learning" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Comprehensive Courses</h3>
            <p>Access a wide range of courses designed by industry experts</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Interactive Learning</h3>
            <p>Engage with interactive content and practical exercises</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Learn Anywhere</h3>
            <p>Access your courses from any device, anytime</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Start Learning?</h2>
        <p>Join thousands of students who are already learning with us</p>
        <Link to="/login" className="cta-button">
          Sign Up Now
        </Link>
      </section>
    </div>
  );
}

export default Home;
