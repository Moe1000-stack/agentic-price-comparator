import React from 'react'
import { useNavigate } from 'react-router-dom'
import logoIcon from './assets/logo.jpg'
import './AboutUs.css'

const AboutUs: React.FC = () => {
  const navigate = useNavigate()

  return (
    <main className="about-page">
      <header className="header">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logoIcon} alt="PricePilot AI Logo" />
        </div>
        <nav className="nav-links">
          <button className="nav-btn active">About Us</button>
          <button className="nav-btn">Contact Us</button>
          <button className="nav-btn get-started" onClick={() => navigate('/login')}>
            Get Started
          </button>
        </nav>
      </header>

      <div className="about-container">

        <section className="welcome-section">
          <h2>Welcome to PricePilot ✈️</h2>
          <p>
            At PricePilot, we believe that finding the best deal shouldn't feel like a second job.
            You shouldn't have to open twenty different tabs, track changing prices, or wonder if
            you're actually getting the lowest price. We built PricePilot to take the turbulence
            out of online shopping and put you firmly in the captain's seat. 🧭✨
          </p>
        </section>

        <section className="team-section">
          <h2>Meet the Team 👥</h2>
          <div className="team-grid">
            <div className="team-card">
              <h4>Tyler Ingram</h4>
              <p className="team-role">AI/ML Engineer</p>
              <p>Tyler Ingram is a computer scientist and AI engineer passionate about applying machine learning and large language models to complex problems. He has worked on projects ranging from bioinformatics research to LLM-powered automation systems, with a focus on building reliable, production-ready software.</p>
            </div>
            <div className="team-card">
              <h4>Jamie Rollins</h4>
              <p className="team-role">Full-Stack & AI Engineer</p>
              <p>Jamie Rollins is a full-stack software and AI engineer with experience in agile development, prompt engineering, LLM fine-tuning, and machine learning workflows. She specializes in integrating AI systems into software applications, optimizing model performance, and developing scalable, data-driven solutions.</p>
            </div>
            <div className="team-card">
              <h4>Aryan Chauhan</h4>
              <p className="team-role">Software Engineer & Team Lead</p>
              <p>Aryan Chauhan is a software engineer who enjoys building AI agents and backend systems, with hands-on experience in Java, Python, C/C++, and C#. His work ranges from cloud graph validation in the cybersecurity field to a VR text editor for accessibility, and leading the team behind PricePilot AI.</p>
            </div>
            <div className="team-card">
              <h4>Mahima Shankar</h4>
              <p className="team-role">AI/Data Science</p>
              <p>Mahima Shankar is an AI and data science engineer focused on building intelligent, user-centered digital experiences. She contributes to the design and development of PricePilot's frontend, ensuring the platform is both functional and visually cohesive.</p>
            </div>
            <div className="team-card">
              <h4>Mohamed Salama</h4>
              <p className="team-role">Full-Stack Developer</p>
              <p>Mohamed Salama is a software developer passionate about building scalable applications and solving real-world technical problems. His experience spans full-stack development, API integration, automation, and modern web technologies, with a focus on creating reliable, efficient, and user-friendly software solutions.</p>
            </div>
          </div>
        </section>

        <section className="content-grid">
          <div className="grid-col left-col">
            <h3>What We Do 🌟</h3>
            <p>
              PricePilot is an intelligent, autonomous shopping assistant designed to do the heavy
              lifting for you. Powered by advanced agentic technology, our platform automatically
              navigates the web to hunt down, organize, and contrast product prices in the blink
              of an eye. Whether you are looking for the absolute lowest price or just trying to
              find out who has your favorite item in stock, PricePilot navigates the chaotic world
              of e-commerce so you don't have to. 🛒🛍️
            </p>
          </div>
          <div className="grid-col right-col">
            <h3>Our Mission 🎯</h3>
            <p>
              Our mission is to bring absolute transparency and effortless ease to digital retail.
              We are dedicated to building smart, user-centered digital solutions that empower
              shoppers to make confident, data-backed decisions every time they hit "Add to Cart."🛒💡
            </p>
          </div>
        </section>

      </div>
    </main>
  )
}

export default AboutUs
