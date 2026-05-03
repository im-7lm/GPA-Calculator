export default function GradeSystem({
  gradeSystem,
  showGradeEditor,
  setShowGradeEditor,
  editingGrade,
  setEditingGrade,
  updateGrade,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Grade System</h2>
        <button
          onClick={() => setShowGradeEditor(!showGradeEditor)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition-colors text-sm">
          Edit
        </button>
      </div>

      {!showGradeEditor ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {gradeSystem.map((g, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-white/5 border border-white/10">
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
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
              />
              <button
                onClick={() => updateGrade(idx)}
                className="p-2 rounded-lg bg-green-600/20 text-green-400">
                ✔
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
