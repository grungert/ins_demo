'use client';

import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";
import { BookOpenIcon, PencilSquareIcon, DocumentTextIcon, GlobeAltIcon, ArrowDownTrayIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function PublishingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <StickyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Publishing 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500">
                Activities
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              Our <strong className="text-emerald-600">publications</strong>, <strong className="text-teal-600">journals</strong> and <strong className="text-green-600">books</strong>
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Promoting scientific knowledge through quality publications and publishing projects
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Publishing Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <BookOpenIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">12</div>
              <div className="text-sm opacity-90">Published Books</div>
            </div>
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <DocumentTextIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">3</div>
              <div className="text-sm opacity-90">Scientific Journals</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <PencilSquareIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">95</div>
              <div className="text-sm opacity-90">Published Papers</div>
            </div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <GlobeAltIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">15</div>
              <div className="text-sm opacity-90">International Collaborations</div>
            </div>
          </div>

          {/* Scientific Journals */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <DocumentTextIcon className="w-10 h-10 text-emerald-500 mr-4" />
                Scientific Journals
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Peer-reviewed scientific journals published or co-published by the Institute
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Advanced Studies Review",
                  issn: "2671-1234",
                  frequency: "Biannual",
                  scope: "Multidisciplinary research",
                  indexing: ["DOAJ", "EBSCO", "Index Copernicus"],
                  impact_factor: "1.25",
                  editor: "Prof. Dr. Marija Nikolić",
                  description: "Main journal of the Institute publishing research from all scientific fields covered by the Institute.",
                  volumes: 4,
                  gradient: "from-emerald-500 to-teal-500",
                  bgGradient: "from-emerald-50 to-teal-50",
                  status: "active"
                },
                {
                  title: "Balkan Technology Journal",
                  issn: "2671-5678",
                  frequency: "Quarterly",
                  scope: "ICT and technological innovations",
                  indexing: ["DBLP", "IEEE Xplore", "ACM Digital Library"],
                  impact_factor: "2.15",
                  editor: "Prof. Dr. Stefan Petrović",
                  description: "Specialized journal for publishing papers in information and communication technologies.",
                  volumes: 3,
                  gradient: "from-blue-500 to-cyan-500",
                  bgGradient: "from-blue-50 to-cyan-50",
                  status: "active"
                },
                {
                  title: "Journal of Social Policy Research",
                  issn: "2671-9012",
                  frequency: "Quarterly",
                  scope: "Public policy and social sciences",
                  indexing: ["SSCI", "Scopus", "ERIH PLUS"],
                  impact_factor: "1.85",
                  editor: "Dr. Svetlana Milić",
                  description: "Journal dedicated to public policy research and social phenomena in the Southeast European region.",
                  volumes: 2,
                  gradient: "from-purple-500 to-pink-500",
                  bgGradient: "from-purple-50 to-pink-50",
                  status: "active"
                }
              ].map((journal, index) => (
                <div key={index} className={`bg-gradient-to-br ${journal.bgGradient} rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-opacity-20`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 bg-gradient-to-r ${journal.gradient} text-white text-xs rounded-full font-medium`}>
                      {journal.frequency}
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-gray-700 transition-colors duration-300">
                    {journal.title}
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    {journal.description}
                  </p>
                  
                  {/* Journal Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span><strong>ISSN:</strong></span>
                      <span>{journal.issn}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span><strong>Impact Factor:</strong></span>
                      <span className="font-semibold text-emerald-600">{journal.impact_factor}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span><strong>Editor-in-Chief:</strong></span>
                      <span>{journal.editor}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span><strong>Volume Number:</strong></span>
                      <span>{journal.volumes}</span>
                    </div>
                  </div>
                  
                  {/* Indexing */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2">Indexed in:</h4>
                    <div className="flex flex-wrap gap-1">
                      {journal.indexing.map((index, indexIndex) => (
                        <span key={indexIndex} className="px-2 py-1 bg-white bg-opacity-70 text-xs text-gray-700 rounded-lg">
                          {index}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className={`flex-1 px-4 py-2 bg-gradient-to-r ${journal.gradient} text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium`}>
                      Submit Paper
                    </button>
                    <button className="px-4 py-2 bg-white bg-opacity-70 text-gray-700 rounded-lg hover:bg-opacity-100 transition-all duration-300 text-sm">
                      <ArrowDownTrayIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Published Books */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <BookOpenIcon className="w-10 h-10 text-teal-500 mr-4" />
                Published Books
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Monographs, proceedings and professional publications
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Artificial Intelligence in the Digital Age",
                  authors: ["Prof. Dr. Stefan Petrović", "Dr. Jelena Marković"],
                  year: 2024,
                  pages: 320,
                  isbn: "978-86-7746-XXX-X",
                  type: "monograph",
                  language: "English",
                  description: "Comprehensive overview of artificial intelligence applications in digital transformation.",
                  gradient: "from-blue-500 to-indigo-500"
                },
                {
                  title: "Democratic Processes in the Western Balkans",
                  authors: ["Prof. Dr. Marija Nikolić"],
                  year: 2023,
                  pages: 280,
                  isbn: "978-86-7746-YYY-Y",
                  type: "monograph",
                  language: "Montenegrin",
                  description: "Analysis of democratic institutions and processes in regional countries.",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  title: "Biomarkers in Precision Medicine",
                  authors: ["Prof. Dr. Ana Jovanović", "Dr. Aleksandar Stanković"],
                  year: 2024,
                  pages: 450,
                  isbn: "978-86-7746-ZZZ-Z",
                  type: "monograph",
                  language: "English",
                  description: "Latest research in personalized medicine and biomarkers.",
                  gradient: "from-pink-500 to-rose-500"
                },
                {
                  title: "Proceedings of AI Conference 2024",
                  authors: ["Edited by Stefan Petrović", "Marija Nikolić"],
                  year: 2024,
                  pages: 180,
                  isbn: "978-86-7746-AAA-A",
                  type: "proceedings",
                  language: "English",
                  description: "Proceedings from the international conference on artificial intelligence.",
                  gradient: "from-purple-500 to-violet-500"
                },
                {
                  title: "Cyber Security Handbook",
                  authors: ["Dr. Nikola Vuković", "et al."],
                  year: 2023,
                  pages: 380,
                  isbn: "978-86-7746-BBB-B",
                  type: "handbook",
                  language: "English/Montenegrin",
                  description: "Practical handbook for cybersecurity in the digital age.",
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  title: "Gender Studies in SEE",
                  authors: ["Dr. Milica Đorđević", "Dr. Svetlana Milić"],
                  year: 2023,
                  pages: 220,
                  isbn: "978-86-7746-CCC-C",
                  type: "proceedings",
                  language: "English",
                  description: "Gender equality studies in Southeast European countries.",
                  gradient: "from-teal-500 to-cyan-500"
                }
              ].map((book, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                  {/* Book Cover Placeholder */}
                  <div className={`h-48 bg-gradient-to-r ${book.gradient} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}>
                    <BookOpenIcon className="w-16 h-16 text-white opacity-70" />
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-white bg-opacity-20 text-white text-xs rounded">
                      {book.year}
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-1 bg-gradient-to-r ${book.gradient} text-white text-xs rounded-full font-medium capitalize`}>
                      {book.type}
                    </span>
                    <span className="text-xs text-gray-500">{book.pages} pages</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {book.title}
                  </h3>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    {book.authors.map((author, authorIndex) => (
                      <div key={authorIndex}>{author}</div>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {book.description}
                  </p>
                  
                  <div className="space-y-1 text-xs text-gray-600 mb-4">
                    <div><strong>ISBN:</strong> {book.isbn}</div>
                    <div><strong>Language:</strong> {book.language}</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className={`flex-1 px-3 py-2 bg-gradient-to-r ${book.gradient} text-white rounded-lg hover:shadow-md transition-all duration-300 text-sm font-medium`}>
                      Download
                    </button>
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm">
                      Info
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publishing Services */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <PencilSquareIcon className="w-10 h-10 text-purple-500 mr-4" />
                Publishing Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                What we offer to authors and researchers
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Peer Review",
                  description: "Professional manuscript review",
                  features: ["Independent reviewers", "Fast procedure", "Constructive feedback"],
                  icon: CheckCircleIcon,
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  title: "Editorial Support",
                  description: "Manuscript preparation assistance",
                  features: ["Language editing", "Format guidelines", "Style consistency"],
                  icon: PencilSquareIcon,
                  gradient: "from-blue-500 to-indigo-500"
                },
                {
                  title: "Open Access",
                  description: "Free access to publications",
                  features: ["DOAJ indexed", "CC licensing", "Global visibility"],
                  icon: GlobeAltIcon,
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  title: "Digital Publishing",
                  description: "Modern publishing technologies",
                  features: ["DOI assignment", "Metadata standardization", "Indexing support"],
                  icon: DocumentTextIcon,
                  gradient: "from-orange-500 to-red-500"
                }
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-1 text-xs text-gray-700">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center space-x-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-3xl shadow-2xl p-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Publish With Us
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
              Interested in publishing your work through our publishing platforms? 
              Contact our editorial team for more information about procedures and criteria.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="group relative px-8 py-3 bg-white text-teal-600 font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                <span className="relative z-10">Submit Manuscript</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-100 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group relative px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-110 hover:bg-white hover:text-teal-600">
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
                <li><a href="/" className="hover:text-emerald-400 transition-colors duration-300">Home</a></li>
                <li><a href="/outreach/events" className="hover:text-teal-400 transition-colors duration-300">Events</a></li>
                <li><a href="/outreach/collaborations" className="hover:text-green-400 transition-colors duration-300">Collaborations</a></li>
                <li><a href="/research/publications" className="hover:text-blue-400 transition-colors duration-300">Publications</a></li>
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