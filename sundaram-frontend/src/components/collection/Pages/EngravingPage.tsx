import { useState } from "react";
import { RingIcon,NecklaceIcon,BangleIcon } from "./CustomDesignPage";


export const WatchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.875 19.2656C6.84375 19.2656 3.60938 15.9844 3.60938 12C3.60938 7.96875 6.84375 4.73438 10.875 4.73438C14.8594 4.73438 18.1406 7.96875 18.1406 12C18.1406 15.9844 14.8594 19.2656 10.875 19.2656ZM10.875 7.96875C10.6875 7.96875 10.5 7.82812 10.5 7.64062V6.65625C9.28125 6.75 8.20312 7.21875 7.35938 8.01562L8.01562 8.67188C8.15625 8.8125 8.15625 9.04688 8.01562 9.1875C7.96875 9.23438 7.875 9.28125 7.78125 9.28125C7.6875 9.28125 7.59375 9.23438 7.54688 9.1875L6.84375 8.48438C6.09375 9.32812 5.625 10.4531 5.53125 11.625H6.51562C6.75 11.625 6.89062 11.8125 6.89062 12C6.89062 12.1875 6.70312 12.3281 6.51562 12.3281H5.53125C5.625 13.5469 6.09375 14.6719 6.84375 15.5156L7.54688 14.8125C7.6875 14.6719 7.92188 14.6719 8.01562 14.8125C8.15625 14.9531 8.15625 15.1875 8.01562 15.3281L7.35938 15.9844C8.20312 16.7344 9.32812 17.25 10.5 17.2969V16.3125C10.5 16.125 10.6875 15.9844 10.875 15.9844C11.0625 15.9844 11.2031 16.125 11.2031 16.3125V17.2969C12.4219 17.25 13.5469 16.7344 14.3906 15.9844L13.6875 15.3281C13.5469 15.1875 13.5469 14.9531 13.6875 14.8125C13.8281 14.6719 14.0625 14.6719 14.2031 14.8125L14.8594 15.5156C15.6094 14.625 16.125 13.5469 16.1719 12.3281H15.2344C15.0469 12.3281 14.8594 12.1875 14.8594 12C14.8594 11.8125 15.0469 11.625 15.2344 11.625H16.1719C16.125 10.4531 15.6094 9.32812 14.9062 8.48438L14.2031 9.1875C14.1094 9.23438 14.0156 9.28125 13.9219 9.28125C13.875 9.28125 13.7344 9.23438 13.6875 9.1875C13.5469 9.04688 13.5469 8.8125 13.6875 8.67188L14.3906 7.96875C13.5469 7.21875 12.4219 6.75 11.2031 6.65625V7.64062C11.2031 7.82812 11.0625 7.96875 10.875 7.96875ZM10.7344 6C10.7812 5.95312 10.8281 5.95312 10.875 5.95312C10.9219 5.95312 10.9688 5.95312 10.9688 6C14.2031 6.04688 16.8281 8.625 16.875 11.8594C16.875 11.9062 16.9219 11.9531 16.9219 12C16.9219 12.0469 16.875 12.0469 16.875 12.0938C16.8281 13.6875 16.2188 15.1406 15.1875 16.1719C15.1406 16.2188 15.1406 16.2188 15.1406 16.2656C15.0938 16.2656 15.0938 16.2656 15.0469 16.3125C13.9688 17.3438 12.5156 18 10.875 18C9.23438 18 7.73438 17.3438 6.65625 16.2656H6.60938C6.60938 16.2188 6.5625 16.2188 6.5625 16.1719C5.48438 15.0938 4.875 13.6406 4.875 12C4.875 8.71875 7.5 6.04688 10.7344 6ZM12.8906 14.3438C12.7969 14.3438 12.7031 14.2969 12.6562 14.25L10.7344 12.3281C10.5938 12.2344 10.5 12.1406 10.5 12V9.98438C10.5 9.79688 10.6875 9.60938 10.875 9.60938C11.0625 9.60938 11.2031 9.79688 11.2031 9.98438V11.8125L13.125 13.7812C13.2656 13.9219 13.2656 14.1094 13.125 14.25C13.0312 14.2969 12.9375 14.3438 12.8906 14.3438Z" fill="#FFFEF0"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.46875 5.39062L7.35938 0.28125C7.40625 0.140625 7.54688 0 7.6875 0H14.0156C14.2031 0 14.3438 0.09375 14.3438 0.28125L15.2344 5.39062C14.0156 4.54688 12.4688 4.07812 10.875 4.07812C9.23438 4.07812 7.73438 4.54688 6.46875 5.39062ZM12.2344 2.8125H9.46875C9.28125 2.8125 9.14062 2.625 9.14062 2.4375C9.14062 2.25 9.28125 2.10938 9.46875 2.10938H12.2812C12.4688 2.10938 12.6094 2.25 12.6094 2.4375C12.6094 2.625 12.4688 2.8125 12.2344 2.8125ZM14.0156 24H7.6875C7.54688 24 7.40625 23.8594 7.35938 23.7188L6.46875 18.5625C7.73438 19.4062 9.23438 19.9219 10.875 19.9219C12.4688 19.9219 13.9688 19.4531 15.1875 18.6094L14.3438 23.7188C14.3438 23.8594 14.2031 24 14.0156 24ZM12.2344 21.8906H9.46875C9.28125 21.8906 9.14062 21.7031 9.14062 21.5156C9.14062 21.3281 9.28125 21.1875 9.46875 21.1875H12.2812C12.4688 21.1875 12.6094 21.3281 12.6094 21.5156C12.6094 21.7031 12.4688 21.8906 12.2344 21.8906ZM18.5625 12.3281H17.7656C17.5781 12.3281 17.4375 12.1875 17.4375 12C17.4375 11.8125 17.5781 11.625 17.7656 11.625H18.5625C18.75 11.625 18.8906 11.8125 18.8906 12C18.8906 12.1875 18.75 12.3281 18.5625 12.3281Z" fill="#FFFEF0"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.3125 14.1094C18.7031 14.1094 18.2344 13.6406 18.2344 13.0312V10.9688C18.2344 10.3594 18.7031 9.84375 19.3125 9.84375C19.9219 9.84375 20.3906 10.3594 20.3906 10.9688V13.0312C20.3906 13.6406 19.9219 14.1094 19.3125 14.1094Z" fill="#FFFEF0"/>
</svg>

)

