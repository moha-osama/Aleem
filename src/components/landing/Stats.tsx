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

function StatCard({ stat, index }: { stat: { value: string; label: string }; index: number }) {
  const { prefix, numeric, hasComma } = parseValue(stat.value);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * numeric));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [numeric]);

  return (
    <motion.div
      ref={ref}
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
  return (
    <section
      className="py-10"
      style={{
        background: "linear-gradient(90deg, #A347D1 0%, #7339AC 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.1 }}
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
