import { useState } from "react";

const TIMELINE = [
  { year:"1892", title:"The First Flame",      body:"Ratan Mehta opens a small jewellery workshop in Surat's Zaveri Bazaar with a single artisan and a vision to create heirloom-quality pieces for every occasion." },
  { year:"1924", title:"Royal Patronage",      body:"Heritage Jewels receives its first royal commission from the Maharaja of Baroda — a 200-diamond necklace that would become the foundation of our bespoke legacy." },
  { year:"1967", title:"Diamonds & Dreams",    body:"The second generation introduces certified diamond jewellery. We become among the first Indian jewellers to offer IGI-graded stones as standard across every piece." },
  { year:"1998", title:"Digital Doors Open",   body:"Heritage Jewels launches India's first luxury jewellery e-commerce presence, making our collections accessible to connoisseurs nationwide." },
  { year:"2018", title:"Lab Diamond Pioneer",  body:"We pioneer the introduction of lab-grown diamonds in India — offering the same brilliance and certification at a fraction of the environmental cost." },
  { year:"2024", title:"A New Era",            body:"With 132 years of craftsmanship, Heritage Jewels continues to evolve — blending heritage with technology to create jewellery that is as contemporary as it is timeless." },
];

const VALUES = [
  { icon:"💎", title:"Uncompromising Quality", body:"Every piece passes a 47-point quality inspection before leaving our atelier. We settle for nothing less than perfection." },
  { icon:"🌱", title:"Ethical Sourcing",       body:"100% of our diamonds are conflict-free and lab-grown or responsibly mined. Our gold is BIS hallmarked and sustainably sourced." },
  { icon:"🔬", title:"Scientific Precision",   body:"We work with IGI-certified gemologists who grade every stone to VS1 clarity or above, ensuring exceptional brilliance." },
  { icon:"🤝", title:"Lifelong Relationship",  body:"A Heritage Jewels piece comes with a lifetime care promise — free cleaning, resizing and polishing for the life of the jewellery." },
  { icon:"✏️", title:"Bespoke Artisanship",    body:"Our master craftsmen have an average of 22 years of experience, blending traditional Indian techniques with modern precision tools." },
  { icon:"🌍", title:"Global Standards",       body:"Our quality standards meet and exceed GIA, IGI and BIS benchmarks — ensuring confidence whether you're in Mumbai or Milan." },
];

