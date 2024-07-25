import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './components/About';
import Services from './components/Services';
import Clients from './components/Clients';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import './index.css';
import Home from './components/Home';

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0'>
      <section id="home">
      <Home />
      </section>

        <section id="navbar">
        <NavBar />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="clients">
          <Clients />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
    </BrowserRouter>
  );
};

export default App;
