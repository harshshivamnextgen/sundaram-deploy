import { useState } from "react";

const PROCESS = [
  { step:"01", icon:"🔍", title:"Initial Inspection", desc:"Our gemologist examines every stone setting, prong, clasp and metal surface under 10× magnification to identify any weak points before cleaning begins." },
  { step:"02", icon:"🧪", title:"Ultrasonic Bath", desc:"The piece is immersed in our professional-grade ultrasonic cleaner with a pH-neutral solution. High-frequency sound waves dislodge dirt from even the most intricate settings." },
  { step:"03", icon:"💨", title:"Steam Treatment", desc:"High-pressure steam blasts away remaining residue, sanitises the piece, and lifts the diamond's fire to its full brilliance — safely and without chemicals." },
  { step:"04", icon:"✨", title:"Hand Polish & Final Check", desc:"Each piece is hand-polished with a specialist cloth, inspected once more under magnification, and returned in our signature Sundaram pouch." },
];

const PRICING = [
  { type:"Basic Clean",        price:"₹ 299",   time:"Same Day",   desc:"Ultrasonic + steam for rings, earrings, pendants",       popular:false },
  { type:"Deep Clean",         price:"₹ 599",   time:"1–2 Days",   desc:"Ultrasonic + steam + hand polish + full inspection",     popular:true  },
  { type:"Full Jewellery Set", price:"₹ 999",   time:"2–3 Days",   desc:"Up to 5 pieces — rings, earrings, necklace, bangles",   popular:false },
  { type:"Heirloom Piece",     price:"₹ 1,499", time:"3–5 Days",   desc:"Delicate antique or heirloom items with special care",   popular:false },
];

const FAQS = [
  { q:"Is ultrasonic cleaning safe for all jewellery?", a:"Ultrasonic cleaning is safe for diamonds and most precious stones set securely in gold or platinum. We avoid ultrasonic for emeralds, opals, pearls and stones with fracture-fills. Our gemologist assesses each piece first." },
  { q:"How often should I get my jewellery professionally cleaned?", a:"We recommend professional cleaning every 6 months for everyday pieces, and annually for occasional jewellery. Between visits, a soft brush with mild soapy water is perfectly safe." },
  { q:"Will cleaning affect my diamond's certification?", a:"Not at all. Professional cleaning has no effect on the diamond's physical properties or certification. It restores the stone's brilliance to its certified state." },
  { q:"Can I collect the same day?", a:"Basic Clean is same-day if dropped before 12 PM. Deep Clean and set cleaning typically takes 1–2 days. We'll confirm the timeline when you bring your piece in." },
];

const CARE_TIPS = [
  { icon:"💧", tip:"Rinse with warm water and a soft-bristle toothbrush weekly" },
  { icon:"🧴", tip:"Avoid lotions, perfume and hairspray near fine jewellery" },
  { icon:"🏊", tip:"Remove jewellery before swimming — chlorine weakens prongs" },
  { icon:"📦", tip:"Store pieces separately in soft pouches to prevent scratches" },
  { icon:"😴", tip:"Remove rings before sleeping to prevent prong snagging" },
  { icon:"🔧", tip:"Book a professional clean every 6 months" },
];