const ENGRAVING_TYPES = [
  { icon:<RingIcon/>, title:"Ring Engraving",        desc:"Inside the band — names, dates, initials, coordinates, short phrases. Up to 30 characters in most ring sizes.", limit:"Up to 30 chars", popular:true  },
  { icon:<NecklaceIcon/>, title:"Pendant Engraving",     desc:"On the back of pendants and lockets — dedications, quotes, special dates. Perfect for gifting.",                  limit:"Up to 40 chars", popular:false },
  { icon:<BangleIcon/>, title:"Bangle & Bracelet",     desc:"Along the inside or outside surface of bangles and cuffs — monograms, names, short messages.",                    limit:"Up to 50 chars", popular:false },
  { icon:<WatchIcon/>, title:"Watch Case Engraving", desc:"On the caseback or side of watches — achievement dedications, anniversary messages.",                              limit:"Up to 60 chars", popular:false },
];

const FONT_STYLES = [
  { name:"Classic Serif",   desc:"Elegant, formal — ideal for names and dates",       css:"font-serif italic" },
  { name:"Script Cursive",  desc:"Flowing, romantic — perfect for wedding rings",      css:"font-serif italic" },
  { name:"Block Capitals",  desc:"Bold, strong — great for monograms",                 css:"font-sans font-black tracking-widest uppercase" },
  { name:"Diamond Cut",     desc:"Deeply incised — maximum longevity",                 css:"font-serif tracking-[0.18em]" },
  { name:"Modern Sans",     desc:"Clean, contemporary — suits minimalist pieces",      css:"font-sans tracking-[0.06em]" },
];

