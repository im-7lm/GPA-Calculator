import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function CTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-28 bg-[#080d1a] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div
        ref={ref}
        className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
          <Sparkles size={13} className="text-blue-400" />
          <span className="text-blue-300 text-xs font-medium tracking-wide">
            Free for All Students
          </span>
        </div>

        <h2 className="text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
          Take control of your{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
            academic future
          </span>
        </h2>

        <p className="text-slate-400 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
          Join thousands of engineering students using GPACalc to plan their
          semesters, hit their targets, and graduate with confidence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/calc"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-base hover:opacity-90 transition-all duration-300 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-[1.03]">
            Start Calculating — It's Free
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
          {/* <button className="px-8 py-4 rounded-xl border border-white/10 text-slate-300 font-medium text-base hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200">
            View Demo
          </button> */}
        </div>

        <p className="text-slate-600 text-sm mt-6">
          No account required · No credit card · Works instantly
        </p>
      </div>
    </section>
  );
}
