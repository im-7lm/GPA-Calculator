import { CheckCircle2, Target, Clock, Brain } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const benefits = [
  {
    icon: Target,
    title: 'Set academic goals with clarity',
    desc: 'Know exactly what grades you need in each course to hit your target GPA — no more guessing.',
  },
  {
    icon: Clock,
    title: 'Save hours of manual calculation',
    desc: 'Stop using spreadsheets. Get instant, accurate results with zero setup time.',
  },
  {
    icon: Brain,
    title: 'Make smarter study decisions',
    desc: 'Focus your effort where it matters most. Identify which courses impact your GPA the most.',
  },
  {
    icon: CheckCircle2,
    title: 'Track your full academic journey',
    desc: 'From freshman year to senior semester — your entire GPA history in one place.',
  },
];

export default function Benefits() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="benefits" className="relative py-28 bg-[#080d1a]">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/8 blur-[100px] rounded-full pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
              <span className="text-blue-300 text-xs font-medium tracking-wide">Why Students Love It</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">
              Built to help you{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                perform better
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              GPACalc isn't just a calculator — it's your academic planning partner. Understand your standing and take control of your results.
            </p>

            <div className="space-y-5">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className={`flex items-start gap-4 transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${i * 100 + 200}ms` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">{b.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative rounded-2xl border border-white/8 bg-white/2 backdrop-blur-sm p-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />

              <div className="relative space-y-6">
                <p className="text-slate-300 text-sm font-medium uppercase tracking-widest">Academic Progress</p>

                {[
                  { label: 'Semester 1', gpa: 3.45, max: 4.0, color: 'from-blue-500 to-blue-400' },
                  { label: 'Semester 2', gpa: 3.62, max: 4.0, color: 'from-blue-500 to-cyan-400' },
                  { label: 'Semester 3', gpa: 3.78, max: 4.0, color: 'from-cyan-500 to-teal-400' },
                  { label: 'Semester 4', gpa: 3.85, max: 4.0, color: 'from-teal-400 to-cyan-300' },
                ].map((sem) => (
                  <div key={sem.label}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-400 text-sm">{sem.label}</span>
                      <span className="text-white font-semibold text-sm">{sem.gpa.toFixed(2)}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${sem.color} rounded-full transition-all duration-1000`}
                        style={{ width: isVisible ? `${(sem.gpa / sem.max) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 text-xs">Cumulative CGPA</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mt-1">3.68</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-xs">Academic Standing</p>
                    <p className="text-green-400 font-semibold text-sm mt-1">Excellent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
