import { useState } from "react";
import { useEffect } from "react";
import introJs from "intro.js";
import "intro.js/minified/introjs.min.css";
import {
  ChevronDown,
  Plus,
  Trash2,
  CreditCard as Edit2,
  Check,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";

const DEFAULT_GRADES = [
  { grade: "A", points: 4.0 },
  { grade: "A-", points: 3.7 },
  { grade: "B+", points: 3.3 },
  { grade: "B", points: 3.0 },
  { grade: "B-", points: 2.7 },
  { grade: "C+", points: 2.3 },
  { grade: "C", points: 2.0 },
  { grade: "C-", points: 1.7 },
  { grade: "D+", points: 1.3 },
  { grade: "D", points: 1.0 },
  { grade: "F", points: 0.0 },
];

export default function Calculator() {
  const [gradeSystem, setGradeSystem] = useState(DEFAULT_GRADES);
  const [showGradeEditor, setShowGradeEditor] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);
  const [courses, setCourses] = useState([
    // { id: 1, name: "Introduction to CS", credits: 3, grade: "A" },
  ]);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: "",
    credits: 3,
    grade: "A",
  });
  const [previousGPA, setPreviousGPA] = useState("");
  const [previousCredits, setPreviousCredits] = useState("");

  const calculateGPA = () => {
    if (courses.length === 0) return 0;
    const totalWeightedPoints = courses.reduce((sum, course) => {
      const grade = gradeSystem.find((g) => g.grade === course.grade);
      return sum + (grade ? grade.points * course.credits : 0);
    }, 0);
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
    return totalCredits > 0
      ? (totalWeightedPoints / totalCredits).toFixed(2)
      : 0;
  };

  const calculateCGPA = () => {
    if (!previousGPA || !previousCredits || previousCredits === "0")
      return null;
    const currentGPA = parseFloat(calculateGPA());
    const currentCredits = courses.reduce((sum, c) => sum + c.credits, 0);
    const prevGPA = parseFloat(previousGPA);
    const prevCredits = parseFloat(previousCredits);

    const totalPoints = prevGPA * prevCredits + currentGPA * currentCredits;
    const totalCredits = prevCredits + currentCredits;
    return (totalPoints / totalCredits).toFixed(2);
  };

  const currentGPA = calculateGPA();
  const cgpa = calculateCGPA();
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);

  const addCourse = () => {
    if (newCourse.name.trim() === "" || newCourse.credits <= 0) return;
    setCourses([...courses, { ...newCourse, id: Date.now() }]);
    setNewCourse({ name: "", credits: 3, grade: "A" });
    setShowCourseForm(false);
  };

  const removeCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id, field, value) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  const updateGrade = (index) => {
    if (editingGrade && editingGrade.points >= 0) {
      const updated = [...gradeSystem];
      updated[index].points = editingGrade.points;
      setGradeSystem(updated);
      setEditingGrade(null);
    }
  };

  const startTour = () => {
    introJs()
      .setOptions({
        nextLabel: "Next →",
        prevLabel: "← Back",
        doneLabel: "Done",
        steps: [
          {
            intro: "Welcome 👋 Let's show you how to use the GPA Calculator",
          },
          {
            element: document.querySelector("#grade-system"),
            intro: "Here you can see or edit your grading system",
          },
          {
            element: document.querySelector("#courses-section"),
            intro: "Add your courses here",
          },
          {
            element: document.querySelector("#add-course-btn"),
            intro: "Click here to add a course",
          },
          {
            element: document.querySelector("#results"),
            intro: "Your GPA Will appear here in real-time as you add courses",
          },
        ],
      })
      .start();
  };

  useEffect(() => {
    const seen = localStorage.getItem("gpaTourSeen");

    if (!seen) {
      setTimeout(() => {
        startTour();
      }, 500);

      localStorage.setItem("gpaTourSeen", "true");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#080d1a] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <a
              href="/"
              className="text-blue-400 hover:text-blue-300 transition-colors">
              Home
            </a>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">GPA Calculator</span>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
              GPA Calculator
            </h1>
            <p className="text-slate-400 text-lg">
              Add your courses and see your semester GPA calculated in
              real-time.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Grade System Section */}
              <div
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
                id="grade-system">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    Grade System
                  </h2>
                  <button
                    onClick={() => setShowGradeEditor(!showGradeEditor)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition-colors text-sm">
                    <Edit2 size={14} />
                    Edit
                  </button>
                </div>

                {!showGradeEditor ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {gradeSystem.map((g, idx) => (
                      <div
                        key={idx}
                        className="px-4 h-8 flex items-center justify-between rounded-lg bg-white/5 border border-white/10">
                        <div className="text-white font-semibold text-center">
                          {g.grade}
                        </div>
                        <div className="text-slate-400 text-xs text-center">
                          {g.points.toFixed(1)} pts
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {gradeSystem.map((g, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-16 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-semibold text-center">
                          {g.grade}
                        </div>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="4"
                          value={
                            editingGrade?.grade === g.grade
                              ? editingGrade.points
                              : g.points
                          }
                          onChange={(e) =>
                            setEditingGrade({
                              grade: g.grade,
                              points: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                        {editingGrade?.grade === g.grade ? (
                          <button
                            onClick={() => updateGrade(idx)}
                            className="p-2 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-colors">
                            <Check size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              setEditingGrade({
                                grade: g.grade,
                                points: g.points,
                              })
                            }
                            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 transition-colors">
                            <Edit2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Courses Section */}
              <div
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
                id="courses-section">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Courses</h2>
                  <button
                    id="add-course-btn"
                    onClick={() => setShowCourseForm(!showCourseForm)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:opacity-90 transition-opacity">
                    <Plus size={16} />
                    Add Course
                  </button>
                </div>

                {showCourseForm && (
                  <div className="mb-4 p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
                    <input
                      type="text"
                      placeholder="Course name (optional)"
                      value={newCourse.name}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 mb-3"
                    />
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">
                          Credit Hours
                        </label>
                        <input
                          type="number"
                          min="0.5"
                          step="0.5"
                          value={newCourse.credits}
                          onChange={(e) =>
                            setNewCourse({
                              ...newCourse,
                              credits: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">
                          Grade
                        </label>
                        <select
                          value={newCourse.grade}
                          onChange={(e) =>
                            setNewCourse({
                              ...newCourse,
                              grade: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500">
                          {gradeSystem.map((g) => (
                            <option key={g.grade} value={g.grade}>
                              {g.grade}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={addCourse}
                        className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:opacity-90 transition-opacity font-medium text-sm">
                        Add
                      </button>
                      <button
                        onClick={() => setShowCourseForm(false)}
                        className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 transition-colors font-medium text-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {courses.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-slate-400">
                      No courses added yet. Add your first course to calculate
                      your GPA.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {courses.map((course) => {
                      const grade = gradeSystem.find(
                        (g) => g.grade === course.grade,
                      );
                      return (
                        <div
                          key={course.id}
                          className="flex items-center gap-4 p-4 rounded-lg border border-white/10 bg-white/2">
                          <div className="flex-1">
                            <p className="text-white font-medium">
                              {course.name || "Unnamed Course"}
                            </p>
                            <p className="text-slate-400 text-sm">
                              {course.credits} credits • {course.grade} (
                              {grade?.points.toFixed(1)} pts)
                            </p>
                          </div>
                          <select
                            value={course.grade}
                            onChange={(e) =>
                              updateCourse(course.id, "grade", e.target.value)
                            }
                            className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500">
                            {gradeSystem.map((g) => (
                              <option key={g.grade} value={g.grade}>
                                {g.grade}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => removeCourse(course.id)}
                            className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Previous GPA Section */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Previous Semesters (Optional)
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">
                      Previous GPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={previousGPA}
                      onChange={(e) => setPreviousGPA(e.target.value)}
                      placeholder="e.g., 3.75"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">
                      Previous Credit Hours
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={previousCredits}
                      onChange={(e) => setPreviousCredits(e.target.value)}
                      placeholder="e.g., 30"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Sidebar */}
            <div className="space-y-4" id="results">
              {/* Current GPA Card */}
              <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 p-6">
                <p className="text-slate-400 text-sm mb-2">
                  Current Semester GPA
                </p>
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                  {currentGPA}
                </div>
                <p className="text-slate-500 text-xs">out of 4.0</p>
              </div>

              {/* Total Credits */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-slate-400 text-sm mb-2">
                  Total Credit Hours
                </p>
                <p className="text-4xl font-bold text-white">{totalCredits}</p>
                <p className="text-slate-500 text-xs mt-1">
                  {courses.length} course{courses.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* CGPA Card (if applicable) */}
              {cgpa && (
                <div
                  cgpa
                  className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-teal-500/5 p-6">
                  <p className="text-slate-400 text-sm mb-2">Cumulative GPA</p>
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
                    {cgpa}
                  </div>
                  <p className="text-slate-500 text-xs mt-1">
                    including previous semesters
                  </p>
                </div>
              )}

              {/* Academic Standing */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-slate-400 text-sm mb-2">Academic Standing</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-slate-500 text-xs">GPA Tier</p>
                    <p className="text-white font-semibold">
                      {currentGPA >= 3.8
                        ? "Excellent"
                        : currentGPA >= 3.5
                          ? "Great"
                          : currentGPA >= 3.0
                            ? "Good"
                            : currentGPA >= 2.0
                              ? "Fair"
                              : "Needs Improvement"}
                    </p>
                  </div>
                  {currentGPA >= 3.5 && (
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-green-400 text-xs font-semibold">
                        Dean's List Eligible
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
