import { PlusCircle, SlidersHorizontal, Trophy } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const steps = [
  {
    step: '01',
    icon: PlusCircle,
    title: 'Add Your Courses',
    desc: 'Enter your course names, credit hours, and the grades you received or expect. It takes less than a minute.',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    border: 'border-blue-500/15',
  },
  {
    step: '02',
    icon: SlidersHorizontal,
    title: 'Configure Your System',
    desc: 'Set your university\'s grading scale, credit hour system, and any custom weights. Fully flexible.',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    border: 'border-cyan-500/15',
  },
  {
    step: '03',
    icon: Trophy,
    title: 'See Your Results',
    desc: 'Instantly view your semester GPA, cumulative CGPA, and personalized recommendations to hit your targets.',
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/10',
    border: 'border-teal-500/15',
  },
];

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="how-it-works" className="relative py-28 bg-[#080d1a]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-5">
            <span className="text-cyan-300 text-xs font-medium tracking-wide">Simple Process</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Up and running in{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              60 seconds
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            No account required to get started. Just open and calculate.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-16 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-teal-500/30" />
          <div className="hidden md:block absolute top-16 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-blue-500/10 via-cyan-500/30 to-teal-500/10 blur-sm" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className={`relative flex flex-col items-center text-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`relative w-16 h-16 rounded-2xl ${step.iconBg} border ${step.border} flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 hover:scale-110 z-10`}>
                  <Icon size={26} className={step.iconColor} />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#080d1a] border border-white/10 flex items-center justify-center">
                    <span className="text-slate-400 text-[9px] font-bold">{step.step}</span>
                  </div>
                </div>

                <div className={`p-6 rounded-2xl border border-white/6 bg-white/2 backdrop-blur-sm w-full`}>
                  <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
