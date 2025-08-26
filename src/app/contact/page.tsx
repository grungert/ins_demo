'use client';

import Image from "next/image";
import Link from "next/link";
import StickyHeader from "@/components/StickyHeader";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, UserIcon, BuildingOfficeIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
    type: 'inquiry'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <StickyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Contact 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500">
                Us
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              <strong className="text-violet-600">Information</strong>, <strong className="text-purple-600">location</strong> and <strong className="text-indigo-600">contact forms</strong>
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are ready to answer your questions and establish cooperation
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Contact Methods */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <PhoneIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-lg font-bold mb-1">Phone</div>
              <div className="text-sm opacity-90">+382 20 414 255</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <EnvelopeIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-lg font-bold mb-1">Email</div>
              <div className="text-sm opacity-90">ins@ucg.ac.me</div>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <MapPinIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-lg font-bold mb-1">Address</div>
              <div className="text-sm opacity-90">Mihaila Lalića bb</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <ClockIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-lg font-bold mb-1">Working Hours</div>
              <div className="text-sm opacity-90">08:00 - 16:00</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <ChatBubbleLeftRightIcon className="w-10 h-10 text-violet-500 mr-4" />
                  Send Us a Message
                </h2>
                
                <form className="space-y-6">
                  {/* Contact Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Request Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                    >
                      <option value="inquiry">General Inquiry</option>
                      <option value="collaboration">Collaboration Proposal</option>
                      <option value="research">Research Question</option>
                      <option value="media">Media & PR</option>
                      <option value="student">Student Questions</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 p-0.5">
                        <div className="w-full h-full bg-white rounded-xl"></div>
                      </div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="relative w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none group-focus-within:border-transparent group-focus-within:bg-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 p-0.5">
                        <div className="w-full h-full bg-white rounded-xl"></div>
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="relative w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none group-focus-within:border-transparent group-focus-within:bg-transparent transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Organization */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 p-0.5">
                      <div className="w-full h-full bg-white rounded-xl"></div>
                    </div>
                    <input
                      type="text"
                      name="organization"
                      placeholder="Organization/Institution (optional)"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="relative w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none group-focus-within:border-transparent group-focus-within:bg-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Subject */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 p-0.5">
                      <div className="w-full h-full bg-white rounded-xl"></div>
                    </div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Message title"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="relative w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none group-focus-within:border-transparent group-focus-within:bg-transparent transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-teal-500 to-green-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 p-0.5">
                      <div className="w-full h-full bg-white rounded-xl"></div>
                    </div>
                    <textarea
                      name="message"
                      placeholder="Your message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="relative w-full h-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none resize-none group-focus-within:border-transparent group-focus-within:bg-transparent transition-all duration-300"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                  >
                    <span className="relative z-10">Send Message</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800"></div>
                    </div>
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information & Map */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Detailed Contact Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Institute for Advanced Studies<br />
                        University of Montenegro<br />
                        Mihaila Lalića bb<br />
                        81000 Podgorica<br />
                        Montenegro
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-600 text-sm">
                        (+382) 20 414 255<br />
                        (+382) 20 414 256 (fax)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <EnvelopeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600 text-sm">
                        ins@ucg.ac.me<br />
                        info@napredne-studije.me
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ClockIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Working Hours</h4>
                      <p className="text-gray-600 text-sm">
                        Monday - Friday: 08:00 - 16:00<br />
                        Weekend: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Contacts */}
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-violet-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Departments
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "Administration",
                      contact: "admin@ucg.ac.me",
                      phone: "Ext. 101",
                      icon: BuildingOfficeIcon,
                      gradient: "from-violet-500 to-purple-500"
                    },
                    {
                      name: "Research",
                      contact: "research@ucg.ac.me",
                      phone: "Ext. 102",
                      icon: UserIcon,
                      gradient: "from-purple-500 to-indigo-500"
                    },
                    {
                      name: "International Cooperation",
                      contact: "international@ucg.ac.me",
                      phone: "Ext. 103",
                      icon: ChatBubbleLeftRightIcon,
                      gradient: "from-indigo-500 to-blue-500"
                    }
                  ].map((dept, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-white rounded-lg p-3 hover:shadow-md transition-shadow duration-300">
                      <div className={`w-10 h-10 bg-gradient-to-r ${dept.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <dept.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{dept.name}</h4>
                        <p className="text-gray-600 text-xs">{dept.contact}</p>
                        <p className="text-gray-500 text-xs">{dept.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="h-64 bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center relative">
                  <MapPinIcon className="w-16 h-16 text-white opacity-70" />
                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-xs text-gray-800 font-medium">
                      Mihaila Lalića bb<br />
                      Podgorica 81000
                    </p>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-300">
                    Open in Google Maps →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Cards */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">For Students</h3>
              <p className="text-gray-600 text-sm mb-4">
                Questions about study programs, applications and academic requirements
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                Contact
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <BuildingOfficeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">For Institutions</h3>
              <p className="text-gray-600 text-sm mb-4">
                Partnerships, collaboration and institutional agreements
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                Contact
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">For Media</h3>
              <p className="text-gray-600 text-sm mb-4">
                Press releases, interviews and media partnerships
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                Contact
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
                <li><Link href="/" className="hover:text-violet-400 transition-colors duration-300">Home</Link></li>
                <li><Link href="/research/programs" className="hover:text-purple-400 transition-colors duration-300">Research</Link></li>
                <li><Link href="/about-us/people" className="hover:text-indigo-400 transition-colors duration-300">People</Link></li>
                <li><Link href="/news" className="hover:text-blue-400 transition-colors duration-300">News</Link></li>
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