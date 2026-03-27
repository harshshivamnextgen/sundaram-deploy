export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden h-[calc(100vh-68px)] mt-[68px]">
            {/* Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/video.mp4"
                autoPlay
                muted
                loop
                playsInline
            />

            {/* Dark gradient overlay — subtle, lets video breathe */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.62) 100%)",
                }}
            />

            {/* Top-left: tagline */}
            <div className="absolute top-10 left-10 z-10">
                <div
                    className="h-[1px] w-10 bg-[#b8922a]"
                // style={{ backgroundColor: "#b8922a" }}
                />
            </div>

            {/* Center content */}
            <div className="absolute bottom-12 left-1/2 translate-x-[-50%] flex flex-col items-center justify-center z-10 px-4 md:px-6 text-center w-full max-w-lg">
                {/* Main headline */}
                <h1
                    className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-5"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "#ffffff",
                        textShadow: "0 2px 24px rgba(0,0,0,0.35)",
                        letterSpacing: "0.01em",
                    }}
                >
                    With Love,
                    <span style={{ color: "#e8c97a" }}>Since 1837</span>
                </h1>

                {/* Sub-copy */}
                <p
                    className="font-['Montserrat',sans-serif] text-white max-w-md text-[0.88rem] leading-relaxed mb-0"
                    style={{
                        textShadow: "0 1px 8px rgba(0,0,0,0.4)",
                    }}
                >
                    A timeless icon inspired by a brooch from 1883, Lock by Tiffany
                    is an expression of love's enduring protection.
                </p>
                <button
                    className="mt-8 md:mt-10 font-['Montserrat',sans-serif] bg-[#8c2635] text-white group relative overflow-hidden rounded-full px-8 md:px-10 py-3 md:py-[13px] text-[0.7rem] md:text-[0.75rem] font-semibold uppercase tracking-[0.12em] border-none cursor-pointer transition-all duration-300 hover:-translate-y-[2px] hover:shadow-2xl active:translate-y-0"
                    style={{
                        boxShadow: "0 4px 24px rgba(140,38,53,0.45)",
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#a02d3e";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#8c2635";
                    }}
                >
                    {/* Shimmer effect */}
                    <span
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                        }}
                    />
                    Shop Now
                </button>
            </div>

            {/* Bottom-center: Shop Now button — 30px from bottom */}
            {/* <div
                className="absolute left-0 right-0 flex justify-center z-10"
                style={{ bottom: "30px" }}
            >
               
            </div> */}

            {/* Bottom-left: scroll hint */}
            <div
                className="absolute bottom-8 left-10 z-10 flex flex-col items-center gap-2"
            >
                <span
                    className="font-['Montserrat',sans-serif] text-white text-[0.6rem] uppercase tracking-[0.2em]"
                    style={{
                        color: "rgba(255,255,255,0.45)",
                        writingMode: "vertical-rl",
                    }}
                >
                    Scroll
                </span>
                <div
                    className="w-[1px] h-10"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
                    }}
                />
            </div>
        </section>
    );
}