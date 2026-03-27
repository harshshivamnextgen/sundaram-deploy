import { useState } from "react";

const REPAIR_TYPES = [
  { icon:"🔗", title:"Chain & Clasp Repair",      desc:"Broken chains, bent links, snapped lobster clasps, defective box clasps — all repaired with matching metal. Spring-ring and toggle clasps replaced.", time:"1–2 Days",  price:"From ₹ 399" },
  { icon:"💎", title:"Stone Setting Repair",       desc:"Loose prongs re-tipped or rebuilt, bezel settings tightened, pave stones re-set. All work done under magnification by our diamond setter.",             time:"2–4 Days",  price:"From ₹ 599" },
  { icon:"🔄", title:"Missing Stone Replacement",  desc:"We source a matching certified lab diamond or gemstone and set it invisibly into the original setting. IGI certification available.",                    time:"5–7 Days",  price:"From ₹ 1,499" },
  { icon:"💍", title:"Shank Repair & Rebuild",     desc:"Cracked, split or extremely thin shanks are rebuilt with matching metal, welded and polished invisibly.",                                                time:"3–5 Days",  price:"From ₹ 799" },
  { icon:"🪙", title:"Clasp & Finding Replacement",desc:"Broken earring backs, pendant bails, bracelet safety clasps and pin findings replaced with matching metal components.",                                  time:"1–2 Days",  price:"From ₹ 299" },
  { icon:"🌟", title:"Rhodium Re-Plating",          desc:"White gold jewellery that has yellowed is stripped and re-plated with pure rhodium for a bright, durable white finish.",                                 time:"2–3 Days",  price:"From ₹ 899" },
];

const PROCESS = [
  { step:"01", icon:"🔍", title:"Free Assessment",        desc:"Bring your piece to any showroom. Our goldsmith examines it at no charge and provides a detailed quote before any work begins." },
  { step:"02", icon:"📋", title:"Written Quote & Approval",desc:"You receive a written quote with timeline. No work proceeds until you approve. We photograph your piece before and after." },
  { step:"03", icon:"🛠️", title:"Expert Repair",          desc:"Our master goldsmiths — with 15–30 years of experience each — carry out the repair under magnification in our in-house atelier." },
  { step:"04", icon:"✅", title:"Quality Inspection",      desc:"The repaired piece is inspected by our head gemologist, cleaned, polished and returned with a 6-month workmanship guarantee." },
];

const FAQS = [
  { q:"Is the assessment really free?", a:"Yes, completely free with no obligation. Bring your piece to any Sundaram Jewels showroom and our goldsmith will examine it and provide a written quote at no cost." },
  { q:"How long does jewellery repair take?", a:"Most repairs are completed in 2–5 business days. Simple fixes like clasp replacements are often same-day. Stone replacements that require sourcing a matched stone may take 5–7 days." },
  { q:"Can you repair jewellery from other brands?", a:"Yes. We repair jewellery regardless of where it was originally purchased. We do ask that pieces be genuine precious metal jewellery." },
  { q:"Do you offer a guarantee on repairs?", a:"All Sundaram Jewels repairs come with a 6-month workmanship guarantee. If the same issue recurs within 6 months, we fix it at no charge." },
  { q:"My ring has sentimental value — how careful will you be?", a:"Extremely. We photograph every piece before work begins, store it securely in your individual labelled pouch, and it never leaves our atelier without your written authorisation." },
];

