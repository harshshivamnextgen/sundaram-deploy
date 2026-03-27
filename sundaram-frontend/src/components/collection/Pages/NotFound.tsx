
const QUICK_LINKS = [
  { label:"Collections",      href:"/collections",          icon:"💎" },
  { label:"Rings",            href:"/collections/rings",    icon:"💍" },
  { label:"Necklaces",        href:"/collections/necklaces",icon:"📿" },
  { label:"About Us",         href:"/about",                icon:"🏛️" },
  { label:"Book Appointment", href:"/appointment",          icon:"📅" },
  { label:"Contact Us",       href:"/contact",              icon:"✉️" },
];

export default function NotFoundPage() {
  return (
    <div className="min-h-screen mt-[68px] bg-[#0f0a05] flex items-center justify-center px-5 py-10 relative overflow-hidden font-['Montserrat',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatRing { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(3deg)} }
        @keyframes pulseGlow { 0%,100%{opacity:0.15} 50%{opacity:0.30} }
        @keyframes orbit     { from{transform:rotate(0deg) translateX(180px) rotate(0deg)} to{transform:rotate(360deg) translateX(180px) rotate(-360deg)} }
        @keyframes orbit2    { from{transform:rotate(180deg) translateX(140px) rotate(-180deg)} to{transform:rotate(540deg) translateX(140px) rotate(-540deg)} }
        @keyframes shimmer   { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .nf-link:hover { border-color:#b8922a !important; color:#b8922a !important; background:rgba(184,146,42,0.08) !important; transform:translateY(-2px); }
        .nf-cta-p:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(140,38,53,0.45) !important; }
        .nf-cta-o:hover { background:rgba(184,146,42,0.1) !important; transform:translateY(-2px); }
        .pulse-ring { animation: pulseGlow 4s ease-in-out infinite; }
        .orbit-dot1 { animation: orbit 12s linear infinite; }
        .orbit-dot2 { animation: orbit2 8s linear infinite; }
        .float-ring { animation: floatRing 5s ease-in-out infinite; }
        .shimmer-text {
          background: linear-gradient(135deg, #b8922a 0%, #d4a843 40%, #8c6520 70%, #b8922a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .a1 { animation: fadeUp .5s .1s ease both; }
        .a2 { animation: fadeUp .5s .15s ease both; }
        .a3 { animation: fadeUp .5s .2s ease both; }
        .a4 { animation: fadeUp .5s .25s ease both; }
        .a5 { animation: fadeUp .5s .3s ease both; }
        .a6 { animation: fadeUp .5s .35s ease both; }
        .a7 { animation: fadeUp .5s .4s ease both; }
      `}</style>

      {/* ── Decorative rings ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="700" height="700" viewBox="0 0 700 700" className="absolute pulse-ring">
          {[320,280,240,200,160].map((r,i)=>(
            <circle key={i} cx="350" cy="350" r={r} fill="none" stroke="#b8922a"
              strokeWidth={i === 0 ? 1 : 0.5} strokeDasharray={i % 2 === 0 ? "none" : "6 6"} opacity={0.6 - i * 0.1} />
          ))}
        </svg>
        {/* Orbiting dots */}
        <div className="orbit-dot1 absolute w-[10px] h-[10px] rounded-full bg-[#b8922a] shadow-[0_0_12px_4px_rgba(184,146,42,0.5)]"
          style={{ top: "50%", left: "50%", marginTop: "-5px", marginLeft: "-5px" }} />
        <div className="orbit-dot2 absolute w-[6px] h-[6px] rounded-full bg-[#8c2635] shadow-[0_0_8px_3px_rgba(140,38,53,0.5)]"
          style={{ top: "50%", left: "50%", marginTop: "-3px", marginLeft: "-3px" }} />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-[680px] w-full text-center">

        {/* Floating ring */}
        <div className="float-ring w-[200px] h-[200px] mx-auto flex items-center justify-center"
          style={{ filter: "drop-shadow(0 0 24px rgba(184,146,42,0.4))" }}>
          <img src="/notfound.png" alt="notfound" className="w-[160px] h-[160px] object-contain" />
        </div>

        {/* 404 */}
        <div className="relative mb-1">
          <p className="shimmer-text font-['Cormorant_Garamond',serif] font-bold leading-none"
            style={{ fontSize: "clamp(7rem,18vw,12rem)", letterSpacing: "-0.02em" }}>
            404
          </p>
        </div>

        {/* Label */}
        <p className="a1 text-[0.6rem] tracking-[0.26em] uppercase text-[rgba(184,146,42,0.7)] mb-5">
          Page Not Found
        </p>

        {/* Divider */}
        <div className="a2 flex items-center gap-4 mx-auto mb-7 max-w-[320px]">
          <div className="flex-1 h-px bg-[rgba(184,146,42,0.25)]" />
          <span className="text-[rgba(184,146,42,0.5)] text-sm">✦</span>
          <div className="flex-1 h-px bg-[rgba(184,146,42,0.25)]" />
        </div>

        {/* Heading */}
        <h1 className="a3 font-['Cormorant_Garamond',serif] font-semibold text-[#fffef0] leading-[1.2] mb-4"
          style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)" }}>
          This Page Has Gone Missing,<br />
          <em className="text-[#b8922a] italic">Like a Lost Gem</em>
        </h1>

        {/* Subtext */}
        <p className="a4 text-[0.78rem] text-[rgba(255,254,240,0.5)] leading-[1.85] max-w-[460px] mx-auto mb-10">
          The page you're looking for doesn't exist, may have been moved, or the link could be incorrect.
          Let us guide you back to something beautiful.
        </p>

        {/* CTAs */}
        <div className="a5 flex gap-3 justify-center flex-wrap mb-14">
          <a href="/" className="nf-cta-p no-underline inline-block rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase bg-[#8c2635] text-white shadow-[0_6px_24px_rgba(140,38,53,0.35)] transition-all">
            ← Back to Home
          </a>
          <a href="/collections" className="nf-cta-o no-underline inline-block rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase bg-transparent text-[#fffef0] border-[1.5px] border-[rgba(255,254,240,0.2)] transition-all">
            Browse Collections
          </a>
        </div>

        {/* Quick links */}
        <div className="a6">
          <p className="text-[0.58rem] tracking-[0.16em] uppercase text-[rgba(184,146,42,0.55)] mb-4">Or jump to</p>
          <div className="flex gap-2 flex-wrap justify-center">
            {QUICK_LINKS.map(({ label, href, icon }) => (
              <a key={label} href={href} className="nf-link no-underline flex items-center gap-[6px] rounded-full px-4 py-2 border border-[rgba(184,146,42,0.2)] text-[0.65rem] font-medium text-[rgba(255,254,240,0.6)] transition-all">
                <span className="text-[13px]">{icon}</span>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p className="a7 text-[0.6rem] text-[rgba(255,254,240,0.25)] mt-12">
          If you believe this is an error, please{" "}
          <a href="/contact" className="text-[rgba(184,146,42,0.6)] underline">contact our team</a>.
        </p>
      </div>
    </div>
  );
}