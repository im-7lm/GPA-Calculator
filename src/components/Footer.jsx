import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <GraduationCap size={16} className="text-white" />
          </div>

          <span className="text-white font-semibold tracking-tight">
            GPA<span className="text-blue-400">Calc</span>
          </span>
        </Link>

        <p className="text-sm text-slate-500 text-center">
          © {new Date().getFullYear()} GPACalc. Built by{" "}
          <span className="text-slate-300 font-medium"> Eng. Ahmed Magdi</span>
        </p>
      </div>
    </footer>
  );
}
