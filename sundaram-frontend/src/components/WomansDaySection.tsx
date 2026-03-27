import { motion, type Variants } from "framer-motion";

// Brand palette
// --color-brand-red:   #8c2635
// --color-brand-gold:  #b8922a
// --color-brand-cream: #fffef0

const categories = [
    {
        id: "super-mom",
        label: "SUPER MOM",
        img: "./offer/mother.webp",
    },
    {
        id: "wifey-vibes",
        label: "WIFEY VIBES",
        img: "./offer/wife.webp",
    },
    {
        id: "bff-sparkle",
        label: "BFF SPARKLE",
        img: "./offer/friends.webp",
    },
    {
        id: "soul-sister",
        label: "SOUL SISTER",
        img: "./offer/sister.webp",
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 22 },
    },
};

const headingVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const bannerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay: 0.5 },
    },
};


export default function WomensDaySection() {
    return (
        <section className="w-full overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>

            {/* Top gradient — deep red → brand-red → gold → cream */}
            <div
                className="w-full px-6 pt-12 pb-16"
                style={{
                    background: "linear-gradient(160deg, #b19195ff 0%, #b89ea2ff 25%, #ecdeb5ff 65%, #fffef0 100%)",
                }}
            >
                {/* Heading */}
                <motion.div
                    className="text-center mb-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={headingVariants}
                >
                    <h2
                        className="text-[1.9rem] md:text-[2.4rem] font-bold tracking-wide"
                        style={{
                            color: "#fffef0",
                            textShadow: "0 1px 10px rgba(140,38,53,0.35)",
                            fontFamily: "'Cormorant Garamond', serif",
                            letterSpacing: "0.08em",
                        }}
                    >
                        THIS WOMEN'S DAY
                    </h2>
                    <p
                        className="text-[1.05rem] md:text-[1.2rem] font-light mt-1"
                        style={{
                            color: "#f5e9c8",
                            letterSpacing: "0.06em",
                        }}
                    >
                        Gift the Magic of Silver
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-20 max-w-5xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.22 } }}
                            className={`cursor-pointer flex flex-col items-center ${index % 2 !== 0 ? "mt-10" : ""}`}
                        >
                            {/* Polaroid card */}
                            <div
                                className="relative w-full"
                                style={{
                                    background: "#fffef1ff",
                                    borderRadius: "4px",
                                    padding: "8px 8px 0 8px",
                                    boxShadow: "0 4px 24px rgba(140,38,53,0.18), 0 1px 4px rgba(0,0,0,0.10)",
                                }}
                            >
                                {/* Pin — brand-gold */}
                                <div
                                    className="absolute left-1/2 -top-[10px] -translate-x-1/2 w-[14px] h-[14px] rounded-full z-10"
                                    style={{
                                        background: "#b8922a",
                                        boxShadow: "0 2px 6px rgba(184,146,42,0.45)",
                                    }}
                                />
                                {/* Image */}
                                <div
                                    className="w-full overflow-hidden"
                                    style={{
                                        aspectRatio: "3/4",
                                        borderRadius: "2px",
                                        background: "#f1ededff",
                                    }}
                                >
                                    <img
                                        src={cat.img}
                                        alt={cat.label}
                                        className="w-full h-full object-cover object-top"
                                        draggable={false}
                                    />
                                </div>
                                {/* Polaroid bottom strip */}
                                <div className="h-3" />
                            </div>

                            {/* Label — brand-gold */}
                            <p
                                className="mt-3 text-[0.78rem] md:text-[0.88rem] font-bold tracking-[0.12em] text-center text-black"
                            >
                                {cat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Offer Banner — cream base with gold/red accents */}
            <motion.div
                className="w-full relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 overflow-hidden"
                style={{
                    background: "linear-gradient(90deg, #f5e9c8 0%, #fffef0 50%, #fdf4e3 100%)",
                    minHeight: "140px",
                    borderTop: "2px solid #b8922a",
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={bannerVariants}
            >
                {/* Decorative Rings on Left (Large Screen) */}
                <div className="hidden md:flex relative flex-shrink-0" style={{ width: "220px", height: "140px" }}>
                    <motion.img
                        src="./offer/ring1.webp"
                        alt="Ring"
                        className="absolute bottom-2 left-0"
                        style={{ height: "110px", objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))" }}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                    <motion.img
                        src="./offer/ring2.webp"
                        alt="Ring Set"
                        className="absolute bottom-0 left-20 z-10"
                        style={{ height: "130px", objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))" }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                </div>

                {/* Offer content */}
                <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 py-6 md:py-0">
                    <div className="text-center md:text-left">
                        <p
                            className="text-[1.8rem] md:text-[2.6rem] font-black tracking-tight leading-none"
                            style={{
                                color: "#8c2635",
                                fontFamily: "'Cormorant Garamond', serif",
                            }}
                        >
                            EXTRA{" "}
                            <span style={{ color: "#b8922a", fontSize: "1.1em" }}>15% OFF</span>
                        </p>
                        <p className="text-[0.7rem] md:text-[0.8rem] uppercase tracking-[0.2em] font-medium mt-1" style={{ color: "#8b6a4a" }}>
                            Limited Time Celebration Offer
                        </p>
                    </div>

                    {/* Code pill */}
                    <motion.div
                        className="relative group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            navigator.clipboard.writeText("QUEEN");
                            alert("Code QUEEN copied to clipboard!");
                        }}
                    >
                        <div
                            className="text-[#8c2635] px-8 py-3 rounded-full border-2 text-[1rem] md:text-[1.1rem] font-bold tracking-[0.15em] relative z-10 overflow-hidden"
                            style={{
                                borderColor: "#b8922a",
                                background: "rgba(255,254,240,0.9)",
                            }}
                        >
                            CODE: QUEEN
                            <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-10 transition-opacity" />
                        </div>
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-brand-gold blur opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
                    </motion.div>
                </div>

                {/* Mobile Decorative element (Optional/Small) */}
                <div className="md:hidden flex gap-4 pb-4">
                    <img src="./offer/ring1.webp" alt="" className="h-16 opacity-60" />
                    <img src="./offer/ring2.webp" alt="" className="h-16 opacity-60" />
                </div>
            </motion.div>

        </section>
    );
}