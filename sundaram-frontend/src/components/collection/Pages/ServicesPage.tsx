import { useState } from "react";

const JEWELLERY_CARE = [
    {
        icon: "🧹", title: "Cleaning", subtitle: "Restore Original Brilliance",
        desc: "Professional ultrasonic + steam cleaning removes years of oils, lotions and dust. Restores your diamond's full fire and your metal's original shine.",
        highlights: ["Ultrasonic + steam treatment", "Safe for all diamonds & gold", "Same-day available", "Returned in Sundaram pouch"],
        time: "Same Day – 2 Days", from: "₹ 299", href: "/services/cleaning",
        img: "https://images.unsplash.com/photo-1584663639666-34b577d6494a?w=600&q=80&fit=crop"
    },
    {
        icon: "📏", title: "Resizing", subtitle: "The Perfect Fit, Every Time",
        desc: "Expert ring resizing by our master goldsmiths — sized up or down with an invisible join, polished to perfection and guaranteed for 6 months.",
        highlights: ["All gold & platinum metals", "Invisible seamless finish", "Interactive size guide", "6-month workmanship guarantee"],
        time: "2–5 Days", from: "₹ 699", href: "/services/resizing",
        img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80&fit=crop"
    },
    {
        icon: "🔧", title: "Repair", subtitle: "Restore What Matters Most",
        desc: "Broken chains, loose stones, cracked shanks, missing diamonds — our goldsmiths fix it all with precision and a free assessment before any work begins.",
        highlights: ["Free assessment, no obligation", "6 types of repair covered", "Stone replacement available", "Before & after photography"],
        time: "1–7 Days", from: "₹ 299", href: "/services/repair",
        img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80&fit=crop"
    },
    {
        icon: "✏️", title: "Engraving", subtitle: "Personalise with Precision",
        desc: "Laser and hand engraving on rings, pendants, bangles and more. Names, dates, coordinates — in English, Hindi, Gujarati and more.",
        highlights: ["Live text preview tool", "5 font style choices", "Hindi & Gujarati scripts", "1–2 day turnaround"],
        time: "1–2 Days", from: "₹ 399", href: "/services/engraving",
        img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80&fit=crop"
    },
];

const EXPERT_SERVICES = [
    {
        icon: "🔬", title: "Jewellery Appraisal", subtitle: "Know Your True Value",
        desc: "Certified valuation of your jewellery for insurance, resale or estate planning. Conducted by our IGI-trained gemologists with a written certificate.",
        highlights: ["IGI-trained gemologists", "Written valuation certificate", "For insurance & resale", "Appointment required"],
        time: "30–60 Min", from: "₹ 1,499", href: "/book-appointment",
        img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80&fit=crop"
    },
    {
        icon: "✅", title: "Authentication", subtitle: "Certified Verification",
        desc: "Verify authenticity, metal purity and stone quality using XRF analysis and gemological testing. Trusted by insurance companies.",
        highlights: ["XRF metal purity testing", "Stone grading report", "Hallmark verification", "Trusted by insurers"],
        time: "1–2 Days", from: "₹ 999", href: "/book-appointment",
        img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80&fit=crop"
    },
    {
        icon: "🏺", title: "Restoration", subtitle: "Heirloom Revival",
        desc: "Deep restoration of antique and heirloom pieces — structural repair, stone sourcing, metal refinishing. Bring your family legacy back to life.",
        highlights: ["Antique & heirloom specialists", "Original design preserved", "Period-accurate techniques", "Fully documented"],
        time: "7–21 Days", from: "₹ 2,999", href: "/book-appointment",
        img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80&fit=crop"
    },
    {
        icon: "💫", title: "Custom Design", subtitle: "Create Your Dream Piece",
        desc: "Work one-on-one with our head designer to create a completely original piece. From concept sketch to finished jewellery — entirely yours.",
        highlights: ["Dedicated design consultation", "3D CAD rendering preview", "IGI-certified stones", "Delivery in 3–6 weeks"],
        time: "3–6 Weeks", from: "₹ 15,000", href: "/book-appointment",
        img: "https://images.unsplash.com/photo-1631982690223-8aa4cf79fad3?w=600&q=80&fit=crop"
    },
];

