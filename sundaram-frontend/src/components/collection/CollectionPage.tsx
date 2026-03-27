import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { type Product } from "../../Data/productsData";
import { useCurrency } from "../../context/CurrencyContext";
import { useWishlist } from "../../context/WishlistContext";
import { useProducts } from "../products/hooks/useProducts";
import { useCategories } from "../products/hooks/useCategories";
import { getImageUrl } from "../../lib/api";


// ── Types ──────────────────────────────────────────────
interface CollectionPageProps {
    category: "rings" | "necklaces" | "earrings" | "bracelets" | "mangalsutra" | "bangles" | "victorian" | "artdeco" | "solitaire" | "nature" | "vintage" | "yellowgold" | "whitegold" | "rosegold" | "platinum" | "diamond" | "nosepines" | "pendant";
}

const SORT_OPTIONS = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low–High", value: "price_asc" },
    { label: "Price: High–Low", value: "price_desc" },
    { label: "Newest First", value: "newest" },
    { label: "Bestsellers", value: "bestsellers" },
];
const C = {
    cream: "#fffef0",
    gold: "#b8922a",
    burg: "#8c2635",
    dark: "#1a1008",
    brown: "#4a3f35",
    muted: "#9a8878",
    border: "rgba(184,146,42,0.18)",
    goldBg: "rgba(184,146,42,0.06)",
    burgBg: "rgba(140,38,53,0.07)",
};

// ── Icons ─────────────────────────────────────────────
const FilterIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
    </svg>
);
const GridIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
);
const ListIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
);
const HeartIcon = ({ on }: { on: boolean }) => (
    <svg width="17" height="17" viewBox="0 0 24 24"
        fill={on ? C.burg : "none"} stroke={on ? C.burg : C.brown} strokeWidth="2" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);
const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
        <polyline points="6 9 12 15 18 9" />
    </svg>
);
const CheckMark = () => (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
        <polyline points="2 6 5 9 10 3" />
    </svg>
);

// ── Collapsible sidebar section ───────────────────────
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(true);
    return (
        <div style={{ borderBottom: "1px solid rgba(184,146,42,0.15)" }} className="py-4">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer p-0"
            >
                <span className="text-[0.8rem] font-semibold tracking-[0.04em]"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#1a1008" }}>
                    {title}
                </span>
                <ChevronIcon open={open} />
            </button>
            {open && <div className="mt-3">{children}</div>}
        </div>
    );
}

