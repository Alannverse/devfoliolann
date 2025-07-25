import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiAward } from "react-icons/fi";

const Certificates = () => {
  const [activeTab, setActiveTab] = useState("Certifications");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const tabs = ["Certifications", "Activities"];

  const Certifications = [
    {
      id: 1,
      title: "Certificate of Attendance for (Talk Series #1) How AI Reshaping Indonesia's Payment Ecosystem",
      issuer: "Google Developer Group on Campus Indonesia",
      date: "Not specified",
      description: "Awarded for active participation in the talk series on AI's impact on Indonesia's payment ecosystem.",
      image: "/certi1.jpg"
    },
    {
      id: 2,
      title: "Sertifikat Penghargaan for Zero To One Chapter 4: Building Your Digital Voice",
      issuer: "Distrik Berisik (DPD Makassar)",
      date: "05 Juli 2025",
      description: "Recognized as a participant in the event focused on building digital presence.",
      image: "/certi2.jpg"
    },
    {
      id: 3,
      title: "Sertifikat Pelatihan Introduction To Cloud Computing",
      issuer: "Pusat Pengembangan Literasi Digital (Digital Talent Scholarship 2025)",
      date: "7 Mei 2025",
      description: "Completed a 1-hour training on cloud computing fundamentals under the Micro Skill program.",
      image: "/certi3.jpg"
    },
    {
      id: 4,
      title: "Completion Badge for Managing Change when Moving to Google Cloud",
      issuer: "Google Cloud",
      date: "Not specified",
      description: "Awarded for completing the course on managing organizational change during Google Cloud migration.",
      image: "/certi4.jpg"
    },
    {
      id: 5,
      title: "MySkill Short Class Certificate for SEO & Content Writing",
      issuer: "MySkill (PT Linimuda Inspirasi Negeri)",
      date: "5 Mei 2025",
      description: "Completed a short class on digital marketing, specifically SEO and content writing.",
      image: "/certi5.jpg"
    },
    {
      id: 6,
      title: "Sertifikat Pelatihan Introduction to Cyber Security and Career Awareness",
      issuer: "Pusat Pengembangan Literasi Digital (Digital Talent Scholarship 2025)",
      date: "24 Juni 2025",
      description: "Completed a 1-hour training on cybersecurity basics and career paths under the Micro Skill program.",
      image: "/certi6.jpg"
    },
    {
      id: 7,
      title: "Sertifikat Pelatihan AI Engineer For Milenial",
      issuer: "Pusat Pengembangan Literasi Digital (Digital Talent Scholarship 2025)",
      date: "21 Juni 2025",
      description: "Completed a 1-hour training on AI engineering tailored for millennials under the Micro Skill program.",
      image: "/certi7.jpg"
    },
    {
      id: 8,
      title: "Sertifikat Peserta Free Class Pemrograman Dasar C++",
      issuer: "Dilesin Academy",
      date: "16 November 2024",
      description: "Awarded for participation in a free foundational C++ programming class.",
      image: "/certi8.jpg"
    }
  ];

  const activities = [
    { id: 1, image: "/Home page.png" }, 
    { id: 2, image: "/keg1.png" }, 
    { id: 3, image: "/keg2.png" }, 
    { id: 4, image: "/keg3.png" }, 
    { id: 5, image: "/keg4.png" }, 
    { id: 6, image: "/keg5.png" }  
  ];

  const currentData = activeTab === "Certifications" ? Certifications : activities;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === currentData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="certificates" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-cyan-400 text-sm font-medium">
            <FiAward className="mr-2" />
            Activities
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Certificates & 
            </span> Activities
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Ini hasil dari nyoba-nyoba, belajar, dan ikut kegiatan seru yang ngasih banyak pelajaran.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm shadow-lg shadow-blue-900/10">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 text-sm font-medium rounded-lg mx-1 transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-400 shadow-md shadow-cyan-500/10"
                    : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentIndex(0);
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Content */}
        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            <button onClick={handlePrev} className="p-3 rounded-full bg-gray-800/80 border border-gray-700 text-gray-300 hover:text-white hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 shadow-md hover:shadow-cyan-500/20" aria-label="Previous">
              <FaChevronLeft />
            </button>
            <div className="flex space-x-2">
              {currentData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 scale-110'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
            <button onClick={handleNext} className="p-3 rounded-full bg-gray-800/80 border border-gray-700 text-gray-300 hover:text-white hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 shadow-md hover:shadow-cyan-500/20" aria-label="Next">
              <FaChevronRight />
            </button>
          </div>

          {/* Card Display */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 shadow-xl shadow-blue-900/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentData[currentIndex]?.id || 'empty'}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <div 
                  className="relative aspect-video overflow-hidden bg-gray-900"
                  onMouseEnter={() => setHoveredCard(currentData[currentIndex].id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {currentData[currentIndex].image && (
                    <motion.img
                      src={currentData[currentIndex].image}
                      alt="Activity or Certificate"
                      className="w-full h-full object-contain p-4"
                      initial={{ scale: 1 }}
                      animate={{
                        scale: hoveredCard === currentData[currentIndex].id ? 1.03 : 1
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </div>

                {activeTab === "Certifications" && (
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {currentData[currentIndex].title}
                        </h3>
                        <div className="flex items-center text-gray-400 text-sm">
                          <span className="font-medium text-cyan-400">{currentData[currentIndex].issuer}</span>
                          <span className="mx-2 text-gray-600">•</span>
                          <span>{currentData[currentIndex].date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {currentData[currentIndex].description}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
