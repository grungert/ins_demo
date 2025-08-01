'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / documentHeight) * 100;
      
      setScrollY(currentScrollY);
      setScrollProgress(Math.min(progress, 100));
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for sticky header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div 
              className={`transition-all duration-500 ${
                isScrolled ? 'scale-90' : 'scale-100'
              }`}
            >
              <Image
                src="/img-logo.svg"
                alt="Institute for Advanced Studies"
                width={280}
                height={80}
                priority
                className={`transition-all duration-500 ${
                  isScrolled ? 'h-10' : 'h-12'
                } w-auto`}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {[
              { name: 'Research', id: 'research', color: 'from-teal-500 to-green-500', bgColor: 'bg-teal-500/20', icon: '🔬' },
              { name: 'People', id: 'people', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/20', icon: '👥' },
              { name: 'News', id: 'news', color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-500/20', icon: '📰' },
              { name: 'Notifications', id: 'notifications', color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-500/20', icon: '🔔' },
              { name: 'About', id: 'about', color: 'from-blue-500 to-indigo-500', bgColor: 'bg-blue-500/20', icon: '🏛️' },
              { name: 'Contact', id: 'contact', color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-500/20', icon: '✉️' }
            ].map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative px-4 py-2 rounded-full font-medium group overflow-hidden
                  ${isScrolled ? 'text-gray-700' : 'text-gray-700'}
                  transition-all duration-200 ease-out
                  hover:-translate-y-1 hover:shadow-lg
                  min-w-[80px] text-center
                `}
              >
                {/* Background gradient on hover */}
                <div className={`
                  absolute inset-0 bg-gradient-to-r ${item.color} 
                  opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out
                  rounded-full scale-75 group-hover:scale-100
                `} />
                
                {/* Icon that appears on hover */}
                <span className={`
                  absolute -top-1 -right-1 text-xs opacity-0 group-hover:opacity-100 
                  transition-all duration-200 ease-out transform scale-0 group-hover:scale-100
                  rotate-12 group-hover:rotate-0
                `}>
                  {item.icon}
                </span>
                
                {/* Text */}
                <span className={`
                  relative z-10 transition-colors duration-200 ease-out
                  group-hover:text-white
                  group-hover:drop-shadow-sm
                `}>
                  {item.name}
                </span>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className={`absolute top-1 left-2 w-1 h-1 ${item.bgColor} rounded-full animate-bounce`} style={{ animationDelay: '50ms' }} />
                  <div className={`absolute top-2 right-3 w-1 h-1 ${item.bgColor} rounded-full animate-bounce`} style={{ animationDelay: '100ms' }} />
                  <div className={`absolute bottom-2 left-3 w-1 h-1 ${item.bgColor} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
                </div>
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className={`p-2 rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-700 hover:bg-white/20'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30">
        <div 
          className="h-full bg-gradient-to-r from-teal-500 via-green-500 to-pink-500 transition-all duration-75 ease-linear"
          style={{
            width: `${scrollProgress}%`,
            transformOrigin: 'left',
          }}
        />
      </div>
    </header>
  );
}