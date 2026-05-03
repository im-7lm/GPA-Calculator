import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  RotateCcw,
  Send,
  Settings2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Navbar from "../components/Navbar";

const DEFAULT_GRADE_SCALE = [
  { min: 93, grade: "A" },
  { min: 89, grade: "A-" },
  { min: 84, grade: "B+" },
  { min: 80, grade: "B" },
  { min: 76, grade: "B-" },
  { min: 73, grade: "C+" },
  { min: 70, grade: "C" },
  { min: 67, grade: "C-" },
  { min: 64, grade: "D+" },
  { min: 60, grade: "D" },
  { min: 0, grade: "F" },
];

const STORAGE_KEY = "scoreCalc_courses";
const SETTINGS_KEY = "scoreCalc_settings";

const defaultSettings = {
  midtermMax: 20,
  courseworkMax: 30,
  finalMax: 50,
};

function getLetterGrade(percentage, scale) {
  for (const tier of scale) {
    if (percentage >= tier.min) return tier.grade;
  }
  return "F";
}

function createEmptyCourse() {
  return {
    id: Date.now() + Math.random(),
    name: "",
    credits: 3,
    midterm: "",
    coursework: "",
    final: "",
  };
}

export default function ScoreCalculator() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [settings, setSettings] = useState(defaultSettings);
  const [showSettings, setShowSettings] = useState(false);
  const [gradeScale, setGradeScale] = useState(DEFAULT_GRADE_SCALE);
  const [showScaleEditor, setShowScaleEditor] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      if (saved) setCourses(JSON.parse(saved));
      if (savedSettings) setSettings(JSON.parse(savedSettings));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const totalMax =
    settings.midtermMax + settings.courseworkMax + settings.finalMax;

  const addCourse = () => {
    setCourses([...courses, createEmptyCourse()]);
  };

  const updateCourse = (id, field, value) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  const removeCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const resetAll = () => {
    setCourses([]);
    setSettings(defaultSettings);
    setGradeScale(DEFAULT_GRADE_SCALE);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SETTINGS_KEY);
  };

  const getCourseResult = (course) => {
    const midterm = parseFloat(course.midterm) || 0;
    const coursework = parseFloat(course.coursework) || 0;
    const final = parseFloat(course.final) || 0;
    const total = midterm + coursework + final;
    const percentage = totalMax > 0 ? (total / totalMax) * 100 : 0;
    const letterGrade = getLetterGrade(percentage, gradeScale);
    return { total, percentage, letterGrade };
  };

  const sendToGPACalc = () => {
    const transferCourses = courses
      .filter((c) => c.name.trim() !== "")
      .map((c) => {
        const result = getCourseResult(c);
        return {
          id: Date.now() + Math.random(),
          name: c.name,
          credits: parseFloat(c.credits) || 3,
          grade: result.letterGrade,
        };
      });

    if (transferCourses.length === 0) return;

    localStorage.setItem("gpaCalc_transfer", JSON.stringify(transferCourses));
    navigate("/calc");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#080d1a] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link
              to="/"
              className="text-blue-400 hover:text-blue-300 transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Score Calculator</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
              Score Calculator
            </h1>
            <p className="text-slate-400 text-lg">
              Enter your midterm, coursework, and final scores to see your
              expected grade per course.
            </p>
          </div>

          {/* Top actions */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={addCourse}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">
              <Plus size={16} />
              Add Course
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 transition-colors">
              <Settings2 size={15} />
              Component Weights
              {showSettings ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>

            <button
              onClick={() => setShowScaleEditor(!showScaleEditor)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 transition-colors">
              Grading Scale
              {showScaleEditor ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>

            <div className="flex-1" />

            <button
              onClick={sendToGPACalc}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20">
              <Send size={15} />
              Send to GPA Calculator
            </button>

            <button
              onClick={resetAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/15 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-600/25 transition-colors">
              <RotateCcw size={15} />
              Reset All
            </button>
          </div>

          {/* Settings panel */}
          {showSettings && (
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
              <h3 className="text-white font-semibold mb-4">
                Component Max Scores
              </h3>
              <p className="text-slate-500 text-sm mb-4">
                Adjust the maximum score for each component. Total scale:{" "}
                <span className="text-white font-medium">{totalMax}</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block">
                    Midterm (out of)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={settings.midtermMax}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        midtermMax: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block">
                    Coursework (out of)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={settings.courseworkMax}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        courseworkMax: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block">
                    Final Exam (out of)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={settings.finalMax}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        finalMax: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Grade scale editor */}
          {showScaleEditor && (
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
              <h3 className="text-white font-semibold mb-4">Grading Scale</h3>
              <p className="text-slate-500 text-sm mb-4">
                Minimum percentage required for each letter grade.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {gradeScale.map((tier, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-12 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white font-semibold text-center text-sm">
                      {tier.grade}
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={tier.min}
                      onChange={(e) => {
                        const updated = [...gradeScale];
                        updated[idx] = {
                          ...updated[idx],
                          min: parseFloat(e.target.value) || 0,
                        };
                        setGradeScale(updated);
                      }}
                      className="w-full px-2 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                    <span className="text-slate-500 text-xs">%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {courses.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-16 text-center">
              <p className="text-slate-400 text-lg mb-2">
                No courses added yet
              </p>
              <p className="text-slate-500 text-sm mb-6">
                Add your first course to start calculating your expected grades.
              </p>
              <button
                onClick={addCourse}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                <Plus size={16} />
                Add Course
              </button>
            </div>
          )}

          {/* Course cards */}
          <div className="space-y-4">
            {courses.map((course) => {
              const result = getCourseResult(course);
              const percentage = result.percentage.toFixed(1);
              const gradeColor =
                result.letterGrade === "F"
                  ? "text-red-400"
                  : result.letterGrade.startsWith("A")
                    ? "text-emerald-400"
                    : result.letterGrade.startsWith("B")
                      ? "text-blue-400"
                      : result.letterGrade.startsWith("C")
                        ? "text-yellow-400"
                        : "text-orange-400";

              return (
                <div
                  key={course.id}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-200 hover:border-white/15">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Left: inputs */}
                    <div className="flex-1 space-y-4">
                      {/* Course name + credits */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                          <label className="text-slate-400 text-xs mb-1.5 block">
                            Course Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Data Structures"
                            value={course.name}
                            onChange={(e) =>
                              updateCourse(course.id, "name", e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
                          />
                        </div>
                        <div className="w-24">
                          <label className="text-slate-400 text-xs mb-1.5 block">
                            Credits
                          </label>
                          <input
                            type="number"
                            min="0.5"
                            step="0.5"
                            value={course.credits}
                            onChange={(e) =>
                              updateCourse(course.id, "credits", e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 text-sm"
                          />
                        </div>
                      </div>

                      {/* Score inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-slate-400 text-xs mb-1.5 block">
                            Midterm{" "}
                            <span className="text-slate-600">
                              / {settings.midtermMax}
                            </span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            max={settings.midtermMax}
                            step="0.1"
                            value={course.midterm}
                            onChange={(e) =>
                              updateCourse(course.id, "midterm", e.target.value)
                            }
                            placeholder="0"
                            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 text-xs mb-1.5 block">
                            Coursework{" "}
                            <span className="text-slate-600">
                              / {settings.courseworkMax}
                            </span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            max={settings.courseworkMax}
                            step="0.1"
                            value={course.coursework}
                            onChange={(e) =>
                              updateCourse(
                                course.id,
                                "coursework",
                                e.target.value,
                              )
                            }
                            placeholder="0"
                            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 text-xs mb-1.5 block">
                            Final{" "}
                            <span className="text-slate-600">
                              / {settings.finalMax}
                            </span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            max={settings.finalMax}
                            step="0.1"
                            value={course.final}
                            onChange={(e) =>
                              updateCourse(course.id, "final", e.target.value)
                            }
                            placeholder="0"
                            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right: result */}
                    <div className="lg:w-44 flex flex-row lg:flex-col items-center lg:items-end gap-4 lg:gap-2 lg:pt-7 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-slate-500 text-[10px] uppercase tracking-widest">
                          Total
                        </p>
                        <p className="text-white font-semibold text-sm tabular-nums">
                          {result.total}{" "}
                          <span className="text-slate-500 font-normal">
                            / {totalMax}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-500 text-[10px] uppercase tracking-widest">
                          Percentage
                        </p>
                        <p className="text-white font-semibold text-sm tabular-nums">
                          {percentage}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-500 text-[10px] uppercase tracking-widest">
                          Grade
                        </p>
                        <p
                          className={`font-bold text-2xl tabular-nums ${gradeColor}`}>
                          {result.letterGrade}
                        </p>
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="lg:mt-7 p-2 rounded-lg bg-red-600/15 text-red-400 hover:bg-red-600/25 transition-colors flex-shrink-0 self-start"
                      title="Remove course">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                      style={{ width: `${Math.min(result.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary bar */}
          {courses.length > 0 && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest">
                    Courses
                  </p>
                  <p className="text-white font-bold text-xl">
                    {courses.length}
                  </p>
                </div>
                <div className="w-px h-8 bg-white/8" />
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest">
                    Total Credits
                  </p>
                  <p className="text-white font-bold text-xl">
                    {courses.reduce(
                      (s, c) => s + (parseFloat(c.credits) || 0),
                      0,
                    )}
                  </p>
                </div>
                <div className="w-px h-8 bg-white/8" />
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest">
                    Average Score
                  </p>
                  <p className="text-white font-bold text-xl">
                    {courses.length > 0
                      ? (
                          courses.reduce(
                            (s, c) => s + getCourseResult(c).percentage,
                            0,
                          ) / courses.length
                        ).toFixed(1)
                      : 0}
                    %
                  </p>
                </div>
                <div className="flex-1" />
                <button
                  onClick={sendToGPACalc}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20">
                  <Send size={15} />
                  Send to GPA Calculator
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