const PROCESS = [
  { step:"01", icon:"✏️", title:"Choose Your Text", desc:"Decide what you'd like engraved — name, date, coordinates, a quote or monogram. Our team can advise on what fits best for your piece." },
  { step:"02", icon:"🔤", title:"Select Font & Style", desc:"Choose from 5 font styles. We'll show you a digital preview before engraving." },
  { step:"03", icon:"⚙️", title:"Laser Precision Engraving", desc:"We use professional laser engraving for most pieces, and hand-engraving for heirloom or antique items." },
  { step:"04", icon:"✨", title:"Final Inspection", desc:"Inspected for clarity and depth, piece cleaned and polished, then returned in a Sundaram presentation pouch." },
];

const INSPIRATION = [
  { category:"Wedding Rings",   examples:["Priya & Aryan · 14.02.24","Forever Yours · RKM","मेरी जान · Always"] },
  { category:"Anniversary",     examples:["10 Years · Still Falling","23.11.2014 · Mumbai","My Everything"] },
  { category:"Milestone Gifts", examples:["Dr. Sharma · MBBS 2024","My First Diamond · PP","Shine On · Love, Maa"] },
  { category:"Coordinates",     examples:["19.0760° N · 72.8777° E","28.6139° N · 77.2090° E","Where We Met · 2019"] },
];

const FAQS = [
  { q:"Can engraving be removed later?", a:"Engraving is permanent and cannot be fully removed, though a skilled jeweller can polish it down significantly. We always show a digital proof for your approval first." },
  { q:"How many characters can be engraved?", a:"Ring shanks typically accommodate 20–30 characters. Pendants, bangles and bracelets can hold more. Our team will advise on the exact limit for your specific piece." },
  { q:"Can you engrave in Hindi, Gujarati or other scripts?", a:"Yes! We support Devanagari (Hindi), Gujarati, and other Indian scripts, as well as Arabic, Greek and Hebrew via laser engraving." },
  { q:"Will engraving affect the strength of my ring?", a:"Engraving on the inside of a ring shank has no measurable effect on structural strength, provided the shank is of normal thickness." },
  { q:"Can you engrave a piece I didn't buy from Sundaram Jewels?", a:"Yes, we engrave pieces from any brand or jeweller, subject to the piece being suitable. Please bring it in for a free assessment first." },
  { q:"How long does engraving take?", a:"Most engravings are completed within 1–2 business days. Complex custom work may take 3 days. Rush engraving (same-day) is available for an additional fee." },
];

