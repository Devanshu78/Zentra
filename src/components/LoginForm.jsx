import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";

// Simple CSS-only icons
const LockIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const EyeIcon = ({ show }) => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {show ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
      />
    ) : (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </>
    )}
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const LoadingSpinner = () => (
  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
);

function LoginForm({
  setShowForm,
  credentials,
  setCredentials,
  handleCredentials,
  isMobile = false,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setCredentials((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setCredentials]
  );

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    await handleCredentials();
    setIsLoading(false);
  }, [handleCredentials]);

  const handleClose = useCallback(() => setShowForm(false), [setShowForm]);
  const togglePassword = useCallback(
    () => setShowPassword((prev) => !prev),
    []
  );

  const modalContent = (
    <div
      className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="bg-black/70 backdrop-blur-md border border-black/20 rounded-2xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full shadow-2xl mx-4 animate-scale-in smooth-hover"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center smooth-hover">
              <LockIcon />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-white smooth-fade">
              Secure Login
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-neutral-400 cursor-pointer hover:text-white transition-all duration-200 smooth-scale hover:rotate-90"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 sm:space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-neutral-300 text-sm font-medium mb-2 smooth-fade">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 text-white rounded-xl sm:rounded-2xl border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 placeholder:text-neutral-400 text-sm sm:text-base smooth-fade focus:scale-[1.02]"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-neutral-300 text-sm font-medium mb-2 smooth-fade">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 pr-10 sm:pr-12 bg-white/10 text-white rounded-xl sm:rounded-2xl border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 placeholder:text-neutral-400 text-sm sm:text-base smooth-fade focus:scale-[1.02]"
                placeholder="Enter your password"
              />
              <button
                onClick={togglePassword}
                className="absolute cursor-pointer right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white transition-all duration-200 smooth-scale"
              >
                <EyeIcon show={showPassword} />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2 sm:pt-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 cursor-pointer bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-200 shadow-lg font-medium flex items-center justify-center space-x-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed smooth-scale hover:shadow-blue-500/25"
            >
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <CheckIcon />
                  <span>Save Securely</span>
                </>
              )}
            </button>

            <button
              onClick={handleClose}
              className="flex-1 cursor-pointer bg-white/10 hover:bg-white/20 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-white/20 transition-all duration-200 font-medium text-sm sm:text-base smooth-scale"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default LoginForm;
