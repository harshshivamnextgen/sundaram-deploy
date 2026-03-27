import { useState } from "react";

const WHAT_WE_CHECK = [
  { icon:"⚗️",  title:"XRF Metal Purity Testing",     desc:"X-ray fluorescence analysis accurately measures the karat purity of gold, platinum and silver without damaging the piece. We verify 18K, 22K, 14K and all other purities." },
  { icon:"🔬",  title:"Gemological Stone Analysis",   desc:"Our IGI-trained gemologists examine every stone using refractometers, spectroscopes and UV lamps to confirm species, origin, treatments and approximate carat weight." },
  { icon:"🪙",  title:"Hallmark & Maker's Mark Check",desc:"We cross-reference BIS hallmarks, assay office marks, maker's stamps and date letters against official records to confirm authenticity and origin." },
  { icon:"💡",  title:"UV & Spectral Examination",    desc:"Ultraviolet light and spectrometric analysis reveals treatments, coatings, filled fractures and synthetic materials invisible to the naked eye." },
  { icon:"📐",  title:"Weight & Measurement",          desc:"Precise weighing on gemological scales, calipers for stone dimensions, and density testing for metal confirmation. Every figure is documented." },
  { icon:"📄",  title:"Certification Report",         desc:"A comprehensive written authentication report is issued covering metal purity, stone identity, treatments, and an opinion on originality and quality." },
];

const PROCESS = [
  { step:"01", icon:"📅", title:"Book an Appointment",   desc:"Schedule online or walk into any Sundaram Jewels showroom. Authentication requires a booking to ensure a senior gemologist is available." },
  { step:"02", icon:"🔍", title:"Piece Assessment",       desc:"Your piece is examined under magnification. We document its condition with photographs before any testing begins." },
  { step:"03", icon:"⚗️", title:"Scientific Testing",    desc:"XRF, UV, spectral and physical testing is conducted in sequence. Most tests take 1–2 hours; complex pieces may require a full day." },
  { step:"04", icon:"📄", title:"Written Report Issued",  desc:"A formal authentication certificate is prepared and handed to you with a full explanation of all findings. Kept on file permanently." },
];

const WHEN_TO_AUTHENTICATE = [
  { scenario:"Before Insuring Jewellery",    icon:"🏦", desc:"Insurance companies require certified authentication for high-value pieces. Our report is accepted by all major Indian insurers." },
  { scenario:"Before Selling or Reselling",  icon:"💰", desc:"Authenticated pieces command significantly higher resale value. Buyers pay more for verified purity and stone quality." },
  { scenario:"Buying Pre-Owned Jewellery",   icon:"🛍️", desc:"Verify that a piece you're considering purchasing is exactly what it claims to be before committing your money." },
  { scenario:"Inherited or Gifted Pieces",   icon:"🎁", desc:"Family heirlooms or gifts of unknown provenance deserve professional verification for your peace of mind." },
  { scenario:"Dispute Resolution",           icon:"⚖️", desc:"Our authentication reports are accepted as expert evidence in consumer disputes and legal proceedings." },
  { scenario:"General Peace of Mind",        icon:"✅", desc:"Simply want to know what you own? A complete authentication gives you definitive, documented answers." },
];

const FAQS = [
  { q:"Is authentication the same as an appraisal?", a:"No — authentication verifies what a piece IS (metal purity, stone identity, genuineness). An appraisal assigns a monetary VALUE. Both are often recommended together for insurance purposes." },
  { q:"Will testing damage my jewellery?", a:"All our testing methods are non-destructive. XRF analysis, gemological examination and UV testing leave absolutely no mark on the piece." },
  { q:"How long does authentication take?", a:"Most authentications are completed same-day or within 1 business day. Complex pieces with multiple stones or unusual metals may take 2 days." },
  { q:"Is your authentication report accepted by insurance companies?", a:"Yes. Our reports are accepted by all major Indian insurance providers including LIC, New India Assurance and HDFC Ergo for jewellery insurance purposes." },
  { q:"Can you authenticate jewellery from any brand or era?", a:"Yes — we authenticate all jewellery including vintage, antique, Indian traditional, international designer and handmade pieces regardless of age or origin." },
];

