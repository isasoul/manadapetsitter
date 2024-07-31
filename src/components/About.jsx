import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import img from '../assets/rabbit.jpg';
import img2 from '../assets/guinea-pig.jpg';
import img3 from '../assets/beach-turtle.jpg';
import img4 from '../assets/beach-cat.jpg';
import img6 from '../assets/bird-fruit.jpg';
import './styles/About.css';

const About = () => {
  const images = [
    { src: img, alt: 'sleepy-cat' },
    { src: img2, alt: 'guinea-pig' },
    { src: img3, alt: 'beach-turtle' },
    { src: img4, alt: 'beach-cat' },
    { src: img6, alt: 'bird-fruit' },
  ];

  const [isInView, setIsInView] = useState(false);
  const aboutRef = useRef(null);
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [imagePositions, setImagePositions] = useState(images.map(() => 700));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, images.length * 500); // 500ms por imagen
    return () => clearTimeout(timeout);
  }, [images.length]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
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

  const handleClick = (index) => {
    if (isMobile) {
      // Lógica de animación en móvil
      const updatedPositions = imagePositions.map((pos, i) => (i === index ? 0 : pos));
      setImagePositions(updatedPositions);
    }
  };

  return (
    <div id="about" className="about-container" ref={aboutRef}>
      <div className="about-content">
        {isInView &&
          images.map((image, index) => (
            <motion.img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`about-img about-img${index + 1}`}
              initial={{ opacity: 0, x: imagePositions[index] }} // Inicia en x según la posición inicial
              animate={{ opacity: 1, x: isMobile ? 0 : 700 }} // Se anima hasta x=700 en desktop, x=0 en móvil
              whileHover={!isMobile && { // Solo aplica whileHover en desktop
                x: 0, // Regresa a x=0 al pasar el cursor
                transition: { type: "smooth", stiffness: 50, duration: 3 }
              }}
              onClick={() => handleClick(index)} // Maneja el clic en móvil
              transition={{ delay: index * 0.5, duration: 3 }}
            />
          ))}
      </div>
    </div>
  );
};

export default About;
