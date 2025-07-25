import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGmail, SiLinkedin, SiGithub, SiInstagram } from "react-icons/si";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Animasi
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Ganti dengan data dari EmailJS kamu
const EMAILJS_CONFIG = {
  serviceId: "service_rcsy1ez",
  templateId: "template_3x3l8ch",
  publicKey: "5_2paSNx8BlAo84c0",
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill all fields");
      }

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAILJS_CONFIG.publicKey
      );

      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(true);
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-20 bg-gray-900"
    >
      <ToastContainer />
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Form */}
            <motion.div variants={itemVariants} className="flex-1">
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl"
              >
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Your name"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </motion.button>

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-100 text-center"
                    >
                      Message sent! I'll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="flex-1 flex flex-col justify-center"
            >
              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl h-full">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Other Ways to Connect
                </h3>

                <div className="space-y-6">
                  {/* LinkedIn */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                      <SiLinkedin className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Connect on</p>
                      <a
                        href="https://www.linkedin.com/in/prasepti-alan-6a2684318"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </motion.div>

                  {/* GitHub */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                      <SiGithub className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Check my</p>
                      <a
                        href="https://github.com/Alannverse"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-purple-400 transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  </motion.div>

                  {/* Instagram */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 bg-pink-500/10 rounded-lg text-pink-400">
                      <SiInstagram className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Follow on</p>
                      <a
                        href="https://instagram.com/prasepti_alan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-pink-400 transition-colors"
                      >
                        Instagram
                      </a>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Let's Work Together
                  </h4>
                  <p className="text-gray-400">
                    Saat ini saya siap bekerja lepas dan berkolaborasi. Baik
                    Anda memiliki proyek yang ingin didiskusikan atau sekadar
                    ingin menyapa, saya akan berusaha sebaik mungkin untuk
                    merespons dalam 24 jam!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
