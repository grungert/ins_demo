'use client';

import Image from "next/image";
import { ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Slideshow from "@/components/Slideshow";
import StickyHeader from "@/components/StickyHeader";
import { useEffect, useState } from "react";

export default function Home() {
  // All notifications data (simulating database)
  const allNotifications = [
    {
      title: "Application Deadline Extended",
      content: "The deadline for PhD program applications has been extended to March 15, 2024.",
      date: "January 28, 2024",
      type: "Important",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      pillColor: "bg-red-500",
      svgPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    },
    {
      title: "New Research Collaboration Opportunity",
      content: "We are pleased to announce a new partnership with leading European institutions for joint research projects.",
      date: "January 25, 2024",
      type: "Opportunity",
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
      pillColor: "bg-teal-500",
      svgPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
    {
      title: "Conference Registration Now Open",
      content: "Registration is now open for the Annual Conference on Advanced Studies. Early bird discount available until February 1st.",
      date: "January 22, 2024",
      type: "Event",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      pillColor: "bg-blue-500",
      svgPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    },
    {
      title: "Library Hours Update",
      content: "Please note that library hours will be extended during exam period (February 1-15). Open until 10 PM on weekdays.",
      date: "January 20, 2024",
      type: "Update",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      pillColor: "bg-pink-500",
      svgPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    {
      title: "New Faculty Position Available",
      content: "We are seeking a dynamic researcher to join our Computational Sciences department. Applications due March 1st.",
      date: "January 18, 2024",
      type: "Job",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      pillColor: "bg-green-500",
      svgPath: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0V4a2 2 0 00-2-2H10a2 2 0 00-2 2v2"
    },
    {
      title: "Student Scholarship Program",
      content: "Apply now for the Excellence Scholarship Program. Full tuition coverage available for outstanding students.",
      date: "January 15, 2024",
      type: "Opportunity",
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
      pillColor: "bg-teal-500",
      svgPath: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
    },
    {
      title: "Research Equipment Maintenance",
      content: "Scheduled maintenance on laboratory equipment will take place February 5-7. Alternative arrangements available.",
      date: "January 12, 2024",
      type: "Maintenance",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      pillColor: "bg-orange-500",
      svgPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    },
    {
      title: "International Student Exchange",
      content: "New exchange program with universities in Germany and France. Information session on February 10th.",
      date: "January 10, 2024",
      type: "Event",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      pillColor: "bg-blue-500",
      svgPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  ];

  // Notification pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedNotifications, setDisplayedNotifications] = useState(allNotifications.slice(0, 4));
  const [nextNotifications, setNextNotifications] = useState<typeof allNotifications>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'up' | 'down'>('down');
  const notificationsPerPage = 4;

  // Simulate API call to load notifications
  const simulateApiCall = (direction: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 800); // Simulate network delay
    });
  };

  // Load next notifications (down button) - Push animation
  const loadNextNotifications = async () => {
    if (isLoading || isTransitioning) return;
    
    const nextPage = currentPage + 1;
    const startIndex = nextPage * notificationsPerPage;
    const endIndex = startIndex + notificationsPerPage;
    
    if (startIndex >= allNotifications.length) return;
    
    setIsLoading(true);
    setAnimationDirection('down');
    
    // API call simulation
    await simulateApiCall('down');
    
    const newNotifications = allNotifications.slice(startIndex, endIndex);
    
    // Set up for push animation: new notifications slide in from bottom
    setNextNotifications(newNotifications);
    setIsTransitioning(true);
    
    // After animation completes
    setTimeout(() => {
      setDisplayedNotifications(newNotifications);
      setCurrentPage(nextPage);
      setNextNotifications([]);
      setIsTransitioning(false);
      setIsLoading(false);
    }, 600); // Match animation duration
  };

  // Load previous notifications (up button) - Push animation
  const loadPreviousNotifications = async () => {
    if (isLoading || isTransitioning || currentPage === 0) return;
    
    const prevPage = currentPage - 1;
    const startIndex = prevPage * notificationsPerPage;
    const endIndex = startIndex + notificationsPerPage;
    
    setIsLoading(true);
    setAnimationDirection('up');
    
    // API call simulation
    await simulateApiCall('up');
    
    const newNotifications = allNotifications.slice(startIndex, endIndex);
    
    // Set up for push animation: new notifications slide in from top
    setNextNotifications(newNotifications);
    setIsTransitioning(true);
    
    // After animation completes
    setTimeout(() => {
      setDisplayedNotifications(newNotifications);
      setCurrentPage(prevPage);
      setNextNotifications([]);
      setIsTransitioning(false);
      setIsLoading(false);
    }, 600); // Match animation duration
  };

  // Check if there are more notifications
  const hasNextNotifications = (currentPage + 1) * notificationsPerPage < allNotifications.length;
  const hasPreviousNotifications = currentPage > 0;

  useEffect(() => {
    const handleScrollShadows = () => {
      const scrollContainer = document.getElementById('services-scroll-container');
      const topShadow = document.getElementById('top-shadow');
      const bottomShadow = document.getElementById('bottom-shadow');
      
      if (!scrollContainer || !topShadow || !bottomShadow) return;
      
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isScrolledFromTop = scrollTop > 5;
      const isScrolledToBottom = scrollTop >= scrollHeight - clientHeight - 5;
      
      // Show top shadow when scrolled down from top
      if (isScrolledFromTop) {
        topShadow.style.opacity = '1';
      } else {
        topShadow.style.opacity = '0';
      }
      
      // Show bottom shadow when there's more content below
      if (isScrolledToBottom) {
        bottomShadow.style.opacity = '0';
      } else {
        bottomShadow.style.opacity = '1';
      }
    };
    
    const scrollContainer = document.getElementById('services-scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScrollShadows);
      // Initial check after a small delay to ensure DOM is ready
      setTimeout(handleScrollShadows, 100);
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScrollShadows);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <StickyHeader />

      {/* Slideshow */}
      <div className="pt-20">
        <Slideshow />
      </div>

      {/* Welcome Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Welcome to the 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">
                Institute for Advanced Studies
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              A premier research institution dedicated to fostering interdisciplinary collaboration, 
              innovative thinking, and groundbreaking discoveries that shape the future of knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20" id="research">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Research Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our interdisciplinary approach spans multiple fields, fostering innovation 
              and breakthrough discoveries.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Computational Sciences",
                description: "Advanced algorithms and computational methods for complex problem solving.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Social Sciences",
                description: "Understanding human behavior and societal structures through research.",
                color: "from-green-500 to-teal-500"
              },
              {
                title: "Interdisciplinary Studies",
                description: "Breaking down barriers between traditional academic disciplines.",
                color: "from-pink-500 to-rose-500"
              }
            ].map((area, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 group">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${area.color} mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}></div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300">{area.title}</h3>
                <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">{area.description}</p>
                <button className="text-gray-900 font-medium flex items-center space-x-2 hover:space-x-3 transition-all duration-300 group-hover:text-gray-700">
                  <span>Learn more</span>
                  <ChevronRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section id="news" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest News & Events
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                gradient: "from-teal-400 to-green-400", 
                title: "Breakthrough in Computational Methods", 
                category: "Research Update",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop&crop=center"
              },
              { 
                gradient: "from-green-400 to-pink-400", 
                title: "New Interdisciplinary Research Grant", 
                category: "Funding News",
                image: null
              },
              { 
                gradient: "from-pink-400 to-rose-400", 
                title: "Advanced Studies Conference 2024", 
                category: "Event",
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&crop=center"
              },
              { 
                gradient: "from-blue-400 to-purple-400", 
                title: "AI Ethics Workshop Series", 
                category: "Workshop",
                image: null
              },
              { 
                gradient: "from-purple-400 to-indigo-400", 
                title: "International Collaboration Program", 
                category: "Partnership",
                image: null
              },
              { 
                gradient: "from-indigo-400 to-cyan-400", 
                title: "Young Researchers Fellowship", 
                category: "Opportunity",
                image: null
              }
            ].map((item, index) => (
              <article key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 group">
                <div className={`h-48 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}>
                  {item.image ? (
                    <>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Image overlay with gradient - disappears on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-60 group-hover:opacity-0 transition-opacity duration-300`}></div>
                    </>
                  ) : (
                    <div className={`h-full bg-gradient-to-r ${item.gradient}`}></div>
                  )}
                  {/* Gradient border below image */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-80`}></div>
                </div>
                <div className="p-6">
                  <span className="text-sm text-gray-500 font-medium group-hover:text-gray-600 transition-colors duration-300">{item.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                    Our team has made significant progress in developing new methodologies...
                  </p>
                </div>
              </article>
            ))}
          </div>
          
          {/* Amazing Read More News Button */}
          <div className="flex justify-center mt-16">
            <button className="group relative px-8 py-4 bg-transparent text-gray-700 font-semibold rounded-full overflow-hidden transform transition-all duration-300 ease-out hover:scale-110 hover:shadow-2xl hover:-translate-y-2">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform scale-75 group-hover:scale-100 rounded-full"></div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                <div className="absolute top-2 left-4 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="absolute top-3 right-6 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
                <div className="absolute bottom-3 left-6 w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="absolute bottom-2 right-4 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '50ms' }}></div>
              </div>
              
              {/* Button text with icon */}
              <span className="relative z-10 flex items-center space-x-3 group-hover:text-white transition-colors duration-300 ease-out">
                <span>Read More News</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              
              {/* Animated shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800 ease-out"></div>
              </div>
              
              {/* Pulsing ring effect */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 opacity-0 group-hover:opacity-100 animate-ping"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section id="notifications" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notifications
              <span className="block text-lg font-normal text-gray-600 mt-2">
                Obavještenja
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest announcements, deadlines, and important information.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Academic Services Slider - Left Side */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col relative" style={{ height: '680px' }}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex-shrink-0">
                  Academic Services
                  <span className="block text-sm font-normal text-gray-600 mt-1">
                    Akademski servisi
                  </span>
                </h3>
                
                {/* Scrollable Services Container */}
                <div id="services-scroll-container" className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                
                {/* Fixed shadow overlays - positioned relative to the parent container */}
                <div className="absolute left-6 right-6 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-300" id="top-shadow" style={{ top: '102px' }}></div>
                <div className="absolute bottom-20 left-6 right-6 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10 opacity-100 transition-opacity duration-300" id="bottom-shadow"></div>
                  {[
                    { name: "Competitions", nameLocal: "Konkursi", bgColor: "bg-blue-100", iconColor: "text-blue-600", svgPath: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
                    { name: "Bulletins", nameLocal: "Bilteni", bgColor: "bg-red-100", iconColor: "text-red-600", svgPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                    { name: "EBSCO Database", nameLocal: "EBSCO baze podataka", bgColor: "bg-green-100", iconColor: "text-green-600", svgPath: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" },
                    { name: "Academic Calendar", nameLocal: "Akademski kalendar", bgColor: "bg-orange-100", iconColor: "text-orange-600", svgPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                    { name: "Student Information", nameLocal: "Studentski informator", bgColor: "bg-purple-100", iconColor: "text-purple-600", svgPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                    { name: "Health Insurance", nameLocal: "Zdravstveno osiguranje", bgColor: "bg-cyan-100", iconColor: "text-cyan-600", svgPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
                    { name: "UNESCO Chair", nameLocal: "UNESCO Chair", bgColor: "bg-indigo-100", iconColor: "text-indigo-600", svgPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                    { name: "Alumni Card", nameLocal: "Alumni kartica", bgColor: "bg-amber-100", iconColor: "text-amber-600", svgPath: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" },
                    { name: "European Youth Card", nameLocal: "Evropska omladinska kartica", bgColor: "bg-violet-100", iconColor: "text-violet-600", svgPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                    { name: "Library Services", nameLocal: "Bibliotečke usluge", bgColor: "bg-emerald-100", iconColor: "text-emerald-600", svgPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
                    { name: "Research Portal", nameLocal: "Istraživački portal", bgColor: "bg-sky-100", iconColor: "text-sky-600", svgPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
                    { name: "Student Exchange", nameLocal: "Studentska razmjena", bgColor: "bg-pink-100", iconColor: "text-pink-600", svgPath: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
                    { name: "Thesis Repository", nameLocal: "Repozitorij teza", bgColor: "bg-teal-100", iconColor: "text-teal-600", svgPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                    { name: "Career Services", nameLocal: "Karijerne usluge", bgColor: "bg-yellow-100", iconColor: "text-yellow-600", svgPath: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0V4a2 2 0 00-2-2H10a2 2 0 00-2 2v2" }
                  ].map((service, index) => (
                    <div key={index} className="group p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200 hover:shadow-md flex-shrink-0">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <svg className={`w-6 h-6 ${service.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.svgPath} />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                            {service.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {service.nameLocal}
                          </p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* View All Services Button - Fixed at bottom */}
                <div className="mt-6 text-center flex-shrink-0">
                  <button className="group relative px-6 py-3 bg-transparent text-gray-700 font-medium rounded-full overflow-hidden transform transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      View All Services
                    </span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Notifications - Right Side */}
            <div className="lg:col-span-8">
              <div className="relative overflow-hidden p-10">
                {/* Current Notifications */}
                <div 
                  className="space-y-6"
                  style={{
                    animation: isTransitioning 
                      ? (animationDirection === 'down' 
                          ? 'slide-current-down 0.6s ease-in-out forwards' 
                          : 'slide-current-up 0.6s ease-in-out forwards')
                      : 'none'
                  }}
                >
                  {displayedNotifications.map((notification, index) => (
                    <div 
                      key={`current-${currentPage}-${index}`} 
                      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] transform hover:-translate-y-1 group border-l-4 border-transparent hover:border-opacity-100" 
                      style={{ 
                        borderImage: `linear-gradient(to bottom, var(--tw-gradient-stops)) 1`
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full ${notification.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <svg className={`w-6 h-6 ${notification.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={notification.svgPath} />
                          </svg>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                              {notification.title}
                            </h3>
                            <div className="flex items-center space-x-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${notification.pillColor} text-white`}>
                                {notification.type}
                              </span>
                              <span className="text-sm text-gray-500 flex-shrink-0">
                                {notification.date}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {notification.content}
                          </p>
                        </div>
                      </div>
                      
                      {/* Hover border effect */}
                      <div className={`absolute inset-0 rounded-2xl ${notification.pillColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
                    </div>
                  ))}
                </div>

                {/* Next Notifications (during transition) */}
                {isTransitioning && nextNotifications.length > 0 && (
                  <div 
                    className="absolute inset-0 space-y-6 transition-transform duration-600 ease-in-out"
                    style={{
                      transform: animationDirection === 'down' 
                        ? 'translateY(100%)' 
                        : 'translateY(-100%)',
                      animation: isTransitioning 
                        ? (animationDirection === 'down' 
                            ? 'slide-up-push 0.6s ease-in-out forwards' 
                            : 'slide-down-push 0.6s ease-in-out forwards')
                        : 'none'
                    }}
                  >
                    {nextNotifications.map((notification, index) => (
                      <div 
                        key={`next-${currentPage + (animationDirection === 'down' ? 1 : -1)}-${index}`} 
                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] transform hover:-translate-y-1 group border-l-4 border-transparent hover:border-opacity-100" 
                        style={{ 
                          borderImage: `linear-gradient(to bottom, var(--tw-gradient-stops)) 1`
                        }}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Icon */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-full ${notification.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <svg className={`w-6 h-6 ${notification.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={notification.svgPath} />
                            </svg>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                                {notification.title}
                              </h3>
                              <div className="flex items-center space-x-3">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${notification.pillColor} text-white`}>
                                  {notification.type}
                                </span>
                                <span className="text-sm text-gray-500 flex-shrink-0">
                                  {notification.date}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                              {notification.content}
                            </p>
                          </div>
                        </div>
                        
                        {/* Hover border effect */}
                        <div className={`absolute inset-0 rounded-2xl ${notification.pillColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
                
              {/* Pagination Buttons */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                  {/* Up Button */}
                  <button 
                    onClick={loadPreviousNotifications}
                    disabled={!hasPreviousNotifications || isLoading || isTransitioning}
                    className={`group relative p-3 rounded-full transition-all duration-300 ${
                      hasPreviousNotifications && !isLoading && !isTransitioning
                        ? 'bg-gray-100 hover:bg-blue-100 hover:scale-110 hover:shadow-lg cursor-pointer'
                        : 'bg-gray-50 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <ChevronUpIcon className={`w-6 h-6 transition-colors duration-300 ${
                      hasPreviousNotifications && !isLoading && !isTransitioning
                        ? 'text-gray-700 group-hover:text-blue-600' 
                        : 'text-gray-400'
                    }`} />
                  </button>

                  {/* Loading Indicator */}
                  <div className="flex items-center space-x-2">
                    {(isLoading || isTransitioning) && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-teal-500 border-t-transparent"></div>
                        <span className="text-sm font-medium">
                          {isTransitioning ? 'Transitioning...' : 'Loading...'}
                        </span>
                      </div>
                    )}
                    {!isLoading && !isTransitioning && (
                      <span className="text-sm text-gray-500 font-medium">
                        Page {currentPage + 1} of {Math.ceil(allNotifications.length / notificationsPerPage)}
                      </span>
                    )}
                  </div>

                  {/* Down Button */}
                  <button 
                    onClick={loadNextNotifications}
                    disabled={!hasNextNotifications || isLoading || isTransitioning}
                    className={`group relative p-3 rounded-full transition-all duration-300 ${
                      hasNextNotifications && !isLoading && !isTransitioning
                        ? 'bg-gray-100 hover:bg-teal-100 hover:scale-110 hover:shadow-lg cursor-pointer'
                        : 'bg-gray-50 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <ChevronDownIcon className={`w-6 h-6 transition-colors duration-300 ${
                      hasNextNotifications && !isLoading && !isTransitioning
                        ? 'text-gray-700 group-hover:text-teal-600' 
                        : 'text-gray-400'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* People Section */}
      <section id="people" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the brilliant minds driving innovation and discovery at our institute.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((person) => (
              <div key={person} className="text-center group">
                <div className="w-32 h-32 bg-gradient-to-r from-teal-400 to-green-400 rounded-full mx-auto mb-4 group-hover:scale-105 transition-transform duration-300"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Researcher Name</h3>
                <p className="text-gray-600 mb-2">Senior Research Fellow</p>
                <p className="text-sm text-gray-500">Computational Sciences</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to collaborate or learn more about our research? We'd love to hear from you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Address</h3>
                    <p className="text-gray-600">University of Montenegro<br />Podgorica, Montenegro</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.18.09.4.09.58 0L19 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@ims.ucg.ac.me</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                {/* Name Input with Teal Gradient */}
                <div className="relative group focus-within:scale-[1.02] transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-green-500 to-emerald-500 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 p-0.5">
                    <div className="w-full h-full bg-white rounded-lg"></div>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="relative w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white transition-all duration-300 focus:outline-none group-focus-within:border-transparent group-focus-within:bg-transparent"
                  />
                </div>
                
                {/* Email Input with Pink Gradient */}
                <div className="relative group focus-within:scale-[1.02] transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 p-0.5">
                    <div className="w-full h-full bg-white rounded-lg"></div>
                  </div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="relative w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white transition-all duration-300 focus:outline-none group-focus-within:border-transparent group-focus-within:bg-transparent"
                  />
                </div>
                
                {/* Message Textarea with Blue Gradient */}
                <div className="relative group focus-within:scale-[1.02] transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 p-0.5">
                    <div className="w-full h-full bg-white rounded-lg"></div>
                  </div>
                  <textarea 
                    placeholder="Your Message" 
                    rows={4} 
                    className="relative w-full h-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white transition-all duration-300 focus:outline-none resize-none group-focus-within:border-transparent group-focus-within:bg-transparent"
                  ></textarea>
                </div>
                
                <button className="w-full px-8 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-lg hover:from-teal-600 hover:to-green-600 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <Image
                src="/ims-logo.png"
                alt="Institute for Advanced Studies"
                width={280}
                height={80}
                className="h-12 w-auto mb-4 brightness-0 invert transition-all duration-300 hover:scale-105"
              />
              <p className="text-gray-300 max-w-md transition-colors duration-300">
                Advancing knowledge through interdisciplinary research and collaboration.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#research" className="hover:text-teal-400 transition-colors duration-300">Research</a></li>
                <li><a href="#people" className="hover:text-green-400 transition-colors duration-300">People</a></li>
                <li><a href="#news" className="hover:text-pink-400 transition-colors duration-300">News</a></li>
                <li><a href="#about" className="hover:text-blue-400 transition-colors duration-300">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Contact</h4>
              <p className="text-gray-300 text-sm transition-colors duration-300 hover:text-gray-100">
                University of Montenegro<br />
                Institute for Advanced Studies<br />
                Podgorica, Montenegro
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300 transition-all duration-300">
            <p>&copy; 2024 Institute for Advanced Studies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
