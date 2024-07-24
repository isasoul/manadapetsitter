import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const location = useLocation();

  useEffect(() => {
    setToggle(false);
  }, [location]);

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
        className="navbar"
        initial={{ y: 0 }}
        animate={{ y: showNavBar ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img 
          src={logo} 
          alt="Logo" 
          className='logo'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        <div className="navbar-links">
          {['/', '/about', '/services', '/clients', '/faq', '/contact'].map((path) => (
            <motion.div 
              key={path}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <RouterLink 
                to={path}
                className={`font-poppins font-bold cursor-pointer ${active === path ? 'text-blue-500' : 'text-gray-700'}`}
                onClick={() => handleSetActive(path)}
              >
                {path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(1).slice(1)}
              </RouterLink>
            </motion.div>
          ))}
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
            {['/', '/about', '/services', '/clients', '/faq', '/contact'].map((path) => (
              <motion.div 
                key={path}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RouterLink 
                  to={path}
                  className='text-white font-poppins font-bold text-3xl mb-5 cursor-pointer'
                  onClick={() => handleSetActive(path)}
                >
                  {path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(1).slice(1)}
                </RouterLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className='fixed top-0 left-0 w-full flex flex-col items-end p-5 bg-navbar-bg bg-cover bg-center shadow-md'
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
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
      <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full flex justify-center items-center'>
        <RouterLink to="/about">
          <div className='w-[35px] h-[35px] rounded-3xl border-4 border-blue flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-blue mb-1'
            />
          </div>
        </RouterLink>
      </div>
    </>
  );
}

export default NavBar;
