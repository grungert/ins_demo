'use client';

import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";
import { BookOpenIcon, MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon, EyeIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function PublicationsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const publications = [
    {
      id: 1,
      title: "Artificial Intelligence in Healthcare: A Comprehensive Review",
      authors: ["Dr. Stefan Petrović", "Dr. Ana Jovanović", "MSc. Petar Jovanović"],
      journal: "Nature Medicine",
      year: 2024,
      type: "journal",
      category: "ICT",
      impact_factor: 87.241,
      citations: 23,
      doi: "10.1038/nm.2024.001",
      abstract: "This comprehensive review examines the current applications of artificial intelligence in healthcare, focusing on diagnostic imaging, drug discovery, and personalized treatment approaches.",
      status: "published",
      open_access: true
    },
    {
      id: 2,
      title: "Democratic Backsliding in the Western Balkans: A Comparative Analysis",
      authors: ["Prof. Dr. Marija Nikolić", "Dr. Svetlana Milić"],
      journal: "Journal of Democracy",
      year: 2024,
      type: "journal",
      category: "Social Sciences",
      impact_factor: 4.652,
      citations: 15,
      doi: "10.1353/jod.2024.0045",
      abstract: "An analysis of democratic institutions and processes in Western Balkan countries, examining factors contributing to democratic backsliding.",
      status: "published",
      open_access: false
    },
    {
      id: 3,
      title: "Novel Biomarkers for Early Detection of Alzheimer's Disease",
      authors: ["Prof. Dr. Ana Jovanović", "Dr. Aleksandar Stanković"],
      journal: "The Lancet Neurology",
      year: 2023,
      type: "journal",
      category: "Biomedicine",
      impact_factor: 59.935,
      citations: 89,
      doi: "10.1016/S1474-4422(23)00234-1",
      abstract: "Identification of novel protein biomarkers in cerebrospinal fluid for early detection of Alzheimer's disease pathology.",
      status: "published",
      open_access: true
    },
    {
      id: 4,
      title: "Cybersecurity Threats in Smart City Infrastructure",
      authors: ["Dr. Nikola Vuković", "Dr. Jelena Marković"],
      conference: "IEEE International Conference on Smart Cities",
      year: 2024,
      type: "conference",
      category: "ICT",
      citations: 7,
      doi: "10.1109/SmartCities.2024.001",
      abstract: "Analysis of cybersecurity vulnerabilities in smart city infrastructure and proposed mitigation strategies.",
      status: "published",
      open_access: true
    },
    {
      id: 5,
      title: "Gender Equality Policies in Higher Education: A Regional Perspective",
      authors: ["Dr. Miloš Radić", "MSc. Milica Đorđević"],
      book: "Advances in Gender Studies",
      publisher: "Springer",
      year: 2023,
      type: "book_chapter",
      category: "Social Sciences",
      citations: 12,
      isbn: "978-3-031-12345-6",
      abstract: "Examination of gender equality policies implementation in higher education institutions across Southeast Europe.",
      status: "published",
      open_access: false
    },
    {
      id: 6,
      title: "Machine Learning Approaches for Cancer Prognosis Prediction",
      authors: ["MSc. Marko Popović", "Prof. Dr. Ana Jovanović"],
      journal: "Bioinformatics",
      year: 2024,
      type: "journal",
      category: "Biomedicine",
      impact_factor: 6.937,
      citations: 31,
      doi: "10.1093/bioinformatics/btab234",
      abstract: "Development of machine learning models for predicting cancer prognosis using multi-omics data integration.",
      status: "published",
      open_access: true
    }
  ];

  const categories = ['all', 'ICT', 'Social Sciences', 'Biomedicine'];
  const types = ['all', 'journal', 'conference', 'book_chapter'];

  const filteredPublications = publications.filter(pub => {
    const matchesFilter = selectedFilter === 'all' || pub.category === selectedFilter;
    const matchesSearch = searchQuery === '' || 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <StickyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Scientific 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Publications
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              <strong className="text-indigo-600">Repository</strong> of all scientific papers and publications
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Access our rich collection of research papers from various scientific fields
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Publication Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-center text-white shadow-lg">
              <BookOpenIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">{publications.length}</div>
              <div className="text-sm opacity-90">Total Publications</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-center text-white shadow-lg">
              <EyeIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">{publications.reduce((sum, pub) => sum + pub.citations, 0)}</div>
              <div className="text-sm opacity-90">Total Citations</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-center text-white shadow-lg">
              <CalendarIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">2024</div>
              <div className="text-sm opacity-90">Latest Publications</div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-center text-white shadow-lg">
              <ArrowDownTrayIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">{publications.filter(pub => pub.open_access).length}</div>
              <div className="text-sm opacity-90">Open Access</div>
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
                  placeholder="Search publications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <FunnelIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
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

          {/* Publications List */}
          <div className="space-y-8">
            {filteredPublications.map((publication) => (
              <div key={publication.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] border border-gray-100">
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                          publication.category === 'ICT' 
                            ? 'bg-green-100 text-green-800' 
                            : publication.category === 'Social Sciences'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-pink-100 text-pink-800'
                        }`}>
                          {publication.category}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                          {publication.type === 'journal' ? 'Journal' : 
                           publication.type === 'conference' ? 'Conference' : 
                           'Book Chapter'}
                        </span>
                        {publication.open_access && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                            Open Access
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 font-medium">{publication.year}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors duration-300 cursor-pointer">
                      {publication.title}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">
                        {publication.authors.join(', ')}
                      </span>
                    </div>
                    
                    <div className="text-gray-600 text-sm mb-4">
                      {publication.journal && (
                        <div className="mb-1">
                          <strong>Journal:</strong> {publication.journal}
                          {publication.impact_factor && (
                            <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              IF: {publication.impact_factor}
                            </span>
                          )}
                        </div>
                      )}
                      {publication.conference && (
                        <div className="mb-1"><strong>Conference:</strong> {publication.conference}</div>
                      )}
                      {publication.book && (
                        <div className="mb-1"><strong>Book:</strong> {publication.book}</div>
                      )}
                      {publication.publisher && (
                        <div className="mb-1"><strong>Publisher:</strong> {publication.publisher}</div>
                      )}
                      {publication.doi && (
                        <div className="mb-1"><strong>DOI:</strong> {publication.doi}</div>
                      )}
                      {publication.isbn && (
                        <div className="mb-1"><strong>ISBN:</strong> {publication.isbn}</div>
                      )}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {publication.abstract}
                    </p>
                  </div>
                  
                  {/* Sidebar */}
                  <div className="lg:w-64 flex-shrink-0">
                    <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                      
                      {/* Citations */}
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-indigo-600">{publication.citations}</div>
                        <div className="text-xs text-gray-600">Citations</div>
                      </div>
                      
                      {/* Actions */}
                      <div className="space-y-2">
                        <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-sm font-medium flex items-center justify-center space-x-2">
                          <ArrowDownTrayIcon className="w-4 h-4" />
                          <span>Download PDF</span>
                        </button>
                        <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm font-medium flex items-center justify-center space-x-2">
                          <EyeIcon className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                      
                      {/* Publication Info */}
                      <div className="text-xs text-gray-600 space-y-1">
                        <div><strong>Status:</strong> {publication.status === 'published' ? 'Published' : 'In Preparation'}</div>
                        <div><strong>Year:</strong> {publication.year}</div>
                        {publication.impact_factor && (
                          <div><strong>Impact Factor:</strong> {publication.impact_factor}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>

          {/* Submit Publication CTA */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Share Your Work
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
              If you are a researcher and want to share your publications with our community, 
              contact us or submit your work directly.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="group relative px-8 py-3 bg-white text-purple-600 font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                <span className="relative z-10">Submit Publication</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group relative px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-110 hover:bg-white hover:text-purple-600">
                <span className="relative z-10">Author Guidelines</span>
              </button>
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
                <li><a href="/" className="hover:text-indigo-400 transition-colors duration-300">Home</a></li>
                <li><a href="/research/programs" className="hover:text-teal-400 transition-colors duration-300">Programs</a></li>
                <li><a href="/research/projects" className="hover:text-purple-400 transition-colors duration-300">Projects</a></li>
                <li><a href="/about-us/people" className="hover:text-blue-400 transition-colors duration-300">People</a></li>
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