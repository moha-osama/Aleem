const stages = [
  { label: "روضة 1", emoji: "🌱", color: "#EC4899" },
  { label: "روضة 2", emoji: "🌸", color: "#83458E" },
  { label: "الصف الأول", emoji: "📚", color: "#F97316" },
  { label: "الصف الثاني", emoji: "✏️", color: "#06B6D4" },
  { label: "الصف الثالث", emoji: "🔢", color: "#10B981" },
  { label: "الصف الرابع", emoji: "🔬", color: "#F59E0B" },
  { label: "الصف الخامس", emoji: "🌍", color: "#EC4899" },
  { label: "الصف السادس", emoji: "🎨", color: "#7C3AED" },
  { label: "الصف السابع", emoji: "💡", color: "#F97316" },
  { label: "الصف الثامن", emoji: "🧪", color: "#06B6D4" },
  { label: "الصف التاسع", emoji: "📐", color: "#10B981" },
  { label: "الصف العاشر", emoji: "🚀", color: "#83458E" },
];

export function AcademicStages() {
  return (
    <section
      id="stages"
      className="py-16"
      style={{
        background: "linear-gradient(180deg, #FAFAFA 0%, #F3E8FF 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl text-[#2D1F6E] mb-3"
            style={{ fontWeight: 800 }}
          >
            المراحل الدراسية
          </h2>
          <div
            className="w-20 h-1 rounded-full mx-auto"
            style={{ background: "#F97316" }}
          />
          <p
            className="text-gray-500 mt-4 text-base"
            style={{ fontWeight: 400 }}
          >
            محتوى تعليمي متكامل لجميع المراحل من الروضة حتى الثانوية
          </p>
        </div>

        {/* Stages Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {stages.map((stage) => (
            <div
              key={stage.label}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 group"
              style={{
                border: `2px solid ${stage.color}20`,
                background: `${stage.color}08`,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                style={{ background: `${stage.color}20` }}
              >
                {stage.emoji}
              </div>
              <span
                className="text-xs text-center"
                style={{ color: stage.color, fontWeight: 700 }}
              >
                {stage.label}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="#"
            className="inline-block text-[#7C3AED] border border-[#7C3AED] px-8 py-2.5 rounded-full hover:bg-[#7C3AED] hover:text-white transition-all text-sm"
            style={{ fontWeight: 600 }}
          >
            استعرض جميع المراحل
          </a>
        </div>
      </div>
    </section>
  );
}
