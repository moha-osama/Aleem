import news1 from "/news1.png";
import news2 from "/news2.png";
import news3 from "/news3.png";

const news = [
  {
    image: news1,
    category: "جديد",
    date: "١٥ فبراير ٢٠٢٦",
    title: "إطلاق 50 لعبة جديدة في الرياضيات",
    excerpt:
      "أطلقت منصة IBAL مجموعة جديدة تضم 50 لعبة تعليمية تفاعلية في مادة الرياضيات مصممة لجميع المراحل الدراسية.",
    color: "#7C3AED",
    badgeBg: "#EDE9FE",
    badgeText: "#7C3AED",
  },
  {
    image: news2,
    category: "جديد",
    date: "١٥ فبراير ٢٠٢٦",
    title: "إطلاق 50 لعبة جديدة في الرياضيات",
    excerpt:
      "أطلقت منصة IBAL مجموعة جديدة تضم 50 لعبة تعليمية تفاعلية في مادة الرياضيات مصممة لجميع المراحل الدراسية.",
    color: "#EC4899",
    badgeBg: "#FCE7F3",
    badgeText: "#EC4899",
  },
  {
    image: news3,
    category: "جديد",
    date: "١٥ فبراير ٢٠٢٦",
    title: "إطلاق 50 لعبة جديدة في الرياضيات",
    excerpt:
      "أطلقت منصة IBAL مجموعة جديدة تضم 50 لعبة تعليمية تفاعلية في مادة الرياضيات مصممة لجميع المراحل الدراسية.",
    color: "#F97316",
    badgeBg: "#FEF3C7",
    badgeText: "#D97706",
  },
];

export function LatestNews() {
  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl text-[#2D1F6E] mb-3"
            style={{ fontWeight: 800 }}
          >
            آخر أخبارنا
          </h2>
          <div
            className="w-20 h-1 rounded-full mx-auto"
            style={{ background: "#F97316" }}
          />
          <p
            className="text-gray-500 mt-4 text-base"
            style={{ fontWeight: 400 }}
          >
            تابع آخر أخبار ومستجدات منصة عليم التعليمية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <article
              key={item.title}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-bold"
                  style={{ background: item.badgeBg, color: item.badgeText }}
                >
                  {item.category}
                </div>
              </div>

              <div className="p-5 text-right">
                <div
                  className="text-gray-400 text-xs mb-2"
                  style={{ fontWeight: 400 }}
                >
                  📅 {item.date}
                </div>
                <h3
                  className="text-base mb-2 group-hover:text-[#7C3AED] transition-colors"
                  style={{ color: "#2D1F6E", fontWeight: 700 }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-gray-500 text-sm leading-relaxed"
                  style={{ fontWeight: 400 }}
                >
                  {item.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 mt-3 text-sm"
                  style={{ color: item.color, fontWeight: 600 }}
                >
                  اقرأ المزيد ←
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="#"
            className="inline-block text-[#7C3AED] border border-[#7C3AED] px-8 py-2.5 rounded-full hover:bg-[#7C3AED] hover:text-white transition-all text-sm"
            style={{ fontWeight: 600 }}
          >
            جميع الأخبار
          </a>
        </div>
      </div>
    </section>
  );
}
