import { useState, useRef } from "react";

const reels = [
    {
        id: 0,
        // title: "EVERY HOUR IS\nDIAMOND HOUR",
        label: "From business hours to blis...",
        bg: "linear-gradient(160deg, #0e1a5e 0%, #1a2fa0 50%, #0a1240 100%)",
        // accent: "#d4a843",
        products: [
            { name: "Chandelier Diamond Drop Earrings", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=80&q=80" },
            { name: "Arras Diamond Ring", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=80&q=80" },
        ],
        video: "./Video_carousel_1.mp4",
    },
    {
        id: 1,
        // title: "COCKTAIL\nHOUR GLAM",
        label: "Evening sparkle, all day...",
        bg: "linear-gradient(160deg, #0d3d3d 0%, #0e5c5c 50%, #082a2a 100%)",
        // accent: "#e8c97a",
        products: [
            { name: "Gold Bangle Set", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=80&q=80" },
            { name: "Diamond Pendant", img: "https://images.unsplash.com/photo-1724937721228-f7bf3df2a4d8?w=80&q=80" },
        ],
        video: "./Video_carousel_2.mp4",
    },
    {
        id: 2,
        // title: "TIMELESS\nELEGANCE",
        label: "Heritage craftsmanship...",
        bg: "linear-gradient(160deg, #306cecff 0%, #0f6edbff 50%, #2782ccff 100%)",
        // accent: "#d4a843",
        products: [
            { name: "Victorian Necklace", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=80&q=80" },
            { name: "Antique Ring", img: "https://images.unsplash.com/photo-1708221269429-9d4e0f320e60?w=80&q=80" },
        ],
        video: "./Video_carousel_3.mp4",

    },
    {
        id: 3,
        // title: "BRIDAL\nCOLLECTION",
        label: "Made for your forever...",
        bg: "linear-gradient(160deg, #138f84ff 0%, #0faabeff 50%, #15828aff 100%)",
        // accent: "#66b9bd",
        products: [
            { name: "Bridal Mangalsutra", img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=80&q=80" },
            { name: "Gold Earring Set", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=80&q=80" },
        ],
        video: "./Video_carousel_4.mp4",
    },
    {
        id: 4,
        // title: "EVERYDAY\nLUXURY",
        label: "Effortless sparkle...",
        bg: "linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        // accent: "#d4a843",
        products: [
            { name: "Diamond Stud Earrings", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=80&q=80" },
            { name: "Solitaire Ring", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=80&q=80" },
        ],
        video: "./Video_carousel_5.mp4",
    },
];

// Icons

const MuteIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
    </svg>
);
const ShareIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
);
const FullscreenIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
    </svg>
);
const VolumeIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
);
const ArrowIcon = ({ dir }: { dir: "left" | "right" }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        {dir === "left"
            ? <><polyline points="15 18 9 12 15 6" /></>
            : <><polyline points="9 18 15 12 9 6" /></>}
    </svg>
);
const PlayIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
        <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
);
const PauseIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
        <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
    </svg>
);
const ChevronRight = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

// Position config for visible cards
function getCardStyle(offset: number) {
    // offset: -2, -1, 0, 1, 2
    const abs = Math.abs(offset);
    const sign = offset < 0 ? -1 : 1;

    // Scale everything relative to screen width on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;

    if (abs === 0) {
        return {
            zIndex: 10,
            transform: "translateX(0px) rotate(0deg) scale(1)",
            opacity: 1,
            filter: "brightness(1)",
        };
    }
    if (abs === 1) {
        let translateX = sign * 155; // Desktop
        if (isMobile) translateX = sign * 60;
        else if (isTablet) translateX = sign * 100;

        return {
            zIndex: 7,
            transform: `translateX(${translateX}px) rotate(${sign * 6}deg) scale(0.88)`,
            opacity: 0.9,
            filter: "brightness(0.75)",
        };
    }
    // abs === 2
    let translateX = sign * 255; // Desktop
    if (isMobile) translateX = sign * 110;
    else if (isTablet) translateX = sign * 180;

    return {
        zIndex: 4,
        transform: `translateX(${translateX}px) rotate(${sign * 11}deg) scale(0.76)`,
        opacity: 0.7,
        filter: "brightness(0.5)",
    };
}

export default function VideoCarousel() {
    const [current, setCurrent] = useState(3);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const total = reels.length;

    const prev = () => {
        setCurrent((c) => (c - 1 + total) % total);
        setIsPlaying(true);
    };
    const next = () => {
        setCurrent((c) => (c + 1) % total);
        setIsPlaying(true);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleShare = async () => {
        try {
            await navigator.share({
                title: 'Sundaram Jewellery',
                text: 'Check out this beautiful jewellery piece!',
                url: window.location.href,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleFullscreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if ((videoRef.current as any).webkitRequestFullscreen) {
                (videoRef.current as any).webkitRequestFullscreen();
            } else if ((videoRef.current as any).msRequestFullscreen) {
                (videoRef.current as any).msRequestFullscreen();
            }
        }
    };

    // Which indices to show: current ±2
    const visibleOffsets = [-2, -1, 0, 1, 2];
    const visibleCards = visibleOffsets.map((offset) => ({
        offset,
        index: (current + offset + total) % total,
    }));




    return (
        <section
            className="w-full py-16 overflow-hidden bg-white"
        // style={{ backgroundColor: "#fffef0" }}
        >
            {/* Heading */}
            <div className="text-center mb-12 px-4">
                <h2
                    className="font-['Cormorant Garamond',serif] text-[#1a1008] text-[2.2rem] font-semibold mb-2"
                >
                    Styling 101 With Diamonds
                </h2>
                <p
                    className="font-['Montserrat',sans-serif] text-[#6b5c4e] text-[0.85rem]"
                >
                    Trendsetting diamond jewellery suited for every occasion
                </p>
            </div>

            {/* Carousel stage */}
            <div className="relative flex items-center justify-center h-[500px] md:h-[600px] lg:h-[700px]">
                {/* Prev arrow */}
                <button
                    onClick={prev}
                    className="absolute left-2 md:left-12 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-all duration-200 hover:bg-white hover:shadow-lg"
                    style={{ borderColor: "rgba(184,146,42,0.4)", backgroundColor: "rgba(255,254,240,0.9)", color: "#4a3f35" }}
                >
                    <ArrowIcon dir="left" />
                </button>

                {/* Cards Container */}
                <div className="relative flex items-center justify-center w-[280px] h-[480px] md:w-[350px] md:h-[620px] lg:w-[402px] lg:h-[714px]">
                    {visibleCards.map(({ offset, index }) => {
                        const card = reels[index];
                        const style = getCardStyle(offset);
                        const isCenter = offset === 0;

                        return (
                            <div
                                key={`${index}-${offset}`}
                                className="absolute rounded-2xl md:rounded-3xl overflow-hidden w-[280px] h-[480px] md:w-[350px] md:h-[620px] lg:w-[402px] lg:h-[714px]"
                                style={{
                                    background: card.bg,
                                    zIndex: style.zIndex,
                                    transform: style.transform,
                                    opacity: style.opacity,
                                    filter: style.filter,
                                    transition: "all 0.5s cubic-bezier(0.77,0,0.18,1)",
                                    cursor: isCenter ? "pointer" : "pointer",
                                    transformOrigin: "bottom center",
                                }}
                                onClick={() => {
                                    if (isCenter) {
                                        togglePlay();
                                    } else {
                                        offset < 0 ? prev() : next();
                                    }
                                }}
                            >
                                {/* Top bar */}
                                {isCenter && (
                                    <div className="flex items-center justify-between px-3 pt-3 pb-2">
                                        <span
                                            className="text-[0.8rem] text-white flex-1 mx-2 truncate z-10"
                                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                                        >
                                            {card.label}
                                        </span>
                                        <div className="flex items-center gap-2 z-10">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                                                className="p-1 opacity-80 hover:opacity-100"
                                            >
                                                {isMuted ? <MuteIcon /> : <VolumeIcon />}
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleShare(); }}
                                                className="p-1 opacity-80 hover:opacity-100"
                                            >
                                                <ShareIcon />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleFullscreen(); }}
                                                className="p-1 opacity-80 hover:opacity-100"
                                            >
                                                <FullscreenIcon />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Center jewelry Video */}
                                <div className="absolute inset-x-0 flex items-center justify-center" style={{ top: "0%", bottom: "0%" }}>
                                    <video
                                        ref={isCenter ? videoRef : null}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        src={card.video}
                                        {...isCenter && { autoPlay: true }}
                                        muted={isCenter ? isMuted : true}
                                        loop
                                        playsInline
                                    />
                                    {isCenter && !isPlaying && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity pointer-events-none">
                                            <PlayIcon />
                                        </div>
                                    )}
                                    {isCenter && isPlaying && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/10 transition-opacity pointer-events-none">
                                            <PauseIcon />
                                        </div>
                                    )}
                                </div>

                                {/* Bottom: product chips + progress */}
                                {isCenter && (
                                    <div className="absolute bottom-0 left-0 right-0 px-3 pb-4">
                                        {/* Product chips */}
                                        <div className="flex gap-2 mb-3">
                                            {card.products.map((p, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2 rounded-xl bg-[#b8922a] px-2 py-2 flex-1 cursor-pointer hover:brightness-110 transition-all"
                                                    style={{ backdropFilter: "blur(8px)" }}
                                                >
                                                    <img
                                                        src={p.img}
                                                        alt={p.name}
                                                        className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                                                    />
                                                    <span
                                                        className="font-['Montserrat',sans-serif] text-white text-[0.58rem] leading-tight flex-1"
                                                    >
                                                        {p.name}
                                                    </span>
                                                    <ChevronRight />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Progress dots */}
                                        <div className="flex justify-center gap-[5px]">
                                            {reels.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setCurrent(i)}
                                                    className="border-none cursor-pointer p-0 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: i === current ? "20px" : "6px",
                                                        height: "4px",
                                                        backgroundColor:
                                                            i === current ? "#fff" : "rgba(255,255,255,0.4)",
                                                        outline: "none",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Next arrow */}
                <button
                    onClick={next}
                    className="absolute right-6 md:right-12 z-20 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 hover:bg-white hover:shadow-lg"
                    style={{ borderColor: "rgba(184,146,42,0.4)", backgroundColor: "rgba(255,254,240,0.9)", color: "#4a3f35" }}
                >
                    <ArrowIcon dir="right" />
                </button>
            </div>
        </section>
    );
}