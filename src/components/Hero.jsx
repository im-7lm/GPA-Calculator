import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import CalculatorMockup from './CalculatorMockup';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[#080d1a]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px] pointer-events-none animate-pulse-slower" />
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full bg-blue-400/6 blur-[90px] pointer-events-none" />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit">
            <Sparkles size={13} className="text-blue-400" />
            <span className="text-blue-300 text-xs font-medium tracking-wide">Built for Engineering Students</span>
          </div>

          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white">
            Your GPA,{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
              calculated
            </span>{' '}
            smarter.
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
            Plan every semester with precision. Predict your CGPA, manage credit hours, and track your academic performance — all in one powerful tool.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/calc" className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]">
              Start Calculating
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 text-slate-300 font-medium text-sm hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200">
              <TrendingUp size={15} />
              See How It Works
            </button>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-white/5">
            {[
              { val: '10K+', label: 'Students' },
              { val: '4.9★', label: 'Rating' },
              { val: 'Free', label: 'Forever' },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="text-white font-bold text-xl">{val}</div>
                <div className="text-slate-500 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end animate-fade-in-up-delayed">
          <CalculatorMockup />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080d1a] to-transparent pointer-events-none" />
    </section>
  );
}
