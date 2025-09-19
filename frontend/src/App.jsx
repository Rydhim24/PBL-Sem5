import { motion } from "framer-motion";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Register.jsx";
import Profile from "./profile.jsx";

export default function App() {
  const navigate = useNavigate();
  const features = [
    {
      title: "Join Events",
      desc: "RSVP and never miss out on campus activities.",
      color: "from-purple-400 to-purple-600 h-40"
    },
    {
      title: "Share Skills",
      desc: "Offer workshops or find study partners easily.",
      color: "from-green-400 to-green-600 h-56"
    },
    {
      title: "Collab Projects",
      desc: "Find teammates for hackathons and college fests.",
      color: "from-pink-400 to-pink-600 h-48"
    },
    {
      title: "Showcase Talent",
      desc: "Highlight your skills and get noticed on campus.",
      color: "from-blue-400 to-blue-600 h-64"
    },
    {
      title: "Campus Marketplace",
      desc: "Buy, sell, or exchange useful resources.",
      color: "from-orange-400 to-orange-600 h-52"
    },
    {
      title: "Event Highlights",
      desc: "See trending campus activities.",
      color: "from-teal-400 to-teal-600 h-44"
    }
  ];

  function HomePage() {
    return (
      <>
        {/* Animated Background Blobs */}
        <motion.div
          className="absolute top-10 left-20 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"
          animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />

        {/* Heading Section */}
        <div className="text-center py-20 relative z-10">
          <h1 className="text-5xl font-bold">
            Make your campus life <span className="text-purple-600">epic</span>
          </h1>
          <p className="mt-4 text-black font-bold">
            RSVP to events, discover talent, and connect with skilled peers on campus.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-2xl shadow-lg hover:shadow-purple-400/50 transition"
            onClick={() => navigate("/auth")}
          >
            <span className="font-bold text-5xl">Get Started</span>
          </motion.button>
        </div>

        {/* Masonry Layout */}
        <div className="px-12 pb-20 relative z-10">
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 [column-fill:_balance]">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className={`mb-6 break-inside-avoid p-6 rounded-2xl shadow-xl bg-gradient-to-r ${f.color} text-white cursor-pointer`}
              >
                <h2 className="text-xl font-semibold">{f.title}</h2>
                <p className="mt-2">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-gray-100 relative overflow-hidden">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </div>
  );
}

