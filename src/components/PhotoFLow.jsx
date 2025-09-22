import React from "react";
import { motion } from "framer-motion";

const photoflow = "https://photo-inventory-manager-annuthokvikreta.replit.app";

function PhotoFlow() {
  return (
    <div className="p-4 sm:p-6">
      {/* Mobile Layout */}
      <div className="flex flex-col sm:hidden space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <div className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-lg cursor-pointer"
            >
              <motion.span
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                📸
              </motion.span>
            </motion.div>
          </div>
          <div className="flex-1 min-w-0">
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-white text-lg font-semibold truncate cursor-default"
            >
              PhotoFlow
            </motion.h3>
            <motion.p
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              className="text-neutral-400 text-xs truncate"
            >
              Smart photo management and processing
            </motion.p>
          </div>
        </motion.div>

        {/* Mobile Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col space-y-2"
        >
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowForm(true)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/25 font-medium text-sm relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <a href={photoflow} target="_blank" className="relative z-10">
              Setup Auto Login
            </a>
          </motion.button>
        </motion.div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-4"
        >
          <div className="flex-shrink-0">
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl cursor-pointer"
            >
              <motion.span
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                📸
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
                color: "#a855f7",
              }}
              className="text-white text-xl font-semibold cursor-default transition-colors duration-300"
            >
              PhotoFlow
            </motion.h3>
            <motion.p
              initial={{ opacity: 0.7 }}
              whileHover={{
                opacity: 1,
                scale: 1.02,
              }}
              className="text-neutral-400 text-sm transition-all duration-300"
            >
              Smart photo management and processing
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex-shrink-0"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 15px 35px -5px rgba(34, 197, 94, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/25 font-medium relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />
            <a href={photoflow} target="_blank" className="relative z-10">
              Setup Auto Login
            </a>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default PhotoFlow;
