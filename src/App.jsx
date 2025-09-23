import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Skeleton from "./components/Skeleton";
import { ALL_SITE } from "./components/website";
import PhotoFlow from "./components/PhotoFLow";
import Expense from "./components/Expense";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const getWindowDimensions = () => {
    if (typeof window !== "undefined") {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    return { width: 1024, height: 768 }; // fallback
  };

  return (
    <div
      className={`h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${
        isLoaded ? "overflow-auto" : "overflow-hidden"
      }`}
    >
      {/* Animated Background Pattern */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width=`60` height=`60` viewBox=`0_0_60_60` xmlns=`http://www.w3.org/2000/svg`%3E%3Cg fill=`none` fill-rule=`evenodd`%3E%3Cg fill=`%239C92AC` fill-opacity=`0.05`%3E%3Ccircle cx=`30` cy=`30` r=`2`/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const { width, height } = getWindowDimensions();
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * width,
                y: Math.random() * height,
                opacity: 0,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.3 },
            }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 shadow-2xl cursor-pointer"
          >
            <motion.span
              className="text-2xl sm:text-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              🔐
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Secure Dashboard
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-neutral-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4"
          >
            Connect and manage your financial and creative services with
            enterprise-grade security
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-5xl mx-auto space-y-3 sm:space-y-4"
        >
          {ALL_SITE.map((site, index) => (
            <motion.div
              key={site.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 1 + index * 0.2,
                duration: 0.6,
                ease: "easeOut",
                type: "spring",
                damping: 15,
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <motion.div
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                }}
                className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <Skeleton
                  title={site.title}
                  description={site.description}
                  icon={site.icon}
                  BASE_URL1={site.BASE_URL1}
                  BASE_URL2={site.BASE_URL2}
                  REDIRECT_URL={site.REDIRECT_URL}
                />
              </motion.div>
            </motion.div>
          ))}
          <PhotoFlow />
          <Expense />
        </motion.div>
      </div>

      {/* Loading Overlay */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-2xl text-white"
            >
              🔐
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
