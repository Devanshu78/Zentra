import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

function LoginForm({
  setShowForm,
  credentials,
  setCredentials,
  handleCredentials,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await handleCredentials();
    setIsLoading(false);
  };

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-[9999]'
        onClick={() => setShowForm(false)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className='bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full shadow-2xl mx-4'
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className='flex items-center justify-between mb-6 sm:mb-8'>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'>
                <svg
                  className='w-4 h-4 sm:w-5 sm:h-5 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
              </div>
              <h2 className='text-lg sm:text-2xl font-bold text-white'>
                Secure Login
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowForm(false)}
              className='text-neutral-400 hover:text-white transition-colors'
            >
              <svg
                className='w-5 h-5 sm:w-6 sm:h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </motion.button>
          </div>

          {/* Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='space-y-4 sm:space-y-6'
          >
            {/* Email Field */}
            <div>
              <label className='block text-neutral-300 text-sm font-medium mb-2'>
                Email Address
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type='email'
                name='email'
                value={credentials.email}
                onChange={handleInputChange}
                className='w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl sm:rounded-2xl border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 placeholder:text-neutral-400 text-sm sm:text-base'
                placeholder='Enter your email'
              />
            </div>

            {/* Password Field */}
            <div>
              <label className='block text-neutral-300 text-sm font-medium mb-2'>
                Password
              </label>
              <div className='relative'>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={credentials.password}
                  onChange={handleInputChange}
                  className='w-full px-3 sm:px-4 py-3 sm:py-4 pr-10 sm:pr-12 bg-white/10 backdrop-blur-sm text-white rounded-xl sm:rounded-2xl border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 placeholder:text-neutral-400 text-sm sm:text-base'
                  placeholder='Enter your password'
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white'
                >
                  {showPassword ? (
                    <svg
                      className='w-4 h-4 sm:w-5 sm:h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                      />
                    </svg>
                  ) : (
                    <svg
                      className='w-4 h-4 sm:w-5 sm:h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2 sm:pt-4'>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isLoading}
                className='flex-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium flex items-center justify-center space-x-2 text-sm sm:text-base'
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className='w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full'
                  />
                ) : (
                  <>
                    <svg
                      className='w-4 h-4 sm:w-5 sm:h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    <span>Save Securely</span>
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForm(false)}
                className='flex-1 bg-white/10 hover:bg-white/20 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-white/20 transition-all duration-300 font-medium text-sm sm:text-base'
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Use React Portal to render outside the normal DOM hierarchy
  return createPortal(modalContent, document.body);
}

export default LoginForm;
