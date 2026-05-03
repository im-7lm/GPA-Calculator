import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const links = {
  Product: ['Features', 'How It Works', 'Changelog', 'Roadmap'],
  Resources: ['Documentation', 'Blog', 'GPA Guide', 'Credit Hours'],
  Company: ['About', 'Privacy', 'Terms', 'Contact'],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#080d1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <GraduationCap size={16} className="text-white" />
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">GPA<span className="text-blue-400">Calc</span></span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              The modern GPA calculator built for university students who care about their academic performance.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-white text-sm font-semibold mb-4">{category}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-500 text-sm hover:text-slate-300 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} GPACalc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-600 text-sm hover:text-slate-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