// ── Product card ──────────────────────────────────────
function ProductCard({ product, listView }: {
    product: Product; listView: boolean;
}) {
    const { formatPrice: fmt } = useCurrency();
    const [hovered, setHovered] = useState(false);
    const { isInWishlist, toggleWishlist } = useWishlist();
    const wish = isInWishlist(product.id.toString());
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    if (listView) {
        return (
            <div
                className="flex gap-3 sm:gap-5 rounded-2xl p-3 sm:p-4 group cursor-pointer transition-shadow duration-200 hover:shadow-md w-full"
                style={{ backgroundColor: "#fff", border: "1px solid rgba(184,146,42,0.15)" }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Link
                    to={`/products/${product.id}`}
                    className="relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden block"
                >
                    <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {product.badge && (
                        <span
                            className="absolute top-2 left-2 rounded-full px-2 py-[2px] text-[0.55rem] font-bold uppercase tracking-wider text-white"
                            style={{
                                backgroundColor:
                                    product.badge === "Sale" ? "#8c2635" : "#b8922a",
                            }}
                        >
                            {product.badge}
                        </span>
                    )}
                </Link>

                <div className="flex-1 flex flex-col justify-between py-1 relative">
                    <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
                        <div>
                            <p
                                className="text-[0.6rem] uppercase tracking-[0.15em] mb-1"
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    color: "#b8922a",
                                }}
                            >
                                {product.type} · {product.shape}
                            </p>

                            <h3
                                className="text-[1rem] font-semibold mb-2"
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    color: "#1a1008",
                                }}
                            >
                                {product.name}
                            </h3>
                        </div>
                    </Link>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span
                                className="text-[0.9rem] font-bold"
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    color: "#1a1008",
                                }}
                            >
                                {fmt(product.price)}
                            </span>

                            {product.originalPrice && (
                                <span
                                    className="text-[0.75rem] line-through"
                                    style={{
                                        color: "#aaa",
                                        fontFamily: "'Montserrat', sans-serif",
                                    }}
                                >
                                    {fmt(product.originalPrice)}
                                </span>
                            )}

                            {discount && (
                                <span
                                    className="text-[0.65rem] font-bold"
                                    style={{
                                        color: "#8c2635",
                                        fontFamily: "'Montserrat', sans-serif",
                                    }}
                                >
                                    {discount}% off
                                </span>
                            )}
                        </div>

                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist({ id: product.id }); }}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[rgba(255,254,240,0.92)] border-none cursor-pointer flex items-center justify-center transition-opacity duration-200 z-10"
                            style={{ opacity: hovered || wish ? 1 : 0 }}>
                            <HeartIcon on={wish} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="group relative cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            {/* Image */}
            <Link to={`/products/${product.id}`} className="block">
                <div className="overflow-hidden rounded-2xl mb-3" style={{ aspectRatio: "1/1" }}>
                    <img
                        src={hovered ? product.hoverImg : product.img}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-500"
                        style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.badge && (
                            <span className="rounded-full px-[10px] py-[3px] text-[0.58rem] font-bold uppercase tracking-wider text-white"
                                style={{ backgroundColor: product.badge === "Sale" ? "#8c2635" : "#b8922a" }}>
                                {product.badge}
                            </span>
                        )}
                        {/* {product.isBestseller && (
                            <span className="rounded-full px-[10px] py-[3px] text-[0.58rem] font-bold uppercase tracking-wider"
                                style={{ backgroundColor: "#fffef0", color: "#b8922a", border: "1px solid #b8922a" }}>
                                Bestseller
                            </span>
                        )} */}
                    </div>
                </div>
            </Link>
            {/* Wishlist */}
            <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist({ id: product.id }); }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[rgba(255,254,240,0.92)] border-none cursor-pointer flex items-center justify-center transition-opacity duration-200 z-10"
                style={{ opacity: hovered || wish ? 1 : 0 }}>
                <HeartIcon on={wish} />
            </button>
            {/* Choose Options */}
            <div className="absolute bottom-20 left-0 right-0 flex justify-center pb-3 transition-all duration-300 pointer-events-none"
                style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)", zIndex: 10 }}>
                <button className="rounded-full px-5 py-[8px] text-[0.65rem] font-semibold uppercase tracking-widest border-none cursor-pointer pointer-events-auto"
                    style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#fffef0", color: "#1a1008", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
                    onClick={() => window.location.href = `/products/${product.id}`}
                >
                    Shop Now
                </button>
            </div>
            {/* Info */}
            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.14em] mb-1"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: "#b8922a" }}>
                        {product.type} · {product.carat} ct
                    </p>
                    <h3 className="text-[1.05rem] font-medium mb-[6px] leading-snug"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1a1008" }}>
                        {product.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[0.82rem] font-bold"
                            style={{ fontFamily: "'Montserrat', sans-serif", color: "#1a1008" }}>
                            {fmt(product.price)}
                        </span>
                        {product.originalPrice && (
                            <>
                                <span className="text-[0.72rem] line-through"
                                    style={{ color: "#aaa", fontFamily: "'Montserrat', sans-serif" }}>
                                    {fmt(product.originalPrice)}
                                </span>
                                {discount && (
                                    <span className="text-[0.65rem] font-semibold"
                                        style={{ color: "#8c2635", fontFamily: "'Montserrat', sans-serif" }}>
                                        {discount}% off
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}

// ── Main reusable CollectionPage ──────────────────────
export default function CollectionPage({ category }: CollectionPageProps) {
    const fallbackData = {
        title: category.charAt(0).toUpperCase() + category.slice(1),
        breadcrumb: `Collections / ${category}`,
        priceMax: 1000000,
        products: [],
        filters: {
            carat: ["0.3", "0.5", "1.0", "1.5", "2.0", "3.0"],
            shape: ["Round", "Oval", "Pear", "Cushion", "Marquise", "Emerald", "Princess", "Heart"],
            occasion: ["Everyday", "Engagement", "Wedding", "Anniversary", "Festive", "Party"],
            type: ["Solitaire", "Halo", "Designer", "Eternity", "Three Stone", "Pendant", "Chain", "Bracelet"],
            typeLabel: "Jewellery Type",
            gender: ["Men", "Women", "Unisex"]
        }
    };
    const CATEGORY_ALIASES: Record<string, string[]> = {
        "rings": ["rings", "ring"],
        "necklaces": ["necklaces", "necklace", "pendant", "pendants"],
        "earrings": ["earrings", "earring"],
        "bracelets": ["bracelets", "bracelet"],
        "bangles": ["bangles", "bangle"],
        "mangalsutra": ["mangalsutra", "mangalsutras"],
        "nosepins": ["nosepins", "nosepin", "nose pin", "nose-pin"],
        "pendant": ["pendant", "pendants"],
        "chain": ["chain", "chains"],
        "yellowgold": ["yellowgold", "yellow gold"],
        "whitegold": ["whitegold", "white gold"],
        "rosegold": ["rosegold", "rose gold"],
        "platinum": ["platinum"],
        "diamond": ["diamond"],
        "solitaire": ["solitaire"],
        "victorian": ["victorian"],
        "artdeco": ["artdeco", "art deco"],
    };
    const { categories } = useCategories();

    const catObj = useMemo(() => {
        if (!categories) return null;
        const target = category.toLowerCase().trim();
        return categories.find((c: any) => {
            const name = c.name.toLowerCase().trim();
            const slug = name.replace(/\s+/g, '');
            return name === target || slug === target;
        });
    }, [categories, category]);

    const data = useMemo(() => {
        return {
            title: catObj?.name || fallbackData.title,
            breadcrumb: `Collections / ${catObj?.name || category}`,
            priceMax: fallbackData.priceMax,
            products: [],
            filters: fallbackData.filters
        };
    }, [catObj, category, fallbackData]);
    const { formatPrice: fmt } = useCurrency();

    const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]); // Large default
    const [selectedCarats, setCarats] = useState<string[]>([]);
    const [selectedShapes, setShapes] = useState<string[]>([]);
    const [selectedOccasions, setOcc] = useState<string[]>([]);
    const [selectedTypes, setTypes] = useState<string[]>([]);
    const [selectedGenders, setGenders] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("featured");
    const [gridView, setGridView] = useState(true);
    const [cols, setCols] = useState<2 | 3>(3);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { products: dbProducts, loading } = useProducts();

    const remoteCatProducts = useMemo(() => {
        if (!dbProducts) return [];
        const accepted = CATEGORY_ALIASES[category.toLowerCase()] ?? [category.toLowerCase()];

        return dbProducts
            .filter((p: any) => {
                const norm = (s: string) => (s || "").toLowerCase().trim().replace(/\s+/g, '');
                const catName = norm(p.category?.name);
                const styleName = norm(p.style);
                const metalName = norm(p.metal);
                return accepted.includes(catName) || accepted.includes(styleName) || accepted.includes(metalName);
            }).map((p: any) => ({
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
                gender: p.gender || "Women",
            }));
    }, [dbProducts, category]);

    // ── Dynamic Max Price ──────────────────────────────
    const calculatedMaxPrice = useMemo(() => {
        const dbMax = remoteCatProducts.length > 0
            ? Math.max(...remoteCatProducts.map(p => p.price))
            : 0;
        return Math.max(data.priceMax, dbMax);
    }, [remoteCatProducts, data.priceMax]);

    // ── Dynamic Filters ──────────────────────────────────
    const dynamicFilters = useMemo(() => {
        const filters = {
            carat: new Set<string>(data.filters.carat || []),
            shape: new Set<string>(data.filters.shape || []),
            occasion: new Set<string>(data.filters.occasion || []),
            type: new Set<string>(data.filters.type || []),
            gender: new Set<string>(data.filters.gender || ["Men", "Women", "Unisex"]),
        };
        remoteCatProducts.forEach(p => {
            if (p.carat) filters.carat.add(p.carat);
            if (p.shape) filters.shape.add(p.shape);
            if (p.occasion) filters.occasion.add(p.occasion);
            if (p.type) filters.type.add(p.type);
            if (p.gender) filters.gender.add(p.gender);
        });
        return {
            carat: Array.from(filters.carat).sort((a, b) => parseFloat(a) - parseFloat(b)),
            shape: Array.from(filters.shape).sort(),
            occasion: Array.from(filters.occasion).sort(),
            type: Array.from(filters.type).sort(),
            gender: Array.from(filters.gender).sort(),
            typeLabel: data.filters.typeLabel || "Jewellery Type"
        };
    }, [remoteCatProducts, data.filters]);


    // Find category for breadcrumbs and suggestions
    const categoryInfo = useMemo(() => {
        if (catObj) return { key: category, ...catObj };
        return null;
    }, [catObj, category]);


    const toggleFilter = (arr: string[], setArr: (v: string[]) => void, val: string) =>
        setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

    const clearAll = () => {
        setPriceRange([0, data.priceMax]);
        setCarats([]); setShapes([]); setOcc([]); setTypes([]); setGenders([]);
    };

    const hasFilters = selectedCarats.length || selectedShapes.length ||
        selectedOccasions.length || selectedTypes.length || selectedGenders.length ||
        priceRange[0] > 0 || priceRange[1] < data.priceMax;

    const filtered = useMemo(() => {
        let result = [...remoteCatProducts].filter((p) => {
            if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
            if (selectedCarats.length && !selectedCarats.includes(p.carat)) return false;
            if (selectedShapes.length && !selectedShapes.includes(p.shape)) return false;
            if (selectedOccasions.length && !selectedOccasions.includes(p.occasion)) return false;
            if (selectedTypes.length && !selectedTypes.includes(p.type)) return false;
            if (selectedGenders.length && !selectedGenders.includes(p.gender)) return false;
            return true;
        });
        if (sortBy === "price_asc") result = [...result].sort((a, b) => a.price - b.price);
        if (sortBy === "price_desc") result = [...result].sort((a, b) => b.price - a.price);
        if (sortBy === "newest") result = [...result].filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        if (sortBy === "bestsellers") result = [...result].filter((p) => p.isBestseller).concat(result.filter((p) => !p.isBestseller));
        return result;
    }, [data.products, remoteCatProducts, priceRange, selectedCarats, selectedShapes, selectedOccasions, selectedTypes, sortBy]);

    return (
        <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#fffef0" }}>

            {/* Page heading */}
            <div className="px-5 md:px-8 pt-[80px] md:pt-[100px] pb-4" style={{ borderBottom: "1px solid rgba(184,146,42,0.15)" }}>
                <div className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.18em] mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#b8922a" }}>
                    {/* Breadcrumb */}
                    <div className="flex gap-1">
                        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
                        {" / "}
                        <Link to="/collections" style={{ color: "inherit", textDecoration: "none" }}>Collections</Link>
                        {categoryInfo && (
                            <>
                                {" / "}
                                <Link to={`/collections/${categoryInfo.key}`} style={{ color: "inherit", textDecoration: "none" }}>
                                    {categoryInfo.key}
                                </Link>
                            </>
                        )}
                        {/* {" / "} */}
                        {/* <span>{category}</span> */}
                    </div>

                </div>
                <h1 className="text-[1.5rem] md:text-[2rem] font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1a1008" }}>
                    {data.title}
                </h1>
            </div>

            {/* Toolbar */}
            <div
                className="sticky top-[68px] z-30 flex flex-wrap items-center justify-between px-5 md:px-8 py-3 gap-y-3"
                style={{ backgroundColor: "#fffef0", borderBottom: "1px solid rgba(184,146,42,0.15)", backdropFilter: "blur(8px)" }}
            >
                <div className="flex items-center gap-3 md:gap-4 order-1">
                    <button
                        onClick={() => setSidebarOpen((o) => !o)}
                        className="flex items-center gap-2 rounded-full px-3 md:px-4 py-[6px] md:py-[7px] border-none cursor-pointer transition-all duration-200"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            backgroundColor: sidebarOpen ? "#1a1008" : "transparent",
                            color: sidebarOpen ? "#fff" : "#1a1008",
                            border: sidebarOpen ? "none" : "1px solid rgba(184,146,42,0.4)",
                        }}
                    >
                        <FilterIcon />
                        <span className="hidden sm:inline">{sidebarOpen ? "Hide Filters" : "Filter"}</span>
                        <span className="sm:hidden">Filters</span>
                    </button>
                    <span className="text-[0.68rem] md:text-[0.72rem]" style={{ fontFamily: "'Montserrat', sans-serif", color: "#6b5c4e" }}>
                        {filtered.length} <span className="hidden sm:inline">products</span>
                    </span>
                    {hasFilters && (
                        <button onClick={clearAll} className="text-[0.68rem] underline border-none bg-transparent cursor-pointer"
                            style={{ fontFamily: "'Montserrat', sans-serif", color: "#8c2635" }}>
                            Clear all
                        </button>
                    )}
                </div>

                {/* Right: Compare · Sort · View */}
                <div className="flex items-center gap-3 md:gap-4 order-2 ms-auto sm:ms-0">
                    <div className="flex items-center gap-2">
                        <span className="text-[0.68rem] md:text-[0.72rem] hidden sm:inline" style={{ fontFamily: "'Montserrat', sans-serif", color: "#4a3f35" }}>Sort by:</span>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                            className="text-[0.68rem] md:text-[0.72rem] rounded-lg px-3 py-[5px] cursor-pointer outline-none"
                            style={{ fontFamily: "'Montserrat', sans-serif", color: "#1a1008", backgroundColor: "#fffef0", border: "1px solid rgba(184,146,42,0.35)" }}>
                            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center gap-1">
                        <span className="text-[0.68rem] md:text-[0.72rem] hidden lg:inline" style={{ fontFamily: "'Montserrat', sans-serif", color: "#4a3f35" }}>View:</span>
                        {[
                            { g: true, c: 3 as const, icon: <GridIcon /> },
                            { g: false, c: 3 as const, icon: <ListIcon /> },
                        ].map(({ g, c, icon }, i) => (
                            <button key={i}
                                onClick={() => { setGridView(g); if (g) setCols(c); }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border-none cursor-pointer transition-colors"
                                style={{
                                    backgroundColor: gridView === g && (!g || cols === c) ? "#1a1008" : "transparent",
                                    color: gridView === g && (!g || cols === c) ? "#fff" : "#4a3f35",
                                }}>
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col lg:flex-row">
                {/* Sidebar */}
                {sidebarOpen && (
                    <aside className="flex-shrink-0 px-6 py-6 overflow-y-auto lg:sticky lg:top-[120px] w-full lg:w-[280px] border-r border-b lg:border-b-0 border-[rgba(184,146,42,0.15)] lg:max-h-[calc(100vh-140px)] overflow-hidden"
                        style={{
                            maxHeight: "none",
                        }}>
                        <div className="lg:w-[232px]">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold"
                                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#b8922a" }}>Filters</h2>
                                {hasFilters && (
                                    <button onClick={clearAll} className="text-[0.65rem] underline border-none bg-transparent cursor-pointer"
                                        style={{ fontFamily: "'Montserrat', sans-serif", color: "#8c2635" }}>Clear all</button>
                                )}
                            </div>

                            {/* Price range */}
                            <FilterSection title="Price">
                                <p className="text-[0.7rem] mb-3" style={{ fontFamily: "'Montserrat', sans-serif", color: "#6b5c4e" }}>
                                    The highest price is {fmt(calculatedMaxPrice)}
                                </p>
                                <input type="range" min={0} max={calculatedMaxPrice} step={500} value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    className="w-full mb-3 cursor-pointer" style={{ accentColor: "#8c2635" }} />
                                <div className="flex items-center gap-2">
                                    {[0, 1].map((idx) => (
                                        <div key={idx} className="flex items-center gap-1 flex-1 rounded-lg px-3 py-2"
                                            style={{ border: "1px solid rgba(184,146,42,0.3)" }}>
                                            <span className="text-[0.7rem]" style={{ color: "#b8922a", fontFamily: "'Montserrat', sans-serif" }}>₹</span>
                                            <input type="number" value={idx === 1 && priceRange[1] === 2000000 ? calculatedMaxPrice : priceRange[idx]}
                                                onChange={(e) => setPriceRange(idx === 0 ? [Number(e.target.value), priceRange[1]] : [priceRange[0], Number(e.target.value)])}
                                                className="flex-1 bg-transparent border-none outline-none text-[0.72rem] w-0"
                                                style={{ fontFamily: "'Montserrat', sans-serif", color: "#1a1008" }} />
                                        </div>
                                    ))}
                                </div>
                            </FilterSection>

                            {/* Carat */}
                            <FilterSection title="Carat Weight">
                                <div className="flex flex-wrap gap-2">
                                    {dynamicFilters.carat.map((c) => (
                                        <button key={c} onClick={() => toggleFilter(selectedCarats, setCarats, c)}
                                            className="rounded-full px-3 py-[5px] text-[0.68rem] font-medium border-none cursor-pointer transition-all duration-150"
                                            style={{
                                                fontFamily: "'Montserrat', sans-serif",
                                                backgroundColor: selectedCarats.includes(c) ? "#8c2635" : "rgba(184,146,42,0.08)",
                                                color: selectedCarats.includes(c) ? "#fff" : "#4a3f35",
                                            }}>
                                            {c} {category.includes('gold') ? 'K' : 'ct'}
                                        </button>
                                    ))}
                                </div>
                            </FilterSection>

                            {/* Shape */}
                            <FilterSection title="Stone Shape">
                                <div className="flex flex-col gap-2">
                                    {dynamicFilters.shape.map((s) => (
                                        <label key={s} className="flex items-center gap-3 cursor-pointer">
                                            <div onClick={() => toggleFilter(selectedShapes, setShapes, s)}
                                                className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                                                style={{ border: selectedShapes.includes(s) ? "none" : "1.5px solid rgba(184,146,42,0.4)", backgroundColor: selectedShapes.includes(s) ? "#8c2635" : "transparent" }}>
                                                {selectedShapes.includes(s) && <CheckMark />}
                                            </div>
                                            <span className="text-[0.75rem]" style={{ fontFamily: "'Montserrat', sans-serif", color: "#1a1008" }}>{s}</span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            {/* Occasion */}
                            <FilterSection title="Occasion">
                                <div className="flex flex-wrap gap-2">
                                    {dynamicFilters.occasion.map((o) => (
                                        <button key={o} onClick={() => toggleFilter(selectedOccasions, setOcc, o)}
                                            className="rounded-full px-3 py-[5px] text-[0.68rem] font-medium border-none cursor-pointer transition-all duration-150"
                                            style={{
                                                fontFamily: "'Montserrat', sans-serif",
                                                backgroundColor: selectedOccasions.includes(o) ? "#8c2635" : "rgba(184,146,42,0.08)",
                                                color: selectedOccasions.includes(o) ? "#fff" : "#4a3f35",
                                            }}>
                                            {o}
                                        </button>
                                    ))}
                                </div>
                            </FilterSection>

                            {/* Type — label changes per category */}
                            <FilterSection title={dynamicFilters.typeLabel}>
                                <div className="flex flex-col gap-2">
                                    {dynamicFilters.type.map((t) => (
                                        <label key={t} className="flex items-center gap-3 cursor-pointer">
                                            <div onClick={() => toggleFilter(selectedTypes, setTypes, t)}
                                                className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                                                style={{ border: selectedTypes.includes(t) ? "none" : "1.5px solid rgba(184,146,42,0.4)", backgroundColor: selectedTypes.includes(t) ? "#8c2635" : "transparent" }}>
                                                {selectedTypes.includes(t) && <CheckMark />}
                                            </div>
                                            <span className="text-[0.75rem]" style={{ fontFamily: "'Montserrat', sans-serif", color: "#1a1008" }}>{t}</span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            {/* Gender */}
                            {dynamicFilters.gender && dynamicFilters.gender.length > 0 && (
                                <FilterSection title="Gender">
                                    <div className="flex flex-wrap gap-2">
                                        {dynamicFilters.gender.map((g: string) => (
                                            <button key={g} onClick={() => toggleFilter(selectedGenders, setGenders, g)}
                                                className="rounded-full px-3 py-[5px] text-[0.68rem] font-medium border-none cursor-pointer transition-all duration-150"
                                                style={{
                                                    fontFamily: "'Montserrat', sans-serif",
                                                    backgroundColor: selectedGenders.includes(g) ? "#8c2635" : "rgba(184,146,42,0.08)",
                                                    color: selectedGenders.includes(g) ? "#fff" : "#4a3f35",
                                                }}>
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </FilterSection>
                            )}
                        </div>
                    </aside>
                )}

                {/* Grid */}
                <main className="flex-1 px-6 py-6">
                    {loading ? (
                        <div className="flex justify-center items-center py-24">
                            <div className="w-8 h-8 border-4 border-t-transparent border-[#8c2635] border-solid rounded-full animate-spin"></div>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-3">
                            <p className="text-[1.2rem]" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1a1008" }}>No products found</p>
                            <p className="text-[0.75rem]" style={{ fontFamily: "'Montserrat', sans-serif", color: "#6b5c4e" }}>Try adjusting your filters</p>
                            <button onClick={clearAll} className="mt-2 rounded-full px-6 py-[9px] text-[0.72rem] font-semibold uppercase tracking-wider border-none cursor-pointer"
                                style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#8c2635", color: "#fff" }}>
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className={gridView ? `grid gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 grid-cols-1 sm:grid-cols-2 ${cols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}` : "grid grid-cols-1 lg:grid-cols-2 gap-4"}>
                            {filtered.map((p) => (
                                <ProductCard key={p.id} product={p as any} listView={!gridView} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
