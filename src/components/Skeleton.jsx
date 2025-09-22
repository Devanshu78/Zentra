import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoginForm from './LoginForm';
import axios from 'axios';

function Skeleton({
  title,
  description,
  icon,
  BASE_URL1,
  BASE_URL2,
  REDIRECT_URL,
}) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`${title}token`)) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCredentials = async () => {
    try {
      const response = await axios.post(`${BASE_URL1}`, credentials, {
        withCredentials: true,
      });
      localStorage.setItem(`${title}token`, response.data.token);
      setIsLoggedIn(true);
      setShowForm(false);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleBankRedirect = async () => {
    if (!localStorage.getItem(`${title}token`)) {
      alert('Please setup secure auto login first');
      return;
    }

    const token = localStorage.getItem(`${title}token`);

    try {
      const response = await axios.post(
        `${BASE_URL2}`,
        {
          token: token,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log('Token set successfully, redirecting...');
        window.open(`${REDIRECT_URL}`, '_blank');
      }
    } catch (error) {
      console.error('Failed to set token:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  const clearCredentials = () => {
    localStorage.removeItem(`${title}token`);
    setIsLoggedIn(false);
    document.cookie = 'token=; path=/; secure; samesite=none';
  };

  return (
    <div className='p-4 sm:p-6'>
      {/* Mobile Layout */}
      <div className='flex flex-col sm:hidden space-y-4'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='flex items-center space-x-3'
        >
          <div className='flex-shrink-0'>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-lg cursor-pointer'
            >
              <motion.span
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                {icon}
              </motion.span>
            </motion.div>
          </div>
          <div className='flex-1 min-w-0'>
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className='text-white text-lg font-semibold truncate cursor-default'
            >
              {title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              className='text-neutral-400 text-xs truncate'
            >
              {description}
            </motion.p>
          </div>
        </motion.div>

        {/* Mobile Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='flex flex-col space-y-2'
        >
          {!isLoggedIn && !showForm && (
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowForm(true)}
              className='w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/25 font-medium text-sm relative overflow-hidden'
            >
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className='relative z-10'>Setup Auto Login</span>
            </motion.button>
          )}

          {showForm && (
            <LoginForm
              setShowForm={setShowForm}
              handleCredentials={handleCredentials}
              credentials={credentials}
              setCredentials={setCredentials}
            />
          )}

          {isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className='space-y-2'
            >
              <div className='text-center'>
                <span className='text-green-400 text-xs font-medium'>
                  ✓ Connected
                </span>
              </div>
              <div className='flex space-x-2'>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 5px 15px -5px rgba(59, 130, 246, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBankRedirect}
                  className='flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg transition-all duration-300 text-xs font-medium'
                >
                  Open
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 5px 15px -5px rgba(239, 68, 68, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearCredentials}
                  className='flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg transition-all duration-300 text-xs font-medium'
                >
                  Disconnect
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Desktop Layout */}
      <div className='hidden sm:flex items-center justify-between'>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='flex items-center space-x-4'
        >
          <div className='flex-shrink-0'>
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl cursor-pointer'
            >
              <motion.span
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              >
                {icon}
              </motion.span>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.h3
              whileHover={{
                scale: 1.05,
                color: '#a855f7',
              }}
              className='text-white text-xl font-semibold cursor-default transition-colors duration-300'
            >
              {title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0.7 }}
              whileHover={{
                opacity: 1,
                scale: 1.02,
              }}
              className='text-neutral-400 text-sm transition-all duration-300'
            >
              {description}
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='flex-shrink-0'
        >
          {!isLoggedIn && !showForm && (
            <motion.button
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: '0 15px 35px -5px rgba(34, 197, 94, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/25 font-medium relative overflow-hidden group'
            >
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              <span className='relative z-10'>Setup Auto Login</span>
            </motion.button>
          )}

          {showForm && (
            <LoginForm
              setShowForm={setShowForm}
              handleCredentials={handleCredentials}
              credentials={credentials}
              setCredentials={setCredentials}
            />
          )}

          {isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                type: 'spring',
                damping: 15,
              }}
              className='flex items-center space-x-3'
            >
              <span className='text-green-400 text-sm font-medium'>
                ✓ Connected
              </span>
              <div className='flex space-x-2'>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBankRedirect}
                  className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium'
                >
                  Open
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearCredentials}
                  className='bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium'
                >
                  Disconnect
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Skeleton;
