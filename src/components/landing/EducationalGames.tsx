import game1 from "/game1.png";
import game2 from "/game2.png";
import game3 from "/game3.png";
import { motion } from "framer-motion";

const gameCards = [
  {
    image: game1,
    subject: "الرياضيات",
    title: "عالم الأرقام",
    players: "1.8K",
    rating: "4.8",
    color: "#7C3AED",
    badge: "#EDE9FE",
    badgeText: "#7C3AED",
  },
  {
    image: game2,
    subject: "الرياضيات",
    title: "عالم الأرقام",
    players: "1.8K",
    rating: "4.8",
    color: "#EC4899",
    badge: "#FCE7F3",
    badgeText: "#EC4899",
  },
  {
    image: game3,
    subject: "الرياضيات",
    title: "عالم الأرقام",
    players: "1.8K",
    rating: "4.8",
    color: "#F97316",
    badge: "#FEF3C7",
    badgeText: "#D97706",
  },
];

export function EducationalGames() {
  return (
    <section
      id="games"
      className="py-20"
      style={{
        background: "#fff",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl text-[#2D1F6E] mb-3"
            style={{ fontWeight: 800 }}
          >
            الألعاب التعليمية
          </h2>
          <div
            className="w-20 h-1 rounded-full mx-auto mb-4"
            style={{ background: "#F97316" }}
          />
          <p
            className="text-gray-500 text-base max-w-xl mx-auto"
            style={{ fontWeight: 400 }}
          >
            اكتشف مجموعة واسعة من الألعاب التفاعلية المصممة لجعل التعلم تجربة
            ممتعة
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gameCards.map((card, i) => (
            <motion.div
              key={i}
              className="group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl bg-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
            >
              {/* Game image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card body */}
              <div className="p-5 text-right">
                {/* Subject badge */}
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
                  style={{ background: card.badge, color: card.badgeText }}
                >
                  {card.subject}
                </div>
                <h3
                  className="text-lg mb-4"
                  style={{ color: "#1E1B4B", fontWeight: 700 }}
                >
                  {card.title}
                </h3>

                {/* Stats row */}
                <div className="flex items-center justify-between">
                  {/* Players */}
                  <div className="flex items-center gap-1.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4"
                      style={{ color: "#9CA3AF" }}
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span
                      className="text-sm"
                      style={{ color: "#6B7280", fontWeight: 500 }}
                    >
                      {card.players} لاعب
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#1E1B4B" }}
                    >
                      {card.rating}
                    </span>
                    <svg viewBox="0 0 24 24" fill="#FBBF24" className="w-4 h-4">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>

                  {/* Play button */}
                  <button
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white text-xs transition-all hover:opacity-90"
                    style={{
                      background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}CC 100%)`,
                      fontWeight: 700,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-3 h-3"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    العب الآن
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
