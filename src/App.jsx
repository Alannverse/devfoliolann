import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/home';
import About from './pages/about';
import Projects from './pages/projects';
import Certificates from './pages/certificates'; // ✅ Fixed capitalization
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} text-white`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Home />
      <About />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
