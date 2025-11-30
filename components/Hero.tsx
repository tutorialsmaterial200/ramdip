import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-yellow-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-red-100/20 to-yellow-100/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-6">
              <span className="text-lg">☭</span>
              Nepali Communist Party (Maoist Center)
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                जनताको सेवामा
              </span>{" "}
              <br />
              Serving the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                People
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Dedicated to social justice, equality, and the transformation of Nepal. 
              Together we build a prosperous nation where every citizen thrives with dignity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#vision"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-xl shadow-red-500/25 group"
              >
                Our Vision
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-full border-2 border-gray-200 hover:border-red-300 hover:text-red-600 transition-all duration-200"
              >
                <Play size={18} className="text-red-600" />
                Watch Journey
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-500">Years of Service</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">100K+</div>
                <div className="text-sm text-gray-500">People United</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-500">Projects Done</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-full aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-red-600 to-red-800 shadow-2xl">
                <div className="w-full h-full flex items-center justify-center text-white/20">
                  <div className="text-center">
                    <div className="text-9xl">☭</div>
                    <div className="text-xl font-medium text-white/60 mt-4">जनता सर्वोपरि</div>
                    <div className="text-sm text-white/40 mt-2">People First</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -left-8 top-1/4 bg-white p-4 rounded-2xl shadow-xl hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✊</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">People's Power</div>
                  <div className="text-sm text-gray-500">Unity & Strength</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-8 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🇳🇵</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">For Nepal</div>
                  <div className="text-sm text-gray-500">समृद्ध नेपाल</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
        <span className="text-sm">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
