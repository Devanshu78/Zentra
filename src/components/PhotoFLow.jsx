import React, { memo } from "react";

const photoflow = "https://photo-inventory-manager-annuthokvikreta.replit.app";
const icon = "📸";
const title = "PhotoFlow";
const description = "Smart photo management and processing";

const PhotoFlow = memo(function PhotoFlow() {
  return (
    <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 transition-colors duration-200 hover:shadow-lg hover:shadow-purple-500/10">
      {/* Mobile Layout */}
      <div className="flex flex-col sm:hidden space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-lg">
              <span>{icon}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-lg font-semibold truncate">
              {title}
            </h3>
            <p className="text-neutral-400 text-xs truncate">{description}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <button
            onClick={() => window.open(photoflow, "_blank")}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm text-center"
          >
            Setup Auto Login
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl">
              <span>{icon}</span>
            </div>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold">{title}</h3>
            <p className="text-neutral-400 text-sm">{description}</p>
          </div>
        </div>

        <div className="flex-shrink-0">
          <button
            onClick={() => window.open(photoflow, "_blank")}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
          >
            Setup Auto Login
          </button>
        </div>
      </div>
    </div>
  );
});

export default PhotoFlow;
