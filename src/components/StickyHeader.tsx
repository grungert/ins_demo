'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Function to check if a menu item is active
  const isMenuItemActive = (menuId: string, items?: Array<{ href: string }>) => {
    if (menuId === 'about-us') {
      return pathname.startsWith('/about-us');
    }
    if (menuId === 'research') {
      return pathname.startsWith('/research');
    }
    if (menuId === 'outreach') {
      return pathname.startsWith('/outreach');
    }
    // For direct links (NEWS, CONTACT)
    if (items) return false;
    return pathname === (menuId === 'news' ? '/news' : menuId === 'contact' ? '/contact' : pathname);
  };

  // Function to check if a specific submenu item is active
  const isSubmenuItemActive = (href: string) => {
    return pathname === href;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / documentHeight) * 100;
      
      setScrollProgress(Math.min(progress, 100));
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


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
              { 
                name: 'ABOUT US', 
                color: 'from-blue-500 to-indigo-500', 
                bgColor: 'bg-blue-500/20', 
                icon: '🏛️',
                hasDropdown: true,
                id: 'about-us',
                items: [
                  { name: 'Profile', href: '/about-us/profile', description: 'Mission, vision, organizational structure, history' },
                  { name: 'People', href: '/about-us/people', description: 'Core team, research associates, visiting fellows' }
                ]
              },
              { 
                name: 'RESEARCH', 
                color: 'from-teal-500 to-green-500', 
                bgColor: 'bg-teal-500/20', 
                icon: '🔬',
                hasDropdown: true,
                id: 'research',
                items: [
                  { name: 'Programs', href: '/research/programs', description: 'Defined research areas' },
                  { name: 'Projects', href: '/research/projects', description: 'Past and current projects' },
                  { name: 'Publications', href: '/research/publications', description: 'Repository of all papers' }
                ]
              },
              { 
                name: 'OUTREACH', 
                color: 'from-pink-500 to-rose-500', 
                bgColor: 'bg-pink-500/20', 
                icon: '🤝',
                hasDropdown: true,
                id: 'outreach',
                items: [
                  { name: 'Events', href: '/outreach/events', description: 'Organized panels, conferences, workshops' },
                  { name: 'Publishing', href: '/outreach/publishing', description: 'Publishing activities' },
                  { name: 'Collaborations', href: '/outreach/collaborations', description: 'Partnerships beyond UCG' }
                ]
              },
              { 
                name: 'NEWS', 
                href: '/news',
                color: 'from-orange-500 to-red-500', 
                bgColor: 'bg-orange-500/20', 
                icon: '📰',
                hasDropdown: false
              },
              { 
                name: 'CONTACT', 
                href: '/contact',
                color: 'from-purple-500 to-violet-500', 
                bgColor: 'bg-purple-500/20', 
                icon: '✉️',
                hasDropdown: false
              }
            ].map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <button
                    onMouseEnter={() => setActiveDropdown(item.id || null)}
                    className={`
                      relative px-4 py-2 rounded-full font-medium group overflow-hidden flex items-center space-x-1
                      ${isScrolled ? 'text-gray-700' : 'text-gray-700'}
                      ${isMenuItemActive(item.id || '', item.items) ? 'text-white' : ''}
                      transition-all duration-200 ease-out
                      hover:-translate-y-1 hover:shadow-lg
                      min-w-[100px] text-center
                    `}
                  >
                    {/* Background gradient on hover and active */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-r ${item.color} 
                      ${isMenuItemActive(item.id || '', item.items) ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} 
                      group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out
                      rounded-full
                    `} />
                    
                    {/* Icon that appears on hover and active */}
                    <span className={`
                      absolute -top-1 -right-1 text-xs 
                      ${isMenuItemActive(item.id || '', item.items) ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-12'}
                      group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0
                      transition-all duration-200 ease-out transform
                    `}>
                      {item.icon}
                    </span>
                    
                    {/* Text */}
                    <span className={`
                      relative z-10 transition-colors duration-200 ease-out
                      ${isMenuItemActive(item.id || '', item.items) ? 'text-white drop-shadow-sm' : ''}
                      group-hover:text-white group-hover:drop-shadow-sm
                    `}>
                      {item.name}
                    </span>
                    
                    {/* Dropdown arrow */}
                    <ChevronDownIcon className={`
                      w-4 h-4 relative z-10 transition-all duration-200 ease-out
                      ${isMenuItemActive(item.id || '', item.items) ? 'text-white' : ''}
                      group-hover:text-white
                      ${activeDropdown === item.id ? 'rotate-180' : 'rotate-0'}
                    `} />
                    
                    {/* Floating particles effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className={`absolute top-1 left-2 w-1 h-1 ${item.bgColor} rounded-full animate-bounce`} style={{ animationDelay: '50ms' }} />
                      <div className={`absolute top-2 right-3 w-1 h-1 ${item.bgColor} rounded-full animate-bounce`} style={{ animationDelay: '100ms' }} />
                      <div className={`absolute bottom-2 left-3 w-1 h-1 ${item.bgColor} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
                    </div>
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className={`
                      relative px-4 py-2 rounded-full font-medium group overflow-hidden block
                      ${isScrolled ? 'text-gray-700' : 'text-gray-700'}
                      ${pathname === item.href ? 'text-white' : ''}
                      transition-all duration-200 ease-out
                      hover:-translate-y-1 hover:shadow-lg
                      min-w-[80px] text-center
                    `}
                  >
                    {/* Background gradient on hover and active */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-r ${item.color} 
                      ${pathname === item.href ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} 
                      group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out
                      rounded-full
                    `} />
                    
                    {/* Icon that appears on hover and active */}
                    <span className={`
                      absolute -top-1 -right-1 text-xs 
                      ${pathname === item.href ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-12'}
                      group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0
                      transition-all duration-200 ease-out transform
                    `}>
                      {item.icon}
                    </span>
                    
                    {/* Text */}
                    <span className={`
                      relative z-10 transition-colors duration-200 ease-out
                      ${pathname === item.href ? 'text-white drop-shadow-sm' : ''}
                      group-hover:text-white group-hover:drop-shadow-sm
                    `}>
                      {item.name}
                    </span>
                    
                    {/* Floating particles effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className={`absolute top-1 left-2 w-1 h-1 ${item.bgColor} rounded-full animate-bounce`} style={{ animationDelay: '50ms' }} />
                      <div className={`absolute top-2 right-3 w-1 h-1 ${item.bgColor} rounded-full animate-bounce`} style={{ animationDelay: '100ms' }} />
                      <div className={`absolute bottom-2 left-3 w-1 h-1 ${item.bgColor} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
                    </div>
                  </Link>
                )}
                
                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.id && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 px-2 z-50"
                    onMouseEnter={() => setActiveDropdown(item.id || null)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.items?.map((subItem, index) => (
                      <Link
                        key={index}
                        href={subItem.href}
                        className={`block px-4 py-3 rounded-xl transition-all duration-200 group/sub ${
                          isSubmenuItemActive(subItem.href) 
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className={`font-semibold transition-colors duration-200 ${
                          isSubmenuItemActive(subItem.href) 
                            ? 'text-blue-700' 
                            : 'text-gray-900 group-hover/sub:text-gray-700'
                        }`}>
                          {subItem.name}
                        </div>
                        <div className={`text-sm mt-1 transition-colors duration-200 ${
                          isSubmenuItemActive(subItem.href) 
                            ? 'text-blue-600' 
                            : 'text-gray-600 group-hover/sub:text-gray-500'
                        }`}>
                          {subItem.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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