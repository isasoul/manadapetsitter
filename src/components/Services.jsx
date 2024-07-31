import React from 'react';
import { motion } from 'framer-motion';
import './styles/Services.css';

const servicesData = [
  { title: 'Opción 1', image: 'https://via.placeholder.com/200' },
  { title: 'Opción 2', image: 'https://via.placeholder.com/200' },
];

const Services = () => {
  return (
    <div id="services" className="services-section">
      <ul className="menu">
        {servicesData.map((service, index) => (
          <li key={index} className="menu-item">
            <motion.div
              whileHover={{ rotateY: 20, rotateX: 20 }}
              className="image-container"
            >
              {service.title}
              <motion.div
                className="image"
                style={{ backgroundImage: `url(${service.image})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              ></motion.div>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