const TEAM = [
  { name:"Aryan Mehta",  role:"Managing Director & 4th Generation Jeweller", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&fit=crop", quote:"Every piece we create carries 132 years of trust." },
  { name:"Kavya Desai",  role:"Chief Gemologist, IGI Certified",              img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80&fit=crop", quote:"A diamond's story begins long before it meets gold." },
  { name:"Rohan Shah",   role:"Head of Bespoke Design",                       img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80&fit=crop", quote:"Great design listens before it speaks." },
  { name:"Neha Kapoor",  role:"Director of Client Experience",                img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80&fit=crop", quote:"Your joy is our only measure of success." },
];

const STATS = [
  { value:"132",   label:"Years of Legacy"    },
  { value:"2.4L+", label:"Happy Customers"    },
  { value:"47",    label:"Quality Checkpoints"},
  { value:"12K+",  label:"Unique Designs"     },
];

const TL_IMGS = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&q=80&fit=crop",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&q=80&fit=crop",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=80&fit=crop",
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=700&q=80&fit=crop",
  "https://images.unsplash.com/photo-1631982690223-8aa4cf79fad3?w=700&q=80&fit=crop",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=80&fit=crop",
];

export default function AboutPage() {
  const [tlIdx, setTlIdx] = useState(5);

  return (
    <div className="min-h-screen mt-[67px] bg-[#fffef0] font-['Montserrat',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .7s ease both;}
        .tl-entry{animation:fadeUp .35s ease both;}
        .team-card:hover .team-ov{opacity:1!important;}
        .team-card:hover img{transform:scale(1.06);}
        .value-card:hover{border-color:#b8922a!important;transform:translateY(-4px);}
        img{transition:transform .5s ease;}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center bg-[#0f0a05] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=80&fit=crop"
          alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.18] saturate-[0.4]"/>
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs><pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#b8922a" strokeWidth="0.3"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
        <svg className="absolute right-[-100px] bottom-[-100px] opacity-[0.08]" width="600" height="600" viewBox="0 0 600 600">
          {[280,240,200,160,120].map((r,i)=><circle key={i} cx="300" cy="300" r={r} fill="none" stroke="#b8922a" strokeWidth={i===0?1:0.5}/>)}
        </svg>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] relative z-10 w-full">
          <div className="max-w-[680px] fade-up">
            <div className="flex items-center gap-4 mb-7">
              <div className="h-px w-12 bg-[#b8922a]"/>
              <p className="text-[0.7rem] tracking-[0.22em] uppercase text-[#b8922a] font-bold">Est. 1892 · Surat, India</p>
            </div>
            <h1 className="font-semibold text-[#fffef0] leading-[1.1] mb-7" style={{ fontSize:"clamp(2.8rem,6vw,5.5rem)" }}>
              132 Years of<br/>
              <em className="text-[#b8922a] italic">Crafting Dreams</em><br/>
              in Gold & Diamond
            </h1>
            <p className="text-[0.82rem] text-[rgba(255,254,240,0.65)] leading-[1.9] max-w-[520px] mb-11">
              What began as a single artisan's workshop in Zaveri Bazaar has grown into India's most trusted name in certified lab diamond jewellery — without ever losing the soul of handcrafted heritage.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="/collections" className="no-underline rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase bg-[#b8922a] text-white shadow-[0_6px_24px_rgba(184,146,42,0.35)] transition-transform hover:-translate-y-[2px]">
                Explore Collections
              </a>
              <a href="/appointment" className="no-underline rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase bg-transparent text-[#fffef0] border-[1.5px] border-[rgba(255,254,240,0.3)] transition-transform hover:-translate-y-[2px]">
                Meet Our Artisans
              </a>
            </div>
          </div>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[0.55rem] tracking-[0.18em] uppercase text-[rgba(255,254,240,0.4)]">Scroll</span>
          <div className="w-px h-10 bg-[rgba(184,146,42,0.5)]"/>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <div className="bg-[#1a1008] border-b border-[rgba(184,146,42,0.15)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] grid grid-cols-2 sm:grid-cols-4">
          {STATS.map(({ value, label })=>(
            <div key={label} className="py-9 px-6 text-center border-r border-[rgba(184,146,42,0.12)]">
              <p className="font-bold text-[#b8922a] leading-none mb-2" style={{ fontSize:"clamp(2rem,4vw,3rem)" }}>{value}</p>
              <p className="text-[0.62rem] text-[rgba(255,254,240,0.5)] tracking-[0.1em] uppercase">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── OUR STORY ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-[88px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[72px] items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden" style={{ aspectRatio:"4/5" }}>
              <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=85&fit=crop"
                alt="Craftsman" className="w-full h-full object-cover"/>
            </div>
            {/* Floating quote card */}
            <div className="absolute bottom-[-24px] right-[-24px] rounded-[18px] p-5 bg-[#1a1008] border border-[rgba(184,146,42,0.25)] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <p className="italic text-[1.1rem] text-[#fffef0] mb-2 max-w-[200px] leading-[1.4]">
                "We don't just make jewellery.<br/>We craft legacies."
              </p>
              <p className="text-[0.6rem] text-[#b8922a] tracking-[0.1em] uppercase">— Ratan Mehta, Founder, 1892</p>
            </div>
            {/* Gold corner */}
            <div className="absolute top-[-16px] left-[-16px] w-20 h-20 border-t-2 border-l-2 border-[#b8922a] rounded-tl-sm pointer-events-none"/>
          </div>
          {/* Text */}
          <div>
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-4 font-bold">Our Story</p>
            <h2 className="font-semibold text-[#1a1008] leading-[1.2] mb-6" style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)" }}>
              From One Artisan<br/>to a National Legacy
            </h2>
            <div className="flex flex-col gap-[18px]">
              {["In 1892, Ratan Mehta sat beneath a single oil lamp in Surat's bustling Zaveri Bazaar, shaping gold with bare hands and boundless ambition. He had no machines — only mastery.",
                "Four generations later, Heritage Jewels is India's most trusted name in lab-grown diamond jewellery. We operate three flagship showrooms, employ 200+ master craftsmen, and have adorned over 2.4 lakh families across the country.",
                "Yet through every decade of growth, we have never abandoned what Ratan started: the belief that jewellery should feel personal, be made with integrity, and last forever."
              ].map((para,i)=>(
                <p key={i} className="text-[0.78rem] text-[#4a3f35] leading-[1.85]">{para}</p>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-5">
              <div className="h-px flex-1 bg-[rgba(184,146,42,0.18)]"/>
              <p className="italic text-[1.05rem] text-[#b8922a] whitespace-nowrap">Since 1892</p>
              <div className="h-px flex-1 bg-[rgba(184,146,42,0.18)]"/>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="bg-[#0f0a05] py-[88px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px]">
          <div className="text-center mb-15">
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-3 font-bold">Our Journey</p>
            <h2 className="font-semibold text-[#fffef0]" style={{ fontSize:"clamp(2rem,4vw,3rem)" }}>132 Years of Milestones</h2>
          </div>
          {/* Year tabs */}
          <div className="flex justify-center gap-0 mb-12 overflow-x-auto pb-1">
            {TIMELINE.map((t,i)=>(
              <button key={t.year} onClick={()=>setTlIdx(i)}
                className="px-5 py-3 bg-none border-none cursor-pointer text-[0.72rem] font-semibold whitespace-nowrap transition-colors duration-200"
                style={{ color:tlIdx===i?"#b8922a":"rgba(255,254,240,0.35)", borderBottom:tlIdx===i?"2px solid #b8922a":"2px solid transparent" }}>
                {t.year}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center tl-entry" key={tlIdx}>
            <div>
              <p className="font-bold text-[#b8922a] opacity-30 leading-none mb-0" style={{ fontSize:"clamp(3rem,6vw,5rem)" }}>
                {TIMELINE[tlIdx].year}
              </p>
              <h3 className="font-semibold text-[#fffef0] mt-[-12px] mb-5 leading-[1.2]" style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)" }}>
                {TIMELINE[tlIdx].title}
              </h3>
              <p className="text-[0.78rem] text-[rgba(255,254,240,0.65)] leading-[1.9] max-w-[460px]">
                {TIMELINE[tlIdx].body}
              </p>
              <div className="flex gap-2 mt-7">
                {TIMELINE.map((_,i)=>(
                  <div key={i} onClick={()=>setTlIdx(i)} className="cursor-pointer rounded-full transition-all duration-300"
                    style={{ width:i===tlIdx?"28px":"8px", height:"8px", backgroundColor:i===tlIdx?"#b8922a":"rgba(184,146,42,0.3)" }}/>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio:"4/3" }}>
              <img src={TL_IMGS[tlIdx]} alt={TIMELINE[tlIdx].title} className="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-[88px]">
        <div className="text-center mb-14">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-3 font-bold">What We Stand For</p>
          <h2 className="font-semibold text-[#1a1008]" style={{ fontSize:"clamp(2rem,4vw,3rem)" }}>Our Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map(({ icon, title, body })=>(
            <div key={title} className="value-card rounded-2xl p-7 border border-[rgba(184,146,42,0.18)] bg-[rgba(184,146,42,0.06)] transition-all duration-[250ms] cursor-default">
              <div className="text-[1.75rem] mb-4">{icon}</div>
              <h3 className="text-[1.15rem] font-semibold text-[#1a1008] mb-[10px]">{title}</h3>
              <p className="text-[0.74rem] text-[#4a3f35] leading-[1.8]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-[88px] bg-gradient-to-b from-[#1a1008] to-[#0f0a05]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px]">
          <div className="text-center mb-14">
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-3 font-bold">The People Behind the Craft</p>
            <h2 className="font-semibold text-[#fffef0]" style={{ fontSize:"clamp(2rem,4vw,3rem)" }}>Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(member=>(
              <div key={member.name} className="team-card rounded-2xl overflow-hidden relative border border-[rgba(184,146,42,0.2)] cursor-pointer">
                <div className="overflow-hidden relative" style={{ aspectRatio:"3/4" }}>
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover block"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,10,5,0.9)] to-transparent"/>
                  <div className="team-ov absolute inset-0 opacity-0 transition-opacity duration-300 bg-[rgba(15,10,5,0.65)] flex items-center justify-center p-5">
                    <p className="italic text-[0.95rem] text-[#fffef0] text-center leading-[1.5]">"{member.quote}"</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-[18px] py-4">
                  <p className="text-[1.1rem] font-semibold text-[#fffef0] mb-[3px]">{member.name}</p>
                  <p className="text-[0.6rem] text-[#b8922a] tracking-[0.06em]">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-[72px]">
        <div className="text-center mb-11">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-3 font-bold">Trusted & Verified</p>
          <h2 className="font-semibold text-[#1a1008]" style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)" }}>Certifications & Memberships</h2>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          {["IGI Certified","BIS Hallmarked","GIA Partner","All India Gems & Jewellery Council","ISO 9001:2015","RJC Member"].map(cert=>(
            <div key={cert} className="rounded-full px-6 py-3 border-[1.5px] border-[rgba(184,146,42,0.18)] bg-[rgba(184,146,42,0.06)] text-[0.68rem] font-semibold text-[#1a1008] tracking-[0.06em]">
              ✦ {cert}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}