import { useState } from "react";

const PROCESS = [
  { step:"01", icon:"📏", title:"Size Assessment", desc:"We measure your finger using professional mandrels across different times of day — fingers swell in the evening, so we take multiple readings for the most accurate fit." },
  { step:"02", icon:"🔩", title:"Metal Cutting & Shaping", desc:"For sizing up, a small piece of matching metal is added and soldered. For sizing down, a section is carefully removed and the band rejoined seamlessly by our master goldsmith." },
  { step:"03", icon:"🔥", title:"Soldering & Annealing", desc:"The joint is soldered using metal of identical purity and karat, then annealed to relieve stress and ensure the band retains its original strength." },
  { step:"04", icon:"✨", title:"Polish & Quality Check", desc:"The resized ring is polished to remove all traces of work, rhodium-plated if needed, and inspected to ensure the resize is completely invisible." },
];

const SIZE_GUIDE = [
  { size:"4",  circumference:"46.8 mm", diameter:"14.9 mm" },
  { size:"5",  circumference:"49.3 mm", diameter:"15.7 mm" },
  { size:"6",  circumference:"51.9 mm", diameter:"16.5 mm" },
  { size:"7",  circumference:"54.4 mm", diameter:"17.3 mm" },
  { size:"8",  circumference:"57.0 mm", diameter:"18.1 mm" },
  { size:"9",  circumference:"59.5 mm", diameter:"18.9 mm" },
  { size:"10", circumference:"62.1 mm", diameter:"19.8 mm" },
  { size:"11", circumference:"64.6 mm", diameter:"20.6 mm" },
];

const PRICING = [
  { type:"Size Up (1–2 sizes)",    price:"₹ 799",   time:"2–3 Days", desc:"Add metal to enlarge up to 2 sizes",               popular:false },
  { type:"Size Down (1–2 sizes)",  price:"₹ 699",   time:"2–3 Days", desc:"Remove metal to reduce up to 2 sizes",             popular:true  },
  { type:"Major Resize (3+ sizes)",price:"₹ 1,499", time:"4–5 Days", desc:"3 or more sizes up or down, full reshape",         popular:false },
  { type:"Eternity Band Resize",   price:"₹ 2,499", time:"5–7 Days", desc:"Full-eternity rings require complete rebuilding",  popular:false },
];

const FAQS = [
  { q:"How many sizes can a ring be resized by?", a:"Most plain gold and platinum bands can be resized by 2–3 sizes in either direction without affecting the integrity of the ring. Eternity bands set with stones all the way around require more extensive work." },
  { q:"Will resizing affect the diamonds or stones?", a:"Resizing is done away from the stone settings wherever possible. Our goldsmiths take great care to protect all stones during the process using cool-working techniques near delicate gems." },
  { q:"Can a ring be resized multiple times?", a:"Generally yes, though repeated resizing does thin the metal at the joint over time. We'll advise you honestly if we believe a ring has reached the limit of safe resizing." },
  { q:"How do I know my correct ring size?", a:"Visit any Sundaram Jewels showroom for a professional sizing. Alternatively, wrap a thin strip of paper around your finger, mark where it overlaps, measure in mm, and cross-reference with our size guide." },
  { q:"Can all metals be resized?", a:"Gold (all karats), platinum and silver can all be resized. Titanium and tungsten carbide are extremely hard and generally cannot be resized — we'll advise you before proceeding." },
];

