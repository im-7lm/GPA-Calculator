import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080d1a]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <GraduationCap size={16} className="text-white" />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            GPA<span className="text-blue-400">Calc</span>
          </span>
        </Link>

        {/* <div className="hidden md:flex items-center gap-8">
          {[
            { name: "Features", path: "/#features" },
            { name: "How It Works", path: "/#how-it-works" },
            // { name: 'Benefits', path: '/#benefits' },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">
              {item.name}
            </Link>
          ))}
        </div> */}

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/calc"
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200 px-4 py-2">
            Calculator
          </Link>
          <Link
            to="/score"
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200 px-4 py-2">
            Score Calc
          </Link>
          <Link
            to="/calc"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]">
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0c1225]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {[
            { name: "Features", path: "/#features" },
            { name: "How It Works", path: "/#how-it-works" },
            { name: "Benefits", path: "/#benefits" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              onClick={() => setMenuOpen(false)}>
              {item.name}
            </Link>
          ))}
          <Link
            to="/calc"
            className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold mt-2 inline-block text-center">
            Calculator
          </Link>
        </div>
      )}
    </nav>
  );
}
