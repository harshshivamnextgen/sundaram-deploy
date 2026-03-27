import { useState, useMemo, useCallback } from "react";
import { useProducts } from "../../products/hooks/useProducts";
import { useCategories } from "../../products/hooks/useCategories";
import { getImageUrl } from "../../../lib/api";
import type { Product } from "../../../Data/productsData";
import { useCurrency } from "../../../context/CurrencyContext";
import { useWishlist } from "../../../context/WishlistContext";

// ── Brand tokens ──────────────────────────────────────
const C = {
    cream: "#fffef0",
    gold: "#b8922a",
    goldL: "rgba(184,146,42,0.08)",
    burg: "#8c2635",
    burgL: "rgba(140,38,53,0.07)",
    dark: "#1a1008",
    brown: "#4a3f35",
    muted: "#9a8878",
    border: "rgba(184,146,42,0.18)",
};
const SF = "'Cormorant Garamond', serif";
const SS = "'Montserrat', sans-serif";

// ── Category meta (icon, description, hero image, route) ──
const CATEGORY_META: Record<string, {
    description: string;
    hero: string;
    route: string;
    accent: string;
}> = {
    rings: {
        description: "Solitaires, halos, eternity bands — rings that tell your story forever.",
        hero: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=85&fit=crop",
        route: "/collections/rings",
        accent: "#8c2635",
    },
    necklaces: {
        description: "Pendants, chains and layered necklaces in gold and diamond.",
        hero: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=85&fit=crop",
        route: "/collections/necklaces",
        accent: "#b8922a",
    },
    earrings: {
        description: "Studs, drops, hoops and chandelier earrings for every occasion.",
        hero: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=85&fit=crop",
        route: "/collections/earrings",
        accent: "#8c2635",
    },
    bracelets: {
        description: "Tennis bracelets, bangles and cuffs crafted in certified diamonds.",
        hero: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85&fit=crop",
        route: "/collections/bracelets",
        accent: "#b8922a",
    },
    mangalsutra: {
        description: "Sacred yet modern — diamond mangalsutras for the contemporary bride.",
        hero: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85&fit=crop",
        route: "/collections/mangalsutra",
        accent: "#8c2635",
    },
    bangles: {
        description: "Elegant bangles and kadas designed to grace your lovely wrists.",
        hero: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85&fit=crop",
        route: "/collections/bangles",
        accent: "#b8922a",
    },
    nosepines: {
        description: "Delicate nosepines that add a subtle sparkle to your everyday look.",
        hero: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85&fit=crop",
        route: "/collections/nosepines",
        accent: "#b8922a",
    },
    pendant: {
        description: "Elegant pendants that add a subtle sparkle to your everyday look.",
        hero: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85&fit=crop",
        route: "/collections/pendant",
        accent: "#b8922a",
    },
    victorian: {
        description: "Intricate filigree and old-world charm, inspired by the Victorian era.",
        hero: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=85&fit=crop",
        route: "/collections/style/victorian",
        accent: "#8c2635",
    },
    artdeco: {
        description: "Bold geometries and vintage glamor from the Roaring Twenties.",
        hero: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=85&fit=crop",
        route: "/collections/style/artdeco",
        accent: "#b8922a",
    },
    solitaire: {
        description: "A single, stunning piece that speaks volumes.",
        hero: "https://images.unsplash.com/photo-1601121141461-9d6647bef0a0?w=800&q=85&fit=crop",
        route: "/collections/style/solitaire",
        accent: "#8c2635",
    },
    nature: {
        description: "Organic forms and botanical motifs crafted in gold and diamond.",
        hero: "https://images.unsplash.com/photo-1631982690223-8aa4cf79fad3?w=800&q=85&fit=crop",
        route: "/collections/style/nature",
        accent: "#b8922a",
    },
    vintage: {
        description: "Heirloom-quality designs that transcend time.",
        hero: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=85&fit=crop",
        route: "/collections/style/vintage",
        accent: "#8c2635",
    },
    yellowgold: {
        description: "The timeless warmth and rich glow of classic yellow gold.",
        hero: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85&fit=crop",
        route: "/collections/metal/yellowgold",
        accent: "#b8922a",
    },
    whitegold: {
        description: "Sleek, modern, and brilliantly versatile white gold jewellery.",
        hero: "https://images.unsplash.com/photo-1631982690223-8aa4cf79fad3?w=800&q=85&fit=crop",
        route: "/collections/metal/whitegold",
        accent: "#8c2635",
    },
    rosegold: {
        description: "Romantic and blush-toned — the gentle allure of rose gold.",
        hero: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85&fit=crop",
        route: "/collections/metal/rosegold",
        accent: "#b8922a",
    },
    platinum: {
        description: "Pure, rare, and eternal — our premium platinum pieces.",
        hero: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85&fit=crop",
        route: "/collections/metal/platinum",
        accent: "#8c2635",
    },
    diamond: {
        description: "Our signature collection of breathtaking diamond jewelry.",
        hero: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=85&fit=crop",
        route: "/collections/metal/diamond",
        accent: "#b8922a",
    }
};

