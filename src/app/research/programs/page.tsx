'use client';

import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";
import { AcademicCapIcon, BeakerIcon, ComputerDesktopIcon, HeartIcon, ChartBarIcon, LightBulbIcon } from "@heroicons/react/24/outline";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <StickyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Research 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-green-500 to-emerald-500">
                Programs
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              Defined <strong className="text-teal-600">research areas</strong> that represent our priorities
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Three main programs covering multidisciplinary and transdisciplinary research
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Overview */}
          <div className="text-center mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                <LightBulbIcon className="w-10 h-10 text-teal-500 mr-4" />
                Our Approach
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The Institute for Advanced Studies focuses on <strong className="text-teal-600">three priority scientific areas</strong> 
                that enable a comprehensive approach to contemporary challenges through interdisciplinary collaboration.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Each program is designed to stimulate innovation, promote cooperation and contribute to social development.
              </p>
            </div>
          </div>

          {/* Research Programs */}
          <div className="space-y-16">
            
            {/* Social and Humanities Sciences Program */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-2xl p-8 border border-blue-100">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <AcademicCapIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Social Sciences and Humanities
                      </h2>
                      <p className="text-lg text-blue-600 font-medium">Program 1</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    This program covers a wide spectrum of disciplines dealing with the study of humans, 
                    society and culture through different methodological approaches and theoretical frameworks.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {[
                      "International Relations",
                      "Political Science", 
                      "Social Policy",
                      "Public Opinion Research",
                      "Gender Equality",
                      "Public Policy Research",
                      "Economics",
                      "Law",
                      "Sociology",
                      "Anthropology",
                      "Media and Communications",
                      "History and Archaeology",
                      "Philosophy",
                      "Ethics and Religion"
                    ].map((field, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">{field}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Focus Areas</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <h4 className="font-semibold text-blue-900 mb-2">Public Policies</h4>
                        <p className="text-sm text-gray-700">Analysis and creation of evidence-based policies</p>
                      </div>
                      <div className="p-4 bg-indigo-50 rounded-xl">
                        <h4 className="font-semibold text-indigo-900 mb-2">Social Development</h4>
                        <p className="text-sm text-gray-700">Research on social changes and trends</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-xl">
                        <h4 className="font-semibold text-purple-900 mb-2">International Cooperation</h4>
                        <p className="text-sm text-gray-700">Analysis of global relations and processes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ICT Program */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl shadow-2xl p-8 border border-green-100">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <ComputerDesktopIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Information and Communication Technologies
                      </h2>
                      <p className="text-lg text-green-600 font-medium">Program 2</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    The program is focused on the development of advanced technological solutions and research 
                    of the latest trends in the field of information and communication technologies.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {[
                      "Multimedia Technologies",
                      "Software Engineering",
                      "Data Processing",
                      "Systems and Architecture",
                      "Information Systems Design",
                      "Signal Processing Algorithms",
                      "Computer Vision",
                      "Cryptography",
                      "Cyber Security",
                      "Digital Watermarking",
                      "Artificial Intelligence",
                      "Machine Learning"
                    ].map((field, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">{field}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Technology Directions</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-xl">
                        <h4 className="font-semibold text-green-900 mb-2">AI & ML</h4>
                        <p className="text-sm text-gray-700">Advanced algorithms for intelligent systems</p>
                      </div>
                      <div className="p-4 bg-teal-50 rounded-xl">
                        <h4 className="font-semibold text-teal-900 mb-2">Cybersecurity</h4>
                        <p className="text-sm text-gray-700">Protection and security of digital systems</p>
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-xl">
                        <h4 className="font-semibold text-emerald-900 mb-2">Data Science</h4>
                        <p className="text-sm text-gray-700">Analysis and processing of large datasets</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biomedicine Program */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl shadow-2xl p-8 border border-pink-100">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <HeartIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Biomedicine
                      </h2>
                      <p className="text-lg text-pink-600 font-medium">Program 3</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    The biomedicine program is focused on basic research of the molecular basis and 
                    mechanisms of disease, as well as the development of new diagnostic and therapeutic approaches.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {[
                      "Cell and Molecular Biology",
                      "Cancer Biology",
                      "Biochemistry",
                      "New Technologies in Diagnostics",
                      "Disease Monitoring",
                      "Personalized Medicine",
                      "Genetics and Epigenetics",
                      "Physiology",
                      "Pharmacology",
                      "Neurosciences"
                    ].map((field, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">{field}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Research Approaches</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-pink-50 rounded-xl">
                        <h4 className="font-semibold text-pink-900 mb-2">Molecular Basis</h4>
                        <p className="text-sm text-gray-700">Research of mechanisms at the molecular level</p>
                      </div>
                      <div className="p-4 bg-rose-50 rounded-xl">
                        <h4 className="font-semibold text-rose-900 mb-2">Personalized Medicine</h4>
                        <p className="text-sm text-gray-700">Approach tailored to individual characteristics</p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-xl">
                        <h4 className="font-semibold text-red-900 mb-2">Diagnostics</h4>
                        <p className="text-sm text-gray-700">New technologies for early detection</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interdisciplinary Approach */}
          <div className="mt-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl shadow-2xl p-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center justify-center">
              <ChartBarIcon className="w-10 h-10 mr-4" />
              Interdisciplinary Approach
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
              Our programs are not isolated - they overlap and complement each other, 
              enabling a holistic approach to complex scientific and social issues.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                <BeakerIcon className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-bold mb-3">Innovation</h3>
                <p className="text-sm opacity-80">Encouraging creative solutions through interdisciplinary collaboration</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                <AcademicCapIcon className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-bold mb-3">Education</h3>
                <p className="text-sm opacity-80">Development of new curricula and research methodologies</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                <ChartBarIcon className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-bold mb-3">Social Impact</h3>
                <p className="text-sm opacity-80">Application of scientific results to solve real problems</p>
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
                <li><a href="/" className="hover:text-teal-400 transition-colors duration-300">Home</a></li>
                <li><a href="/research/projects" className="hover:text-green-400 transition-colors duration-300">Projects</a></li>
                <li><a href="/research/publications" className="hover:text-pink-400 transition-colors duration-300">Publications</a></li>
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