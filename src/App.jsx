import { useState, useEffect, lazy, Suspense } from "react";
import { usePerformance } from "./usePerformance";

// Lazy load components for better performance
const Skeleton = lazy(() => import("./components/Skeleton"));
const PhotoFlow = lazy(() => import("./components/PhotoFLow"));
const Expense = lazy(() => import("./components/Expense"));
import { ALL_SITE } from "./components/website";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isMobile } = usePerformance();

  useEffect(() => {
    // Immediate loading - no delays
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Static background */}
      <div className="fixed inset-0 bg-slate-900/50" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 shadow-lg mx-auto">
            <span className="text-2xl sm:text-3xl">🔐</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            Secure Dashboard
          </h1>

          <p className="text-neutral-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Connect and manage your financial and creative services with
            enterprise-grade security
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4">
          {ALL_SITE.map((site, index) => (
            <div key={site.title} className="group">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 transition-colors duration-200 hover:shadow-lg hover:shadow-purple-500/10">
                <Suspense
                  fallback={<div className="p-6 h-24 bg-white/5 rounded-xl" />}
                >
                  <Skeleton
                    title={site.title}
                    description={site.description}
                    icon={site.icon}
                    BASE_URL1={site.BASE_URL1}
                    BASE_URL2={site.BASE_URL2}
                    REDIRECT_URL={site.REDIRECT_URL}
                    isMobile={isMobile}
                  />
                </Suspense>
              </div>
            </div>
          ))}

          <Suspense
            fallback={<div className="p-6 h-24 bg-white/5 rounded-xl" />}
          >
            <PhotoFlow isMobile={isMobile} />
          </Suspense>

          <Suspense
            fallback={<div className="p-6 h-24 bg-white/5 rounded-xl" />}
          >
            <Expense isMobile={isMobile} />
          </Suspense>
        </div>
      </div>

      {/* Static Loading Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <span className="text-2xl text-white">��</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