const PROCESS_STEPS = [
    { icon: "📅", title: "Book Appointment", desc: "Online or walk-in at any showroom. Most services available same week." },
    { icon: "🔍", title: "Free Assessment", desc: "Our expert examines your piece and provides a transparent quote — no hidden costs." },
    { icon: "✅", title: "Approve & Proceed", desc: "Work begins only after you approve the quote and timeline in writing." },
    { icon: "🎁", title: "Collect with Confidence", desc: "Returned with a quality guarantee and Sundaram presentation pouch." },
];

const TESTIMONIALS = [
    { name: "Priya M.", service: "Cleaning", text: "My engagement ring looks brand new — the diamond sparkles like the day he proposed. Couldn't believe the difference!", rating: 5 },
    { name: "Rahul S.", service: "Resizing", text: "Got my grandfather's gold ring resized perfectly. The finish is seamless — you can't tell it was ever touched.", rating: 5 },
    { name: "Anita D.", service: "Engraving", text: "Had our wedding date engraved inside both our rings. The cursive script is absolutely beautiful.", rating: 5 },
    { name: "Dr. Kapoor", service: "Repair", text: "A prong on my diamond ring had worn away. Sundaram fixed it in 2 days — the stone is now perfectly secure.", rating: 5 },
];

const FAQS = [
    { q: "Do I need an appointment for all services?", a: "Cleaning and minor repairs can be handled as walk-ins. Resizing, engraving, appraisal, restoration and custom design require a booking — online or by phone." },
    { q: "Do you service jewellery from other brands?", a: "Yes. We service jewellery regardless of where it was purchased — Indian or international brands, antique or modern pieces." },
    { q: "Is there a warranty on service work?", a: "All Sundaram Jewels service work comes with a 6-month workmanship guarantee. If the same issue recurs, we correct it at no charge." },
    { q: "Can I track my service progress?", a: "Yes. We send SMS updates at each stage — assessment, work in progress, and ready for collection." },
    { q: "How long do services take?", a: "Cleaning is same-day, engraving 1–2 days, resizing 2–5 days, repairs 1–7 days. Expert services have longer timelines discussed at consultation." },
];

// ── Service Card ──────────────────────────────────────
function SCard({ s }: { s: typeof JEWELLERY_CARE[0] }) {
    const [hov, setHov] = useState(false);
    return (
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            className={`rounded-3xl overflow-hidden border border-[rgba(184,146,42,0.2)] bg-[rgba(26,16,8,0.85)] flex flex-col h-full transition-all duration-300 ${hov ? "translate-y-[-6px] shadow-[0_20px_60px_rgba(0,0,0,0.14)]" : "translate-y-0 shadow-[0_2px_12px_rgba(0,0,0,0.05)]"}`}>
            {/* Image */}
            <div className="h-[190px] overflow-hidden relative flex-shrink-0">
                <img src={s.img} alt={s.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${hov ? "scale-105" : "scale-100"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,10,5,0.6)] to-transparent" />
                <div className="absolute top-3 right-3 bg-[rgba(15,10,5,0.85)] rounded-full px-3 py-[4px] border border-[rgba(184,146,42,0.3)]">
                    <span className="text-[0.57rem] text-[#b8922a] font-bold">From {s.from}</span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-[0.57rem] text-[rgba(255,254,240,0.8)]">⏱ {s.time}</span>
                </div>
            </div>
            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
                <p className="text-[0.54rem] tracking-[0.14em] uppercase text-[#b8922a] mb-1">{s.subtitle}</p>
                <h3 className=" text-[1.3rem] font-semibold text-[#fffef0] leading-[1.2] mb-2">{s.title}</h3>
                <p className="text-[0.7rem] text-[rgba(255,254,240,0.58)] leading-[1.78] mb-4 flex-1">{s.desc}</p>
                <div className="flex flex-col gap-[5px] mb-5">
                    {s.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#b8922a" strokeWidth="2" strokeLinecap="round">
                                <polyline points="2 6 5 9 10 3" />
                            </svg>
                            <span className="text-[0.65rem] text-[rgba(255,254,240,0.62)]">{h}</span>
                        </div>
                    ))}
                </div>
                <a href={s.href}
                    className={`flex items-center justify-center gap-2 rounded-full py-[10px] text-[0.63rem] font-bold tracking-[0.1em] uppercase no-underline border transition-all duration-200 ${hov ? "bg-[#8c2635] text-white border-[#8c2635] shadow-[0_4px_18px_rgba(140,38,53,0.3)]" : "bg-transparent text-[#8c2635] border-[#8c2635]"}`}>
                    {s.href.includes("appointment") ? "Book Consultation" : "Learn More"}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

