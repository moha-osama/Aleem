import kidsTabletImage from "/win-chid.jpeg";

const plans = [
  {
    name: "المجاني",
    price: "0",
    period: "شهرياً",
    color: "#7C3AED",
    bg: "white",
    popular: false,
    features: [
      "الوصول لـ 10 دروس مجانية",
      "3 ألعاب تعليمية",
      "تتبع التقدم الأساسي",
      "دعم البريد الإلكتروني",
    ],
  },
  {
    name: "المميز",
    price: "49",
    period: "شهرياً",
    color: "white",
    bg: "#8033CC",
    popular: true,
    features: [
      "وصول غير محدود للمحتوى",
      "جميع الألعاب التعليمية",
      "تقارير تفصيلية",
      "دعم أولوية 24/7",
      "محتوى حصري وجديد",
      "شهادات إتمام المراحل",
    ],
  },
  {
    name: "العائلي",
    price: "89",
    period: "شهرياً",
    color: "#7C3AED",
    bg: "white",
    popular: false,
    features: [
      "حتى 5 حسابات أطفال",
      "جميع مميزات المميز",
      "لوحة تحكم للوالدين",
      "تقارير مفصّلة لكل طفل",
      "جلسات إرشادية شهرية",
    ],
  },
];

export function SubscriptionPlans() {
  return (
    <section
      id="pricing"
      className="py-16"
      style={{ background: "linear-gradient(180deg, #F9F5FF 0%, white 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl text-[#8033CC] mb-3"
            style={{ fontWeight: 800 }}
          >
            خطط الاشتراك
          </h2>
          <div
            className="w-20 h-1 rounded-full mx-auto"
            style={{ background: "#F97316" }}
          />
          <p
            className="text-gray-500 mt-4 text-base"
            style={{ fontWeight: 400 }}
          >
            اختر الخطة المناسبة لاحتياجات طفلك
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Plans */}
          <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="relative rounded-3xl p-6 flex flex-col hover:shadow-2xl transition-all hover:-translate-y-1"
                style={{
                  background: plan.bg,
                  color: plan.color,
                  border: plan.popular ? "none" : "2px solid #E5E7EB",
                  boxShadow: plan.popular
                    ? "0 20px 60px rgba(128,51,204,0.3)"
                    : undefined,
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs px-4 py-1 rounded-full"
                    style={{ background: "#F97316", fontWeight: 700 }}
                  >
                    الأكثر شيوعاً
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3
                    className="text-lg mb-3"
                    style={{
                      fontWeight: 700,
                      color: plan.popular ? "white" : "#8033CC",
                    }}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span
                      className="text-4xl"
                      style={{
                        fontWeight: 900,
                        color: plan.popular ? "white" : "#8033CC",
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        color: plan.popular
                          ? "rgba(255,255,255,0.7)"
                          : "#6B7280",
                      }}
                    >
                      ريال/{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 justify-end text-sm"
                      style={{
                        color: plan.popular
                          ? "rgba(255,255,255,0.85)"
                          : "#4B5563",
                        fontWeight: 400,
                      }}
                    >
                      <span>{f}</span>
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                        style={{
                          background: plan.popular
                            ? "rgba(255,255,255,0.2)"
                            : "#EDE9FE",
                          color: plan.popular ? "white" : "#8033CC",
                        }}
                      >
                        ✓
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3 rounded-2xl text-sm transition-all hover:opacity-90"
                  style={{
                    background: plan.popular ? "white" : "#8033CC",
                    color: plan.popular ? "#8033CC" : "white",
                    fontWeight: 700,
                  }}
                >
                  اشترك الآن
                </button>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="w-full lg:w-2/5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={kidsTabletImage}
                alt="أطفال يتعلمون"
                className="w-full h-80 object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, #8033CC 0%, transparent 50%)",
                }}
              />
              <div className="absolute bottom-6 right-6 text-white">
                <h3 className="text-xl mb-1" style={{ fontWeight: 800 }}>
                  اشترك اليوم!
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
