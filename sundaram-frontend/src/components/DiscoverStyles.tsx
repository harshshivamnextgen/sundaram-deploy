import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const styles = [
  { id:"One",      name:"One",      description:"Crystal One",      img:"./Diamond/One.png"      },
  { id:"Four",     name:"Four",     description:"Crystal Four",     img:"./Diamond/Four.png"     },
  { id:"Three",    name:"Three",    description:"Crystal Three",    img:"./Diamond/Three.png"    },
  { id:"king",     name:"King",     description:"Crystal King",     img:"./Diamond/king.png"     },
  { id:"knight",   name:"Knight",   description:"Crystal Knight",   img:"./Diamond/knight.png"   },
  { id:"queen",    name:"Queen",    description:"Crystal Queen",    img:"./Diamond/queen.png"    },
  { id:"Letter_b", name:"Letter B", description:"Crystal Letter B", img:"./Diamond/Letter_b.png" },
  { id:"Letter_i", name:"Letter I", description:"Crystal Letter I", img:"./Diamond/Letter_i.png" },
  { id:"Letter_j", name:"Letter J", description:"Crystal Letter J", img:"./Diamond/Letter_j.png" },
];

function getSlotConfigs(isMobile: boolean, isTablet: boolean) {
  if (isMobile) return [
    { x:-280, scale:0.45, opacity:0.4, blur:2, size:200 },
    { x:-140, scale:0.65, opacity:0.7, blur:0, size:240 },
    { x:0,    scale:0.95, opacity:1.0, blur:0, size:280 },
    { x:140,  scale:0.65, opacity:0.7, blur:0, size:240 },
    { x:280,  scale:0.45, opacity:0.4, blur:2, size:200 },
  ];
  if (isTablet) return [
    { x:-380, scale:0.52, opacity:0.6,  blur:2, size:280 },
    { x:-200, scale:0.72, opacity:0.85, blur:0, size:300 },
    { x:0,    scale:1.0,  opacity:1.0,  blur:0, size:340 },
    { x:200,  scale:0.72, opacity:0.85, blur:0, size:300 },
    { x:380,  scale:0.52, opacity:0.6,  blur:2, size:280 },
  ];
  return [
    { x:-520, scale:0.52, opacity:0.7,  blur:2, size:300 },
    { x:-270, scale:0.72, opacity:0.88, blur:0, size:320 },
    { x:0,    scale:1.0,  opacity:1.0,  blur:0, size:380 },
    { x:270,  scale:0.72, opacity:0.88, blur:0, size:320 },
    { x:520,  scale:0.52, opacity:0.7,  blur:2, size:300 },
  ];
}

function mod(n: number, m: number) { return ((n % m) + m) % m; }

export default function DiscoverStyles() {
  const [active,   setActive]   = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const slotConfigs  = getSlotConfigs(isMobile, isTablet);
  const isAnimating  = useRef(false);
  const total        = styles.length;

  const prev = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActive(a => mod(a - 1, total));
    setTimeout(() => { isAnimating.current = false; }, 620);
  }, [total]);

  const next = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActive(a => mod(a + 1, total));
    setTimeout(() => { isAnimating.current = false; }, 620);
  }, [total]);

  const currentStyle = styles[active];

  const visibleItems = Array.from({ length: 7 }, (_, i) => {
    const offset  = i - 3;
    const dataIdx = mod(active + offset, total);
    return { dataIdx, offset };
  });

  const getItemStyle = (offset: number) => {
    if (Math.abs(offset) <= 2) return slotConfigs[offset + 2];
    return { x: offset < 0 ? (isMobile ? -400 : -800) : (isMobile ? 400 : 800), scale:0.38, opacity:0, blur:3, size:280 };
  };

  return (
    <section className="w-full py-20 overflow-hidden select-none bg-[#fffef0]">

      {/* Heading */}
      <div className="text-center mb-16 px-4">
        <h2 className="font-['Cormorant_Garamond',serif] font-semibold uppercase tracking-[0.14em] mb-4 text-[#1a0c06]"
          style={{ fontSize:"clamp(1.8rem,3.5vw,3.2rem)" }}>
          Discover Styles
        </h2>
        <p className="font-['Montserrat',sans-serif] text-[0.85rem] leading-relaxed max-w-md mx-auto text-[#4a3f35]">
          Discover diverse engagement ring styles, each embodying a distinct symbol of love and devotion
        </p>
      </div>

      {/* Arc stage */}
      <div className="relative mx-auto overflow-hidden rounded-[30px] bg-gradient-to-br from-[#fffef0] via-[#f7f5e8] to-[#efe6d2]"
        style={{ height: isMobile ? "300px" : "420px", maxWidth:"1521px" }}>
        {visibleItems.map(({ dataIdx, offset }) => {
          const cfg      = getItemStyle(offset);
          const isCenter = offset === 0;
          const isOff    = Math.abs(offset) === 3;
          const zIndex   = isCenter ? 10 : Math.abs(offset) === 1 ? 5 : Math.abs(offset) === 2 ? 2 : 0;

          return (
            <motion.div
              key={`${dataIdx}`}
              initial={false}
              animate={{
                x: cfg.x, scale: cfg.scale, opacity: cfg.opacity,
                filter: cfg.blur > 0 ? `blur(${cfg.blur}px)` : "blur(0px)",
              }}
              transition={{ type:"spring", stiffness:200, damping:28, mass:0.9, delay:Math.abs(offset)*0.018 }}
              onClick={() => {
                if (offset < 0 && offset >= -2) prev();
                if (offset > 0 && offset <= 2)  next();
              }}
              style={{
                position:"absolute", left:"50%", top:"50%",
                width:`${cfg.size}px`, height:`${cfg.size}px`,
                marginLeft:`-${cfg.size/2}px`, marginTop:`-${cfg.size/2}px`,
                zIndex, cursor:"pointer", pointerEvents: isOff ? "none" : "auto",
              }}>
              <img src={styles[dataIdx].img} alt={styles[dataIdx].name}
                className="w-full h-full object-contain object-center pointer-events-none select-none"
                style={{ filter:`drop-shadow(0 ${isCenter?"24px 48px":"8px 20px"} rgba(0,0,0,${isCenter?0.13:0.07}))` }}
                draggable={false}/>
            </motion.div>
          );
        })}
      </div>

      {/* Name + Nav */}
      <div className="flex items-center justify-center gap-4 md:gap-12 mt-10 px-4">
        {/* Prev */}
        <button onClick={prev} aria-label="Previous"
          className="flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full border border-transparent transition-all duration-200 text-[#4a3f35] max-[426px]:translate-x-15">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" cursor="pointer">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* Label */}
        <div className="text-center font-['Montserrat',sans-serif]" style={{ minWidth: isMobile ? "280px" : "340px" }}>
          <motion.p key={currentStyle.id + "-name"}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
            className="font-['Cormorant_Garamond',serif] font-bold text-[#8c2635] mb-1 tracking-[0.02em]"
            style={{ fontSize:"clamp(1.8rem,2.5vw,2rem)" }}>
            {currentStyle.name}
          </motion.p>
          <motion.p key={currentStyle.id + "-desc"}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.05 }}
            className="text-[0.85rem] md:text-[0.95rem] text-[#8c2635] font-['Montserrat',sans-serif]">
            {currentStyle.description}
          </motion.p>
        </div>

        {/* Next */}
        <button onClick={next} aria-label="Next"
          className="flex items-center justify-center w-9 h-9 rounded-full border border-transparent transition-all duration-200 text-[#4a3f35] max-[426px]:-translate-x-15">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" cursor="pointer">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </section>
  );
}