// ── Main page ─────────────────────────────────────────
export default function ServicesPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<"care" | "expert">("care");

    return (
        <div className="min-h-screen bg-[#fffef0] font-['Montserrat',sans-serif] mt-16">
            <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .65s ease both;}
        .card-anim{animation:fadeUp .3s ease both;}
      `}</style>

            {/* ── HERO ── */}
            <section className="relative bg-[#0f0a05] overflow-hidden">
                {/* 4-panel collage */}
                <div className="absolute inset-0 grid grid-cols-4 opacity-[0.11]">
                    {["https://images.unsplash.com/photo-1584663639666-34b577d6494a?w=400&q=50&fit=crop",
                        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=50&fit=crop",
                        "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=50&fit=crop",
                        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=50&fit=crop",
                    ].map((src, i) => (
                        <img key={i} src={src} alt="" className="w-full h-full object-cover saturate-[0.3]" />
                    ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,10,5,0.88)] to-[rgba(15,10,5,0.72)]" />
                <svg className="absolute right-[-50px] top-[-50px] opacity-[0.06]" width="420" height="420" viewBox="0 0 420 420">
                    {[190, 150, 110, 70].map((r, i) => (
                        <circle key={i} cx="210" cy="210" r={r} fill="none" stroke="#b8922a"
                            strokeWidth={i === 0 ? 1 : 0.5} strokeDasharray={i % 2 !== 0 ? "5 5" : "none"} />
                    ))}
                </svg>

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] pt-[88px] pb-20 fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-[#b8922a] mb-4 font-bold">Est. 1892 · Sundaram Luxury Craft</p>
                            <h1 className="font-['Montserrat',sans-serif] font-semibold text-[#fffef0] leading-[1.1] mb-5"
                                style={{ fontSize: "clamp(2.6rem,5.5vw,4.8rem)" }}>
                                Jewellery Services<br /><em className="text-[#b8922a] italic">Done Right</em>
                            </h1>
                            <p className="text-[0.8rem] text-[rgba(255,254,240,0.58)] leading-[1.85] max-w-[460px] mb-9">
                                From professional cleaning to bespoke creation — 8 expert services, backed by master craftsmen, IGI-certified gemologists and a 6-month guarantee.
                            </p>
                            <div className="flex gap-3 flex-wrap">
                                <a href="/book-appointment" className="rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase no-underline bg-[#b8922a] text-white shadow-[0_6px_24px_rgba(184,146,42,0.35)] transition-transform hover:-translate-y-[2px]">
                                    Book a Service
                                </a>
                                <a href="#services" className="rounded-full px-8 py-[13px] text-[0.7rem] font-bold tracking-[0.12em] uppercase no-underline bg-transparent text-[#fffef0] border border-[rgba(255,254,240,0.25)] transition-transform hover:-translate-y-[2px]">
                                    Explore ↓
                                </a>
                            </div>
                        </div>
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {[["✨", "8", "Expert Services"], ["🏆", "132", "Years of Craft"],
                            ["🛡️", "6M", "Guarantee"], ["🆓", "Free", "Assessment"]].map(([icon, val, label]) => (
                                <div key={String(label)} className="rounded-2xl p-5 text-center border border-[rgba(184,146,42,0.2)] bg-[rgba(184,146,42,0.06)]">
                                    <div className="text-[1.4rem] mb-2">{icon}</div>
                                    <p className=" text-[1.9rem] font-bold text-[#b8922a] leading-none mb-1">{val}</p>
                                    <p className="text-[0.56rem] text-[rgba(255,254,240,0.45)] tracking-[0.1em] uppercase">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TRUST STRIP ── */}
            <div className="bg-[#1a1008] border-b border-[rgba(184,146,42,0.12)]">
                <div className="max-w-6xl mx-auto flex justify-center flex-wrap px-4">
                    {[["🆓", "Free Assessment"], ["🛡️", "6-Month Guarantee"], ["🚀", "Same-Day Available"],
                    ["🔬", "IGI Gemologists"], ["📸", "Before & After"], ["🌐", "Hindi & Gujarati"]].map(([icon, text]) => (
                        <div key={String(text)} className="flex items-center gap-2 px-5 py-4 border-r border-[rgba(184,146,42,0.1)]">
                            <span className="text-md">{icon}</span>
                            <span className="text-[0.7rem] font-semibold text-[rgba(255,254,240,0.62)] tracking-[0.04em] whitespace-nowrap">{String(text)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── HOW IT WORKS ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20">
                <div className="text-center mb-14">
                    <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">Every Service, Every Time</p>
                    <h2 className=" font-semibold text-[#1a1008]"
                        style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>How Our Service Works</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {PROCESS_STEPS.map((s, i) => (
                        <div key={i} className="rounded-2xl p-6 border border-[rgba(184,146,42,0.18)] bg-[rgba(184,146,42,0.06)] text-center h-full">
                            <div className="w-14 h-14 rounded-full bg-[#1a1008] border border-[rgba(184,146,42,0.3)] flex items-center justify-center mx-auto mb-4 text-[1.3rem]">
                                {s.icon}
                            </div>
                            <p className="text-[0.8rem] tracking-[0.16em] uppercase text-[#b8922a] mb-1">Step {i + 1}</p>
                            <h3 className="text-[0.96rem] font-bold text-[#1a1008] mb-2">{s.title}</h3>
                            <p className="text-[0.88rem] text-[#4a3f35] leading-[1.8]">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section id="services" className="bg-[#0f0a05] py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px]">
                    <div className="text-center mb-12">
                        <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">All Services</p>
                        <h2 className="font-semibold text-[#fffef0] mb-6"
                            style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>What We Offer</h2>
                        {/* Tab pills */}
                        <div className="inline-flex gap-[5px] bg-[rgba(255,254,240,0.05)] rounded-full p-[5px]">
                            {([
                                { key: "care" as const, label: "💎 Jewellery Care", count: 4 },
                                { key: "expert" as const, label: "🔬 Expert Services", count: 4 },
                            ]).map(({ key, label, count }) => (
                                <button key={key} onClick={() => setActiveTab(key)}
                                    className={`rounded-full px-5 py-[9px] text-[0.66rem] font-bold tracking-[0.05em] border-none cursor-pointer transition-all duration-200 ${activeTab === key ? "bg-[#fffef0] text-[#1a1008]" : "bg-transparent text-[rgba(255,254,240,0.45)]"}`}>
                                    {label}
                                    <span className={`ml-1 text-[0.54rem] rounded-full px-[7px] py-[1px] ${activeTab === key ? "bg-[rgba(184,146,42,0.06)] text-[#b8922a]" : "bg-[rgba(184,146,42,0.12)] text-[rgba(184,146,42,0.5)]"}`}>{count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
                        {(activeTab === "care" ? JEWELLERY_CARE : EXPERT_SERVICES).map((s, i) => (
                            <div key={i} className="card-anim flex flex-col h-full" style={{ animationDelay: `${i * 0.06}s` }}>
                                <SCard s={s}/>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <button onClick={() => setActiveTab(activeTab === "care" ? "expert" : "care")}
                            className="rounded-full px-7 py-[10px] bg-transparent border border-[rgba(184,146,42,0.28)] cursor-pointer text-[0.74rem] font-extrabold text-[rgba(255,254,240,0.55)] tracking-[0.07em] transition-all hover:border-[#b8922a] hover:text-[#b8922a]">
                            Switch to {activeTab === "care" ? "Expert Services →" : "Jewellery Care →"}
                        </button>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-20">
                <div className="text-center mb-11">
                    <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">What Clients Say</p>
                    <h2 className=" font-semibold text-[#1a1008]"
                        style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>Service Reviews</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {TESTIMONIALS.map((t, i) => (
                        <div key={i} className="rounded-2xl p-5 border border-[rgba(184,146,42,0.18)] bg-white flex flex-col gap-3">
                            <div className="flex gap-[2px]">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <svg key={j} width="11" height="11" viewBox="0 0 24 24" fill="#b8922a" stroke="#b8922a" strokeWidth="1">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-[0.54rem] font-bold uppercase tracking-[0.08em] text-[#b8922a] bg-[rgba(184,146,42,0.06)] border border-[rgba(184,146,42,0.18)] rounded-full px-[10px] py-[2px] w-fit">
                                {t.service}
                            </span>
                            <p className=" italic text-[0.98rem] text-[#1a1008] leading-[1.6] flex-1">"{t.text}"</p>
                            <p className="text-[0.64rem] font-semibold text-[#9a8878]">— {t.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="bg-[rgba(184,146,42,0.06)] border-t border-b border-[rgba(184,146,42,0.18)] py-[72px]">
                <div className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="text-center mb-11">
                        <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">Got Questions?</p>
                        <h2 className=" font-semibold text-[#1a1008]"
                            style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>Frequently Asked Questions</h2>
                    </div>
                    {FAQS.map((f, i) => (
                        <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="border-b border-[rgba(184,146,42,0.18)] py-5 cursor-pointer">
                            <div className="flex justify-between items-center gap-4">
                                <p className="text-[0.98rem] font-semibold text-[#1a1008]">{f.q}</p>
                                <span className="text-[#b8922a] text-[1.25rem] flex-shrink-0 transition-transform duration-[250ms]"
                                    style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                            </div>
                            {openFaq === i && <p className="text-[0.84rem] text-[#4a3f35] leading-[1.8] mt-3">{f.a}</p>}
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SHOWROOMS ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[60px] py-[72px]">
                <div className="text-center mb-10">
                    <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-2 font-bold">Visit Us</p>
                    <h2 className=" font-semibold text-[#1a1008]"
                        style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>Our Service Centres</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {[
                        { city: "Mumbai", addr: "Sundaram House, 14 Zaveri Bazaar", hours: "Mon–Sat 10am–8pm, Sun 11am–6pm", phone: "+91 22 4567 8900" },
                        { city: "Delhi", addr: "12, Connaught Place, New Delhi", hours: "Mon–Sat 10am–8pm, Sun 11am–6pm", phone: "+91 11 4567 8901" },
                        { city: "Surat", addr: "Ring Road, Athwagate, Surat", hours: "Mon–Sat 10am–8pm, Sun 11am–5pm", phone: "+91 261 456 7892" },
                    ].map(s => (
                        <div key={s.city} className="rounded-2xl p-6 border border-[rgba(184,146,42,0.18)] bg-white">
                            <h3 className=" text-[1.3rem] font-semibold text-[#1a1008] mb-4">{s.city}</h3>
                            {[["📍", s.addr], ["🕐", s.hours], ["📞", s.phone]].map(([icon, val]) => (
                                <div key={String(val)} className="flex gap-2 items-start mb-2">
                                    <span className="text-[0.8rem] flex-shrink-0 mt-[1px]">{icon}</span>
                                    <span className="text-[0.67rem] text-[#4a3f35] leading-[1.6]">{val}</span>
                                </div>
                            ))}
                            <a href="/book-appointment" className="block text-center mt-4 rounded-full py-[9px] text-[0.62rem] font-bold tracking-[0.1em] uppercase no-underline bg-transparent text-[#b8922a] border border-[#b8922a] transition-colors hover:bg-[#b8922a] hover:text-white">
                                Book at {s.city}
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── BOTTOM CTA ── */}
            <section className="py-[72px] bg-gradient-to-br from-[#0f0a05] to-[#2a1a0e]">
                <div className="max-w-[620px] mx-auto px-6 text-center">
                    <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#b8922a] mb-4 font-bold">Start Today</p>
                    <h2 className=" font-semibold text-[#fffef0] leading-[1.2] mb-4"
                        style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
                        Every Piece Deserves<br /><em className="text-[#b8922a] italic">Expert Care</em>
                    </h2>
                    <p className="text-[0.76rem] text-[rgba(255,254,240,0.52)] leading-[1.85] mb-9">
                        Walk into any Sundaram Jewels showroom for a free assessment, or book your service online. Our craftsmen are ready.
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <a href="/book-appointment" className="inline-block rounded-full px-9 py-[14px] text-[0.72rem] font-bold tracking-[0.12em] uppercase no-underline bg-[#b8922a] text-white shadow-[0_6px_28px_rgba(184,146,42,0.4)] transition-transform hover:-translate-y-[2px]">
                            Book a Service →
                        </a>
                        <a href="/contact" className="inline-block rounded-full px-9 py-[14px] text-[0.72rem] font-bold tracking-[0.12em] uppercase no-underline bg-transparent text-[#fffef0] border border-[rgba(255,254,240,0.25)] transition-transform hover:-translate-y-[2px]">
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}