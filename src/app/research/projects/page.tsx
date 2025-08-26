'use client';

import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";
import { FolderIcon, ClockIcon, CurrencyDollarIcon, UserGroupIcon, CheckCircleIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <StickyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Research 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500">
                Projects
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              <strong className="text-purple-600">Past</strong> and <strong className="text-pink-600">current</strong> research projects
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Overview of our research activities through various projects and collaborations
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Project Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <PlayIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">8</div>
              <div className="text-sm opacity-90">Active Projects</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CheckCircleIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">12</div>
              <div className="text-sm opacity-90">Completed Projects</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CurrencyDollarIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">€2.3M</div>
              <div className="text-sm opacity-90">Total Funding</div>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <UserGroupIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">35</div>
              <div className="text-sm opacity-90">Involved Researchers</div>
            </div>
          </div>

          {/* Active Projects */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <PlayIcon className="w-10 h-10 text-green-500 mr-4" />
                Current Projects
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Active research projects in which we are currently participating
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "AI for Social Good",
                  category: "ICT",
                  status: "active",
                  duration: "2024-2026",
                  budget: "€450,000",
                  fundingSource: "Horizon Europe",
                  description: "Development of AI algorithms for solving social problems in healthcare and education",
                  team: ["Dr. Stefan Petrović", "Dr. Milica Đorđević", "MSc. Petar Jovanović"],
                  progress: 35,
                  gradient: "from-green-500 to-teal-500",
                  bgGradient: "from-green-50 to-teal-50"
                },
                {
                  title: "Digital Democracy in the Balkans",
                  category: "Social Sciences",
                  status: "active",
                  duration: "2024-2025",
                  budget: "€280,000",
                  fundingSource: "Jean Monnet Programme",
                  description: "Analysis of the impact of digitalization on democratic processes in Western Balkan countries",
                  team: ["Prof. Dr. Marija Nikolić", "Dr. Svetlana Milić", "Dr. Miloš Radić"],
                  progress: 60,
                  gradient: "from-blue-500 to-indigo-500",
                  bgGradient: "from-blue-50 to-indigo-50"
                },
                {
                  title: "Cancer Biomarkers Discovery",
                  category: "Biomedicine",
                  status: "active",
                  duration: "2023-2025",
                  budget: "€520,000",
                  fundingSource: "ERC Starting Grant",
                  description: "Identification of new biomarkers for early diagnosis of different types of cancer",
                  team: ["Prof. Dr. Ana Jovanović", "Dr. Aleksandar Stanković", "MSc. Marko Popović"],
                  progress: 75,
                  gradient: "from-pink-500 to-rose-500",
                  bgGradient: "from-pink-50 to-rose-50"
                },
                {
                  title: "Cybersecurity for Critical Infrastructure",
                  category: "ICT",
                  status: "active",
                  duration: "2024-2027",
                  budget: "€380,000",
                  fundingSource: "NATO Science for Peace",
                  description: "Development of security protocols to protect critical infrastructure from cyber attacks",
                  team: ["Dr. Nikola Vuković", "Dr. Stefan Petrović", "Dr. Jelena Marković"],
                  progress: 25,
                  gradient: "from-purple-500 to-violet-500",
                  bgGradient: "from-purple-50 to-violet-50"
                }
              ].map((project, index) => (
                <div key={index} className={`bg-gradient-to-br ${project.bgGradient} rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-opacity-20`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 bg-gradient-to-r ${project.gradient} text-white text-xs rounded-full font-medium`}>
                      {project.category}
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-gray-700 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  {/* Project Details */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4" />
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <CurrencyDollarIcon className="w-4 h-4" />
                      <span>{project.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 md:col-span-2">
                      <FolderIcon className="w-4 h-4" />
                      <span>{project.fundingSource}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 bg-gradient-to-r ${project.gradient} rounded-full transition-all duration-500`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Team */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Team:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.team.map((member, memberIndex) => (
                        <span key={memberIndex} className="px-2 py-1 bg-white bg-opacity-70 text-xs text-gray-700 rounded-lg">
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Projects */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <CheckCircleIcon className="w-10 h-10 text-blue-500 mr-4" />
                Completed Projects
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Successfully completed research projects
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Smart City Podgorica",
                  category: "ICT",
                  duration: "2022-2024",
                  budget: "€320,000",
                  outcome: "15 publications, 3 patents",
                  gradient: "from-cyan-500 to-blue-500"
                },
                {
                  title: "Gender Equality in Higher Education",
                  category: "Social Sciences",
                  duration: "2021-2023",
                  budget: "€180,000",
                  outcome: "Policy recommendations, 8 papers",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  title: "Neurodegenerative Diseases Research",
                  category: "Biomedicine",
                  duration: "2020-2023",
                  budget: "€410,000",
                  outcome: "12 publications, new biomarker",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  title: "Blockchain for Supply Chain",
                  category: "ICT",
                  duration: "2022-2023",
                  budget: "€150,000",
                  outcome: "System prototype, 6 papers",
                  gradient: "from-indigo-500 to-purple-500"
                },
                {
                  title: "Migration Studies in SEE",
                  category: "Social Sciences",
                  duration: "2021-2024",
                  budget: "€220,000",
                  outcome: "Regional database",
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  title: "COVID-19 Epidemiological Modeling",
                  category: "Biomedicine",
                  duration: "2020-2022",
                  budget: "€190,000",
                  outcome: "Predictive models, 10 papers",
                  gradient: "from-teal-500 to-green-500"
                }
              ].map((project, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`px-3 py-1 bg-gradient-to-r ${project.gradient} text-white text-xs rounded-full font-medium`}>
                      {project.category}
                    </div>
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Duration:</span>
                      <span className="font-medium">{project.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Budget:</span>
                      <span className="font-medium">{project.budget}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-gray-900 mb-1">Results:</h4>
                    <p className="text-sm text-gray-700">{project.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call for Projects */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Projects
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
              We are looking for partners and collaborators for future research projects. 
              Contact us if you have an idea for collaboration.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="group relative px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                <span className="relative z-10">Propose Project</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group relative px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-110 hover:bg-white hover:text-indigo-600">
                <span className="relative z-10">Learn More</span>
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
                <li><a href="/" className="hover:text-purple-400 transition-colors duration-300">Home</a></li>
                <li><a href="/research/programs" className="hover:text-teal-400 transition-colors duration-300">Programs</a></li>
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