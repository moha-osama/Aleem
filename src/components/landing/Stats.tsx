import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "+5,000", label: "مشترك" },
  { value: "16", label: "مرحلة دراسية" },
  { value: "71", label: "مادة تعليمية" },
  { value: "25", label: "معلم متخصص" },
  { value: "2,099", label: "محتوى تعليمي" },
  { value: "1,000", label: "طالب مسجل" },
];

function parseValue(val: string) {
  const prefix = val.startsWith("+") ? "+" : "";
  const numeric = parseInt(val.replace(/[^0-9]/g, ""), 10);
  const hasComma = val.includes(",");
  return { prefix, numeric, hasComma };
}

function formatNumber(n: number, hasComma: boolean) {
  return hasComma ? n.toLocaleString("en-US") : n.toString();
}

function StatCard({
  stat,
  index,
  animate,
}: {
  stat: { value: string; label: string };
  index: number;
  animate: boolean;
}) {
  const { prefix, numeric, hasComma } = parseValue(stat.value);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1500;
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [animate, numeric]);

  return (
    <motion.div
      className="text-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        className="text-3xl md:text-4xl text-yellow-300"
        style={{ fontWeight: 800 }}
      >
        {prefix}
        {formatNumber(count, hasComma)}
      </div>
      <div className="text-white/80 text-sm mt-1" style={{ fontWeight: 500 }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-10"
      style={{
        background: "linear-gradient(90deg, #A347D1 0%, #7339AC 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} animate={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
