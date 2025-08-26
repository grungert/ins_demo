'use client';

import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";
import { NewspaperIcon, CalendarIcon, UserIcon, TagIcon, MagnifyingGlassIcon, FunnelIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const newsItems = [
    {
      id: 1,
      title: "Institute Receives Prestigious ERC Starting Grant",
      excerpt: "Prof. Dr. Ana Jovanović received an ERC Starting Grant worth 1.5 million euros for biomarker research in personalized medicine.",
      content: "This is a significant success for our institute and recognition of our research quality at the European level. The grant will enable the formation of a new research team and acquisition of state-of-the-art equipment.",
      date: "2024-11-15",
      author: "Institute for Advanced Studies",
      category: "Research",
      type: "Success",
      image: null,
      tags: ["ERC", "Biomedicine", "Grant"],
      views: 245,
      featured: true
    },
    {
      id: 2,
      title: "Successfully Organized AI Conference in Podgorica",
      excerpt: "More than 200 participants from 15 countries attended the International Symposium on Artificial Intelligence.",
      content: "The conference brought together leading experts in AI, machine learning and robotics. Panels on ethical aspects of AI were particularly significant.",
      date: "2024-11-10",
      author: "Dr. Stefan Petrović",
      category: "Events",
      type: "Conference",
      image: null,
      tags: ["AI", "Conference", "International"],
      views: 189,
      featured: true
    },
    {
      id: 3,
      title: "Novo partnerstvo sa University of Cambridge",
      excerpt: "Signed cooperation agreement with one of the world's most famous universities.",
      content: "The partnership includes researcher exchange, joint projects in AI and cyber security, as well as opportunities for a visiting fellowship program.",
      date: "2024-11-05",
      author: "Prof. Dr. Marija Nikolić",
      category: "Partnerships",
      type: "Collaboration",
      image: null,
      tags: ["Cambridge", "Partnership", "International"],
      views: 156,
      featured: false
    },
    {
      id: 4,
      title: "Published Research on Digital Democracy",
      excerpt: "Our team published a significant study on the impact of digitalization on democratic processes in the Balkans.",
      content: "The study analyzes how digital technologies are changing political processes and civic participation in Western Balkan countries.",
      date: "2024-10-28",
      author: "Dr. Svetlana Milić",
      category: "Publications",
      type: "Research",
      image: null,
      tags: ["Democracy", "Digitalization", "Balkans"],
      views: 132,
      featured: false
    },
    {
      id: 5,
      title: "Institute Students Won Awards at Hackathon",
      excerpt: "Young researchers from our institute demonstrated their talent at the regional cybersecurity hackathon.",
      content: "A team of three PhD students won first place with an innovative solution for critical infrastructure protection.",
      date: "2024-10-20",
      author: "Dr. Nikola Vuković",
      category: "Achievements",
      type: "Award",
      image: null,
      tags: ["Hackathon", "Students", "Cyber Security"],
      views: 98,
      featured: false
    },
    {
      id: 6,
      title: "New PhD Program in Biomedicine Launched",
      excerpt: "Institute launches new doctoral program focused on personalized medicine and genomics.",
      content: "The program will enable students to access the latest technologies and collaborate with leading international institutes.",
      date: "2024-10-15",
      author: "Prof. Dr. Ana Jovanović",
      category: "Education",
      type: "Program",
      image: null,
      tags: ["PhD", "Biomedicine", "Education"],
      views: 201,
      featured: false
    }
  ];

  const categories = ['all', 'Research', 'Events', 'Partnerships', 'Publications', 'Achievements', 'Education'];
  
  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = newsItems.filter(item => item.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <StickyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              All 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-500 via-gray-600 to-zinc-600">
                News
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              <strong className="text-slate-600">News</strong>, <strong className="text-gray-600">events</strong> and <strong className="text-zinc-600">achievements</strong> in one place
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Stay informed about our latest activities and achievements
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Featured News */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <NewspaperIcon className="w-10 h-10 text-slate-500 mr-4" />
                Featured News
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Most important news and achievements of our institute
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredNews.map((item) => (
                <article key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100">
                  {/* Featured Image Placeholder */}
                  <div className="h-64 bg-gradient-to-r from-slate-500 to-gray-600 flex items-center justify-center relative">
                    <NewspaperIcon className="w-16 h-16 text-white opacity-70" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.category === 'Research' 
                          ? 'bg-blue-100 text-blue-800' 
                          : item.category === 'Events'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{new Date(item.date).toLocaleDateString('sr-Latn-ME')}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <UserIcon className="w-4 h-4" />
                        <span>{item.author}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <EyeIcon className="w-4 h-4" />
                        <span>{item.views}</span>
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-gray-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {item.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="text-slate-600 hover:text-slate-800 font-medium text-sm transition-colors duration-300">
                        Read more →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <FunnelIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* All News */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                All News
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {filteredNews.length} {filteredNews.length === 1 ? 'article' : 'articles'} 
                {selectedCategory !== 'all' && ` in category "${selectedCategory}"`}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
            
            <div className="space-y-8">
              {filteredNews.map((item) => (
                <article key={item.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border border-gray-100">
                  <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Image Placeholder */}
                    <div className="lg:w-48 h-32 bg-gradient-to-r from-gray-400 to-slate-500 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <NewspaperIcon className="w-12 h-12 text-white opacity-70" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.category === 'Research' 
                            ? 'bg-blue-100 text-blue-800' 
                            : item.category === 'Events'
                            ? 'bg-green-100 text-green-800'
                            : item.category === 'Partnerships'
                            ? 'bg-purple-100 text-purple-800'
                            : item.category === 'Publications'
                            ? 'bg-orange-100 text-orange-800'
                            : item.category === 'Achievements'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.category}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {item.type}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-gray-700 transition-colors duration-300">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {item.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date(item.date).toLocaleDateString('sr-Latn-ME')}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <UserIcon className="w-4 h-4" />
                            <span>{item.author}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <EyeIcon className="w-4 h-4" />
                            <span>{item.views}</span>
                          </span>
                        </div>
                        <button className="text-slate-600 hover:text-slate-800 font-medium text-sm transition-colors duration-300">
                          Read more →
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <NewspaperIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">No News</h3>
                <p className="text-gray-400">Try with different search criteria</p>
              </div>
            )}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-slate-600 to-gray-700 rounded-3xl shadow-2xl p-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
              Subscribe to our newsletter and regularly receive the latest news, 
              event notifications and information about research projects.
            </p>
            
            <div className="max-w-md mx-auto mb-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="px-6 py-3 bg-white text-slate-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
            
            <p className="text-sm opacity-75">
              You can unsubscribe from the newsletter at any time. Your data is secure and will not be shared with third parties.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <Image
                src="/img-logo.svg"
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
                <li><a href="/" className="hover:text-slate-400 transition-colors duration-300">Home</a></li>
                <li><a href="/research/programs" className="hover:text-gray-400 transition-colors duration-300">Research</a></li>
                <li><a href="/about-us/people" className="hover:text-zinc-400 transition-colors duration-300">People</a></li>
                <li><a href="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact</a></li>
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