import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const About = () => {
  const TypewriterText = ({ text, delay = 0, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        let i = 0;
        const typingInterval = setInterval(() => {
          if (i < text.length) {
            setDisplayedText(text.substring(0, i + 1));
            i++;
          } else {
            clearInterval(typingInterval);
          }
        }, 20);

        return () => clearInterval(typingInterval);
      }
    }, [inView, text]);

    const renderTextWithHighlights = () => {
      const keywords = [
        "Frontend",
        "JavaScript",
        "React",
        "AI",
        "coding",
        "Teknik Informatika",
      ];
      let parts = [];
      let lastIndex = 0;

      keywords.forEach((keyword) => {
        const index = displayedText.indexOf(keyword, lastIndex);
        if (index !== -1) {
          if (index > lastIndex) {
            parts.push(displayedText.substring(lastIndex, index));
          }
          parts.push(
            <motion.span
              key={index}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {keyword}
            </motion.span>
          );
          lastIndex = index + keyword.length;
        }
      });

      if (lastIndex < displayedText.length) {
        parts.push(displayedText.substring(lastIndex));
      }

      return parts.length > 0 ? parts : displayedText;
    };

    return (
      <motion.p
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
        className={`${className} text-lg text-gray-300 leading-relaxed whitespace-pre-line`}
      >
        {renderTextWithHighlights()}
      </motion.p>
    );
  };

  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              opacity: Math.random() * 0.5,
            }}
            animate={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    );
  };

  const AnimatedTitle = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start({
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        });
      }
    }, [controls, inView]);

    return (
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={controls}
        className="text-4xl font-bold text-white mb-16 text-center"
      >
        About{" "}
        <motion.span
          className="text-cyan-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Me
        </motion.span>
      </motion.h2>
    );
  };

  const ProfileImage = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    const variants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
      hover: {
        rotate: 3,
        scale: 1.05,
        transition: { duration: 0.3 },
      },
    };

    const glowVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 0.6,
        transition: { duration: 1, delay: 0.3 },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        whileHover="hover"
        className="flex justify-center lg:justify-start relative"
      >
        <motion.div
          variants={glowVariants}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-xl -z-10"
          style={{
            top: "-10%",
            left: "-10%",
            right: "-10%",
            bottom: "-10%",
          }}
        />

        <div className="absolute inset-0 overflow-hidden rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_linear_infinite]" />
        </div>

        {/* Main profile image */}
        <motion.img
          src="/fotoku2.jpg"

          alt="Profile"
          className="w-64 h-64 rounded-full shadow-xl object-cover border-4 border-gray-700/50 hover:border-cyan-400/30 transition-all"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
        />
      </motion.div>
    );
  };

  return (
    <section id="about" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-[shimmer_8s_linear_infinite]" />
      </div>

      <ParticleBackground />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <AnimatedTitle />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <ProfileImage />
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 p-8 rounded-2xl border border-cyan-900/30 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIwIDB2NDBNMCAyMGg0MCIgc3Ryb2tlPSJyZ2JhKDIwNCwyMDQsMjA0LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-20" />

                <div className="relative z-10 space-y-6">
                  <TypewriterText
                    text="Saya adalah mahasiswa Teknik Informatika yang tertarik mengeksplorasi berbagai bahasa pemrograman dan perkembangan teknologi, termasuk AI."
                    delay={0.3}
                  />
                  <TypewriterText
                    text="Ketertarikan saya berawal dari rasa penasaran dan keinginan untuk mencoba hal baru. Sekarang, saya aktif mengembangkan diri melalui proyek pribadi, belajar mandiri, dan terbuka untuk pengalaman baru."
                    delay={1.5}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-16">
            {/* Card 1: Rasa Ingin Tahu */}
            <motion.div
              whileHover={{ y: -3 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden bg-gray-800/40 p-6 rounded-xl border border-gray-700 backdrop-blur-sm hover:border-cyan-500/30 transition-all"
            >
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    initial={{ rotate: 0, scale: 0.8 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="h-10 w-10 rounded-lg bg-cyan-600/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-600/20 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </motion.div>
                  <h4 className="text-lg font-medium text-white">
                    Rasa Ingin Tahu yang Tinggi
                  </h4>
                </div>

                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "auto" }}
                  transition={{ duration: 0.8 }}
                  className="overflow-hidden"
                >
                  <TypewriterText
                    text="Saya mulai belajar coding cuma karena penasaran. Lama-lama saya sadar dunia ini luas banget, dan saya nggak langsung ngerti semuanya—sering mentok juga. Tapi justru itu yang bikin saya nggak berhenti. Dari frontend ke backend sampai nyicip AI, saya terus belajar walau belum semuanya bisa. Buat saya, rasa ingin tahu itu bukan soal cepat jago, tapi soal nggak nyerah buat nyoba.

"
                    className="text-sm mb-3"
                    delay={0.4}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Card 2: Semangat Belajar */}
            <motion.div
              whileHover={{ y: -3 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden bg-gray-800/40 p-6 rounded-xl border border-gray-700 backdrop-blur-sm hover:border-cyan-500/30 transition-all"
            >
              <div className="absolute inset-0 bg-[url('/knowledge-pattern.svg')] opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-10 w-10 rounded-lg bg-cyan-600/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-600/20 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </motion.div>
                  <h4 className="text-lg font-medium text-white">
                    Semangat Belajar
                  </h4>
                </div>

                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "auto" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="overflow-hidden"
                >
                  <TypewriterText
                    text="Belajar buat saya bukan soal kewajiban, tapi dorongan dari rasa ingin tahu. Tantangan dan proses justru bikin saya makin semangat. Proyek kecil, dokumentasi, dan komunitas developer banyak ngajarin saya banyak hal."
                    className="text-sm mb-3"
                    delay={0.5}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Card 3: Kolaborasi */}
            <motion.div
              whileHover={{ y: -3 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden bg-gray-800/40 p-6 rounded-xl border border-gray-700 backdrop-blur-sm hover:border-cyan-500/30 transition-all"
            >
              <div className="absolute inset-0 bg-[url('/collab-pattern.svg')] opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-10 w-10 rounded-lg bg-cyan-600/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-600/20 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </motion.div>
                  <h4 className="text-lg font-medium text-white">Kolaborasi</h4>
                </div>

                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "auto" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="overflow-hidden"
                >
                  <TypewriterText
                    text="Buat saya, kolaborasi itu bukan soal bagi-bagi kerjaan aja, tapi juga soal saling jujur, terbuka, dan berusaha melihat dari sudut pandang orang lain supaya hasilnya lebih baik."
                    className="text-sm mb-3"
                    delay={0.6}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
