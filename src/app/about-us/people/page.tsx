'use client';

import Image from "next/image";
import Link from "next/link";
import StickyHeader from "@/components/StickyHeader";
import { UserGroupIcon, AcademicCapIcon, GlobeAltIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function PeoplePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <StickyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Our 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-500 to-blue-500">
                Team
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              <strong className="text-green-600">Researchers</strong>, <strong className="text-teal-600">Associates</strong> and <strong className="text-blue-600">Visiting Fellows</strong>
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Meet our multidisciplinary team of experts dedicated to advanced research
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Core Team Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <UserGroupIcon className="w-10 h-10 text-green-500 mr-4" />
                Core Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our core team of experts leading main research activities
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Prof. Dr. Marija Nikolić",
                  position: "Institute Director",
                  field: "Social Sciences",
                  image: null,
                  email: "marija.nikolic@ucg.ac.me",
                  phone: "+382 20 414 255",
                  bio: "Specialized in international relations and public policy. Long-term experience in managing research projects.",
                  gradient: "from-blue-500 to-indigo-500"
                },
                {
                  name: "Prof. Dr. Stefan Petrović",
                  position: "Scientific Advisor",
                  field: "ICT",
                  image: null,
                  email: "stefan.petrovic@ucg.ac.me",
                  phone: "+382 20 414 256",
                  bio: "Expert in artificial intelligence and machine learning. Author of numerous publications in international journals.",
                  gradient: "from-teal-500 to-green-500"
                },
                {
                  name: "Prof. Dr. Ana Jovanović",
                  position: "Scientific Advisor",
                  field: "Biomedicina",
                  image: null,
                  email: "ana.jovanovic@ucg.ac.me",
                  phone: "+382 20 414 257",
                  bio: "Researcher in molecular biology and genetics. Internationally recognized for work on cancer cell biology.",
                  gradient: "from-pink-500 to-rose-500"
                }
              ].map((person, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 group">
                  <div className="text-center">
                    {/* Avatar */}
                    <div className={`w-24 h-24 bg-gradient-to-r ${person.gradient} rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                      <span className="text-white text-2xl font-bold">{person.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    
                    {/* Basic Info */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                      {person.name}
                    </h3>
                    <p className="text-gray-600 mb-2 font-medium">{person.position}</p>
                    <p className="text-sm text-gray-500 mb-4">{person.field}</p>
                    
                    {/* Bio */}
                    <p className="text-sm text-gray-700 leading-relaxed mb-6 group-hover:text-gray-600 transition-colors duration-300">
                      {person.bio}
                    </p>
                    
                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <EnvelopeIcon className="w-4 h-4" />
                        <span>{person.email}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <PhoneIcon className="w-4 h-4" />
                        <span>{person.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Associates Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <AcademicCapIcon className="w-10 h-10 text-teal-500 mr-4" />
                Research Associates
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Young researchers and postdocs contributing to innovative projects
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Dr. Miloš Radić",
                  field: "Politikologija",
                  status: "Postdoc",
                  gradient: "from-blue-400 to-blue-600"
                },
                {
                  name: "Dr. Jelena Marković",
                  field: "Computer Science",
                  status: "Research Associate",
                  gradient: "from-green-400 to-green-600"
                },
                {
                  name: "Dr. Aleksandar Stanković",
                  field: "Biohemija",
                  status: "Postdoc",
                  gradient: "from-pink-400 to-pink-600"
                },
                {
                  name: "MSc. Milica Đorđević",
                  field: "Sociology",
                  status: "PhD Student",
                  gradient: "from-purple-400 to-purple-600"
                },
                {
                  name: "Dr. Nikola Vuković",
                  field: "Cyber Security",
                  status: "Research Associate",
                  gradient: "from-indigo-400 to-indigo-600"
                },
                {
                  name: "MSc. Marko Popović",
                  field: "Molekularna biologija",
                  status: "PhD Student",
                  gradient: "from-teal-400 to-teal-600"
                },
                {
                  name: "Dr. Svetlana Milić",
                  field: "Međunarodni odnosi",
                  status: "Postdoc",
                  gradient: "from-orange-400 to-orange-600"
                },
                {
                  name: "MSc. Petar Jovanović",
                  field: "Vještačka inteligencija",
                  status: "PhD Student",
                  gradient: "from-cyan-400 to-cyan-600"
                }
              ].map((person, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <div className="text-center">
                    {/* Avatar */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${person.gradient} rounded-full mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                      <span className="text-white text-lg font-bold">{person.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    
                    {/* Info */}
                    <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors duration-300">
                      {person.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">{person.field}</p>
                    <p className="text-xs text-gray-500">{person.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visiting Fellows Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <GlobeAltIcon className="w-10 h-10 text-purple-500 mr-4" />
                Visiting Fellows
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                International experts contributing to our research activities
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Prof. Dr. Maria Schmidt",
                  position: "Visiting Professor",
                  institution: "University of Vienna, Austria",
                  field: "European Politics",
                  period: "2024 - 2025",
                  gradient: "from-purple-500 to-violet-500"
                },
                {
                  name: "Prof. Dr. James Patterson",
                  position: "Visiting Research Fellow",
                  institution: "Cambridge University, UK",
                  field: "AI & Machine Learning",
                  period: "2024",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  name: "Dr. Elena Rossi",
                  position: "Visiting Researcher",
                  institution: "EMBL, Germany",
                  field: "Genomics",
                  period: "2024 - 2025",
                  gradient: "from-emerald-500 to-green-500"
                }
              ].map((fellow, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 group border border-gray-100">
                  <div className="text-center">
                    {/* Avatar */}
                    <div className={`w-20 h-20 bg-gradient-to-r ${fellow.gradient} rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                      <span className="text-white text-xl font-bold">{fellow.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    
                    {/* Info */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                      {fellow.name}
                    </h3>
                    <p className="text-gray-600 mb-1 font-medium text-sm">{fellow.position}</p>
                    <p className="text-sm text-gray-500 mb-2">{fellow.institution}</p>
                    <p className="text-sm text-gray-700 mb-3 font-medium">{fellow.field}</p>
                    
                    {/* Period Badge */}
                    <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                      {fellow.period}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join Us Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-xl mb-6 opacity-90">
              We are looking for talented researchers who share our passion for innovative research
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="group relative px-8 py-3 bg-white text-blue-600 font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                <span className="relative z-10">Open Positions</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group relative px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-110 hover:bg-white hover:text-blue-600">
                <span className="relative z-10">Visiting Fellowship</span>
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
                <li><Link href="/" className="hover:text-green-400 transition-colors duration-300">Home</Link></li>
                <li><Link href="/research/programs" className="hover:text-teal-400 transition-colors duration-300">Research</Link></li>
                <li><Link href="/about-us/profile" className="hover:text-blue-400 transition-colors duration-300">Profile</Link></li>
                <li><Link href="/news" className="hover:text-pink-400 transition-colors duration-300">News</Link></li>
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