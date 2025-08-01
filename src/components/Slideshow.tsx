'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: "Advancing Knowledge Through Research",
    subtitle: "Discover breakthrough innovations in computational sciences",
    description: "Our interdisciplinary approach brings together the brightest minds to solve complex challenges",
    gradient: "from-teal-500 via-green-500 to-blue-500",
    indicatorColor: "bg-green-500",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
    animation: "slideInLeft",
    textAnimation: "fadeInUp"
  },
  {
    id: 2,
    title: "Interdisciplinary Excellence",
    subtitle: "Breaking boundaries between traditional academic fields",
    description: "Join our community of exceptional researchers pushing the limits of knowledge",
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    indicatorColor: "bg-pink-500",
    image: null,
    animation: "zoomIn",
    textAnimation: "fadeInUp"
  },
  {
    id: 3,
    title: "Innovation & Collaboration",
    subtitle: "Where brilliant minds meet cutting-edge technology",
    description: "Explore opportunities for research collaboration and academic excellence",
    gradient: "from-blue-500 via-purple-500 to-pink-500",
    indicatorColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&crop=center",
    animation: "slideInRight",
    textAnimation: "fadeInUp"
  }
];

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getSlideTransition = (index: number, currentSlide: number) => {
    const baseClasses = "absolute inset-0 transition-all duration-1000 ease-in-out transform";
    
    if (index === currentSlide) {
      return `${baseClasses} translate-x-0 opacity-100 scale-100`;
    } else if (index < currentSlide) {
      return `${baseClasses} -translate-x-full opacity-0 scale-95`;
    } else {
      return `${baseClasses} translate-x-full opacity-0 scale-95`;
    }
  };

  const getTextAnimationClasses = (textAnimation: string, isActive: boolean, delay: number) => {
    const baseClasses = "transform transition-all duration-700";
    
    if (!isActive) return `${baseClasses} opacity-0 translate-y-10`;
    
    switch (textAnimation) {
      case 'fadeInUp':
        return `${baseClasses} opacity-100 translate-y-0 animate-fade-in-up delay-${delay}`;
      case 'slideInRight':
        return `${baseClasses} opacity-100 translate-x-0 translate-y-0 animate-slide-in-right delay-${delay}`;
      case 'rotateIn':
        return `${baseClasses} opacity-100 translate-y-0 animate-rotate-in delay-${delay}`;
      default:
        return `${baseClasses} opacity-100 translate-y-0 delay-${delay}`;
    }
  };

  return (
    <div 
      className="relative h-[600px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Custom animations styles */}
      <style jsx global>{`
        @keyframes slide-in-left {
          from { transform: translateX(-100%) scale(0.9); opacity: 0; }
          to { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%) scale(0.9); opacity: 0; }
          to { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes zoom-in {
          from { transform: scale(0.8) rotate(-5deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes rotate-in {
          from { transform: rotate(-10deg) scale(0.9); opacity: 0; }
          to { transform: rotate(0deg) scale(1); opacity: 1; }
        }
        .animate-slide-in-left { animation: slide-in-left 1s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 1s ease-out; }
        .animate-zoom-in { animation: zoom-in 1s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.7s ease-out; }
        .animate-rotate-in { animation: rotate-in 0.7s ease-out; }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-900 { animation-delay: 900ms; }
      `}</style>

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={getSlideTransition(index, currentSlide)}
        >
          <div className={`h-full bg-gradient-to-br ${slide.gradient} relative overflow-hidden`}>
            {/* Animated Background Patterns - Different animations for each slide */}
            <div className="absolute inset-0 opacity-20">
              {slide.animation === 'slideInLeft' && (
                <>
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-2xl transform rotate-12 animate-spin"></div>
                  <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/15 rounded-full animate-bounce"></div>
                  <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-lg animate-pulse"></div>
                </>
              )}
              {slide.animation === 'zoomIn' && (
                <>
                  <div className="absolute top-20 right-10 w-40 h-20 bg-white/15 rounded-full animate-ping"></div>
                  <div className="absolute bottom-40 left-10 w-28 h-28 bg-white/20 rounded-lg transform rotate-45 animate-pulse"></div>
                  <div className="absolute top-40 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
                </>
              )}
              {slide.animation === 'slideInRight' && (
                <>
                  <div className="absolute top-40 left-20 w-36 h-36 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-20 right-20 w-20 h-40 bg-white/20 rounded-2xl transform -rotate-12 animate-bounce"></div>
                  <div className="absolute top-20 right-1/3 w-24 h-24 bg-white/15 rounded-2xl animate-spin"></div>
                </>
              )}
            </div>

            {/* Main Content Layout */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {slide.image ? (
                  /* Layout with Image - Side by side */
                  <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
                    {/* Text Content - Left Side */}
                    <div className="space-y-6">
                      <div className={getTextAnimationClasses(slide.textAnimation, index === currentSlide, 300)}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                          {slide.title}
                        </h1>
                      </div>
                      
                      <div className={getTextAnimationClasses(slide.textAnimation, index === currentSlide, 500)}>
                        <h2 className="text-lg md:text-xl lg:text-2xl text-white/90 mb-4 font-light">
                          {slide.subtitle}
                        </h2>
                      </div>

                      <div className={getTextAnimationClasses(slide.textAnimation, index === currentSlide, 700)}>
                        <p className="text-base md:text-lg text-white/80 mb-6 leading-relaxed">
                          {slide.description}
                        </p>
                      </div>

                      <div className={getTextAnimationClasses(slide.textAnimation, index === currentSlide, 900)}>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <button className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
                            Explore Research
                          </button>
                          <button className="px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
                            Meet Our Team
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Image Content - Right Side - Much Larger */}
                    <div className="flex justify-center items-center">
                      <div className={`relative ${getTextAnimationClasses(slide.textAnimation, index === currentSlide, 1100)}`}>
                        <div className="relative w-96 h-80 md:w-[500px] md:h-[400px] lg:w-[600px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 400px, (max-width: 1024px) 500px, 600px"
                          />
                          {/* Image overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>
                        
                        {/* Decorative elements around image */}
                        <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/30 rounded-full animate-ping"></div>
                        <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-white/40 rounded-full animate-pulse"></div>
                        <div className="absolute top-1/2 -left-4 w-6 h-6 bg-white/25 rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Layout without Image - Centered Text */
                  <div className="text-center max-w-5xl mx-auto">
                    <div className={getTextAnimationClasses(slide.textAnimation, index === currentSlide, 300)}>
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        {slide.title}
                      </h1>
                    </div>
                    
                    <div className={getTextAnimationClasses(slide.textAnimation, index === currentSlide, 500)}>
                      <h2 className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 font-light">
                        {slide.subtitle}
                      </h2>
                    </div>

                    <div className={getTextAnimationClasses(slide.textAnimation, index === currentSlide, 700)}>
                      <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                        {slide.description}
                      </p>
                    </div>

                    <div className={getTextAnimationClasses(slide.textAnimation, index === currentSlide, 900)}>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
                          Explore Research
                        </button>
                        <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
                          Meet Our Team
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Smart Color Indicator */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-black/20">
        {/* Background segments */}
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`flex-1 transition-all duration-500 ${
                index === currentSlide 
                  ? slide.indicatorColor 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              style={{ cursor: 'pointer' }}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        
        {/* Slide counter */}
        <div className="absolute right-4 -top-8 bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
}