export default function CleaningPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#fffef0] font-['Montserrat',sans-serif] mt-16">
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .6s ease both;}
        .pricing-card{transition:transform .25s,box-shadow .25s,border-color .25s;}
        .pricing-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(184,146,42,0.12);}
        .care-tip:hover{background:rgba(184,146,42,0.1);}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative bg-[#0f0a05] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1584663639666-34b577d6494a?w=1600&q=80&fit=crop"
          alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 saturate-[0.4]" />
        <svg className="absolute right-[-80px] top-[-80px] opacity-[0.05]" width="500" height="500" viewBox="0 0 500 500">
          {[220,180,140,100].map((r,i)=><circle key={i} cx="250" cy="250" r={r} fill="none" stroke="#b8922a" strokeWidth={i===0?1:0.5}/>)}
        </svg>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20 flex flex-col items-center text-center fade-up">
          <p className="text-[0.7rem] tracking-[0.22em] uppercase text-[#b8922a] mb-3 font-bold">Jewellery Care · Sundaram Luxury Craft</p>
          <h1 className=" font-semibold text-[#fffef0] leading-[1.1] mb-5"
            style={{ fontSize:"clamp(2.6rem,6vw,4.8rem)" }}>
            Professional<br/>
            <em className="text-[#b8922a] italic">Jewellery Cleaning</em>
          </h1>
          <p className="text-[0.8rem] text-[rgba(255,254,240,0.6)] max-w-[500px] leading-[1.85] mb-9">
            Restore the original brilliance of your diamonds with our ultrasonic + steam professional cleaning — the same process used by the world's finest jewellers.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <a href="/book-appointment" className="rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase no-underline bg-[#b8922a] text-white shadow-[0_6px_24px_rgba(184,146,42,0.35)] transition-transform hover:-translate-y-[2px]">
              Book a Cleaning
            </a>
            <a href="/contact" className="rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase no-underline bg-transparent text-[#fffef0] border border-[rgba(255,254,240,0.25)] transition-transform hover:-translate-y-[2px]">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="bg-[#1a1008] border-b border-[rgba(184,146,42,0.12)]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4">
          {[["⚡","Same-Day Available"],["💎","Safe for All Diamonds"],["🏆","Expert Gemologists"],["🎁","Sundaram Pouch Return"]].map(([icon,text])=>(
            <div key={String(text)} className="py-5 px-4 text-center border-r border-[rgba(184,146,42,0.1)]">
              <div className="text-xl mb-[6px]">{icon}</div>
              <p className="text-[0.61rem] font-semibold text-[rgba(255,254,240,0.7)] tracking-[0.06em]">{String(text)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20">
        <div className="text-center mb-14">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">How It Works</p>
          <h2 className=" font-semibold text-[#1a1008]"
            style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>
            Our 4-Step Cleaning Process
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS.map((p,i)=>(
            <div key={i} className="rounded-2xl p-6 border border-[rgba(184,146,42,0.18)] bg-[rgba(184,146,42,0.06)] h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className=" text-[2.2rem] font-bold text-[#b8922a] opacity-30 leading-none">{p.step}</span>
                <span className="text-[1.6rem]">{p.icon}</span>
              </div>
              <h3 className="text-[0.8rem] font-bold text-[#1a1008] mb-2">{p.title}</h3>
              <p className="text-[0.71rem] text-[#4a3f35] leading-[1.8]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="bg-[#0f0a05] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-3 font-bold">The Difference</p>
              <h2 className=" font-semibold text-[#fffef0] leading-[1.2] mb-5"
                style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)" }}>
                Restored to Its<br/>Original Brilliance
              </h2>
              <p className="text-[0.76rem] text-[rgba(255,254,240,0.6)] leading-[1.85] mb-7">
                Over time, everyday wear causes a build-up of skin oils, lotions and soap scum that dulls even the most brilliant diamond. Our professional clean removes years of residue.
              </p>
              <div className="flex flex-col gap-0">
                {[["Light performance","Up to 40% improvement after cleaning"],
                  ["Surface contaminants","100% removal with ultrasonic + steam"],
                  ["Safety","Zero risk to stones or settings"],
                ].map(([label,val])=>(
                  <div key={String(label)} className="flex justify-between py-3 border-b border-[rgba(184,146,42,0.12)]">
                    <span className="text-[0.7rem] text-[rgba(255,254,240,0.5)]">{label}</span>
                    <span className="text-[0.7rem] font-semibold text-[#fffef0]">{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label:"Before", img:"https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&q=80&fit=crop", op:"opacity-70" },
                { label:"After",  img:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80&fit=crop", op:"opacity-100" },
              ].map(({label,img,op})=>(
                <div key={label} className="rounded-2xl overflow-hidden">
                  <div className="relative aspect-square">
                    <img src={img} alt={label} className={`w-full h-full object-cover ${op}`} />
                    <div className="absolute bottom-2 left-2 bg-[rgba(15,10,5,0.8)] rounded-md px-2 py-1">
                      <span className={`text-[0.6rem] font-bold uppercase tracking-[0.1em] ${label==="After"?"text-[#b8922a]":"text-[rgba(255,254,240,0.6)]"}`}>{label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20">
        <div className="text-center mb-14">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">Simple Pricing</p>
          <h2 className=" font-semibold text-[#1a1008]"
            style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>Cleaning Packages</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING.map((p,i)=>(
            <div key={i} className={`pricing-card rounded-2xl p-6 flex flex-col ${p.popular ? "border-2 border-[#b8922a] bg-[rgba(184,146,42,0.1)]" : "border border-[rgba(184,146,42,0.18)] bg-[rgba(184,146,42,0.06)]"}`}>
              {p.popular && (
                <span className="text-[0.52rem] font-bold uppercase tracking-[0.1em] bg-[#b8922a] text-white rounded-full px-3 py-[2px] w-fit mb-3">Most Popular</span>
              )}
              <h3 className="text-[0.78rem] font-bold text-[#1a1008] mb-2">{p.type}</h3>
              <p className=" text-[1.8rem] font-semibold text-[#b8922a] leading-none mb-1">{p.price}</p>
              <p className="text-[0.6rem] text-[#9a8878] mb-3">⏱ {p.time}</p>
              <p className="text-[0.7rem] text-[#4a3f35] leading-[1.7] flex-1">{p.desc}</p>
              <a href="/book-appointment" className={`mt-5 rounded-full py-[9px] text-[0.62rem] font-bold tracking-[0.1em] uppercase text-center no-underline transition-colors ${p.popular ? "bg-[#8c2635] text-white" : "bg-transparent text-[#8c2635] border border-[#8c2635]"}`}>
                Book Now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOME CARE TIPS ── */}
      <section className="bg-[#1a1008] py-[72px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px]">
          <div className="text-center mb-11">
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">Between Professional Cleans</p>
            <h2 className=" font-semibold text-[#fffef0]"
              style={{ fontSize:"clamp(1.6rem,3.5vw,2.4rem)" }}>At-Home Care Tips</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CARE_TIPS.map(({icon,tip},i)=>(
              <div key={i} className="care-tip flex items-start gap-3 rounded-2xl p-5 border border-[rgba(184,146,42,0.15)] bg-[rgba(184,146,42,0.04)] transition-colors cursor-default">
                <span className="text-[1.4rem] flex-shrink-0">{icon}</span>
                <p className="text-[0.72rem] text-[rgba(255,254,240,0.7)] leading-[1.7]">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-10 py-[72px]">
        <div className="text-center mb-11">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">Questions</p>
          <h2 className=" font-semibold text-[#1a1008]"
            style={{ fontSize:"clamp(1.6rem,3.5vw,2.4rem)" }}>Frequently Asked Questions</h2>
        </div>
        {FAQS.map((f,i)=>(
          <div key={i} onClick={()=>setOpenFaq(openFaq===i?null:i)}
            className="border-b border-[rgba(184,146,42,0.18)] py-5 cursor-pointer">
            <div className="flex justify-between items-center gap-4">
              <p className="text-[0.78rem] font-semibold text-[#1a1008]">{f.q}</p>
              <span className="text-[#b8922a] text-[1.25rem] flex-shrink-0 transition-transform duration-200"
                style={{ transform:openFaq===i?"rotate(45deg)":"rotate(0)" }}>+</span>
            </div>
            {openFaq===i && <p className="text-[0.74rem] text-[#4a3f35] leading-[1.8] mt-3">{f.a}</p>}
          </div>
        ))}
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 bg-gradient-to-br from-[#0f0a05] to-[#2a1a0e]">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className=" font-semibold text-[#fffef0] leading-[1.2] mb-4"
            style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>
            Ready to Restore Your Jewellery's<br/>
            <em className="text-[#b8922a] italic">Original Brilliance?</em>
          </h2>
          <p className="text-[0.74rem] text-[rgba(255,254,240,0.55)] leading-[1.8] mb-8">
            Drop in to any Sundaram Jewels showroom or book a cleaning appointment online. Same-day service available.
          </p>
          <a href="/book-appointment" className="inline-block rounded-full px-10 py-[14px] text-[0.72rem] font-bold tracking-[0.12em] uppercase no-underline bg-[#b8922a] text-white shadow-[0_6px_28px_rgba(184,146,42,0.4)] transition-transform hover:-translate-y-[2px]">
            Book a Cleaning →
          </a>
        </div>
      </section>
    </div>
  );
}