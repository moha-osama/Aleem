import mobileApp from "/mobile-app.png";
import googlePlayBadge from "/google play.png";
import appStoreBadge from "/app store.png";
import { motion } from "framer-motion";

const downloadButtons = [
  {
    label: "Web App",
    icon: "",
    border: "#ffffff",
    bg: "rgba(255,255,255,0.15)",
  },
  {
    label: "Google Play",
    icon: "",
    border: "#a8ff78",
    bg: "rgba(168,255,120,0.12)",
  },
  {
    label: "Windows EXE",
    icon: "",
    border: "#79c0ff",
    bg: "rgba(121,192,255,0.12)",
  },
];

export function AppDownload() {
  return (
    <section
      id="download"
      className="pt-20 pb-0 overflow-hidden relative"
      style={{
        background:
          "linear-gradient(-90deg, #8033CC 0%, #CC66CC 50%, #E085C2 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: "#ffffff" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: "#ffffff" }}
        />
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white opacity-40"
            style={{
              top: `${(i * 19 + 5) % 90}%`,
              left: `${(i * 27 + 11) % 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end gap-12">
          {/* Right side: Text and Buttons */}
          <motion.div
            className="w-full md:w-1/2 text-white flex flex-col items-start self-center pb-20"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-yellow-200 text-sm font-semibold">
                {" "}
                متاح على جميع الأجهزة
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl text-white mb-5"
              style={{ fontWeight: 800, lineHeight: 1.35 }}
            >
              حمل التطبيق
            </h2>

            <p
              className="text-white/80 text-base md:text-lg mb-10 max-w-md leading-relaxed"
              style={{ fontWeight: 400 }}
            >
              منصة تعليمية تفاعلية تحول الدروس إلى ألعاب ممتعة. طفلك يتعلم وهو
              يلعب ويحقق إنجازات حقيقية في مسيرته التعليمية.
            </p>

            <div className="flex flex-wrap gap-4 justify-start">
              {downloadButtons.map((btn) => (
                <a
                  key={btn.label}
                  href="#"
                  className="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-white text-sm font-bold transition-all hover:scale-105 hover:shadow-lg"
                  style={{
                    border: `1.5px solid ${btn.border}`,
                    background: btn.bg,
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <span className="text-lg">{btn.icon}</span>
                  {btn.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Left side: Store badges + Phone */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center justify-end gap-6"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            {/* Store badges */}
            <div className="flex items-center gap-4">
              <a href="#" className="transition-transform hover:scale-105">
                <img
                  src={appStoreBadge}
                  alt="App Store"
                  className="h-12 rounded-xl shadow-lg"
                />
              </a>
              <a href="#" className="transition-transform hover:scale-105">
                <img
                  src={googlePlayBadge}
                  alt="Google Play"
                  className="h-12 rounded-xl shadow-lg"
                />
              </a>
            </div>

            {/* Phone mockup */}
            <div className="relative">
              <div
                className="absolute bottom-0 bg-amber-800 inset-0 blur-3xl opacity-25 rounded-full"
                style={{ background: "#ffffff" }}
              />
              <img
                src={mobileApp}
                alt="تطبيق IBAL"
                className="relative z-10 w-72 md:w-[40rem] drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
