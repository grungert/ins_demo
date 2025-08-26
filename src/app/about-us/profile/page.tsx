'use client';

import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";
import { AcademicCapIcon, EyeIcon, HeartIcon, BuildingOfficeIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <StickyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Institute for 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
                Advanced Studies
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              Our <strong className="text-blue-600">profile</strong>, mission, vision and organizational structure
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Mission Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <HeartIcon className="w-10 h-10 text-blue-500 mr-4" />
                  Mission
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The Institute for Advanced Studies is a scientific-research institution that contributes to the development of 
                    <strong className="text-blue-600"> multidisciplinary basic, applied and developmental research</strong> 
                    in priority scientific areas.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our mission is to promote <strong className="text-blue-600">innovation in scientific research work</strong>, 
                    encourage collaboration between different scientific disciplines and contribute to social development through 
                    the application of scientific achievements.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We strive to become a <strong className="text-blue-600">recognizable center of excellence</strong> 
                    in the region and contribute to the global scientific corpus of knowledge through our work.
                  </p>
                </div>
              </div>

              {/* Vision Section */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-indigo-100 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <EyeIcon className="w-10 h-10 text-indigo-500 mr-4" />
                  Vision
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our vision is to become the <strong className="text-indigo-600">leading center for advanced research</strong> 
                    in Southeast Europe, recognized for its interdisciplinary approach and innovative solutions.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We strive to create an <strong className="text-indigo-600">innovation ecosystem</strong> that connects the academic sector, 
                    industry and public sector in order to solve complex social challenges.
                  </p>
                  <div className="bg-white rounded-xl p-6 border border-indigo-200">
                    <h3 className="text-xl font-bold text-indigo-900 mb-4">Key elements of our vision:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>International recognition as a center of excellence</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Innovative approaches to solving contemporary problems</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Sustainable and responsible scientific research activities</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Organizational Structure Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <BuildingOfficeIcon className="w-10 h-10 text-green-500 mr-4" />
                  Organizational Structure
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Management Structure */}
                  <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Management Structure</h3>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="font-semibold text-gray-900">Director</div>
                        <div className="text-sm text-gray-600 mt-1">Operational management</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="font-semibold text-gray-900">Scientific Council</div>
                        <div className="text-sm text-gray-600 mt-1">Strategic guidance</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="font-semibold text-gray-900">Administrative Department</div>
                        <div className="text-sm text-gray-600 mt-1">Support and administration</div>
                      </div>
                    </div>
                  </div>

                  {/* Research Structure */}
                  <div className="bg-green-50 rounded-xl p-6 hover:bg-green-100 transition-colors duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Research Structure</h3>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="font-semibold text-gray-900">Social Sciences and Humanities</div>
                        <div className="text-sm text-gray-600 mt-1">Research teams</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="font-semibold text-gray-900">ICT</div>
                        <div className="text-sm text-gray-600 mt-1">Technology development</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="font-semibold text-gray-900">Biomedicina</div>
                        <div className="text-sm text-gray-600 mt-1">Medical research</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Organizational Principles</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Fleksibilnost</h4>
                      <p className="text-sm text-gray-700">Prilagođavanje potrebama projekata</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Interdisciplinarnost</h4>
                      <p className="text-sm text-gray-700">Povezivanje različitih oblasti</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Transparentnost</h4>
                      <p className="text-sm text-gray-700">Jasne procedure i odgovornosti</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Efficiency</h4>
                      <p className="text-sm text-gray-700">Optimal use of resources</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* History Section */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 border border-purple-100 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <ClockIcon className="w-10 h-10 text-purple-500 mr-4" />
                  History
                </h2>
                
                <div className="space-y-6">
                  {/* Timeline */}
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>
                    
                    {[
                      {
                        year: "2024",
                        title: "Institute Foundation",
                        description: "Formally established scientific-research institution within the University of Montenegro",
                        color: "bg-purple-500"
                      },
                      {
                        year: "2024",
                        title: "First Research Projects",
                        description: "Launch of initial research activities in priority scientific areas",
                        color: "bg-indigo-500"
                      },
                      {
                        year: "2024",
                        title: "International Collaborations",
                        description: "Establishing partnerships with renowned research institutes in the region and Europe",
                        color: "bg-blue-500"
                      },
                      {
                        year: "2024",
                        title: "Infrastructure Development",
                        description: "Establishing research capacities and technological infrastructure",
                        color: "bg-teal-500"
                      }
                    ].map((milestone, index) => (
                      <div key={index} className="relative flex items-start space-x-4 pb-8">
                        <div className={`w-8 h-8 ${milestone.color} rounded-full flex items-center justify-center flex-shrink-0 z-10`}>
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl font-bold text-purple-600">{milestone.year}</span>
                            <h3 className="text-lg font-bold text-gray-900">{milestone.title}</h3>
                          </div>
                          <p className="text-gray-700">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Quick Facts */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Quick Facts
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AcademicCapIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Founded</h4>
                      <p className="text-gray-600 text-sm">2024. godina</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BuildingOfficeIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Institution Type</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Scientific-Research Institution
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HeartIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Focus</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Multidisciplinary Research
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <EyeIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Priorities</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        3 main scientific areas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  Contact Information
                </h3>
                <div className="text-center space-y-2">
                  <p className="text-gray-700 text-sm">
                    Mihaila Lalića bb<br />
                    81000 Podgorica<br />
                    Montenegro
                  </p>
                  <p className="text-blue-600 font-medium text-sm">
                    ins@ucg.ac.me
                  </p>
                  <p className="text-gray-700 text-sm">
                    (+382) 20 414 255
                  </p>
                </div>
              </div>
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
                <li><a href="/research/programs" className="hover:text-teal-400 transition-colors duration-300">Research</a></li>
                <li><a href="/about-us/people" className="hover:text-green-400 transition-colors duration-300">People</a></li>
                <li><a href="/news" className="hover:text-pink-400 transition-colors duration-300">News</a></li>
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