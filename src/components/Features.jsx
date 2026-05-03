import { Calculator, TrendingUp, Zap, BookOpen, BarChart3, Settings2 } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const features = [
  {
    icon: Calculator,
    title: 'Custom Grading Systems',
    desc: 'Supports any grading scale — A/B/C, percentage-based, or fully custom letter grades tailored to your institution.',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-500/20',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
  },
  {
    icon: TrendingUp,
    title: 'CGPA Prediction',
    desc: 'Set a target CGPA and instantly see what grades you need in upcoming semesters. Plan smarter, not harder.',
    gradient: 'from-cyan-500/20 to-teal-500/10',
    border: 'border-cyan-500/20',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Zap,
    title: 'Real-Time Calculation',
    desc: 'Your GPA updates instantly as you type. No submit buttons, no loading spinners — pure speed.',
    gradient: 'from-blue-400/20 to-blue-600/10',
    border: 'border-blue-400/20',
    iconBg: 'bg-blue-400/15',
    iconColor: 'text-blue-300',
  },
  {
    icon: BookOpen,
    title: 'Easy Course Management',
    desc: 'Add, edit, and remove courses in seconds. Organize by semester and track your full academic history.',
    gradient: 'from-teal-500/20 to-cyan-400/10',
    border: 'border-teal-500/20',
    iconBg: 'bg-teal-500/15',
    iconColor: 'text-teal-400',
  },
  {
    icon: BarChart3,
    title: 'Visual Analytics',
    desc: 'Beautiful charts showing your GPA progression, credit hour distribution, and academic trend over time.',
    gradient: 'from-blue-600/20 to-cyan-500/10',
    border: 'border-blue-600/20',
    iconBg: 'bg-blue-600/15',
    iconColor: 'text-blue-400',
  },
  {
    icon: Settings2,
    title: 'Fully Configurable',
    desc: 'Choose your credit hour system, grade weight mapping, and semester structure. Adapts to any university worldwide.',
    gradient: 'from-cyan-400/20 to-blue-500/10',
    border: 'border-cyan-400/20',
    iconBg: 'bg-cyan-400/15',
    iconColor: 'text-cyan-300',
  },
];

export default function Features() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="features" className="relative py-28 bg-[#080d1a]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
            <span className="text-blue-300 text-xs font-medium tracking-wide">Everything You Need</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Powerful features for{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              serious students
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Every tool you need to stay on top of your GPA — from first semester to graduation day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group relative rounded-2xl p-6 border ${feature.border} bg-gradient-to-br ${feature.gradient} backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 cursor-default ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/2 transition-colors duration-300" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />

                <div className={`w-11 h-11 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={20} className={feature.iconColor} />
                </div>

                <h3 className="text-white font-semibold text-base mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
