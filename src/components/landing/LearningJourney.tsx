const steps = [
  {
    number: "01",
    title: "إنشاء الحساب",
    description: "سجّل حسابك مجاناً وأنشئ ملف شخصي لطفلك في دقيقة واحدة",
    color: "#7C3AED",
    bg: "#f8f3f5",
    icon: "👤",
  },
  {
    number: "02",
    title: "اختر المرحلة الدراسية",
    description: "حدد المرحلة الدراسية المناسبة لطفلك لنوفر له المحتوى المخصص",
    color: "#EC4899",
    bg: "#FFF0F7",
    icon: "📋",
  },
  {
    number: "03",
    title: "ابدأ رحلة التعلم",
    description: "استمتع بمحتوى تعليمي غني وألعاب تفاعلية وتحديات ممتعة",
    color: "#F97316",
    bg: "#FFF5EE",
    icon: "🚀",
  },
  {
    number: "04",
    title: "تابع التقدم والإنجازات",
    description: "راقب تقدم طفلك وشاهد إنجازاته وشاراته المكتسبة",
    color: "#10B981",
    bg: "#ECFDF5",
    icon: "🏆",
  },
];

export function LearningJourney() {
  return (
    <section
      id="journey"
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
            رحلة تعليمية <span style={{ color: "#7C3AED" }}>تبدأ من هنا</span>
          </h2>
          <div
            className="w-20 h-1 rounded-full mx-auto"
            style={{ background: "#F97316" }}
          />
          <p
            className="text-gray-500 mt-4 text-base"
            style={{ fontWeight: 400 }}
          >
            أربع خطوات بسيطة نحو تجربة تعليمية استثنائية
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 left-0 w-full h-0.5 z-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, #E5E7EB)",
                    transform: "translateX(-50%)",
                  }}
                />
              )}

              <div
                className="relative z-10 p-6 rounded-2xl text-center hover:shadow-xl transition-all hover:-translate-y-2"
                style={{
                  background: step.bg,
                  border: `2px solid ${step.color}20`,
                }}
              >
                {/* Icon circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
                  style={{ background: `${step.color}20` }}
                >
                  {step.icon}
                </div>

                {/* Step number */}
                <div
                  className="text-4xl mb-2"
                  style={{ color: `${step.color}30`, fontWeight: 900 }}
                >
                  {step.number}
                </div>

                <h3
                  className="text-base mb-2"
                  style={{ color: step.color, fontWeight: 700 }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-gray-500 text-sm"
                  style={{ fontWeight: 400 }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
