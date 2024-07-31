import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from "../constants";
import logo from '../assets/Logo-4.png';
import menu from '../assets/menu.svg';
import close from '../assets/close.svg';


const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("");
  const [showPopupPerrito, setShowPopupPerrito] = useState(false);
  const [showPopupGatito, setShowPopupGatito] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavBar, setShowNavBar] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const handleSetActive = (to) => {
    setActive(to);
  };

  const handleMouseEnterPerrito = () => {
    setShowPopupPerrito(true);
    setTimeout(() => {
      setShowPopupPerrito(false);
    }, 3000);
  };

  const handleMouseEnterGatito = () => {
    setShowPopupGatito(true);
    setTimeout(() => {
      setShowPopupGatito(false);
    }, 3000);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: 0 }}
        animate={{ y: showNavBar ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          to="home"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          onClick={() => {
            setActive('home');
            setToggle(false); // Close the menu when clicking the logo
          }}
          className='flex items-center gap-2 cursor-pointer'
        >
          <motion.img
            src={logo}
            alt="Logo"
            className='logo'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ delay: 0.5 }}
          />
        </Link>

        <div className="navbar-links">
          <ul className='list-none hidden sm:flex flex-row gap-10'>
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${active === link.title ? "text-white" : "text-secondary"
                  } hover:text-white hover:scale-125 text-[20px] font-medium cursor-pointer`}
                onClick={() => setActive(link.title)}
              >
                <Link
                  to={link.id}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onSetActive={() => handleSetActive(link.title)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <img
          src={toggle ? close : menu}
          alt="menu"
          className='menu-icon w-[28px] h-[28px] object-contain cursor-pointer'
          onClick={() => setToggle(!toggle)}
        />
      </motion.nav>
      <AnimatePresence>
        {toggle && (
          <motion.div
            className='menu-mobile'
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={close}
              alt="close"
              className='close-icon'
              onClick={() => setToggle(false)}
            />
            <ul className='list-none flex justify-end items-start flex-col gap-4'>
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${active === link.title ? "text-white" : "text-secondary"
                    }`}
                >
                  <Link
                    to={link.id}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={() => setToggle(false)}
                    onSetActive={() => handleSetActive(link.title)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className='relative top-0 left-0 w-full flex flex-col items-end p-5 bg-navbar-bg bg-cover bg-center shadow-md'
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <motion.div
          className="welcome-card"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, type: 'spring' }}
        >
          <p>Welcome to Manada!</p>
          <p>
At PetSitter, we understand that your pets are part of your family. That’s why we offer the highest quality care and attention to ensure your furry friends are happy, healthy, and well taken care of while you're away. Trust us to provide a safe and loving environment for your pets, making us the best choice in town.</p>
        </motion.div>
        <div
          className="perrito-area"
          onMouseEnter={handleMouseEnterPerrito}
        ></div>
        <AnimatePresence>
          {showPopupPerrito && (
            <motion.div
              className='popup popup-perrito show'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              Hi I'm Buddy <br /> welcome to Manada PetSitter!! <br />I love being with them when my dad is not at home.
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="gatito-area"
          onMouseEnter={handleMouseEnterGatito}
        ></div>
        <AnimatePresence>
          {showPopupGatito && (
            <motion.div
              className='popup popup-gatito show'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              I swear I don't know this guy <br />please set me free!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default NavBar;
