import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/Logo-3.png';
import './styles/About.css';

const About = () => {
  const [isInView, setIsInView] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Disconnect after the first intersection
        }
      },
      { threshold: 0.1 } // Adjust this threshold as needed
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <div id="about" className="about-container" ref={aboutRef}>
      <div className="about-content">
        {isInView && (
          <>
            <motion.img
              src={logo}
              alt="Logo"
              className="about-logo"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 , scale:1}}
              whileHover={{ scale: 1.2 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
            <motion.div
              className="about-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <p className="card-title">About us...</p>
              <p>Manada provides first-class care for your pets and plants while you're away, ensuring they receive the love and attention they deserve.</p>
            </motion.div>

            <motion.div
              className="about-card pink-card"
              initial={{ x: -200, opacity: 0, rotate: -10 }}
              animate={{ x: 0, opacity: 1, rotate: 2, scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <p className="">What we do...</p>
              <p>Our experienced team offers personalized care routines to maintain the comfort and happiness of your pets and the beauty of your plants.</p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default About;