export default function ResizingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const selected = SIZE_GUIDE.find(x => x.size === selectedSize);

  return (
    <div className="min-h-screen bg-[#fffef0] font-['Montserrat',sans-serif] mt-16">
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .6s ease both;}
        .pricing-card{transition:transform .25s,box-shadow .25s,border-color .25s;}
        .pricing-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(184,146,42,0.12);}
        .size-row:hover{background:rgba(184,146,42,0.06);}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative bg-[#0f0a05] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1600&q=80&fit=crop"
          alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.13] saturate-[0.4]" />
        <svg className="absolute left-[-100px] bottom-[-100px] opacity-[0.05]" width="500" height="500" viewBox="0 0 500 500">
          {[200,160,120,80].map((r,i)=><circle key={i} cx="250" cy="250" r={r} fill="none" stroke="#b8922a" strokeWidth="0.8"/>)}
        </svg>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20 flex flex-col items-center text-center fade-up">
          <p className="text-[0.7rem] tracking-[0.22em] uppercase text-[#b8922a] mb-3 font-bold">Jewellery Care · Sundaram Luxury Craft</p>
          <h1 className=" font-semibold text-[#fffef0] leading-[1.1] mb-5"
            style={{ fontSize:"clamp(2.6rem,6vw,4.8rem)" }}>
            Ring Resizing &<br/><em className="text-[#b8922a] italic">Perfect Fit</em>
          </h1>
          <p className="text-[0.8rem] text-[rgba(255,254,240,0.6)] max-w-[500px] leading-[1.85] mb-9">
            A ring should feel like it was made for your finger. Our master goldsmiths resize your ring with invisible precision, preserving every detail of the original design.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <a href="/book-appointment" className="rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase no-underline bg-[#b8922a] text-white shadow-[0_6px_24px_rgba(184,146,42,0.35)] transition-transform hover:-translate-y-[2px]">
              Book Resizing
            </a>
            <a href="/contact" className="rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase no-underline bg-transparent text-[#fffef0] border border-[rgba(255,254,240,0.25)] transition-transform hover:-translate-y-[2px]">
              Ask a Question
            </a>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <div className="bg-[#1a1008] border-b border-[rgba(184,146,42,0.12)]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4">
          {[["🎯","Invisible Finish"],["🔩","All Metals"],["📅","2–5 Day Turnaround"],["🛡️","6-Month Guarantee"]].map(([icon,text])=>(
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
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">The Craft</p>
          <h2 className=" font-semibold text-[#1a1008]"
            style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>How We Resize Your Ring</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS.map((p,i)=>(
            <div key={i} className="rounded-2xl p-6 border border-[rgba(184,146,42,0.18)] bg-[rgba(184,146,42,0.06)] h-full">
              <span className="block  text-[2rem] font-bold text-[#b8922a] opacity-30 leading-none mb-1">{p.step}</span>
              <span className="block text-[1.5rem] mb-3">{p.icon}</span>
              <h3 className="text-[0.78rem] font-bold text-[#1a1008] mb-2">{p.title}</h3>
              <p className="text-[0.7rem] text-[#4a3f35] leading-[1.8]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SIZE GUIDE ── */}
      <section className="bg-[#0f0a05] py-[72px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-3 font-bold">Find Your Size</p>
              <h2 className=" font-semibold text-[#fffef0] leading-[1.2] mb-4"
                style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)" }}>Ring Size Guide</h2>
              <p className="text-[0.74rem] text-[rgba(255,254,240,0.6)] leading-[1.8] mb-6">
                Click your size to see exact measurements. For the most accurate result, visit a Sundaram Jewels showroom — it takes under 2 minutes.
              </p>
              <div className="flex gap-2 flex-wrap mb-6">
                {SIZE_GUIDE.map(s=>(
                  <button key={s.size} onClick={()=>setSelectedSize(s.size)}
                    className={`w-10 h-10 rounded-full text-[0.74rem] font-semibold cursor-pointer transition-all border-none ${selectedSize===s.size?"bg-[#b8922a] text-white shadow-[0_4px_14px_rgba(184,146,42,0.35)]":"bg-transparent text-[#fffef0] border border-[rgba(184,146,42,0.3)] hover:border-[#b8922a]"}`}>
                    {s.size}
                  </button>
                ))}
              </div>
              {selected && (
                <div className="rounded-2xl p-5 border border-[#b8922a] bg-[rgba(184,146,42,0.08)]">
                  <p className="text-[0.7rem] tracking-[0.12em] uppercase text-[#b8922a] mb-3 font-bold">Size {selected.size} Measurements</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[0.7rem] text-[rgba(255,254,240,0.4)] mb-1">Circumference</p>
                      <p className=" text-[1.4rem] font-semibold text-[#fffef0]">{selected.circumference}</p>
                    </div>
                    <div>
                      <p className="text-[0.7rem] text-[rgba(255,254,240,0.4)] mb-1">Diameter</p>
                      <p className=" text-[1.4rem] font-semibold text-[#fffef0]">{selected.diameter}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Table */}
            <div className="rounded-2xl overflow-hidden border border-[rgba(184,146,42,0.2)]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[rgba(184,146,42,0.12)]">
                    {["Size","Circumference","Diameter"].map(h=>(
                      <th key={h} className="px-4 py-3 text-left text-[0.6rem] font-bold tracking-[0.1em] uppercase text-[#b8922a]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map((s,i)=>(
                    <tr key={s.size} onClick={()=>setSelectedSize(s.size)}
                      className={`size-row border-t border-[rgba(184,146,42,0.08)] cursor-pointer transition-colors ${selectedSize===s.size?"bg-[rgba(184,146,42,0.1)]":i%2===0?"":"bg-[rgba(255,254,240,0.01)]"}`}>
                      <td className={`px-4 py-3 text-[0.7rem] ${selectedSize===s.size?"text-[#b8922a] font-bold":"text-[rgba(255,254,240,0.7)]"}`}>{s.size}</td>
                      <td className="px-4 py-3 text-[0.7rem] text-[rgba(255,254,240,0.7)]">{s.circumference}</td>
                      <td className="px-4 py-3 text-[0.7rem] text-[rgba(255,254,240,0.7)]">{s.diameter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20">
        <div className="text-center mb-14">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">Transparent Pricing</p>
          <h2 className=" font-semibold text-[#1a1008]"
            style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>Resizing Packages</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING.map((p,i)=>(
            <div key={i} className={`pricing-card rounded-2xl p-6 flex flex-col ${p.popular?"border-2 border-[#b8922a] bg-[rgba(184,146,42,0.1)]":"border border-[rgba(184,146,42,0.18)] bg-[rgba(184,146,42,0.06)]"}`}>
              {p.popular && <span className="text-[0.52rem] font-bold uppercase tracking-[0.1em] bg-[#b8922a] text-white rounded-full px-3 py-[2px] w-fit mb-3">Most Common</span>}
              <h3 className="text-[0.76rem] font-bold text-[#1a1008] mb-2">{p.type}</h3>
              <p className=" text-[1.8rem] font-semibold text-[#b8922a] leading-none mb-1">{p.price}</p>
              <p className="text-[0.6rem] text-[#9a8878] mb-3">⏱ {p.time}</p>
              <p className="text-[0.7rem] text-[#4a3f35] leading-[1.7] flex-1">{p.desc}</p>
              <a href="/book-appointment" className={`mt-5 rounded-full py-[9px] text-[0.62rem] font-bold tracking-[0.1em] uppercase text-center no-underline transition-colors ${p.popular?"bg-[#8c2635] text-white":"bg-transparent text-[#8c2635] border border-[#8c2635]"}`}>
                Book Now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-10 py-[72px]">
        <div className="text-center mb-11">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">Common Questions</p>
          <h2 className=" font-semibold text-[#1a1008]"
            style={{ fontSize:"clamp(1.6rem,3.5vw,2.4rem)" }}>Resizing FAQs</h2>
        </div>
        {FAQS.map((f,i)=>(
          <div key={i} onClick={()=>setOpenFaq(openFaq===i?null:i)}
            className="border-b border-[rgba(184,146,42,0.18)] py-5 cursor-pointer">
            <div className="flex justify-between items-center gap-4">
              <p className="text-[0.78rem] font-semibold text-[#1a1008]">{f.q}</p>
              <span className="text-[#b8922a] text-[1.25rem] flex-shrink-0 transition-transform duration-[250ms]"
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
            Get the <em className="text-[#b8922a] italic">Perfect Fit</em><br/>Today
          </h2>
          <p className="text-[0.74rem] text-[rgba(255,254,240,0.55)] leading-[1.8] mb-8">
            Walk in to any Sundaram Jewels showroom or book a resizing appointment. Most resizes completed in 2–3 days.
          </p>
          <a href="/book-appointment" className="inline-block rounded-full px-10 py-[14px] text-[0.72rem] font-bold tracking-[0.12em] uppercase no-underline bg-[#b8922a] text-white shadow-[0_6px_28px_rgba(184,146,42,0.4)] transition-transform hover:-translate-y-[2px]">
            Book Resizing →
          </a>
        </div>
      </section>
    </div>
  );
}