import { useState, useEffect} from 'react'




export default function App() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScale(Math.max(0.85, 1 - scrollY / 1000)); // squish on scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 sticky top-0 bg-white shadow-md z-50">
        <h1 className="text-2xl font-bold text-purple-600">CampusCollab</h1>
        <nav className="flex gap-6">
          <a href="#events" className="hover:text-purple-600">Events</a>
          <a href="#skills" className="hover:text-purple-600">Skills</a>
          <a href="#login" className="hover:text-purple-600">Login</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        style={{ transform: `scale(${scale})` }}
        className="transition-transform duration-300 px-6 text-center mt-16"
      >
        <h2 className="text-4xl font-bold mb-4">
          Make your campus life <span className="text-purple-600">epic</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          RSVP to events, discover talent, and connect with skilled peers on campus.
        </p>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700">
          Get Started
        </button>

        {/* Sample cards like your screenshot */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-200 to-purple-400 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-lg mb-2">Join Events</h3>
            <p>RSVP and never miss out on campus activities.</p>
          </div>
          <div className="bg-gradient-to-br from-green-200 to-green-400 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-lg mb-2">Share Skills</h3>
            <p>Offer workshops or find study partners easily.</p>
          </div>
          <div className="bg-gradient-to-br from-pink-200 to-pink-400 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-lg mb-2">Collab Projects</h3>
            <p>Find teammates for hackathons and college fests.</p>
          </div>
        </div>
      </section>
    </div>
  );
}


