import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative bg-neutral-950 text-neutral-400 py-12 px-6 border-t border-neutral-800"
    >
      <div className="max-w-4xl mx-auto">
        {/* Animated copyright section */}
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.6, 0.05, -0.01, 0.9],
          }}
          className="flex flex-col items-center"
        >
          {/* Animated copyright text */}
          <motion.div
            animate={{
              opacity: [0, 1],
              y: [5, 0],
            }}
            transition={{
              duration: 0.6,
              delay: 0.5,
            }}
            className="text-xs tracking-widest mb-2"
          >
            ALL RIGHTS RESERVED
          </motion.div>

          {/* Year animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-1 text-sm"
          >
            <motion.span
              animate={{
                opacity: [0.6, 1, 0.6],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                },
              }}
            >
              ©
            </motion.span>
            {currentYear}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="ml-1 font-medium text-neutral-300"
            >
              Praseptialan
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Subtle animated divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8"
        />

        {/* Minimalist quote with fade-in */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-center text-neutral-500 mt-4"
        >
          "Udah scroll sampe sini? Kamu luar biasa. Makasih ya udah mampir!"
        </motion.p>

        {/* Back to Top button */}
        <Link to="home" smooth={true} duration={500}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center mt-6"
          >
            <button
              className="text-sm px-4 py-2 rounded-full border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 transition duration-300"
            >
              ↑ Back to Top
            </button>
          </motion.div>
        </Link>
      </div>
    </motion.footer>
  );
};

export default Footer;
