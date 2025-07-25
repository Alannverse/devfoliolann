import { motion } from 'framer-motion';

const TypingText = ({ text, className = "" }) => {
  return (
    <motion.div
      className={className}
      aria-label={text}
      role="text"
      style={{ display: "inline-block", whiteSpace: "nowrap", overflow: "hidden" }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.07 }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <motion.span
        style={{ display: "inline-block", width: "1ch", marginLeft: 2 }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        |
      </motion.span>
    </motion.div>
  );
};

export default TypingText;
