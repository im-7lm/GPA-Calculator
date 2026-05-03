function CoursesSection(props) {
  const {
    courses,
    gradeSystem,
    showCourseForm,
    setShowCourseForm,
    newCourse,
    setNewCourse,
    addCourse,
    removeCourse,
    updateCourse,
    previousGPA,
    setPreviousGPA,
    previousCredits,
    setPreviousCredits,
  } = props;

  return (
    <>
      {/* Courses Section */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
        {/* نفس كودك بالظبط هنا */}
      </div>

      {/* Previous GPA Section */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
        {/* نفس كودك برضو */}
      </div>
    </>
  );
}

CoursesSection.Results = function ({
  currentGPA,
  totalCredits,
  courses,
  cgpa,
}) {
  return <div className="space-y-4">{/* نفس كود ال sidebar بتاعك */}</div>;
};

export default CoursesSection;
