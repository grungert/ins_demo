'use client';

import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";
import { CalendarIcon, MapPinIcon, UsersIcon, ClockIcon, TicketIcon, MicrophoneIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <StickyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Our 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
                Events
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              <strong className="text-orange-600">Panels</strong>, <strong className="text-red-600">conferences</strong> and <strong className="text-pink-600">workshops</strong>
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Organized events that promote scientific collaboration and knowledge exchange
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Event Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CalendarIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">24</div>
              <div className="text-sm opacity-90">Organized Events</div>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <UsersIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">1.2K</div>
              <div className="text-sm opacity-90">Total Participants</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <MicrophoneIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">85</div>
              <div className="text-sm opacity-90">International Speakers</div>
            </div>
            <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <AcademicCapIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">15</div>
              <div className="text-sm opacity-90">Partner Institutions</div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <CalendarIcon className="w-10 h-10 text-orange-500 mr-4" />
                Upcoming Events
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join our upcoming scientific events
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "International Symposium on Artificial Intelligence",
                  type: "conference",
                  date: "15-16 April 2025",
                  time: "09:00 - 18:00",
                  location: "Hotel Podgorica, Podgorica",
                  participants: "120+ participants",
                  description: "Two-day conference dedicated to the latest trends in artificial intelligence and machine learning.",
                  speakers: ["Prof. Dr. Yann LeCun (NYU)", "Dr. Fei-Fei Li (Stanford)", "Prof. Dr. Yoshua Bengio (Montreal)"],
                  registration: "€50",
                  status: "registration_open",
                  gradient: "from-blue-500 to-indigo-500",
                  bgGradient: "from-blue-50 to-indigo-50"
                },
                {
                  title: "Panel: Future of Democracy in the Balkans",
                  type: "panel",
                  date: "28 March 2025",
                  time: "14:00 - 17:00",
                  location: "Institute for Advanced Studies",
                  participants: "60+ participants",
                  description: "Panel discussion on challenges and perspectives of democratic processes in Western Balkan countries.",
                  speakers: ["Prof. Dr. Florian Bieber", "Dr. Marko Kmezić", "Prof. Dr. Sonja Licht"],
                  registration: "Free",
                  status: "registration_open",
                  gradient: "from-green-500 to-teal-500",
                  bgGradient: "from-green-50 to-teal-50"
                },
                {
                  title: "Workshop: Biomedical Research Methodology",
                  type: "workshop",
                  date: "5-7 May 2025",
                  time: "10:00 - 16:00",
                  location: "Faculty of Medicine UCG",
                  participants: "40 participants",
                  description: "Three-day workshop on advanced methodologies in biomedical research.",
                  speakers: ["Prof. Dr. Ana Jovanović", "Dr. Maria Schmidt", "Prof. Dr. James Patterson"],
                  registration: "€80",
                  status: "registration_open",
                  gradient: "from-pink-500 to-rose-500",
                  bgGradient: "from-pink-50 to-rose-50"
                },
                {
                  title: "Cyber Security Summit Montenegro",
                  type: "conference",
                  date: "20-21 June 2025",
                  time: "09:00 - 17:00",
                  location: "Hilton Podgorica",
                  participants: "200+ participants",
                  description: "National cybersecurity summit focused on critical infrastructure protection.",
                  speakers: ["Dr. Nikola Vuković", "Bruce Schneier", "Dr. Dawn Song"],
                  registration: "€120",
                  status: "coming_soon",
                  gradient: "from-purple-500 to-violet-500",
                  bgGradient: "from-purple-50 to-violet-50"
                }
              ].map((event, index) => (
                <div key={index} className={`bg-gradient-to-br ${event.bgGradient} rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-opacity-20`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 bg-gradient-to-r ${event.gradient} text-white text-xs rounded-full font-medium capitalize`}>
                      {event.type}
                    </div>
                    <div className="flex items-center space-x-1">
                      {event.status === 'registration_open' ? (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-600 font-medium">Registration Open</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-xs text-orange-600 font-medium">Coming Soon</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-gray-700 transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {event.description}
                  </p>
                  
                  {/* Event Details */}
                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <UsersIcon className="w-4 h-4" />
                      <span>{event.participants}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 md:col-span-2">
                      <TicketIcon className="w-4 h-4" />
                      <span>Registration: {event.registration}</span>
                    </div>
                  </div>
                  
                  {/* Speakers */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Speakers:</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.speakers.map((speaker, speakerIndex) => (
                        <span key={speakerIndex} className="px-2 py-1 bg-white bg-opacity-70 text-xs text-gray-700 rounded-lg">
                          {speaker}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="text-center">
                    {event.status === 'registration_open' ? (
                      <button className={`px-6 py-3 bg-gradient-to-r ${event.gradient} text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                        Register Now
                      </button>
                    ) : (
                      <button className="px-6 py-3 bg-gray-300 text-gray-600 rounded-full font-medium cursor-not-allowed">
                        Registration Soon
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <ClockIcon className="w-10 h-10 text-blue-500 mr-4" />
                Past Events
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Overview of successfully completed events
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Digital Governance Conference 2024",
                  type: "conference",
                  date: "October 2024",
                  participants: 150,
                  highlight: "3 days, 25 speakers",
                  image: null,
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  title: "AI Ethics Workshop",
                  type: "workshop",
                  date: "September 2024",
                  participants: 80,
                  highlight: "International experts",
                  image: null,
                  gradient: "from-green-500 to-teal-500"
                },
                {
                  title: "Balkan Health Innovation Summit",
                  type: "conference",
                  date: "August 2024",
                  participants: 200,
                  highlight: "Regional collaboration",
                  image: null,
                  gradient: "from-pink-500 to-rose-500"
                },
                {
                  title: "Cybersecurity Masterclass",
                  type: "workshop",
                  date: "July 2024",
                  participants: 60,
                  highlight: "Hands-on training",
                  image: null,
                  gradient: "from-purple-500 to-indigo-500"
                },
                {
                  title: "Social Sciences Research Panel",
                  type: "panel",
                  date: "June 2024",
                  participants: 90,
                  highlight: "Policy makers panel",
                  image: null,
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  title: "Innovation in Education Forum",
                  type: "conference",
                  date: "May 2024",
                  participants: 120,
                  highlight: "EdTech showcase",
                  image: null,
                  gradient: "from-indigo-500 to-purple-500"
                }
              ].map((event, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                  {/* Event Image Placeholder */}
                  <div className={`h-32 bg-gradient-to-r ${event.gradient} rounded-xl mb-4 flex items-center justify-center`}>
                    <CalendarIcon className="w-12 h-12 text-white opacity-70" />
                  </div>
                  
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-1 bg-gradient-to-r ${event.gradient} text-white text-xs rounded-full font-medium capitalize`}>
                      {event.type}
                    </span>
                    <span className="text-xs text-gray-500">{event.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <UsersIcon className="w-4 h-4" />
                      <span>{event.participants} participants</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700 font-medium">{event.highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-orange-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Organize Event With Us
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
              Interested in organizing a scientific event in collaboration with our institute? 
              Contact us for more information about partnership opportunities.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="group relative px-8 py-3 bg-white text-orange-600 font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                <span className="relative z-10">Propose Event</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group relative px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-110 hover:bg-white hover:text-orange-600">
                <span className="relative z-10">Partnership info</span>
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
                <li><a href="/" className="hover:text-orange-400 transition-colors duration-300">Home</a></li>
                <li><a href="/outreach/publishing" className="hover:text-red-400 transition-colors duration-300">Publishing</a></li>
                <li><a href="/outreach/collaborations" className="hover:text-pink-400 transition-colors duration-300">Collaborations</a></li>
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