import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { id:"mangalsutra", label:"MANGALSUTRA",          color:"#d4b896", image:"./explore/explore_6.webp" },
  { id:"bracelets",   label:"MANGALSUTRA BRACELET",  color:"#c8c8cc", image:"./explore/explore_5.webp" },
  { id:"pendant",     label:"PENDANT",               color:"#e8a0b0", image:"./explore/explore_4.webp" },
  { id:"earrings",    label:"EARRINGS",              color:"#1a1a1a", image:"./explore/explore_3.webp" },
  { id:"rings",       label:"RINGS",                 color:"#7eb8c0", image:"./explore/explore_2.webp" },
  { id:"nosepins",    label:"NOSEPINS",              color:"#8fada8", image:"./explore/explore_1.webp" },
];

const labelColors: Record<string, string> = {
  mangalsutra: "rgba(255,255,255,0.85)",
  bracelets:   "rgba(80,70,60,0.9)",
  pendant:     "rgba(255,255,255,0.9)",
  earrings:    "rgba(255,255,255,0.85)",
  rings:       "rgba(255,255,255,0.9)",
  nosepins:    "rgba(255,255,255,0.9)",
};

export default function ExploreCategories() {
  const [active, setActive] = useState<string>("bracelets");
  const navigate = useNavigate();

  return (
    <section className="hidden lg:block w-full py-14 px-4 lg:px-0 xl:px-10 bg-[#fffef0]">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="font-['Cormorant_Garamond',serif] text-[1.52rem] font-medium leading-snug text-[#2c2c6e] tracking-[0.01em]">
          Explore Diamond Jewellery
          <br/>
          Online With Sundaram Jewels
        </h2>
      </div>

      {/* Accordion panels */}
      <div className="mx-auto flex justify-center rounded-2xl overflow-hidden"
        style={{ maxWidth:"1200px", width:"100%", height:"500px" }}>

        {categories.map(cat => {
          const isActive = active === cat.id;

          return (
            <div key={cat.id}
              onClick={() => { setActive(cat.id); navigate(`/collections/${cat.id}`); }}
              onMouseEnter={() => setActive(cat.id)}
              className="relative cursor-pointer overflow-hidden flex-shrink-0"
              style={{
                width: isActive ? "clamp(300px,60vw,800px)" : "72px",
                transition: "width 0.70s linear",
                borderRadius: "12px",
                margin: "0 1px",
              }}>

              {/* Background image */}
              <img src={cat.image} alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transition: "transform 0.6s linear",
                  transform: isActive ? "scale(1)" : "scale(1.05)",
                }}/>

              {/* Color overlay — visible when collapsed */}
              <div className="absolute inset-0 transition-opacity duration-500"
                style={{ backgroundColor: cat.color, opacity: isActive ? 0 : 0.92 }}/>

              {/* Collapsed: vertical label */}
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: isActive ? 0 : 1, pointerEvents: isActive ? "none" : "auto", transition: "opacity 0.4s linear" }}>
                <span className="font-['Montserrat',sans-serif] text-[1.18rem] font-normal uppercase tracking-[0.2em] select-none"
                  style={{ color: labelColors[cat.id], writingMode:"vertical-rl", transform:"rotate(180deg)" }}>
                  {cat.label}
                </span>
              </div>

              {/* Hover shimmer on collapsed panels */}
              {!isActive && (
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ background:"linear-gradient(to bottom,rgba(255,255,255,0.1),transparent)" }}/>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}