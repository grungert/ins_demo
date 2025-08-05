'use client';

import Image from "next/image";
import Link from "next/link";
import StickyHeader from "@/components/StickyHeader";
import { GlobeAltIcon, AcademicCapIcon, ChartBarIcon, SparklesIcon, ArrowTrendingUpIcon, UserGroupIcon, BriefcaseIcon, DocumentTextIcon, CogIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <StickyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Institut za 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-green-500 to-pink-500">
                napredne studije
              </span>
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
                Naučno-istraživačka institucija koja doprinosi razvoju 
                <strong className="text-teal-600"> multidisciplinarnih osnovnih, primijenjenih i razvojnih istraživanja</strong> 
                iz prioritetnih naučnih oblasti
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Fokus na aktuelne društvene i prirodne fenomene iz interdisciplinarne, 
                multidisciplinarne i transdisciplinarne perspektive
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Priority Research Areas */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <AcademicCapIcon className="w-10 h-10 text-teal-500 mr-4" />
                  Prioritetne naučne oblasti
                </h2>
                
                {/* Social and Humanities Sciences */}
                <div className="mb-8 group p-6 border border-gray-100 rounded-xl hover:border-teal-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                    <div>
                      <h3 className="text-xl font-bold mb-4 transition-colors duration-300 text-gray-900 hover:text-teal-600 group-hover:text-teal-600">
                        Društvene i humanističke nauke
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Međunarodni odnosi, politikologija, socijalna politika, ispitivanje javnog mnjenja, rodna ravnopravnost, istraživanje javnih politika, ekonomija, pravo, sociologija, antropologija, mediji i komunikacije, istorija i arheologija, filozofija, etika i religija</strong>, i drugo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ICT */}
                <div className="mb-8 group p-6 border border-gray-100 rounded-xl hover:border-green-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500 mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                    <div>
                      <h3 className="text-xl font-bold mb-4 transition-colors duration-300 text-gray-900 hover:text-green-600 group-hover:text-green-600">
                        Informaciono-komunikacione tehnologije
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Multimedijalne tehnologije, softversko inženjerstvo, obrada podataka, sistemi i arhitekture, projektovanje informacionih sistema, algoritmi za obradu signala, kompjuterska vizija, kriptografija, cyber security, watermarking, vještačka inteligencija, mašinsko učenje</strong>, i drugo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Biomedicine */}
                <div className="group p-6 border border-gray-100 rounded-xl hover:border-pink-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                    <div>
                      <h3 className="text-xl font-bold mb-4 transition-colors duration-300 text-gray-900 hover:text-pink-600 group-hover:text-pink-600">
                        Biomedicina
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Bazična istraživanja molekularne osnove i mehanizama bolesti – ćelijska i molekularna biologija, biologija kancera, biohemija, nove tehnologije u dijagnostici i praćenju bolesti, personalizovana medicina, genetika i epigenetika, fiziologija i farmakologija, neuronauke</strong>, i drugo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Philosophy */}
              <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl shadow-lg p-8 border border-teal-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Istraživački fokus</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      U skladu sa savremenim globalnim trendovima društvenih kretanja i promjena, Institut za napredne studije svoj 
                      <strong className="text-teal-600"> istraživački fokus stavlja posebno na segment koji se tiče aktuelnih društvenih i prirodnih fenomena</strong>, 
                      prevashodno iz interdisciplinarne, ali i multidisciplinarne i transdisciplinarne perspektive.
                    </p>
                  </div>
                </div>
              </div>

              {/* Institute Goals */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ChartBarIcon className="w-8 h-8 text-green-500 mr-3" />
                  Ciljevi Instituta
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Povećanje produktivnosti istraživačkih timova",
                      icon: ArrowTrendingUpIcon,
                      color: "text-blue-600"
                    },
                    {
                      title: "Stimulisanje saradnje sa međunarodnim istraživačkim institucijama",
                      icon: UserGroupIcon,
                      color: "text-teal-600"
                    },
                    {
                      title: "Saradnja sa privrednim sektorom u tržišno-orijentisanim istraživanjima",
                      icon: BriefcaseIcon,
                      color: "text-green-600"
                    },
                    {
                      title: "Kreiranje javnih politika zasnovanih na činjenicama",
                      icon: DocumentTextIcon,
                      color: "text-pink-600"
                    },
                    {
                      title: "Koordinisano upravljanje istraživačkim resursima",
                      icon: CogIcon,
                      color: "text-purple-600"
                    },
                    {
                      title: "Učešće u projektima finansiranim od eksternih fondova",
                      icon: CurrencyDollarIcon,
                      color: "text-orange-600"
                    }
                  ].map((goal, index) => {
                    const IconComponent = goal.icon;
                    return (
                      <div key={index} className="group p-4 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className={`w-6 h-6 ${goal.color}`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300 font-medium">
                              {goal.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Focus on External Funding */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <GlobeAltIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Međunarodni projekti</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      U fokusu djelatnosti Instituta za napredne studije je i 
                      <strong className="text-blue-600"> intenziviranje učešća u naučno-istraživačkim projektima finansiranim od strane eksternih (međunarodnih) fondova za istraživanja</strong>, 
                      a koji zadovoljavaju visoke evropske i svjetske naučne kriterijume.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Institut za napredne studije
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Adresa</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Mihaila Lalića bb<br />
                        81000 Podgorica<br />
                        Crna Gora
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Telefon</h4>
                      <p className="text-gray-600 text-sm">
                        (+382) 20 414 255
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.18.09.4.09.58 0L19 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Email</h4>
                      <p className="text-gray-600 text-sm">
                        ins@ucg.ac.me
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Action Button */}
                <div className="mt-6 text-center">
                  <button className="group relative w-full px-6 py-3 bg-transparent text-gray-700 font-medium rounded-full overflow-hidden transform transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-transparent">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2">
                      <span>Kontaktirajte nas</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
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
                <li><Link href="/" className="hover:text-teal-400 transition-colors duration-300">Home</Link></li>
                <li><Link href="/#research" className="hover:text-green-400 transition-colors duration-300">Research</Link></li>
                <li><Link href="/#people" className="hover:text-pink-400 transition-colors duration-300">People</Link></li>
                <li><Link href="/#news" className="hover:text-blue-400 transition-colors duration-300">News</Link></li>
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