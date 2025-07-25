import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const texts = ["tech enthusiast", "problem solver", "curious mind", "creative thinker"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  const floating = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

 
  const gradientColors = [
    "from-cyan-300 via-sky-400 to-cyan-200",
    "from-purple-400 via-pink-500 to-red-400",
    "from-green-400 via-teal-500 to-blue-400",
    "from-yellow-400 via-orange-500 to-red-400",
  ];
  const [currentGradient, setCurrentGradient] = useState(0);

  useEffect(() => {
    const gradientInterval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradientColors.length);
    }, 8000);
    return () => clearInterval(gradientInterval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      
      <motion.div
        className="fixed w-64 h-64 rounded-full bg-cyan-500/10 pointer-events-none z-0"
        animate={{
          x: cursorPosition.x - 128,
          y: cursorPosition.y - 128,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.15 : 0.05,
        }}
        transition={{ type: "spring", mass: 0.1 }}
      />

      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.03]"></div>
      </div>

      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["</>", "{}", "[]", "()", "=>", "++", "#", "*"].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400/30 text-xl font-mono"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              rotate: Math.random() * 360,
              opacity: 0,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
              opacity: [0, 0.3, 0],
              transition: {
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          {/* Left content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.p
              variants={item}
              className="font-mono text-sm md:text-base text-blue-300 mb-2"
            >
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="text-white">
                Prasepti{" "}
                <motion.span
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientColors[currentGradient]} relative`}
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "200% 50%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Alan
                </motion.span>
              </span>
            </motion.h1>

            <motion.div
              variants={item}
              className="text-xl sm:text-2xl text-gray-300 mb-6 h-8"
            >
              <span className="font-medium">informatics student &nbsp;</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTextIndex}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block text-cyan-400"
                >
                  {texts[currentTextIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              variants={item}
              className="text-gray-400 text-base sm:text-lg mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Saya mahasiswa Teknik Informatika yang suka belajar dan eksplor hal baru. Selamat datang di ruang kecil saya di internet.
            </motion.p>

            
            <motion.div variants={item} className="flex gap-4 justify-center lg:justify-start">
              <motion.a
                href="#projects"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium relative overflow-hidden group"
                whileHover={{ y: -2 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className="relative z-10">My Projects</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 py-3 rounded-lg border border-cyan-400 text-cyan-400 font-medium relative overflow-hidden group"
                whileHover={{ y: -2 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-colors duration-300" />
              </motion.a>
            </motion.div>

           
          </div>

          
          <motion.div
            className="lg:w-1/2 flex justify-center relative mt-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              variants={floating}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="relative w-56 h-96 sm:w-110 sm:h-[28rem] rounded-2xl overflow-hidden group shadow-xl"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  padding: '2px',
                  background: `linear-gradient(90deg, rgba(34,211,238,0.5), rgba(6,182,212,0.2), rgba(34,211,238,0.5))`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-cyan-400/30 pointer-events-none"
                  initial={{
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    opacity: 0,
                  }}
                  animate={{
                    y: [0, Math.random() * 40 - 20],
                    x: [0, Math.random() * 40 - 20],
                    opacity: [0, 0.8, 0],
                    transition: {
                      duration: Math.random() * 10 + 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: Math.random() * 5,
                    },
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}

              
              <motion.img
                src="/fotoku.png"
                alt="prasepti alan"
                className="w-full h-full object-cover"
                variants={{
                  hover: { scale: 1.03, transition: { duration: 0.5 } },
                }}
              />
              
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;