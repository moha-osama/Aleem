import heroSvg from "/hero-svg.png";
import heroBg from "/hero-img.png";
import heroVideo from "/hero-bg-video.mp4";
import { motion } from "framer-motion";
import { useState } from "react";

export function Hero() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen pt-16">
      {/* Background image — shown until video is ready */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="fixed inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ zIndex: -1, opacity: videoReady ? 0 : 1 }}
      />
      {/* Background video */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        onCanPlay={() => setVideoReady(true)}
        className="fixed inset-0 w-full h-full object-fill transition-opacity duration-700"
        style={{ zIndex: -1, opacity: videoReady ? 1 : 0 }}
      />
      {/* Background image — fixed so it stays behind the entire page while scrolling */}
      {/* <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: -1 }}
      /> */}

      {/* Gradient overlay on top of image */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(108, 40, 217, 0.534) 0%, rgba(124, 58, 237, 0.534) 30%, rgba(146, 51, 234, 0.425) 60%, rgba(168,85,247,0.75) 100%)",
        }}
      />

      {/* Decorative stars */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white opacity-60"
            style={{
              top: `${(i * 17 + 5) % 80}%`,
              left: `${(i * 23 + 7) % 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex items-center min-h-[calc(100vh-4rem)]">
        <div className="w-full flex flex-col items-center text-center text-white">
          {/* Heading */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            style={{ fontWeight: 800, lineHeight: 1.4 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            مرحباً بك في <span className="text-yellow-300">Aleem</span>
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            className="text-white/90 text-xl md:text-2xl mb-4 max-w-2xl"
            style={{ fontWeight: 600 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            منصة تعليمية مبتكرة تحول المناهج المدرسية إلى ألعاب تفاعلية ممتعة，
            تعزز الفهم، تنمّي المهارات، وتجعل التعلم <br />
            رحلة مليئة بالمرح والإنجاز
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-white/75 text-base md:text-lg mb-10 max-w-xl"
            style={{ fontWeight: 400 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            تعلم بذكاء واستمتع بتجربة تعليمية فريدة من نوعها
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="#stages"
            className="text-white px-10 py-3 rounded-full transition-all shadow-lg hover:shadow-xl text-lg"
            style={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #FF006E 0%, #FB5607 100%)",
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            أكتشف المزيد
          </motion.a>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <img
          src={heroSvg}
          alt="Wave bottom"
          className="w-full h-32 object-cover"
        />
      </div>
    </section>
  );
}
