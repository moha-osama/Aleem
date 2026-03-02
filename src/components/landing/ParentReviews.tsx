import { motion } from "framer-motion";

const parentImage = "/review.jpeg";

const reviews = [
  {
    name: "أم محمد",
    role: "أم لطفلين",
    review:
      "منصة عليم غيّرت طريقة تعلم أطفالي تماماً. ابني الآن يطلب التعلم من تلقاء نفسه!",
    rating: 5,
    avatar: "👩‍👧‍👦",
    color: "#7C3AED",
  },
  {
    name: "أبو سارة",
    role: "أب لثلاثة أطفال",
    review:
      "المحتوى عالي الجودة والألعاب التعليمية رائعة. لاحظت تحسناً كبيراً في مستوى بنتي.",
    rating: 5,
    avatar: "👨‍👩‍👧",
    color: "#EC4899",
  },
  {
    name: "معلمة أريج",
    role: "معلمة ابتدائي",
    review:
      "أنصح جميع أولياء الأمور باستخدام هذه المنصة. المحتوى متوافق مع المناهج الدراسية.",
    rating: 5,
    avatar: "👩‍🏫",
    color: "#F97316",
  },
];

export function ParentReviews() {
  return (
    <section id="reviews" className="py-16" style={{ background: "#FAFAFA" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            آراء الآباء
          </h2>
          <div
            className="w-20 h-1 rounded-full mx-auto"
            style={{ background: "#F97316" }}
          />
          <p
            className="text-gray-500 mt-4 text-base"
            style={{ fontWeight: 400 }}
          >
            ماذا يقول آباء الطلاب عن تجربتهم معنا
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Image */}
          <motion.div
            className="w-full lg:w-2/5"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={parentImage}
                alt="آراء الآباء"
                className="w-full h-80 object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, #8033CC 0%, transparent 50%)",
                }}
              />{" "}
              <div className="absolute bottom-6 right-6 text-white">
                <h3 className="text-lg" style={{ fontWeight: 800 }}>
                  آراء لا حصر لها
                </h3>
                <p
                  className="text-white/80 text-sm"
                  style={{ fontWeight: 400 }}
                >
                  +5,000 عائلة تثق في عليم
                </p>
              </div>
            </div>
          </motion.div>

          {/* Reviews */}
          <div className="w-full lg:w-3/5 flex flex-col gap-5">
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-start gap-4 flex-row-reverse">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${review.color}15` }}
                  >
                    {review.avatar}
                  </div>
                  <div className="flex-1 text-right">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-yellow-400 text-sm">
                        {"⭐".repeat(review.rating)}
                      </div>
                      <div>
                        <div
                          className="text-sm"
                          style={{ color: "#2D1F6E", fontWeight: 700 }}
                        >
                          {review.name}
                        </div>
                        <div
                          className="text-xs text-gray-400"
                          style={{ fontWeight: 400 }}
                        >
                          {review.role}
                        </div>
                      </div>
                    </div>
                    <p
                      className="text-gray-600 text-sm leading-relaxed"
                      style={{ fontWeight: 400 }}
                    >
                      "{review.review}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
