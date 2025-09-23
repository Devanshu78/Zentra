import React, { useState, useEffect, memo } from "react";
import LoginForm from "./LoginForm";
import axios from "axios";

const Skeleton = memo(function Skeleton({
  title,
  description,
  icon,
  BASE_URL1,
  BASE_URL2,
  REDIRECT_URL,
  isMobile = false,
}) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`${title}token`)) {
      setIsLoggedIn(true);
    }
  }, [title]);

  const handleCredentials = async () => {
    try {
      const response = await axios.post(`${BASE_URL1}`, credentials, {
        withCredentials: true,
      });
      localStorage.setItem(`${title}token`, response.data.token);
      setIsLoggedIn(true);
      setShowForm(false);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleBankRedirect = async () => {
    if (!localStorage.getItem(`${title}token`)) {
      alert("Please setup secure auto login first");
      return;
    }

    const token = localStorage.getItem(`${title}token`);

    try {
      const response = await axios.post(
        `${BASE_URL2}`,
        { token: token },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("Token set successfully, redirecting...");
        window.open(`${REDIRECT_URL}`, "_blank");
      }
    } catch (error) {
      console.error("Failed to set token:", error);
      alert("Authentication failed. Please try again.");
    }
  };

  const clearCredentials = () => {
    localStorage.removeItem(`${title}token`);
    setIsLoggedIn(false);
    document.cookie = "token=; path=/; secure; samesite=none";
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Mobile Layout */}
      <div className="flex flex-col sm:hidden space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-lg smooth-hover smooth-scale">
              <span>{icon}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-lg font-semibold truncate smooth-fade">
              {title}
            </h3>
            <p className="text-neutral-400 text-xs truncate smooth-fade">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          {!isLoggedIn && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm smooth-scale shadow-lg hover:shadow-green-500/25"
            >
              Setup Auto Login
            </button>
          )}

          {showForm && (
            <LoginForm
              setShowForm={setShowForm}
              handleCredentials={handleCredentials}
              credentials={credentials}
              setCredentials={setCredentials}
              isMobile={isMobile}
            />
          )}

          {isLoggedIn && (
            <div className="space-y-2 smooth-fade">
              <div className="text-center">
                <span className="text-green-400 text-xs font-medium">
                  ✓ Connected
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleBankRedirect}
                  className="flex-1 bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg transition-all duration-200 text-xs font-medium smooth-scale shadow-md hover:shadow-blue-500/25"
                >
                  Open
                </button>
                <button
                  onClick={clearCredentials}
                  className="flex-1 bg-gradient-to-r cursor-pointer from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg transition-all duration-200 text-xs font-medium smooth-scale shadow-md hover:shadow-red-500/25"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl smooth-hover smooth-scale">
              <span>{icon}</span>
            </div>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold smooth-fade">
              {title}
            </h3>
            <p className="text-neutral-400 text-sm smooth-fade">
              {description}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0">
          {!isLoggedIn && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r cursor-pointer from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium smooth-scale shadow-lg hover:shadow-green-500/25"
            >
              Setup Auto Login
            </button>
          )}

          {showForm && (
            <LoginForm
              setShowForm={setShowForm}
              handleCredentials={handleCredentials}
              credentials={credentials}
              setCredentials={setCredentials}
              isMobile={isMobile}
            />
          )}

          {isLoggedIn && (
            <div className="flex items-center space-x-3 smooth-fade">
              <span className="text-green-400 text-sm font-medium">
                ✓ Connected
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={handleBankRedirect}
                  className="bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium smooth-scale shadow-md hover:shadow-blue-500/25"
                >
                  Open
                </button>
                <button
                  onClick={clearCredentials}
                  className="bg-gradient-to-r cursor-pointer from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium smooth-scale shadow-md hover:shadow-red-500/25"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Skeleton;
