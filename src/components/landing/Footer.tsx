export function Footer() {
  const links = {
    "روابط سريعة": [
      "الرئيسية",
      "المراحل الدراسية",
      "الألعاب التعليمية",
      "حمّل التطبيق",
    ],
    الدعم: [
      "الأسئلة الشائعة",
      "تواصل معنا",
      "سياسة الخصوصية",
      "الشروط والأحكام",
    ],
    المواد: ["الرياضيات", "اللغة العربية", "العلوم", "اللغة الإنجليزية"],
  };

  return (
    <footer
      className="pt-16 pb-6"
      style={{
        background:
          "linear-gradient(135deg, #6F267A 0%, #6F267A 50%, #6F267A 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="text-right">
            <div className="flex justify-start mb-4">
              <div className="bg-white rounded-full p-2 shadow-md w-40 h-20 flex items-center justify-center">
                <img
                  src="/logo.jpg"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p
              className="text-white/70 text-sm leading-relaxed mb-5"
              style={{ fontWeight: 400 }}
            >
              منصة تعليمية متكاملة تهدف إلى توفير تجربة تعلم ممتعة وفعّالة لجميع
              الطلاب في المراحل الدراسية المختلفة.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="text-right">
              <h4
                className="text-white text-base mb-4"
                style={{ fontWeight: 700 }}
              >
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/60 hover:text-white text-sm transition-colors"
                      style={{ fontWeight: 400 }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="rounded-2xl p-6 mb-10 text-right"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                className="px-6 py-2.5 rounded-xl text-sm flex-shrink-0"
                style={{
                  background: "#F97316",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                اشترك
              </button>
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl text-right text-sm bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/50"
                style={{ fontFamily: "Cairo, sans-serif" }}
              />
            </div>
            <div className="text-right">
              <h4 className="text-white text-base" style={{ fontWeight: 700 }}>
                اشترك في النشرة البريدية
              </h4>
              <p className="text-white/60 text-sm" style={{ fontWeight: 400 }}>
                احصل على آخر الأخبار والعروض الحصرية
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div
            className="text-yellow-300 text-xs flex gap-2"
            style={{ fontWeight: 400 }}
          >
            {"⭐⭐⭐⭐⭐"}
          </div>
          <p
            className="text-white/40 text-xs text-center"
            style={{ fontWeight: 400 }}
          >
            © 2026 عليم. جميع الحقوق محفوظة.
          </p>
          <div className="text-white/40 text-xs" style={{ fontWeight: 400 }}>
            صُنع بـ ❤️ للأطفال العرب
          </div>
        </div>
      </div>
    </footer>
  );
}