export default function EngravingPage() {
  const [openFaq,     setOpenFaq]     = useState<number | null>(null);
  const [previewText, setPreviewText] = useState("Your Name");
  const [selectedFont,setSelectedFont]= useState(0);

  return (
    <div className="min-h-screen bg-[#fffef0] font-['Montserrat',sans-serif] mt-16">
      <style>{`
         @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .6s ease both;}
        .eng-card{transition:transform .25s,box-shadow .25s,border-color .25s;}
        .eng-card:hover{transform:translateY(-3px);box-shadow:0 10px 32px rgba(184,146,42,0.1);border-color:#b8922a !important;}
        .font-opt{transition:all .15s;}
        .font-opt:hover{border-color:#b8922a !important;}
        .insp-tag{transition:all .15s;}
        .insp-tag:hover{background:rgba(184,146,42,0.12) !important;border-color:#b8922a !important;}
        .preview-input:focus{border-color:#b8922a;box-shadow:0 0 0 3px rgba(184,146,42,0.1);}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative bg-[#0f0a05] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=80&fit=crop"
          alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12] saturate-[0.3]" />
        <div className="absolute inset-0"
          style={{ backgroundImage:"repeating-linear-gradient(-45deg,transparent,transparent 60px,rgba(184,146,42,0.015) 60px,rgba(184,146,42,0.015) 61px)" }}/>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20 flex flex-col items-center text-center fade-up">
          <p className="text-[0.7rem] tracking-[0.22em] uppercase text-[#b8922a] mb-3 font-bold">Jewellery Care · Sundaram Luxury Craft</p>
          <h1 className=" font-semibold text-[#fffef0] leading-[1.1] mb-4"
            style={{ fontSize:"clamp(2.6rem,6vw,4.8rem)" }}>
            Personalise With<br/><em className="text-[#b8922a] italic">Custom Engraving</em>
          </h1>
          <p className="text-[0.8rem] text-[rgba(255,254,240,0.6)] max-w-[500px] leading-[1.85] mb-4">
            Turn any piece into a lifelong keepsake. A name, a date, a coordinate, a message — laser-etched with hair-thin precision that lasts forever.
          </p>
          <p className=" italic text-[1.1rem] text-[#b8922a] mb-9">
            "The words that last, outlast us all."
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <a href="/book-appointment" className="rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase no-underline bg-[#b8922a] text-white shadow-[0_6px_24px_rgba(184,146,42,0.35)] transition-transform hover:-translate-y-[2px]">
              Book Engraving
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
          {[["⚡","1–2 Day Turnaround"],["🌐","Hindi, Gujarati & More"],["🎯","Laser Precision"],["🔄","Digital Proof First"]].map(([icon,text])=>(
            <div key={String(text)} className="py-5 px-4 text-center border-r border-[rgba(184,146,42,0.1)]">
              <div className="text-xl mb-[6px]">{icon}</div>
              <p className="text-[0.61rem] font-semibold text-[rgba(255,254,240,0.7)] tracking-[0.06em]">{String(text)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── LIVE PREVIEW ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Controls */}
          <div>
            <p className="text-[0.7rem] tracking-[0.18em] uppercase text-[#b8922a] mb-2 font-bold">Try It Now</p>
            <h2 className=" font-semibold text-[#1a1008] mb-5"
              style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)" }}>Preview Your Engraving</h2>

            <div className="mb-5">
              <label className="block text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-[#9a8878] mb-2">
                Your Text (max 30 characters)
              </label>
              <input value={previewText} maxLength={30}
                onChange={e=>setPreviewText(e.target.value)}
                className="preview-input w-full rounded-xl px-4 py-[13px] text-[0.78rem] text-[#1a1008] bg-[#fffef0] border border-[rgba(184,146,42,0.18)] outline-none transition-all"
                placeholder="e.g. Priya & Aryan · 14.02.24"/>
              <p className="text-[0.58rem] text-[#9a8878] mt-1">{previewText.length}/30 characters</p>
            </div>

            <p className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-[#9a8878] mb-3">Font Style</p>
            <div className="flex flex-col gap-2">
              {FONT_STYLES.map((f,i)=>(
                <div key={i} className={`font-opt rounded-xl px-4 py-3 cursor-pointer flex items-center justify-between border ${selectedFont===i?"border-[#b8922a] bg-[rgba(184,146,42,0.08)]":"border-[rgba(184,146,42,0.18)] bg-transparent"}`}
                  onClick={()=>setSelectedFont(i)}>
                  <div>
                    <p className={`text-[1.05rem] text-[#1a1008] mb-[2px] ${f.css}`}>{previewText || "Preview"}</p>
                    <p className="text-[0.58rem] text-[#9a8878]">{f.name} · {f.desc}</p>
                  </div>
                  {selectedFont===i && (
                    <div className="w-[18px] h-[18px] rounded-full bg-[#b8922a] flex items-center justify-center flex-shrink-0 ml-3">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="2 6 5 9 10 3"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ring preview */}
          <div className="sticky top-[120px]">
            <div className="rounded-3xl overflow-hidden relative border border-[rgba(184,146,42,0.18)] bg-[#1a1008]">
              <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85&fit=crop"
                alt="Ring" className="w-full aspect-square object-cover opacity-85"/>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(15,10,5,0.95)] to-transparent px-6 py-6 text-center">
                <p className="text-[0.58rem] tracking-[0.16em] uppercase text-[#b8922a] mb-2">Engraved Inside Band</p>
                <p className={`text-[#fffef0] tracking-[0.06em] ${FONT_STYLES[selectedFont].css}`}
                  style={{ fontSize:"clamp(1rem,3vw,1.4rem)", textShadow:"0 0 20px rgba(184,146,42,0.4)" }}>
                  {previewText || "Your Text Here"}
                </p>
              </div>
            </div>
            <p className="text-[0.62rem] text-[#9a8878] text-center mt-3">
              * Visual preview only. Actual engraving may vary by piece.
            </p>
          </div>
        </div>
      </section>

      {/* ── ENGRAVING TYPES ── */}
      <section className="bg-[#0f0a05] py-[72px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px]">
          <div className="text-center mb-12">
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">What We Engrave</p>
            <h2 className=" font-semibold text-[#fffef0]"
              style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>Engraving Options</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENGRAVING_TYPES.map((e,i)=>(
              <div key={i} className={`eng-card rounded-2xl p-6 ${e.popular?"border-2 border-[#b8922a]":"border border-[rgba(184,146,42,0.2)]"} bg-[rgba(184,146,42,0.04)]`}>
                {e.popular && <span className="block text-[0.52rem] font-bold uppercase tracking-[0.1em] bg-[#b8922a] text-white rounded-full px-3 py-[2px] w-fit mb-3">Most Popular</span>}
                <span className="block text-[1.6rem] mb-3">{e.icon}</span>
                <h3 className="text-[0.78rem] font-bold text-[#fffef0] mb-2">{e.title}</h3>
                <p className="text-[0.7rem] text-[rgba(255,254,240,0.6)] leading-[1.75] mb-3">{e.desc}</p>
                <span className="text-[0.6rem] font-semibold text-[#b8922a] bg-[rgba(184,146,42,0.1)] rounded-full px-[10px] py-[3px]">{e.limit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20">
        <div className="text-center mb-14">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">How It Works</p>
          <h2 className=" font-semibold text-[#1a1008]"
            style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>The Engraving Process</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS.map((p,i)=>(
            <div key={i} className="rounded-2xl p-6 border border-[rgba(184,146,42,0.18)] bg-[rgba(184,146,42,0.06)]">
              <span className="block  text-[2rem] font-bold text-[#b8922a] opacity-30 leading-none mb-1">{p.step}</span>
              <span className="block text-[1.5rem] mb-3">{p.icon}</span>
              <h3 className="text-[0.78rem] font-bold text-[#1a1008] mb-2">{p.title}</h3>
              <p className="text-[0.7rem] text-[#4a3f35] leading-[1.8]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INSPIRATION ── */}
      <section className="bg-[rgba(184,146,42,0.06)] border-t border-b border-[rgba(184,146,42,0.18)] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px]">
          <div className="text-center mb-10">
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">Get Inspired</p>
            <h2 className=" font-semibold text-[#1a1008]"
              style={{ fontSize:"clamp(1.6rem,3.5vw,2.4rem)" }}>Engraving Ideas</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INSPIRATION.map(({category,examples})=>(
              <div key={category} className="rounded-2xl p-5 border border-[rgba(184,146,42,0.18)] bg-[#fffef0]">
                <p className="text-[0.62rem] font-bold tracking-[0.1em] uppercase text-[#b8922a] mb-3">{category}</p>
                <div className="flex flex-col gap-2">
                  {examples.map((ex,i)=>(
                    <div key={i} className="insp-tag rounded-lg px-3 py-2 cursor-pointer border border-[rgba(184,146,42,0.18)] bg-transparent"
                      onClick={()=>setPreviewText(ex.slice(0,30))}>
                      <span className=" italic text-[0.9rem] text-[#1a1008]">"{ex}"</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[0.65rem] text-[#9a8878] text-center mt-5">
            Click any idea above to preview it in your engraving.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-10 py-[72px]">
        <div className="text-center mb-11">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">Questions</p>
          <h2 className=" font-semibold text-[#1a1008]"
            style={{ fontSize:"clamp(1.6rem,3.5vw,2.4rem)" }}>Engraving FAQs</h2>
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
            Make It Yours.<br/><em className="text-[#b8922a] italic">Make It Forever.</em>
          </h2>
          <p className="text-[0.74rem] text-[rgba(255,254,240,0.55)] leading-[1.8] mb-8">
            Book a Sundaram Jewels engraving appointment. We'll show you a digital proof before we begin.
          </p>
          <a href="/book-appointment" className="inline-block rounded-full px-10 py-[14px] text-[0.72rem] font-bold tracking-[0.12em] uppercase no-underline bg-[#b8922a] text-white shadow-[0_6px_28px_rgba(184,146,42,0.4)] transition-transform hover:-translate-y-[2px]">
            Book Engraving →
          </a>
        </div>
      </section>
    </div>
  );
}