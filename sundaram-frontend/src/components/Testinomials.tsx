import { useState } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "These exquisite pieces are not merely jewelry—they are wearable art that connects us to the romance and craftsmanship of centuries past.",
    author: "Margaret Ashford",
    image: "/cutomer-testimonials/c1.png",
  },
  {
    id: 2,
    quote:
      "Heritage Jewels gave me a piece that carries generations of meaning. The craftsmanship is unlike anything I have ever worn—pure, enduring beauty.",
    author: "Sophia Harrington",
    image: "/cutomer-testimonials/c2.png",
  },
  {
    id: 3,
    quote:
      "Every detail speaks of a time when quality was everything. I treasure my Victorian brooch as much as I treasure the memory it was gifted with.",
    author: "Eleanor Whitmore",
    image: "/cutomer-testimonials/c3.png",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section
      className="w-full relative overflow-hidden bg-[#fef9e9]"
    >
      {/* Top thin gold line */}
      <div
        className="w-full h-[1px] bg-[#b8922a]"
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch min-h-0 md:min-h-[540px]">
        {/* ── Left: text content ── */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-12 md:py-20">
          {/* Label */}
          <div className="flex items-center gap-2 mb-8">
            <span style={{ color: "#b8922a", fontSize: "0.7rem" }}>◆</span>
            <span
              className="font-['Montserrat',sans-serif] text-[#4a3f35] text-[0.65rem] uppercase tracking-[0.22em]"
            >
              Client Testimonials
            </span>
          </div>

          {/* Opening quote mark */}
          <div
            className="font-['Cormorant Garamond',serif] text-[#b8922a] text-[4rem] leading-none mb-2 select-none"
          >
            "
          </div>

          {/* Quote text */}
          <blockquote
            key={current.id}
            className="font-['Cormorant Garamond',serif] text-[#1a1008] text-[1.3rem] md:text-[1.65rem] lg:text-[1.85rem] leading-[1.45] mb-8"
            style={{
              fontWeight: 400,
              animation: "fadeUp 0.5s ease both",
            }}
          >
            {current.quote}
          </blockquote>

          {/* Author */}
          <p
            className="font-['Montserrat',sans-serif] text-[#1a1008] text-[0.8rem] font-semibold mb-10"
          >
            {current.author}
          </p>

          {/* Dot navigation */}
          <div className="flex items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="border-none cursor-pointer p-0 transition-all duration-300"
                style={{
                  width: i === active ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "99px",
                  backgroundColor:
                    i === active ? "#8c2635" : "rgba(184,146,42,0.35)",
                  background: "none",
                  outline: "none",
                }}
                aria-label={`Testimonial ${i + 1}`}
              >
                <span
                  className="block w-full h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      i === active ? "#8c2635" : "rgba(184,146,42,0.4)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: image ── */}
        <div
          className="relative w-full md:w-[420px] h-[300px] md:h-auto flex-shrink-0 overflow-hidden"
        >
          {/* Subtle left fade so image blends into text side (visible only on desktop) */}
          <div
            className="hidden md:block absolute inset-y-0 left-0 w-24 z-10"
            // style={{
            //   background:
            //     "linear-gradient(to right, rgba(255,255,255,0.1, transparent))",
            // }}
          />

          <img
            key={current.id}
            src={current.image}
            alt={current.author}
            // className="w-full h-full object-cover object-top"
            className="w-full h-full object-cover object-top [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent),linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [mask-composite:intersect]"
            style={{
              animation: "fadeIn 0.6s ease both",
            }}
          />
        </div>
      </div>

      {/* Bottom thin gold line */}
      <div
        className="w-full h-[1px]"
        style={{ backgroundColor: "rgba(184,146,42,0.2)" }}
      />

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  );
}