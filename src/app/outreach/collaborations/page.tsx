'use client';

import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";
import { GlobeAltIcon, BuildingOfficeIcon, AcademicCapIcon, CurrencyEuroIcon, TrophyIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function CollaborationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <StickyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              International 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Collaborations
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              <strong className="text-blue-600">Partnerships</strong> beyond <strong className="text-purple-600">UCG</strong> that strengthen our <strong className="text-pink-600">global</strong> network
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We develop strategic partnerships with leading institutions worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Collaboration Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <GlobeAltIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">35</div>
              <div className="text-sm opacity-90">Partner Institutions</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <BuildingOfficeIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">18</div>
              <div className="text-sm opacity-90">Countries</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CurrencyEuroIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">€4.2M</div>
              <div className="text-sm opacity-90">Joint Projects</div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <TrophyIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">42</div>
              <div className="text-sm opacity-90">Joint Projects</div>
            </div>
          </div>

          {/* Strategic Partners */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <TrophyIcon className="w-10 h-10 text-blue-500 mr-4" />
                Strategic Partners
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Leading international institutions with which we have long-term partnerships
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  name: "University of Vienna",
                  country: "Austria",
                  type: "University",
                  collaboration_since: "2023",
                  projects: 8,
                  areas: ["Social Sciences", "Public Policy", "European Studies"],
                  key_programs: ["Horizon Europe", "Erasmus+", "Jean Monnet"],
                  contact_person: "Prof. Dr. Maria Schmidt",
                  description: "Long-term partnership focused on European policy research and democratization processes in the Balkans.",
                  achievements: "3 ERC grants, 15 joint publications",
                  gradient: "from-blue-500 to-indigo-500",
                  bgGradient: "from-blue-50 to-indigo-50"
                },
                {
                  name: "Cambridge University",
                  country: "United Kingdom",
                  type: "University",
                  collaboration_since: "2023",
                  projects: 5,
                  areas: ["ICT", "Artificial Intelligence", "Machine Learning"],
                  key_programs: ["UKRI", "Royal Society", "Newton Fund"],
                  contact_person: "Prof. Dr. James Patterson",
                  description: "Collaboration in advanced AI technologies and their applications in healthcare and education.",
                  achievements: "2 Nature publications, AI patent",
                  gradient: "from-green-500 to-teal-500",
                  bgGradient: "from-green-50 to-teal-50"
                },
                {
                  name: "EMBL Heidelberg",
                  country: "Germany",
                  type: "Research Institute",
                  collaboration_since: "2024",
                  projects: 6,
                  areas: ["Biomedicine", "Genomics", "Structural Biology"],
                  key_programs: ["ERC", "Marie Curie", "EMBO"],
                  contact_person: "Dr. Elena Rossi",
                  description: "Partnership in genomic research and personalized medicine focused on the Balkan population.",
                  achievements: "Genomic Atlas of the Balkans, 8 publications",
                  gradient: "from-pink-500 to-rose-500",
                  bgGradient: "from-pink-50 to-rose-50"
                },
                {
                  name: "MIT Technology Review",
                  country: "USA",
                  type: "Research Organization",
                  collaboration_since: "2024",
                  projects: 3,
                  areas: ["Technology Innovations", "Digital Transformation", "Policy Research"],
                  key_programs: ["NSF", "NIH", "DARPA"],
                  contact_person: "Dr. Sarah Johnson",
                  description: "Innovative partnership for researching technology impact on society and economy in transition countries.",
                  achievements: "Policy brief za UN, tech summit",
                  gradient: "from-purple-500 to-violet-500",
                  bgGradient: "from-purple-50 to-violet-50"
                }
              ].map((partner, index) => (
                <div key={index} className={`bg-gradient-to-br ${partner.bgGradient} rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-opacity-20`}>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {partner.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <GlobeAltIcon className="w-4 h-4" />
                          <span>{partner.country}</span>
                        </span>
                        <span className={`px-2 py-1 bg-gradient-to-r ${partner.gradient} text-white text-xs rounded-full`}>
                          {partner.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Since {partner.collaboration_since}</div>
                      <div className="text-lg font-bold text-gray-900">{partner.projects} projects</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {partner.description}
                  </p>
                  
                  {/* Collaboration Areas */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Collaboration Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {partner.areas.map((area, areaIndex) => (
                        <span key={areaIndex} className="px-3 py-1 bg-white bg-opacity-70 text-sm text-gray-700 rounded-lg">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Key Programs */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Programs:</h4>
                    <div className="flex flex-wrap gap-2">
                      {partner.key_programs.map((program, programIndex) => (
                        <span key={programIndex} className={`px-2 py-1 bg-gradient-to-r ${partner.gradient} text-white text-xs rounded-full`}>
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Contact & Achievements */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-900 mb-2">Contact Person:</h4>
                      <p className="text-sm text-gray-700">{partner.contact_person}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-900 mb-2">Key Results:</h4>
                      <p className="text-sm text-gray-700">{partner.achievements}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Partners */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <BuildingOfficeIcon className="w-10 h-10 text-green-500 mr-4" />
                Regional Partners
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Collaboration with institutions in the Southeast European region
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "University of Belgrade",
                  country: "Serbia",
                  projects: 12,
                  focus: "Social Sciences",
                  gradient: "from-red-500 to-pink-500"
                },
                {
                  name: "University of Sarajevo",
                  country: "Bosnia and Herzegovina",
                  projects: 8,
                  focus: "ICT",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  name: "University of Zagreb",
                  country: "Croatia",
                  projects: 10,
                  focus: "Biomedicine",
                  gradient: "from-green-500 to-teal-500"
                },
                {
                  name: "Ss. Cyril and Methodius University",
                  country: "North Macedonia",
                  projects: 6,
                  focus: "Multimedia",
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  name: "University of Prishtina",
                  country: "Kosovo",
                  projects: 4,
                  focus: "Public Policy",
                  gradient: "from-purple-500 to-indigo-500"
                },
                {
                  name: "University of Tirana",
                  country: "Albania",
                  projects: 7,
                  focus: "Economics",
                  gradient: "from-yellow-500 to-orange-500"
                }
              ].map((partner, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${partner.gradient} rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                    <AcademicCapIcon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                    {partner.name}
                  </h3>
                  
                  <div className="text-center text-sm text-gray-600 mb-4">
                    {partner.country}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="text-gray-600">Projects:</span>
                    <span className="font-bold text-gray-900">{partner.projects}</span>
                  </div>
                  
                  <div className="text-center">
                    <span className={`px-3 py-1 bg-gradient-to-r ${partner.gradient} text-white text-xs rounded-full`}>
                      {partner.focus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* International Networks */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <GlobeAltIcon className="w-10 h-10 text-purple-500 mr-4" />
                International Networks
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Membership in prestigious international organizations and networks
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "European University Association",
                  acronym: "EUA",
                  type: "Membership",
                  benefits: ["Policy advocacy", "Best practices", "Networking events"],
                  gradient: "from-blue-500 to-indigo-500"
                },
                {
                  name: "Council of European Studies",
                  acronym: "CES",
                  type: "Partner Member",
                  benefits: ["Research grants", "Academic exchange", "Conference support"],
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  name: "International Association of Universities",
                  acronym: "IAU",
                  type: "Associate Member",
                  benefits: ["Global network", "UNESCO cooperation", "Quality assurance"],
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  name: "Balkan Universities Network",
                  acronym: "BUN",
                  type: "Founding Member",
                  benefits: ["Regional projects", "Student mobility", "Joint degrees"],
                  gradient: "from-orange-500 to-red-500"
                }
              ].map((network, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${network.gradient} rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{network.acronym}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {network.name}
                  </h3>
                  
                  <div className={`inline-block px-3 py-1 bg-gradient-to-r ${network.gradient} text-white text-xs rounded-full mb-4`}>
                    {network.type}
                  </div>
                  
                  <ul className="space-y-1 text-xs text-gray-700">
                    {network.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center justify-center space-x-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Opportunities */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center justify-center">
              <UserGroupIcon className="w-10 h-10 mr-4" />
              Become Our Partner
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
              We are looking for new partners for research projects, academic collaboration and knowledge exchange. 
              Together we can contribute to the development of science and society.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white bg-opacity-90 rounded-2xl p-6 backdrop-blur-sm text-gray-800">
                <AcademicCapIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-bold mb-3 text-gray-900">Academic Partnership</h3>
                <p className="text-sm text-gray-700">Student exchange, joint degree programs, collaborative research</p>
              </div>
              <div className="bg-white bg-opacity-90 rounded-2xl p-6 backdrop-blur-sm text-gray-800">
                <BuildingOfficeIcon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-lg font-bold mb-3 text-gray-900">Institutional Collaboration</h3>
                <p className="text-sm text-gray-700">Memoranda of understanding, joint projects, resource sharing</p>
              </div>
              <div className="bg-white bg-opacity-90 rounded-2xl p-6 backdrop-blur-sm text-gray-800">
                <CurrencyEuroIcon className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
                <h3 className="text-lg font-bold mb-3 text-gray-900">Project Collaboration</h3>
                <p className="text-sm text-gray-700">EU projects, bilateral agreements, innovation programs</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="group relative px-8 py-3 bg-white text-blue-600 font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                <span className="relative z-10">Propose Collaboration</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group relative px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-110 hover:bg-white hover:text-blue-600">
                <span className="relative z-10">Partnership Guidelines</span>
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
                <li><a href="/" className="hover:text-blue-400 transition-colors duration-300">Home</a></li>
                <li><a href="/outreach/events" className="hover:text-purple-400 transition-colors duration-300">Events</a></li>
                <li><a href="/outreach/publishing" className="hover:text-pink-400 transition-colors duration-300">Publishing</a></li>
                <li><a href="/about-us/people" className="hover:text-green-400 transition-colors duration-300">People</a></li>
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