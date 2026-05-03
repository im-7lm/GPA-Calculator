import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    name: "Calculus III",
    credits: 3,
    grade: "A",
    points: 4.0,
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Data Structures",
    credits: 4,
    grade: "A-",
    points: 3.7,
    color: "from-cyan-500 to-teal-400",
  },
  {
    name: "Physics II",
    credits: 3,
    grade: "B+",
    points: 3.3,
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Engineering Ethics",
    credits: 2,
    grade: "A",
    points: 4.0,
    color: "from-teal-400 to-cyan-500",
  },
];

export default function CalculatorMockup() {
  const totalCredits = courses.reduce((s, c) => s + c.credits, 0);
  const weightedSum = courses.reduce((s, c) => s + c.points * c.credits, 0);
  const gpa = (weightedSum / totalCredits).toFixed(2);

  return (
    <div className="w-full max-w-md animate-float">
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-[#0c1225]/90 backdrop-blur-xl">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-2 text-slate-500 text-xs font-mono">
            gpa-calculator.app
          </span>
        </div>

        <div className="p-5 space-y-5">
          {/* Semester label + inline GPA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
              <span className="text-slate-300 text-sm font-medium">
                Fall 2025
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
              <span className="text-slate-500 text-xs">GPA</span>
              <span className="text-white font-bold text-sm tabular-nums">
                {gpa}
              </span>
            </div>
          </div>

          {/* Course rows */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-[1fr_40px_48px] gap-2 px-1 mb-1.5">
              <span className="text-slate-600 text-[10px] uppercase tracking-widest font-medium">
                Course
              </span>
              <span className="text-slate-600 text-[10px] uppercase tracking-widest font-medium text-center">
                Cr
              </span>
              <span className="text-slate-600 text-[10px] uppercase tracking-widest font-medium text-center">
                Grade
              </span>
            </div>

            {courses.map((course) => (
              <div
                key={course.name}
                className="grid grid-cols-[1fr_40px_48px] gap-2 items-center">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/3 border border-white/5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${course.color} flex-shrink-0`}
                  />
                  <span className="text-white text-sm truncate">
                    {course.name}
                  </span>
                </div>
                <div className="text-center text-slate-400 text-sm tabular-nums">
                  {course.credits}
                </div>
                <div className="text-center">
                  <span
                    className={`text-sm font-semibold bg-gradient-to-r ${course.color} bg-clip-text text-transparent`}>
                    {course.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Summary */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-slate-600 text-[10px] uppercase tracking-widest">
                  Credits
                </p>
                <p className="text-white font-semibold text-sm tabular-nums">
                  {totalCredits}
                </p>
              </div>
              <div className="w-px h-5 bg-white/8" />
              <div>
                <p className="text-slate-600 text-[10px] uppercase tracking-widest">
                  CGPA
                </p>
                <p className="text-cyan-300 font-semibold text-sm tabular-nums">
                  3.78
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-slate-600 text-[10px] uppercase tracking-widest mb-0.5">
                Semester
              </p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent leading-none tabular-nums">
                {gpa}
              </p>
            </div>
          </div>

          {/* CTA — example notice + button */}
          <div className="pt-2 border-t border-white/5">
            <p className="text-slate-500 text-xs text-center mb-3">
              This is an example — try it yourself
            </p>
            <Link
              to="/calc"
              className="group flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-500/20">
              Open Calculator
              <ArrowRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-8 -left-8 w-48 h-48 bg-cyan-500/8 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}