type CatKey = string;

// ── Icons ─────────────────────────────────────────────
const HeartIcon = ({ on }: { on: boolean }) => (
    <svg width="15" height="15" viewBox="0 0 24 24"
        fill={on ? C.burg : "none"} stroke={on ? C.burg : C.brown} strokeWidth="2" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);
const ArrowRight = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
);

// ── Product card ─────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
    const { formatPrice: fmt } = useCurrency();
    const [hov, setHov] = useState(false);
    const { isInWishlist, toggleWishlist } = useWishlist();
    const wish = isInWishlist(product.id.toString());
    const disc = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    return (
        <div
            className="group cursor-pointer"
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
        >
            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl mb-3"
                style={{ aspectRatio: "1/1", border: `1px solid ${C.border}` }}>
                <img
                    src={hov ? product.hoverImg : product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{ transform: hov ? "scale(1.05)" : "scale(1)" }}
                    onClick={() => window.location.href = `/products/${product.id}`}
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.badge && (
                        <span className="rounded-full px-2 py-[2px] text-[0.54rem] font-bold uppercase tracking-wider text-white"
                            style={{ backgroundColor: product.badge === "Sale" ? C.burg : C.gold, fontFamily: SS }}>
                            {product.badge}
                        </span>
                    )}
                </div>

                {/* Wishlist */}
                <button onClick={e => { e.preventDefault(); e.stopPropagation(); toggleWishlist({ id: product.id }); }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[rgba(255,254,240,0.92)] border-none cursor-pointer flex items-center justify-center transition-opacity duration-200 z-10"
                    style={{ opacity: hov || wish ? 1 : 0 }}>
                    <HeartIcon on={wish} />
                </button>

                {/* Hover CTA */}
                <div
                    className="absolute bottom-0 left-0 right-0 flex justify-center pb-3 transition-all duration-300"
                    style={{ opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(8px)" }}
                >
                    <button className="rounded-full px-4 py-[6px] text-[0.6rem] font-semibold uppercase tracking-widest border-none cursor-pointer"
                        style={{ fontFamily: SS, backgroundColor: C.cream, color: C.dark, boxShadow: "0 4px 14px rgba(0,0,0,0.14)" }}
                        onClick={() => window.location.href = `/products/${product.id}`}
                    >
                        Shop Now
                    </button>
                </div>
            </div>

            {/* Info */}
            <p className="text-[0.55rem] uppercase tracking-[0.14em] mb-[3px]"
                style={{ fontFamily: SS, color: C.gold }}>
                {product.type} · {product.carat} ct
            </p>
            <h3 className="text-[0.92rem] font-medium leading-snug mb-1"
                style={{ fontFamily: SF, color: C.dark }}>
                {product.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[0.78rem] font-bold" style={{ fontFamily: SS, color: C.dark }}>
                    {fmt(product.price)}
                </span>
                {product.originalPrice && (
                    <span className="text-[0.68rem] line-through" style={{ fontFamily: SS, color: C.muted }}>
                        {fmt(product.originalPrice)}
                    </span>
                )}
                {disc && (
                    <span className="text-[0.6rem] font-bold" style={{ fontFamily: SS, color: C.burg }}>
                        {disc}% off
                    </span>
                )}
            </div>
        </div>
    );
}

// ── Category hero banner ─────────────────────────────
function CategoryHero({ catKey, category, onExplore }: { catKey: CatKey; category?: any; onExplore: () => void }) {
    const metaFallback = {
        description: "Explore our stunning collection of heritage gems and contemporary designs.",
        hero: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85&fit=crop",
    };
    const meta = (CATEGORY_META as any)[catKey] || metaFallback;
    const catTitleFromObj = category?.name || catKey.charAt(0).toUpperCase() + catKey.slice(1).replace('-', ' ');

    const displayHero = category?.heroImage ? getImageUrl(category.heroImage) : meta.hero;
    const displayDesc = category?.description || meta.description;

    return (
        <div className="relative overflow-hidden rounded-3xl mb-8"
            style={{ height: "clamp(180px, 28vw, 320px)", border: `1px solid ${C.border}` }}>
            <img src={displayHero || metaFallback.hero} alt={catTitleFromObj}
                className="w-full h-full object-cover" />
            <div className="absolute inset-0"
                style={{ background: "linear-gradient(to right, rgba(26,16,8,0.72) 0%, rgba(26,16,8,0.15) 60%, transparent 100%)" }} />
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
                <span className="text-[0.6rem] uppercase tracking-[0.2em] mb-2"
                    style={{ fontFamily: SS, color: "rgba(255,254,240,0.7)" }}>
                    Sundaram Jewels
                </span>
                <h2 className="font-semibold mb-2 leading-tight"
                    style={{ fontFamily: SF, color: C.cream, fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)" }}>
                    {catTitleFromObj}
                </h2>
                <p className="text-[0.72rem] mb-5 max-w-xs"
                    style={{ fontFamily: SS, color: "rgba(255,254,240,0.75)" }}>
                    {displayDesc || metaFallback.description}
                </p>
                <button
                    onClick={onExplore}
                    className="flex items-center gap-2 rounded-full px-5 py-[9px] border-none cursor-pointer w-fit transition-all hover:-translate-y-[1px]"
                    style={{
                        fontFamily: SS, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em",
                        backgroundColor: C.cream, color: C.dark, boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
                    }}>
                    Shop Collection <ArrowRight />
                </button>
            </div>
        </div>
    );
}

// ── Category section ─────────────────────────────────
function CategorySection({
    catKey,
    dynamicProducts,
    catTitle,
    category,
}: {
    catKey: string;
    dynamicProducts: any[];
    catTitle: string;
    category?: any;
}) {
    const meta = (CATEGORY_META as any)[catKey] || {
        description: `Explore our stunning ${catTitle} collection.`,
        hero: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85&fit=crop",
        route: `/collections/${catKey}`,
        accent: "#b8922a",
    };

    // Show first 4 products as preview
    const preview = dynamicProducts.slice(0, 4);
    const total = dynamicProducts.length;

    return (
        <section className="mb-16">
            {/* Hero banner */}
            <CategoryHero catKey={catKey} category={category} onExplore={() => window.location.href = meta.route} />

            {/* Products grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                {preview.map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            {/* View all CTA */}
            <div className="flex items-center gap-4">
                <div className="flex-1 h-px" style={{ background: C.border }} />
                <a
                    href={meta.route}
                    className="flex items-center gap-2 rounded-full px-6 py-[10px] transition-all hover:-translate-y-[1px]"
                    style={{
                        fontFamily: SS, fontSize: "0.7rem", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase" as const,
                        border: `1.5px solid ${C.gold}`, color: C.gold,
                        backgroundColor: "transparent", textDecoration: "none",
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = C.gold;
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLElement).style.color = C.gold;
                    }}
                >
                    View All {total} {catTitle} <ArrowRight />
                </a>
                <div className="flex-1 h-px" style={{ background: C.border }} />
            </div>
        </section>
    );
}

// ── Main AllCollectionsPage ───────────────────────────
export default function AllCollectionsPage() {
    const [activeTab, setActiveTab] = useState<CatKey | "all">("all");
    const [search, setSearch] = useState("");

    const searchLower = search.toLowerCase();

    const { products: dbProducts } = useProducts();
    const { categories } = useCategories();

    //   const CATEGORY_ALIASES: Record<string, string[]> = {
    //     "rings": ["rings", "ring"],
    //     "necklaces": ["necklaces", "necklace", "pendant", "pendants"],
    //     "earrings": ["earrings", "earring"],
    //     "bracelets": ["bracelets", "bracelet"],
    //     "bangles": ["bangles", "bangle"],
    //     "mangalsutra": ["mangalsutra", "mangalsutras"],
    //     "nosepins": ["nosepins", "nosepin", "nose pin", "nose-pin"],
    //     "pendant": ["pendant", "pendants"],
    //     "chain": ["chain", "chains"],
    // };
    const remoteCatKeys = useMemo(() => categories ? categories.map((c: any) => c.name.toLowerCase().replace(/\s+/g, '-')) : [], [categories]
    );
    // Reverse map: any DB name → the canonical slug key
    const CATEGORY_SLUG_MAP: Record<string, string> = {
        "ring": "rings",
        "rings": "rings",
        "necklace": "necklaces",
        "necklaces": "necklaces",
        "pendant": "pendant",
        "pendants": "pendant",
        "earring": "earrings",
        "earrings": "earrings",
        "bracelet": "bracelets",
        "bracelets": "bracelets",
        "bangle": "bangles",
        "bangles": "bangles",
        "mangalsutra": "mangalsutra",
        "mangalsutras": "mangalsutra",
        "nosepin": "nosepins",
        "nosepins": "nosepins",
        "nose pin": "nosepins",
        "nose-pin": "nosepins",
        "chain": "chain",
        "chains": "chain",
        // Styles
        "victorian": "victorian",
        "art deco": "artdeco",
        "artdeco": "artdeco",
        "solitaire": "solitaire",
        "nature": "nature",
        "vintage": "vintage",
        // Metals
        "yellow gold": "yellowgold",
        "white gold": "whitegold",
        "rose gold": "rosegold",
        "platinum": "platinum",
        "diamond": "diamond",
    };

    const allKeys = remoteCatKeys;

    const parseDbProduct = useCallback((p: any) => ({
        id: p._id,
        name: p.name,
        price: Number(p.price || 0),
        originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
        badge: p.showInHomePage ? "New" : undefined,
        carat: p.carat || "0.5",
        shape: p.shape || "Round",
        occasion: p.occasion || "Everyday",
        type: p.type || p.category?.name || "Pendant",
        // type: p.category?.name || "Pendant",
        isNew: Boolean(p.isNew),
        isBestseller: Boolean(p.isBestseller),
        img: getImageUrl(p.img),
        hoverImg: getImageUrl(p.hoverImg || p.img),
        categoryId: p.category?._id,
        categoryName: p.category?.name,
    }), []);

    const totalProducts = useMemo(() => {
        let count = 0;
        if (dbProducts) count += dbProducts.length;
        return count;
    }, [dbProducts]);


    const searchResults = useMemo(() => {
        if (!searchLower) return [];

        const catsToSearch = activeTab === "all" ? allKeys : [activeTab as string];

        let results: Product[] = [];
        catsToSearch.forEach((catKey: string) => {
            const dbProds = dbProducts ? dbProducts.filter((p: any) => {
                const catName = p.category?.name?.toLowerCase().trim() || "";
                const styleName = p.style?.toLowerCase().trim() || "";
                const metalName = p.metal?.toLowerCase().trim() || "";

                const catSlug = CATEGORY_SLUG_MAP[catName] ?? catName;
                const styleSlug = CATEGORY_SLUG_MAP[styleName] ?? styleName;
                const metalSlug = CATEGORY_SLUG_MAP[metalName] ?? metalName;

                return catSlug === catKey || styleSlug === catKey || metalSlug === catKey;
            }) : [];
            const combined = [...dbProds.map(parseDbProduct)] as Product[];

            const match = combined.filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.type.toLowerCase().includes(searchLower) ||
                p.shape.toLowerCase().includes(searchLower)
            );
            results = [...results, ...match];
        });
        return results;
    }, [searchLower, activeTab, allKeys, dbProducts, parseDbProduct]);

    const visibleCats = useMemo(() => {
        return activeTab === "all" ? allKeys : [activeTab as string];
    }, [activeTab, allKeys]);


    return (
        <div className="min-h-screen" style={{ backgroundColor: C.cream }}>

            {/* ── Page header ── */}
            <div style={{ borderBottom: `1px solid ${C.border}` }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-6">
                    {/* Breadcrumb */}
                    <p className="text-[0.6rem] uppercase tracking-[0.18em] mb-3"
                        style={{ fontFamily: SS, color: C.muted }}>
                        Home / <span style={{ color: C.dark }}>Collections</span>
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <h1 className="font-semibold leading-tight mb-2"
                                style={{ fontFamily: SF, color: C.dark, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                                All Collections
                            </h1>
                            <p className="text-[0.72rem]" style={{ fontFamily: SS, color: C.muted }}>
                                {totalProducts} curated pieces across {allKeys.length} collections · IGI Certified Lab Diamonds
                            </p>
                        </div>

                        {/* Search */}
                        <div className="relative flex-shrink-0">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14"
                                viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search collections…"
                                className="rounded-full pl-9 pr-4 py-[9px] text-[0.72rem] outline-none w-full sm:w-56"
                                style={{
                                    fontFamily: SS, color: C.dark, backgroundColor: C.cream,
                                    border: `1px solid ${C.border}`,
                                }}
                            />
                        </div>
                    </div>

                    {/* ── Category tab pills ── */}
                    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                        {useMemo(() => {
                            const arr = [
                                { key: "all" as const, label: "All Collections", count: totalProducts },
                                ...allKeys.map(k => {
                                    const dbProdsCount = dbProducts ? dbProducts.filter((p: any) => {
                                        const catName = p.category?.name?.toLowerCase().trim() || "";
                                        const styleName = p.style?.toLowerCase().trim() || "";
                                        const metalName = p.metal?.toLowerCase().trim() || "";

                                        const catSlug = CATEGORY_SLUG_MAP[catName] ?? catName;
                                        const styleSlug = CATEGORY_SLUG_MAP[styleName] ?? styleName;
                                        const metalSlug = CATEGORY_SLUG_MAP[metalName] ?? metalName;

                                        return catSlug === k || styleSlug === k || metalSlug === k;
                                    }).length : 0;
                                    const catObj = categories?.find((c: any) => {
                                        const raw = c.name.toLowerCase().trim();
                                        const slug = CATEGORY_SLUG_MAP[raw] ?? raw.replace(/\s+/g, '-');
                                        return slug === k;
                                    });
                                    const catLabel = catObj?.name || k.charAt(0).toUpperCase() + k.slice(1).replace('-', ' ');
                                    return {
                                        key: k,
                                        label: catLabel,
                                        count: dbProdsCount,
                                    };
                                }).filter(cat => cat.count > 0),
                            ];
                            return arr.map(({ key, label, count }) => {
                                const isActive = activeTab === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(key as CatKey | "all")}
                                        className="flex items-center gap-2 rounded-full px-4 py-[8px] border-none cursor-pointer transition-all whitespace-nowrap flex-shrink-0"
                                        style={{
                                            fontFamily: SS, fontSize: "0.7rem", fontWeight: 600,
                                            backgroundColor: isActive ? C.dark : C.goldL,
                                            color: isActive ? C.cream : C.brown,
                                            boxShadow: isActive ? `0 4px 16px rgba(26,16,8,0.2)` : "none",
                                            letterSpacing: "0.04em",
                                        }}
                                    >
                                        <span>{label}</span>
                                        <span className="rounded-full px-[7px] py-[1px] text-[0.55rem] font-bold"
                                            style={{
                                                backgroundColor: isActive ? "rgba(255,254,240,0.18)" : "rgba(184,146,42,0.15)",
                                                color: isActive ? C.cream : C.gold,
                                            }}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            });
                        }, [activeTab, totalProducts, allKeys, dbProducts])}
                    </div>
                </div>
            </div>

            {/* ── Stats strip ── */}
            <div style={{ backgroundColor: C.goldL, borderBottom: `1px solid ${C.border}` }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex items-center gap-6 py-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                        {[
                            ["🏆", "IGI Certified Diamonds"],
                            ["🚚", "Free Pan-India Shipping"],
                            ["🔄", "30-Day Easy Returns"],
                            ["✨", "BIS Hallmarked Gold"],
                            ["💎", "Lab-Grown Diamonds"],
                        ].map(([icon, text]) => (
                            <div key={String(text)} className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-sm">{icon}</span>
                                <span className="text-[0.82rem] font-medium whitespace-nowrap"
                                    style={{ fontFamily: SS, color: C.brown }}>
                                    {text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main content ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

                {/* Display search results if there's a search term, else normal view */}
                {searchLower ? (
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-[0.65rem] uppercase tracking-[0.16em]"
                                style={{ fontFamily: SS, color: C.muted }}>
                                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
                            </p>
                        </div>
                        {searchResults.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                                {searchResults.map(p => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 mb-8 border border-dashed rounded-3xl" style={{ borderColor: C.border }}>
                                <p className="text-[1.2rem] mb-2" style={{ fontFamily: SF, color: C.dark }}>No collections or pieces found</p>
                                <p className="text-[0.8rem]" style={{ fontFamily: SS, color: C.muted }}>Try a different search term.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {visibleCats.map((k: string, i: number) => {
                            const dbProds = dbProducts ? dbProducts.filter((p: any) => {
                                const catName = p.category?.name?.toLowerCase().trim() || "";
                                const styleName = p.style?.toLowerCase().trim() || "";
                                const metalName = p.metal?.toLowerCase().trim() || "";

                                // Map the literal DB name to our canonical slug (for categories)
                                const catSlug = CATEGORY_SLUG_MAP[catName] ?? catName;
                                const styleSlug = CATEGORY_SLUG_MAP[styleName] ?? styleName;
                                const metalSlug = CATEGORY_SLUG_MAP[metalName] ?? metalName;

                                return catSlug === k || styleSlug === k || metalSlug === k;
                            }) : [];
                            const combined = dbProds.map((p: any) => ({
                                id: p._id,
                                name: p.name,
                                price: Number(p.price || 0),
                                originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
                                badge: p.badge || (p.showInHomePage ? "New" : undefined),
                                carat: p.carat || "0.5",
                                shape: p.shape || "Round",
                                occasion: p.occasion || "Everyday",
                                type: p.type || p.category?.name || "Pendant",
                                isNew: Boolean(p.isNew),
                                isBestseller: Boolean(p.isBestseller),
                                img: getImageUrl(p.img),
                                hoverImg: getImageUrl(p.hoverImg || p.img),
                            }));

                            const catObj = categories?.find((c: any) => {
                                const raw = c.name.toLowerCase().trim();
                                const slug = CATEGORY_SLUG_MAP[raw] ?? raw.replace(/\s+/g, '-');
                                return slug === k;
                            });

                            const catTitle = catObj?.name || k.charAt(0).toUpperCase() + k.slice(1).replace('-', ' ');

                            if (combined.length === 0) return null;

                            return (
                                <div key={k} className="cat-section" style={{ animationDelay: `${i * 0.06}s` }}>
                                    {activeTab === "all" ? (
                                        <CategorySection
                                            catKey={k}
                                            dynamicProducts={combined}
                                            catTitle={catTitle}
                                            category={catObj}
                                        />
                                    ) : (
                                        <div className="cat-section">
                                            <CategoryHero
                                                catKey={k as keyof typeof CATEGORY_META}
                                                category={catObj}
                                                onExplore={() => window.location.href = `/collections/${k}`}
                                            />
                                            <div className="mb-6">
                                                <div className="flex items-center justify-between mb-5 mt-6">
                                                    <p className="text-[0.65rem] uppercase tracking-[0.16em]" style={{ fontFamily: SS, color: C.muted }}>
                                                        {combined.length} products
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                                    {combined.map(p => (
                                                        <ProductCard key={p.id} product={p as any} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── Bottom banner ── */}
            <div className="mx-4 sm:mx-6 lg:mx-10 mb-12 rounded-3xl overflow-hidden relative"
                style={{ border: `1px solid ${C.border}` }}>
                <div className="w-full" style={{ background: `linear-gradient(135deg, ${C.dark} 0%, #3a2518 50%, #1a1008 100%)` }}>
                    <div className="max-w-7xl mx-auto px-8 md:px-16 py-14 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <p className="text-[0.62rem] uppercase tracking-[0.2em] mb-3"
                                style={{ fontFamily: SS, color: C.gold }}>
                                Exclusive Offer
                            </p>
                            <h2 className="font-semibold mb-3 leading-tight"
                                style={{ fontFamily: SF, color: C.cream, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}>
                                Book a Private Jewellery<br />Consultation
                            </h2>
                            <p className="text-[0.74rem] mb-6"
                                style={{ fontFamily: SS, color: "rgba(255,254,240,0.65)", maxWidth: "420px" }}>
                                Get personalised guidance from our expert gemologists. In-store or online — we'll help you find your perfect piece.
                            </p>
                            <button className="rounded-full px-7 py-[11px] border-none cursor-pointer font-bold tracking-wider transition-all hover:-translate-y-[1px]"
                                style={{
                                    fontFamily: SS, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" as const,
                                    backgroundColor: C.gold, color: "#fff",
                                    boxShadow: `0 4px 20px rgba(184,146,42,0.4)`,
                                }}>
                                Book Appointment →
                            </button>
                        </div>

                        {/* Decorative ring of gems */}
                        <div className="flex-shrink-0 grid grid-cols-2 gap-3">
                            {[
                                "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80&fit=crop",
                                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80&fit=crop",
                                "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&q=80&fit=crop",
                                "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80&fit=crop",
                            ].map((img, i) => (
                                <div key={i} className="overflow-hidden rounded-2xl"
                                    style={{ width: "80px", height: "80px", border: `1px solid rgba(184,146,42,0.3)` }}>
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}