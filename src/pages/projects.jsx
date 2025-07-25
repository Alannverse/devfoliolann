import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "Landing Page Jokian Tugas",
      description: "Landing page jasa pengerjaan PPT, makalah, excel, hingga skripsi yang menarik & informatif.",
      technologies: ["React", "TailwindCSS"],
      category: ["Client"],
      image: "/LPjoki.png",
      accent: "purple",
    },
    {
      id: 2,
      title: "Website SD Kristen Elim",
      description: "Membangun situs web sekolah dengan fitur manajemen yang mudah digunakan & informasi lengkap bagi guru, siswa, dan orang tua.",
      technologies: ["PHP", "Bootstrap", "MySQL"],
      category: ["Showcase", "Client"],
      image: "/web sekolah1.png",
      accent: "cyan",
    },
    {
      id: 3,
      title: "Website Fakultas Kedokteran",
      description: "Website resmi Program Studi Kedokteran untuk menyajikan informasi akademik, struktur kurikulum, dan kemudahan akses bagi calon mahasiswa.",
      technologies: ["PHP", "TailwindCSS", "MySQL"],
      category: ["Showcase", "Client"],
      image: "/fkukip.jpg",
      accent: "teal",
    },
    {
      id: 4,
      title: "Personal Portfolio",
      description: "Portfolio pribadi saya sebagai sarana untuk memperkenalkan diri & karya digital kepada dunia.",
      technologies: ["React", "TailwindCSS"],
      category: ["Personal"],
      image: "/personal.png",
      accent: "blue",
    },
  ];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((project) => project.category.includes(activeFilter));

  return (
    <section id="projects" className="relative scroll-mt-32 py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Learning Through Work
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Proyek-proyek ini bukan hanya hasil akhir, tapi juga bagian dari perjalanan belajar saya sendiri.
          </p>
        </motion.div>

        <motion.div className="flex justify-center mb-16">
          <div className="inline-flex p-1 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
            {["All", "Client", "Showcase", "Personal"].map((filter) => (
              <motion.button
                key={filter}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg mx-1 border ${
                  activeFilter === filter
                    ? "text-cyan-400 border-cyan-400/30 bg-cyan-500/10"
                    : "text-gray-400 border-gray-600/50 bg-gray-800/30"
                }`}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <div className="relative bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
                  <div className="relative w-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      <div className="flex gap-1 flex-wrap">
                        {project.category.map((cat) => (
                          <span
                            key={cat}
                            className={`text-xs px-3 py-1 rounded-full border ${
                              cat === "Personal" ? "text-cyan-400 border-cyan-400/30 bg-cyan-500/10" :
                              cat === "Client" ? "text-blue-400 border-blue-400/30 bg-blue-500/10" :
                              "text-purple-400 border-purple-400/30 bg-purple-500/10"
                            }`}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
