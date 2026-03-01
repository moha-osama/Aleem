import compImg from "/compImg.jpeg";

const slides = [
  {
    src: "/leaderboard.jpeg",
    label: "لوحة المتصدرين",
    desc: "تابع ترتيبك بين جميع المتنافسين في الوقت الفعلي وشاهد تقدمك يومًا بيوم.",
  },
  {
    src: "/vs.jpeg",
    label: "مباراة مباشرة",
    desc: "تحدّ منافسيك وجهاً لوجه في جولات سريعة مليئة بالإثارة والتشويق.",
  },
  {
    src: "/challengeroad.jpeg",
    label: "طريق التحديات",
    desc: "اسلك مسار التحديات المتصاعدة وارتقِ من مستوى غشيم إلى مستوى عليم.",
  },
];

export function CompetitiveSection() {
  return (
    <section
      id="challenge"
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(15,5,36,0.88) 0%, rgba(26,10,61,0.88) 25%, rgba(45,16,96,0.84) 50%, rgba(26,10,61,0.88) 75%, rgba(15,5,36,0.88) 100%), url(${compImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            top: "-10%",
            right: "-5%",
            background: "radial-gradient(circle, #7C3AED, transparent 70%)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-15"
          style={{
            bottom: "-10%",
            left: "-5%",
            background: "radial-gradient(circle, #F97316, transparent 70%)",
            animation: "pulse 3s ease-in-out infinite 1s",
          }}
        />
        {[...Array(30)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              top: `${(i * 17 + 5) % 100}%`,
              left: `${(i * 23 + 7) % 100}%`,
              background:
                i % 3 === 0 ? "#F59E0B" : i % 3 === 1 ? "#A855F7" : "white",
              opacity: 0.6,
              animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite ${i % 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-5">
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm"
              style={{
                background: "linear-gradient(90deg, #F97316, #FBBF24)",
                color: "white",
                fontWeight: 800,
                boxShadow: "0 0 20px rgba(249,115,22,0.5)",
              }}
            >
              قريبًا
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-5"
            style={{
              fontWeight: 900,
              lineHeight: 1.25,
              textShadow: "0 0 40px rgba(168,85,247,0.6)",
            }}
          >
            معركة{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F97316, #FBBF24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              غشيم
            </span>{" "}
            و{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #A855F7, #60A5FA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              عليم
            </span>
          </h2>

          <p
            className="text-lg max-w-2xl mx-auto"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontWeight: 400,
              lineHeight: 1.8,
            }}
          >
            قسم الألعاب التنافسية قادم ليجمع جميع المستخدمين
            <br />
            في تحديات مباشرة مليئة بالحماس والتعلم.
          </p>
        </div>

        {/* Alternating rows */}
        <div className="flex flex-col gap-16" dir="rtl">
          {slides.map((slide, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={slide.src}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8 md:gap-12`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 flex-shrink-0">
                  <div
                    className="rounded-3xl overflow-hidden shadow-2xl"
                    style={{
                      aspectRatio: "16/10",
                      border: "1px solid rgba(168,85,247,0.3)",
                      boxShadow: isEven
                        ? "0 0 40px rgba(249,115,22,0.2)"
                        : "0 0 40px rgba(168,85,247,0.2)",
                    }}
                  >
                    <img
                      src={slide.src}
                      alt={slide.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Text */}
                <div
                  className="w-full md:w-1/2 flex flex-col"
                  style={{ textAlign: "right" }}
                >
                  {/* Step number */}
                  <span
                    className="text-5xl md:text-6xl mb-3 select-none"
                    style={{
                      fontWeight: 900,
                      background: isEven
                        ? "linear-gradient(90deg, #F97316, #FBBF24)"
                        : "linear-gradient(90deg, #A855F7, #60A5FA)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: 1,
                    }}
                  >
                    0{i + 1}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-white text-2xl md:text-3xl mb-3"
                    style={{ fontWeight: 800, lineHeight: 1.3 }}
                  >
                    {slide.label}
                  </h3>

                  {/* Divider */}
                  <div
                    className="mb-4"
                    style={{
                      width: "48px",
                      height: "3px",
                      borderRadius: "9999px",
                      marginRight: 0,
                      background: isEven
                        ? "linear-gradient(90deg, #F97316, #FBBF24)"
                        : "linear-gradient(90deg, #A855F7, #60A5FA)",
                    }}
                  />

                  {/* Description */}
                  <p
                    className="text-base md:text-lg leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 400,
                    }}
                  >
                    {slide.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