export default function AuthenticationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#fffef0] font-['Montserrat',sans-serif] mt-16">
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .6s ease both;}
        .check-card:hover{border-color:#b8922a !important;transform:translateY(-3px);box-shadow:0 10px 30px rgba(184,146,42,0.1);}
        .when-card:hover{border-color:#b8922a !important;background:rgba(184,146,42,0.08) !important;}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative bg-[#0f0a05] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1600&q=80&fit=crop"
          alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.13] saturate-[0.3]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(15,10,5,0.92)] to-[rgba(15,10,5,0.65)]" />
        {/* Decorative circles */}
        <svg className="absolute right-[-60px] bottom-[-60px] opacity-[0.06]" width="440" height="440" viewBox="0 0 440 440">
          {[200,160,120,80,40].map((r,i)=>(
            <circle key={i} cx="220" cy="220" r={r} fill="none" stroke="#b8922a"
              strokeWidth={i===0?1:0.5} strokeDasharray={i%2!==0?"5 5":"none"}/>
          ))}
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-[88px] fade-up">
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[0.7rem] tracking-[0.22em] uppercase text-[#b8922a] mb-3 font-bold">Expert Services · Sundaram Luxury Craft</p>
              <h1 className=" font-semibold text-[#fffef0] leading-[1.1] mb-5"
                style={{ fontSize:"clamp(2.4rem,5.5vw,4.4rem)" }}>
                Jewellery<br/><em className="text-[#b8922a] italic">Authentication</em>
              </h1>
              <p className="text-[0.78rem] text-[rgba(255,254,240,0.6)] max-w-[480px] leading-[1.85] mb-8">
                Scientific verification of your jewellery's metal purity, stone identity, hallmarks and genuineness — conducted by IGI-trained gemologists and issued as a formal written certificate.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="/book-appointment" className="rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase no-underline bg-[#b8922a] text-white shadow-[0_6px_24px_rgba(184,146,42,0.35)] transition-transform hover:-translate-y-[2px]">
                  Book Authentication
                </a>
                <a href="/contact" className="rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase no-underline bg-transparent text-[#fffef0] border border-[rgba(255,254,240,0.25)] transition-transform hover:-translate-y-[2px]">
                  Ask a Question
                </a>
              </div>
            </div>
            {/* Price card */}
            <div className="rounded-3xl p-8 border border-[rgba(184,146,42,0.25)] bg-[rgba(184,146,42,0.07)] ml-0 lg:ml-5">
              <p className="text-[0.7rem] tracking-[0.18em] uppercase text-[#b8922a] mb-5 font-bold">Service Overview</p>
              {[
                ["Starting Price", "₹ 999"],
                ["Turnaround",     "Same Day – 2 Days"],
                ["Report Format",  "Written Certificate"],
                ["Valid For",      "Insurance & Legal Use"],
                ["Gemologists",    "IGI Trained"],
              ].map(([k,v])=>(
                <div key={k} className="flex justify-between py-3 border-b border-[rgba(184,146,42,0.12)]">
                  <span className="text-[0.7rem] text-[rgba(255,254,240,0.5)]">{k}</span>
                  <span className="text-[0.72rem] font-semibold text-[#fffef0]">{v}</span>
                </div>
              ))}
              <a href="/book-appointment" className="block text-center mt-6 rounded-full py-[12px] text-[0.68rem] font-bold tracking-[0.1em] uppercase no-underline bg-[#8c2635] text-white transition-transform hover:-translate-y-[1px]">
                Book Now →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <div className="bg-[#1a1008] border-b border-[rgba(184,146,42,0.12)]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4">
          {[["🔬","IGI-Trained Gemologists"],["📄","Written Certificate"],["⚗️","Non-Destructive Testing"],["🏦","Insurer Accepted"]].map(([icon,text])=>(
            <div key={String(text)} className="py-5 px-4 text-center border-r border-[rgba(184,146,42,0.1)]">
              <div className="text-xl mb-[6px]">{icon}</div>
              <p className="text-[0.61rem] font-semibold text-[rgba(255,254,240,0.7)] tracking-[0.06em]">{String(text)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHAT WE CHECK ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20">
        <div className="text-center mb-14">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">Our Testing Protocol</p>
          <h2 className=" font-semibold text-[#1a1008]"
            style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>What We Authenticate</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHAT_WE_CHECK.map((item,i)=>(
            <div key={i} className="check-card rounded-2xl p-6 border border-[rgba(184,146,42,0.18)] bg-[rgba(184,146,42,0.06)] transition-all duration-300">
              <span className="block text-[1.8rem] mb-4">{item.icon}</span>
              <h3 className="text-[0.8rem] font-bold text-[#1a1008] mb-2">{item.title}</h3>
              <p className="text-[0.71rem] text-[#4a3f35] leading-[1.8]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-[#0f0a05] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px]">
          <div className="text-center mb-14">
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">How It Works</p>
            <h2 className=" font-semibold text-[#fffef0]"
              style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>The Authentication Process</h2>
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

      {/* ── WHEN TO AUTHENTICATE ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20">
        <div className="text-center mb-14">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">When You Need It</p>
          <h2 className=" font-semibold text-[#1a1008]"
            style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>When to Authenticate</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHEN_TO_AUTHENTICATE.map((w,i)=>(
            <div key={i} className="when-card flex gap-4 items-start rounded-2xl p-5 border border-[rgba(184,146,42,0.18)] bg-transparent transition-all duration-200 cursor-default">
              <span className="text-[1.8rem] flex-shrink-0">{w.icon}</span>
              <div>
                <h3 className="text-[0.78rem] font-bold text-[#1a1008] mb-1">{w.scenario}</h3>
                <p className="text-[0.7rem] text-[#4a3f35] leading-[1.75]">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[rgba(184,146,42,0.06)] border-t border-b border-[rgba(184,146,42,0.18)] py-[72px]">
        <div className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-11">
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">Questions</p>
            <h2 className=" font-semibold text-[#1a1008]"
              style={{ fontSize:"clamp(1.6rem,3.5vw,2.4rem)" }}>Authentication FAQs</h2>
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
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 bg-gradient-to-br from-[#0f0a05] to-[#2a1a0e]">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className=" font-semibold text-[#fffef0] leading-[1.2] mb-4"
            style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>
            Know Exactly<br/><em className="text-[#b8922a] italic">What You Own</em>
          </h2>
          <p className="text-[0.74rem] text-[rgba(255,254,240,0.55)] leading-[1.8] mb-8">
            Book a Sundaram Jewels authentication appointment and receive a formal written certificate you can rely on — for insurance, resale, or simply peace of mind.
          </p>
          <a href="/book-appointment" className="inline-block rounded-full px-10 py-[14px] text-[0.72rem] font-bold tracking-[0.12em] uppercase no-underline bg-[#b8922a] text-white shadow-[0_6px_28px_rgba(184,146,42,0.4)] transition-transform hover:-translate-y-[2px]">
            Book Authentication →
          </a>
        </div>
      </section>
    </div>
  );
}