export default function RepairPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#fffef0] font-['Montserrat',sans-serif] mt-16">
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .6s ease both;}
        .repair-card{transition:transform .25s,box-shadow .25s,border-color .25s;}
        .repair-card:hover{transform:translateY(-4px);box-shadow:0 10px 32px rgba(184,146,42,0.1);border-color:#b8922a !important;}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative bg-[#0f0a05] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=80&fit=crop"
          alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.14] saturate-[0.4]" />
        <div className="absolute inset-0"
          style={{ backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(184,146,42,0.02) 40px,rgba(184,146,42,0.02) 41px)" }}/>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20 flex flex-col items-center text-center fade-up">
          <p className="text-[0.7rem] tracking-[0.22em] uppercase text-[#b8922a] mb-3 font-bold">Jewellery Care · Sundaram Luxury Craft</p>
          <h1 className=" font-semibold text-[#fffef0] leading-[1.1] mb-5"
            style={{ fontSize:"clamp(2.6rem,6vw,4.8rem)" }}>
            Jewellery Repair &<br/><em className="text-[#b8922a] italic">Restoration</em>
          </h1>
          <p className="text-[0.8rem] text-[rgba(255,254,240,0.6)] max-w-[520px] leading-[1.85] mb-8">
            From a broken chain to a missing diamond — our master goldsmiths restore your precious pieces with invisible precision and a 6-month guarantee.
          </p>
          <div className="flex gap-3 flex-wrap justify-center mb-8">
            <a href="/book-appointment" className="rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase no-underline bg-[#b8922a] text-white shadow-[0_6px_24px_rgba(184,146,42,0.35)] transition-transform hover:-translate-y-[2px]">
              Book a Repair
            </a>
            <a href="/contact" className="rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase no-underline bg-transparent text-[#fffef0] border border-[rgba(255,254,240,0.25)] transition-transform hover:-translate-y-[2px]">
              Get a Free Quote
            </a>
          </div>
          {/* Free assessment badge */}
          <div className="flex items-center gap-3 border border-[rgba(184,146,42,0.3)] rounded-full px-5 py-[10px] bg-[rgba(184,146,42,0.07)]">
            <span className="text-base">✅</span>
            <span className="text-[0.68rem] font-semibold text-[#b8922a]">Free Assessment · No Obligation Quote</span>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <div className="bg-[#1a1008] border-b border-[rgba(184,146,42,0.12)]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4">
          {[["🆓","Free Assessment"],["🛡️","6-Month Guarantee"],["🔍","Under Magnification"],["📸","Before & After Photos"]].map(([icon,text])=>(
            <div key={String(text)} className="py-5 px-4 text-center border-r border-[rgba(184,146,42,0.1)]">
              <div className="text-xl mb-[6px]">{icon}</div>
              <p className="text-[0.61rem] font-semibold text-[rgba(255,254,240,0.7)] tracking-[0.06em]">{String(text)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── REPAIR TYPES ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20">
        <div className="text-center mb-14">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">What We Fix</p>
          <h2 className=" font-semibold text-[#1a1008] mb-3"
            style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>Repair Services</h2>
          <p className="text-[0.74rem] text-[#9a8878] max-w-[500px] mx-auto leading-[1.7]">
            Not sure what's wrong? Bring it in — our goldsmith will diagnose it for free.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REPAIR_TYPES.map((r,i)=>(
            <div key={i} className="repair-card rounded-2xl p-6 border border-[rgba(184,146,42,0.18)] bg-[rgba(184,146,42,0.06)]">
              <span className="block text-[1.75rem] mb-4">{r.icon}</span>
              <h3 className="text-[0.8rem] font-bold text-[#1a1008] mb-2">{r.title}</h3>
              <p className="text-[0.7rem] text-[#4a3f35] leading-[1.8] mb-4">{r.desc}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[0.6rem] font-semibold text-[#b8922a] bg-[rgba(184,146,42,0.1)] rounded-full px-[10px] py-[3px]">⏱ {r.time}</span>
                <span className="text-[0.6rem] font-semibold text-[#8c2635] bg-[rgba(140,38,53,0.07)] rounded-full px-[10px] py-[3px]">{r.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-[#0f0a05] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px]">
          <div className="text-center mb-14">
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">The Process</p>
            <h2 className=" font-semibold text-[#fffef0]"
              style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>How Repair Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((p,i)=>(
              <div key={i} className="rounded-2xl p-6 border border-[rgba(184,146,42,0.15)] bg-[rgba(184,146,42,0.04)]">
                <span className="block  text-[2rem] font-bold text-[#b8922a] opacity-30 leading-none mb-1">{p.step}</span>
                <span className="block text-[1.5rem] mb-3">{p.icon}</span>
                <h3 className="text-[0.78rem] font-bold text-[#fffef0] mb-2">{p.title}</h3>
                <p className="text-[0.7rem] text-[rgba(255,254,240,0.6)] leading-[1.8]">{p.desc}</p>
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
            style={{ fontSize:"clamp(1.6rem,3.5vw,2.4rem)" }}>Repair FAQs</h2>
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
            Bring Your Piece Back<br/><em className="text-[#b8922a] italic">to Life</em>
          </h2>
          <p className="text-[0.74rem] text-[rgba(255,254,240,0.55)] leading-[1.8] mb-8">
            Free assessment at any Sundaram Jewels showroom. Book online or walk in — we're here to help.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="/book-appointment" className="inline-block rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase no-underline bg-[#b8922a] text-white shadow-[0_6px_28px_rgba(184,146,42,0.4)] transition-transform hover:-translate-y-[2px]">
              Book a Repair →
            </a>
            <a href="/contact" className="inline-block rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase no-underline bg-transparent text-[#fffef0] border border-[rgba(255,254,240,0.25)] transition-transform hover:-translate-y-[2px]">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}