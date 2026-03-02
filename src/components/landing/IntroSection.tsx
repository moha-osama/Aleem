import spaceImg from "/space.png";
import floatingGrad1 from "/floating-grad1.png";
import floatingGrad2 from "/floating-grad2.png";
import doubleQuote from "/double-quote.png";
import { motion } from "framer-motion";

export function IntroSection() {
  return (
    <section
      id="intro"
      className="relative overflow-hidden py-20 px-4"
      style={{ background: "#F7F5FF" }}
    >
      {/* Keyframe animations */}
      <style>{`
        @keyframes floatRandom1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(40px, -30px) scale(1.05); }
          50%  { transform: translate(-20px, 50px) scale(0.95); }
          75%  { transform: translate(60px, 20px) scale(1.03); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes floatRandom2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(-50px, 30px) scale(1.04); }
          50%  { transform: translate(30px, -40px) scale(0.97); }
          75%  { transform: translate(-30px, -20px) scale(1.02); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>

      {/* Floating gradient blobs */}
      <img
        src={floatingGrad1}
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none select-none"
        style={{ animation: "floatRandom1 12s ease-in-out infinite" }}
      />
      <img
        src={floatingGrad2}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none select-none"
        style={{ animation: "floatRandom2 15s ease-in-out infinite" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* ── Right side: Text (RTL → appears on the right) ── */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-end text-right"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Heading */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mb-5 leading-snug"
              style={{ fontWeight: 800, color: "#1E1B4B" }}
            >
              شاهد الفيديو لتعرف
              <br />
              أكثر عن{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #FF006E 0%, #FB5607 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                IBAL
              </span>
            </h2>

            {/* Description */}
            <p
              className="text-base md:text-lg mb-8 max-w-md leading-relaxed"
              style={{ color: "#4B5563", fontWeight: 400 }}
            >
              اكتشف أكثر من 150 لعبة تعليمية مصممة لتجعل التعلم مغامرة حقيقية
            </p>

            {/* Quote block */}
            <div
              className="relative w-full max-w-md rounded-2xl p-6 mb-8 border-r-4 overflow-hidden shadow-lg"
              style={{
                background: "#ffffff",
                borderColor: "#7C3AED",
                boxShadow: "0 8px 32px rgba(124,58,237,0.12)",
              }}
            >
              {/* Decorative SVG behind text */}
              <svg
                className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
                viewBox="0 0 400 160"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
              >
                <circle cx="340" cy="-20" r="120" fill="#7C3AED" />
                <circle cx="60" cy="180" r="100" fill="#A855F7" />
                <circle cx="200" cy="80" r="60" fill="#6D28D9" />
                <path
                  d="M0 100 Q100 40 200 100 T400 100"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M0 130 Q100 70 200 130 T400 130"
                  stroke="#A855F7"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>

              {/* Double-quote image — top left */}
              <img
                src={doubleQuote}
                alt=""
                aria-hidden="true"
                className="absolute top-3 left-3 w-10 h-10 opacity-30 select-none pointer-events-none"
              />

              <p
                className="relative text-xl mb-3 leading-relaxed pt-4"
                style={{ color: "#1E1B4B", fontWeight: 600 }}
              >
                لَيْسَ العِلْمُ مَا حُفِظَ ، إِنَّمَا العِلْمُ مَا نَفَعَ
              </p>
              <p
                className="relative text-sm"
                style={{ color: "#7C3AED", fontWeight: 500 }}
              >
                — الشافعي رحمه الله تعالى
              </p>
            </div>

            {/* CTA button */}
            <a
              href="#download"
              className="inline-flex items-center gap-3 text-white px-8 py-3 rounded-full text-base shadow-lg transition-all hover:shadow-xl hover:opacity-90"
              style={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #FF006E 0%, #FB5607 100%)",
              }}
            >
              {/* Play icon */}
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/30">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              شاهد الفيديو
            </a>
          </motion.div>

          {/* ── Left side: Image ── */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <img
              src={spaceImg}
              alt="IBAL Space"
              className="w-full max-w-lg rounded-3xl object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
