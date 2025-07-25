import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const About = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile-optimized Typewriter component
  const TypewriterText = ({ text, delay = 0, className = "" }) => {
    const [displayedText, setDisplayedText] = useState(isMobile ? "" : text);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        if (isMobile) {
          // Mobile: Fast typewriter with fewer steps
          let i = 0;
          const typingInterval = setInterval(() => {
            if (i < text.length) {
              setDisplayedText(text.substring(0, i + 1));
              i += 2; // Skip characters for faster animation
            } else {
              clearInterval(typingInterval);
            }
          }, 30);
          return () => clearInterval(typingInterval);
        } else {
          // Desktop: Original smooth typewriter
          setDisplayedText(text);
        }
      }
    }, [inView, text, isMobile]);

    const renderTextWithHighlights = () => {
      const keywords = ["Frontend", "JavaScript", "React", "AI", "coding", "Teknik Informatika"];
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
              className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: isMobile ? 0.2 : 0.3 }} // Faster on mobile
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
        className={`${className} text-base sm:text-lg text-gray-300 leading-relaxed whitespace-pre-line`}
      >
        {renderTextWithHighlights()}
      </motion.p>
    );
  };

  // Mobile-friendly ParticleBackground
  const ParticleBackground = () => {
    const particleCount = isMobile ? 15 : 30;
    const particleSize = isMobile ? 3 : 5;
    
    return (
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: particleSize,
              height: particleSize,
              opacity: Math.random() * 0.3,
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              transition: {
                duration: isMobile ? Math.random() * 5 + 5 : Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
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

  // Responsive AnimatedTitle
  const AnimatedTitle = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start({
          opacity: 1,
          x: 0,
          transition: { 
            duration: isMobile ? 0.5 : 0.8,
            ease: "easeOut" 
          },
        });
      }
    }, [controls, inView, isMobile]);

    return (
      <motion.div ref={ref} initial={{ opacity: 0, x: -50 }} animate={controls}>
        <motion.h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
          About{" "}
          <motion.span
            className="text-cyan-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: isMobile ? 0.5 : 1 }}
          >
            Me
          </motion.span>
        </motion.h2>
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
        />
      </motion.div>
    );
  };

  // Responsive ProfileImage
  const ProfileImage = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
          duration: isMobile ? 0.4 : 0.6,
          ease: "easeOut",
        },
      },
      hover: {
        rotate: isMobile ? 0 : 3,
        scale: isMobile ? 1.02 : 1.05,
        transition: { duration: 0.3 },
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-lg -z-10 scale-110"
        />
        <img
          src="/fotoku2.jpg"
          alt="Profile"
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full shadow-xl object-cover border-4 border-gray-700/50"
          loading="lazy"
        />
      </motion.div>
    );
  };

  // Responsive ValueCard
  const ValueCard = ({ title, description, icon, delay }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const controls = useAnimation();

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { 
          duration: isMobile ? 0.4 : 0.6, 
          delay,
          type: isMobile ? "tween" : "spring"
        },
      },
    };

    const iconVariants = {
      hover: {
        y: isMobile ? 0 : [-3, 3, -3, 0],
        transition: {
          duration: isMobile ? 0 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={cardVariants}
        whileHover={{ y: isMobile ? 0 : -3 }}
        className="group relative bg-gray-800/40 p-5 rounded-xl border border-gray-700 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            variants={iconVariants}
            className="h-10 w-10 rounded-lg bg-cyan-600/10 flex items-center justify-center border border-cyan-500/20"
          >
            {icon}
          </motion.div>
          <h4 className="text-md font-medium text-white">{title}</h4>
        </div>
        <TypewriterText
          text={description}
          className="text-sm"
          delay={delay + 0.2}
        />
      </motion.div>
    );
  };

  return (
    <section id="about" className="py-12 sm:py-16 bg-gray-900 relative overflow-hidden">
      <ParticleBackground />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <AnimatedTitle />

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="order-2 lg:order-1 flex justify-center">
            <ProfileImage />
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-6 rounded-xl border border-cyan-900/30"
            >
              <TypewriterText
                text="Saya adalah mahasiswa Teknik Informatika yang tertarik mengeksplorasi berbagai bahasa pemrograman dan perkembangan teknologi, termasuk AI."
                delay={0.3}
              />
              <TypewriterText
                text="Ketertarikan saya berawal dari rasa penasaran dan keinginan untuk mencoba hal baru. Sekarang, saya aktif mengembangkan diri melalui proyek pribadi, belajar mandiri, dan terbuka untuk pengalaman baru."
                delay={1.0}
                className="mt-4"
              />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ValueCard
                title="Rasa Ingin Tahu"
                description="Dari frontend ke backend sampai AI, saya terus belajar walau belum semuanya bisa."
                icon={
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
                delay={0.4}
              />

              <ValueCard
                title="Semangat Belajar"
                description="Tantangan dan proses justru bikin saya makin semangat dalam belajar."
                icon={
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                }
                delay={0.5}
              />

              <ValueCard
                title="Kolaborasi"
                description="Saling terbuka dan melihat dari sudut pandang orang lain untuk hasil lebih baik."
                icon={
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                delay={0.6}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;