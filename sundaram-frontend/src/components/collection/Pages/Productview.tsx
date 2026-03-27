import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { type Product } from "../../../Data/productsData";
import { useCurrency } from "../../../context/CurrencyContext";
import { useWishlist } from "../../../context/WishlistContext";
import { useProduct } from "../../products/hooks/useProduct";
import { useProducts } from "../../products/hooks/useProducts";
import { getImageUrl } from "../../../lib/api";
/* ─── Tokens (kept minimal — only for dynamic inline styles) ── */
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
const SF = "'Cormorant Garamond', serif";
const SS = "'Montserrat', sans-serif";

const OCCASION_ITEMS = [
  { name: "Ivory Velvet Ring Box", price: 499, img: "https://images.unsplash.com/photo-1607083681678-52733140a6b3?w=200&q=80&fit=crop" },
  { name: "Heritage Gift Wrap", price: 499, img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200&q=80&fit=crop" },
  { name: "Luxury Floral Gift Card", price: 499, img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=200&q=80&fit=crop" },
];

const REVIEWS_DATA = [
  { name: "Meera S.", rating: 5, date: "2 days ago", verified: true, img: "https://i.pravatar.cc/40?img=47", text: "Absolutely stunning. The diamond catches light beautifully from every angle. Packaging was exquisite!" },
  { name: "Gaurav P.", rating: 4, date: "1 week ago", verified: true, img: "https://i.pravatar.cc/40?img=52", text: "Great quality, exactly as shown. Fits perfectly on size 7. Very happy with the purchase." },
  { name: "Dr. Priya N.", rating: 5, date: "2 weeks ago", verified: true, img: "https://i.pravatar.cc/40?img=33", text: "Bought as a gift and she loved it. Heritage Jewels has truly exceptional craftsmanship." },
  { name: "Ananya R.", rating: 5, date: "3 weeks ago", verified: true, img: "https://i.pravatar.cc/40?img=21", text: "My husband gifted this on our anniversary. I haven't taken it off since. 10/10!" },
  { name: "Uttam K.", rating: 5, date: "1 month ago", verified: true, img: "https://i.pravatar.cc/40?img=14", text: "The ring arrived safely and looks even better in person. Worth every rupee." },
  { name: "Sdfrace", rating: 4, date: "1 month ago", verified: false, img: "https://i.pravatar.cc/40?img=60", text: "Silver" },
];

/* ─── SVG helpers ─── */
const Stars = ({ r, sz = 13 }: { r: number; sz?: number }) => (
  <span className="flex gap-[2px] flex-shrink-0">
    {[1, 2, 3, 4, 5].map(i => (
      <svg key={i} width={sz} height={sz} viewBox="0 0 24 24"
        fill={i <= Math.round(r) ? C.gold : "none"} stroke={C.gold} strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </span>
);

const Chev = ({ open }: { open: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    className="flex-shrink-0 transition-transform duration-[220ms]"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const Tick = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" className="flex-shrink-0">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const HeartIcon = ({ on }: { on: boolean }) => (
  <svg width="17" height="17" viewBox="0 0 24 24"
    fill={on ? C.burg : "none"} stroke={on ? C.burg : C.brown} strokeWidth="2" strokeLinecap="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

/* ─── Accordion ─── */
function Acc({ title, children, open: def = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  const [open, setOpen] = useState(def);
  return (
    <div className="border-b border-[rgba(184,146,42,0.18)]">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-[14px] bg-none border-none cursor-pointer">
        <span className="text-[0.74rem] font-semibold tracking-[0.06em] uppercase text-[#1a1008] text-left" style={{ fontFamily: SS }}>{title}</span>
        <Chev open={open} />
      </button>
      {open && <div className="pb-[18px]">{children}</div>}
    </div>
  );
}

/* ─── Mini Card ─── */
function MiniCard({ p }: { p: Product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wish = isInWishlist(p.id);
  const [hov, setHov] = useState(false);
  const { formatPrice: fmt } = useCurrency();
  const orig = p.originalPrice || 0;
  return (
    <Link to={`/products/${p.id}`} className="no-underline text-inherit">
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} className="cursor-pointer">
        <div className="relative rounded-[14px] overflow-hidden mb-[10px] border border-[rgba(184,146,42,0.18)]" style={{ aspectRatio: "1/1" }}>
          <img src={p.img} alt={p.name} className={`w-full h-full object-cover block transition-transform duration-500 ${hov ? "scale-105" : "scale-100"}`} />
          {p.badge && (
            <span className="absolute top-2 left-2 text-[0.52rem] font-bold uppercase tracking-[0.08em] rounded-full px-[9px] py-[3px] text-white"
              style={{ background: p.badge === "Sale" ? C.burg : C.gold, fontFamily: SS }}>{p.badge}</span>
          )}
          <button onClick={e => { e.preventDefault(); e.stopPropagation(); toggleWishlist({ id: p.id }); }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[rgba(255,254,240,0.92)] border-none cursor-pointer flex items-center justify-center transition-opacity duration-200 z-10"
            style={{ opacity: hov || wish ? 1 : 0 }}>
            <HeartIcon on={wish} />
          </button>
          {hov && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#fffef0] rounded-full px-[14px] py-[5px] text-[0.58rem] font-bold text-[#1a1008] whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.14)] pointer-events-none"
              style={{ fontFamily: SS }}>
              Quick View
            </div>
          )}
        </div>
        <h4 className="text-[0.88rem] font-semibold text-[#1a1008] mb-[3px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: SF }}>{p.name}</h4>
        <div className="flex items-center gap-[6px]">
          <span className="text-[0.74rem] font-bold text-[#1a1008]" style={{ fontFamily: SS }}>{fmt(p.price)}</span>
          {orig > 0 && <span className="text-[0.62rem] text-[#9a8878] line-through" style={{ fontFamily: SS }}>{fmt(orig)}</span>}
        </div>
      </div>
    </Link>
  );
}

/* ─── Zoom Gallery ─── */
const LENS = 120, ZOOM = 2.8;

function ZoomGallery({ images, onZoom, zoomBg }: {
  images: string[];
  onZoom: (v: { lens: { x: number; y: number } | null; bgX: number; bgY: number; src: string; rect: DOMRect | null }) => void;
  zoomBg: { active: boolean };
}) {
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = box.current!.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const lx = Math.max(LENS / 2, Math.min(x, r.width - LENS / 2));
    const ly = Math.max(LENS / 2, Math.min(y, r.height - LENS / 2));
    onZoom({ lens: { x: lx, y: ly }, bgX: ((lx - LENS / 2) / (r.width - LENS)) * 100, bgY: ((ly - LENS / 2) / (r.height - LENS)) * 100, src: images[active], rect: box.current!.getBoundingClientRect() });
  }, [active, images, onZoom]);

  const onLeave = useCallback(() => { onZoom({ lens: null, bgX: 50, bgY: 50, src: images[active], rect: null }); }, [active, images, onZoom]);

  return (
    <div className="flex gap-[10px] flex-shrink-0 items-start">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {images.map((img, i) => (
          <div key={i} onClick={() => { setActive(i); onLeave(); }}
            className="w-[60px] h-[60px] rounded-[10px] overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-200"
            style={{ border: active === i ? `2px solid ${C.burg}` : `2px solid ${C.border}`, opacity: active === i ? 1 : 0.58 }}>
            <img src={img} alt="" className="w-full h-full object-cover block" />
          </div>
        ))}
      </div>
      {/* Main image */}
      <div ref={box} onMouseMove={onMove} onMouseLeave={onLeave}
        className="relative rounded-[18px] overflow-hidden cursor-crosshair flex-shrink-0 bg-[#f6f3ea]"
        style={{ width: "clamp(280px,42vw,480px)", aspectRatio: "1/1", border: `1px solid ${C.border}` }}>
        <img src={images[active]} alt="Product" className="w-full h-full object-cover block" />
        {/* Lens */}
        {zoomBg.active && (
          <div id="lens-el" className="absolute pointer-events-none z-10 rounded-full"
            style={{ width: LENS, height: LENS, left: 0, top: 0, border: `2px solid rgba(184,146,42,0.8)`, backgroundColor: "rgba(255,254,240,0.08)", boxShadow: "0 0 0 9999px rgba(0,0,0,0.06)" }} />
        )}
        {/* Arrows */}
        {[["‹", -1], ["›", 1]].map(([arrow, dir]) => (
          <button key={String(dir)} onClick={() => setActive(a => (a + Number(dir) + images.length) % images.length)}
            className="absolute top-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer z-10 text-[15px] font-light"
            style={{ [Number(dir) < 0 ? "left" : "right"]: "10px", border: `1px solid ${C.gold}`, background: "rgba(255,254,240,0.9)", color: C.dark }}>
            {arrow}
          </button>
        ))}
        {/* Hint */}
        {!zoomBg.active && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[rgba(255,254,240,0.88)] rounded-full px-3 py-1 text-[0.57rem] text-[#9a8878] tracking-[0.08em] pointer-events-none whitespace-nowrap"
            style={{ fontFamily: SS }}>
            🔍 Hover to zoom
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ProductPage() {
  const { id } = useParams();
  const { formatPrice: fmt } = useCurrency();

  const { product: remoteProduct, loading: productLoading } = useProduct(id);

  const baseProduct = useMemo(() => {
    if (remoteProduct) {
      return {
        id: remoteProduct._id,
        name: remoteProduct.name,
        price: Number(remoteProduct.price || 0),
        originalPrice: remoteProduct.originalPrice ? Number(remoteProduct.originalPrice) : undefined,
        badge: remoteProduct.badge || (remoteProduct.showInHomePage ? "New" : undefined),
        carat: remoteProduct.carat || "0.5",
        shape: remoteProduct.shape || "Round",
        occasion: remoteProduct.occasion || "Everyday",
        type: remoteProduct.type || remoteProduct.category?.name || "Pendant",
        isNew: Boolean(remoteProduct.isNew),
        isBestseller: Boolean(remoteProduct.isBestseller),
        img: getImageUrl(remoteProduct.img),
        hoverImg: getImageUrl(remoteProduct.hoverImg || remoteProduct.img),
      } as Product;
    }
    return null;
  }, [remoteProduct]);

  const categoryInfo = useMemo(() => {
    if (remoteProduct && remoteProduct.category) {
      return {
        id: remoteProduct.category._id,
        key: remoteProduct.category.name?.toLowerCase() || "category",
        title: remoteProduct.category.name || "Category",
      };
    }
    return null;
  }, [remoteProduct]);

  const { products: allProducts } = useProducts();
  const similarProducts = useMemo(() => {
    if (!categoryInfo || !allProducts || !baseProduct) return [];
    return allProducts
      .filter(p => p.category?._id === categoryInfo.id && p._id !== baseProduct.id)
      .map(p => ({
        id: p._id,
        name: p.name,
        price: Number(p.price || 0),
        originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
        img: getImageUrl(p.img),
        badge: p.badge || (p.showInHomePage ? "New" : undefined),
      } as Product))
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [categoryInfo, allProducts, baseProduct]);

  useEffect(() => {
    if (baseProduct) {
      const raw = localStorage.getItem("recently_viewed");
      let list: Array<number | string> = raw ? JSON.parse(raw) : [];
      list = [baseProduct.id, ...list.filter(x => x !== baseProduct.id)].slice(0, 8);
      localStorage.setItem("recently_viewed", JSON.stringify(list));
    }
  }, [baseProduct]);

  const recentlyViewed = useMemo(() => {
    const raw = localStorage.getItem("recently_viewed");
    if (!raw || !allProducts) return [];
    const list = JSON.parse(raw) as Array<string>;
    return allProducts
      .filter(p => list.includes(p._id) && p._id !== id)
      .map(p => ({
        id: p._id,
        name: p.name,
        price: Number(p.price || 0),
        originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
        img: getImageUrl(p.img),
        badge: p.badge || (p.showInHomePage ? "New" : undefined),
      } as Product))
      .slice(0, 4);
  }, [id, allProducts]);

  const PRODUCT = baseProduct ? {
    ...baseProduct,
    subtitle: "Made With IGI-Certified Lab Diamonds · 18K Yellow Gold",
    original: baseProduct.originalPrice || Math.round(baseProduct.price * 1.2),
    rating: 4.8, reviews: 124,
    sku: `HJ-${(baseProduct.type || "JEWEL").toUpperCase()}-${baseProduct.id}`,
    metal: "18K Yellow Gold", clarity: "VS1", colour: "E",
    sizes: ["5", "6", "7", "8", "9", "10"],
    images: [baseProduct.img, baseProduct.hoverImg, baseProduct.img, baseProduct.hoverImg, baseProduct.img],
    offers: [
      { icon: "🏷️", text: "EXTRA 10% OFF on orders above ₹25,000", code: "HERITAGE10" },
      { icon: "🎁", text: "EXTRA 5% OFF on your first order", code: "WELCOME5" },
      { icon: "✨", text: "FREE luxury gift wrap on orders above ₹15,000", code: "" },
    ],
    specs: [
      "18K Yellow Gold · BIS Hallmarked",
      `${baseProduct.carat} ct ${baseProduct.shape} Lab Diamond`,
      "IGI Certified · Clarity VS1 · Colour E",
      "Adjustable band available on request",
      "Heritage Jewels authenticity certificate included",
    ],
    inspiration: "This piece represents the enduring beauty of certified lab diamonds — a timeless piece bridging heritage craftsmanship with modern brilliance, worn every day, remembered forever.",
    design: `The ${baseProduct.name} features a stunning ${baseProduct.carat} ct ${baseProduct.shape} lab diamond at its heart, set in hallmark 18K gold.`,
    styling: "Layer with other delicate pieces for an effortlessly elevated look.",
  } : null;

  const DISC = PRODUCT ? Math.round(((PRODUCT.original - PRODUCT.price) / PRODUCT.original) * 100) : 0;

  /* Zoom state */
  const [zoomState, setZoomState] = useState<{ active: boolean; lens: { x: number; y: number } | null; bgX: number; bgY: number; src: string; rect: DOMRect | null }>
    ({ active: false, lens: null, bgX: 50, bgY: 50, src: PRODUCT ? PRODUCT.images[0] : "", rect: null });
  const infoRef = useRef<HTMLDivElement>(null);
  const handleZoom = useCallback((v: any) => setZoomState({ active: !!v.lens, ...v }), []);

  /* Form state */
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wish = baseProduct ? isInWishlist(baseProduct.id) : false;
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  // const [pin, setPin] = useState("");
  // const [pinMsg, setPinMsg] = useState<{ t: string; ok: boolean } | null>(null);
  const [openOff, setOpenOff] = useState<number | null>(null);
  const [tab, setTab] = useState<"desc" | "rev">("desc");
  const [ocCheck, setOcCheck] = useState([false, false, false]);
  const [sizeGuide, setSizeGuide] = useState(false);

  // const checkPin = () => { if (pin.length === 6) setPinMsg({ t: "✓ Delivery available in 3–5 business days", ok: true }); else setPinMsg({ t: "Please enter a valid 6-digit pincode", ok: false }); };

  if (productLoading) {
    return (
      <div className="min-h-screen bg-[#fffef0] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-t-transparent border-[#8c2635] border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!baseProduct || !PRODUCT) return (
    <div className="min-h-screen bg-[#fffef0] flex items-center justify-center" style={{ fontFamily: SS }}>
      <div className="text-center">
        <h2 className="text-[2rem] text-[#1a1008]" style={{ fontFamily: SF }}>Product Not Found</h2>
        <p className="text-[#9a8878] mt-[10px]">The product you are looking for does not exist.</p>
        <button onClick={() => window.history.back()}
          className="mt-5 px-5 py-[10px] bg-[#8c2635] text-white border-none rounded-full cursor-pointer">
          Go Back
        </button>
      </div>
    </div>
  );

  const WA_NUMBER = "917265876203";
  const buyOnWhatsApp = () => {
    const msg = ["Hello Sundaram Luxury Craft! 👋", "I'd like to place an order:", "",
      `🛍️ *Product:* ${PRODUCT.name}`, `💰 *Price:* ${fmt(PRODUCT.price)}`,
      `⚙️ *Metal:* ${PRODUCT.metal}`, `💎 *Diamond:* ${PRODUCT.carat} · ${PRODUCT.shape}`,
      `🔬 *Clarity:* ${PRODUCT.clarity} | *Colour:* ${PRODUCT.colour}`,
      `📏 *${size ? `Ring Size: ${size}` : "Ring Size: Not selected"}*`,
      `🔢 *Quantity:* ${qty}`, `🆔 *SKU:* ${PRODUCT.sku}`, "",
      "🖼️ *Product Image:*", PRODUCT.images[0], "",
      "Please confirm availability and share payment details. Thank you!",
    ].join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleShare = async () => {
    try {
      if (navigator.share) await navigator.share({ title: "Check this out!", url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); alert("Link copied!"); }
    } catch { }
  };

  return (
    <div className="min-h-screen bg-[#fffef0]" style={{ fontFamily: SS }}>
      <style>{`
        @keyframes toastIn{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes zoomFadeIn{from{opacity:0}to{opacity:1}}
        .product-hero{display:flex;gap:40px;align-items:flex-start;flex-wrap:wrap;}
        .mini-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
        .review-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:900px;}
        .spec-chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px;}
        .cta-row{display:flex;gap:9px;align-items:center;flex-wrap:wrap;}
        .delivery-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;}
        @media(max-width:1100px){.mini-grid{grid-template-columns:repeat(3,1fr);}}
        @media(max-width:900px){.product-hero{flex-direction:column;gap:28px;}.mini-grid{grid-template-columns:repeat(2,1fr);}.review-grid{grid-template-columns:1fr;}}
        @media(max-width:600px){.mini-grid{grid-template-columns:repeat(2,1fr);gap:12px;}.cta-row{flex-wrap:wrap;}.delivery-grid{grid-template-columns:1fr;}.spec-chips>div{flex:1;min-width:80px;}}
      `}</style>

      {/* Zoom overlay */}
      {zoomState.active && zoomState.rect && (
        <div className="fixed z-[1000] rounded-[18px] pointer-events-none"
          style={{
            top: zoomState.rect.top, left: zoomState.rect.right + 14, width: zoomState.rect.width, height: zoomState.rect.height,
            backgroundImage: `url(${zoomState.src})`, backgroundSize: `${ZOOM * 100}%`,
            backgroundPosition: `${zoomState.bgX}% ${zoomState.bgY}%`, backgroundRepeat: "no-repeat",
            border: `1px solid ${C.border}`, boxShadow: "0 12px 48px rgba(0,0,0,0.16)", animation: "zoomFadeIn .15s ease"
          }} />
      )}
      {/* Lens updater */}
      {zoomState.active && zoomState.lens && (() => {
        requestAnimationFrame(() => {
          const el = document.getElementById("lens-el");
          if (el && zoomState.lens) { el.style.left = `${zoomState.lens.x - LENS / 2}px`; el.style.top = `${zoomState.lens.y - LENS / 2}px`; }
        }); return null;
      })()}

      {/* Breadcrumb */}
      <div className="px-10 pt-10 pb-0 mt-[50px] mx-[10px] text-[0.58rem] text-[#9a8878] tracking-[0.1em] uppercase" style={{ fontFamily: SS }}>
        <Link to="/" className="text-inherit no-underline">Home</Link>{" / "}
        <Link to="/collections" className="text-inherit no-underline">Collections</Link>
        {categoryInfo && (

          <>
            {" / "}

            <Link to={categoryInfo.key == "diamond" ? `/collections/metal/${categoryInfo.key}` : `/collections/${categoryInfo.key}`} className="text-inherit no-underline">{categoryInfo.key}</Link></>

        )}
        {" / "}<span className="text-[#1a1008]">{PRODUCT.name}</span>
      </div>

      {/* ── HERO ── */}
      <div className="max-w-[1300px] mx-auto px-4 lg:px-10 py-8 product-hero">
        {/* Gallery */}
        <div className="flex-shrink-0">
          <ZoomGallery images={PRODUCT.images} onZoom={handleZoom} zoomBg={{ active: zoomState.active }} />
        </div>

        {/* Info */}
        <div ref={infoRef} className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex gap-[7px] mb-[10px] flex-wrap">
            <span className="text-[0.56rem] font-bold tracking-[0.1em] uppercase rounded-full px-3 py-[3px] bg-[#b8922a] text-white" style={{ fontFamily: SS }}>Bestseller</span>
            <span className="text-[0.56rem] font-bold tracking-[0.1em] uppercase rounded-full px-3 py-[3px] border" style={{ fontFamily: SS, background: C.burgBg, color: C.burg, borderColor: C.burg }}>IGI Certified</span>
          </div>

          <h1 className="font-semibold text-[#1a1008] leading-[1.15] mb-[5px]" style={{ fontFamily: SF, fontSize: "clamp(1.5rem,3vw,2rem)" }}>
            {PRODUCT.name}
          </h1>
          <p className="text-[0.8rem] text-[#9a8878] mb-[14px]" style={{ fontFamily: SS }}>{PRODUCT.subtitle}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Stars r={PRODUCT.rating} />
            <span className="text-[0.76rem] font-bold text-[#1a1008]" style={{ fontFamily: SS }}>{PRODUCT.rating}</span>
            <span className="text-[0.76rem] text-[#9a8878]" style={{ fontFamily: SS }}>({PRODUCT.reviews.toLocaleString()} Reviews)</span>
            <span className="w-px h-3 bg-[rgba(184,146,42,0.18)] inline-block" />
            <span className="text-[0.73rem] text-[#9a8878]" style={{ fontFamily: SS }}>SKU: {PRODUCT.sku}</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-[10px] mb-[3px] flex-wrap">
            <span className="font-bold text-[#1a1008]" style={{ fontFamily: SS, fontSize: "clamp(1.4rem,3vw,1.75rem)" }}>{fmt(PRODUCT.price)}</span>
            <span className="text-[0.9rem] text-[#9a8878] line-through" style={{ fontFamily: SS }}>{fmt(PRODUCT.original)}</span>
            <span className="text-[1rem] font-bold rounded-full px-[9px] py-[2px]" style={{ fontFamily: SS, color: C.burg, background: C.burgBg }}>{DISC}% OFF</span>
          </div>
          <p className="text-[0.61rem] text-[#9a8878] mb-[18px]" style={{ fontFamily: SS }}>Inclusive of all taxes · Free pan-India shipping</p>

          {/* Spec chips */}
          <div className="spec-chips">
            {([["Metal", PRODUCT.metal], ["Carat", PRODUCT.carat], ["Shape", PRODUCT.shape], ["Clarity", PRODUCT.clarity], ["Colour", PRODUCT.colour]] as [string, string][]).map(([k, v]) => (
              <div key={k} className="rounded-[11px] px-[13px] py-[7px]" style={{ background: C.goldBg, border: `1px solid ${C.border}` }}>
                <div className="text-[0.49rem] text-[#9a8878] uppercase tracking-[0.12em]" style={{ fontFamily: SS }}>{k}</div>
                <div className="text-[0.71rem] font-bold text-[#1a1008]" style={{ fontFamily: SS }}>{v}</div>
              </div>
            ))}
          </div>

          <div className="h-px bg-[rgba(184,146,42,0.18)] mb-[18px]" />

          {/* Size selector */}
          <div className="mb-[18px]">
            <div className="flex justify-between items-center mb-[9px]">
              <span className="text-[0.69rem] font-semibold uppercase tracking-[0.08em] text-[#1a1008]" style={{ fontFamily: SS }}>
                Ring Size{size && <span className="text-[#8c2635]"> — {size}</span>}
              </span>
              <button className="text-[0.71rem] text-[#b8922a] bg-none border-none cursor-pointer underline font-bold" style={{ fontFamily: SS }}
                onClick={() => setSizeGuide(true)}
              >Size Guide ↗</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {PRODUCT.sizes.map(s => (
                <button key={s} onClick={() => setSize(s)}
                  className="w-10 h-10 rounded-full text-[0.74rem] font-medium cursor-pointer transition-all duration-150"
                  style={{
                    fontFamily: SS, background: size === s ? C.burg : "transparent", color: size === s ? "#fff" : C.dark,
                    border: size === s ? "none" : `1.5px solid ${C.border}`, boxShadow: size === s ? `0 4px 14px rgba(140,38,53,0.28)` : "none"
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CTA row */}
          <div className="cta-row mb-[14px]">
            {/* Qty */}
            <div className="flex items-center rounded-full overflow-hidden flex-shrink-0" style={{ border: `1.5px solid ${C.border}` }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-[34px] h-[36px] bg-none border-none cursor-pointer text-[16px] text-[#1a1008]">−</button>
              <span className="w-[30px] text-center text-[0.78rem] font-bold text-[#1a1008]" style={{ fontFamily: SS }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-[34px] h-[36px] bg-none border-none cursor-pointer text-[16px] text-[#1a1008]">+</button>
            </div>

            {/* Buy Now → WhatsApp */}
            <button onClick={buyOnWhatsApp}
              className="flex-1 min-w-[90px] rounded-full px-2 py-[11px] bg-transparent border-[1.5px] border-[#25D366] text-[#25D366] text-[0.68rem] font-bold tracking-[0.08em] uppercase cursor-pointer flex items-center justify-center gap-[5px] transition-all hover:bg-[rgba(37,211,102,0.1)]"
              style={{ fontFamily: SS }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Buy Now
            </button>

            {/* Add to Cart */}
            {/* <button onClick={addCart}
              className="flex-[1.5] min-w-[110px] rounded-full px-2 py-[11px] bg-[#8c2635] border-none text-white text-[0.68rem] font-bold tracking-[0.08em] uppercase cursor-pointer transition-transform hover:-translate-y-[1px]"
              style={{ fontFamily:SS, boxShadow:`0 4px 18px rgba(140,38,53,0.3)` }}>
              Add to Cart
            </button> */}

            {/* Wishlist */}
            <button onClick={() => toggleWishlist({ id: baseProduct!.id })}
              className="w-[42px] h-[42px] rounded-full flex-shrink-0 flex items-center justify-center cursor-pointer transition-all duration-200"
              style={{ background: wish ? C.burgBg : C.goldBg, border: `1.5px solid ${wish ? C.burg : C.border}` }}>
              <HeartIcon on={wish} />
            </button>

            {/* Share */}
            <button onClick={handleShare}
              className="w-[42px] h-[42px] rounded-full flex-shrink-0 flex items-center justify-center cursor-pointer"
              style={{ background: C.goldBg, border: `1.5px solid ${C.border}` }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.brown} strokeWidth="2" strokeLinecap="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          </div>

          {/* Offers */}
          <div className="mb-0">
            <p className="text-[1rem] font-bold uppercase tracking-[0.1em] text-[#1a1008] mb-2" style={{ fontFamily: SS }}>
              Offers For You &nbsp;
              <span className="normal-case font-normal text-[#9a8878]">(Can be applied at checkout)</span>
            </p>
            <div className="flex flex-col gap-[6px]">
              {PRODUCT.offers.map((o, i) => (
                <div key={i} onClick={() => setOpenOff(openOff === i ? null : i)}
                  className="rounded-[11px] px-[13px] py-[10px] cursor-pointer transition-all duration-150"
                  style={{ background: openOff === i ? "rgba(184,146,42,0.09)" : C.goldBg, border: `1px solid ${openOff === i ? C.gold : C.border}` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-[1.5rem] flex-shrink-0">{o.icon}</span>
                      <span className="text-[0.87rem] text-[#1a1008] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontFamily: SS }}>{o.text}</span>
                    </div>
                    <Chev open={openOff === i} />
                  </div>
                  {openOff === i && o.code && (
                    <div className="mt-2 pt-2 border-t border-[rgba(184,146,42,0.18)]">
                      <span className="text-[0.72rem]" style={{ fontFamily: SS }}>Use code: </span>
                      <span className="text-[0.78rem] font-bold rounded-md px-2 py-[2px]" style={{ fontFamily: SS, color: C.burg, background: C.burgBg }}>{o.code}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Delivery */}
          {/* <div className="rounded-2xl p-4 mt-[13px]" style={{ background: C.goldBg, border: `1px solid ${C.border}` }}>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#1a1008] mb-[10px]" style={{ fontFamily: SS }}>Estimated Delivery Time</p>
            <div className="flex gap-2 mb-2">
              <input value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="Enter 6-digit pincode"
                className="flex-1 rounded-[10px] px-3 py-[9px] text-[0.77rem] text-[#1a1008] bg-[#fffef0] border border-[rgba(184,146,42,0.18)] outline-none"
                style={{ fontFamily: SS }} />
              <button onClick={checkPin}
                className="rounded-[10px] px-4 py-[9px] bg-[#8c2635] text-white border-none cursor-pointer text-[0.75rem] font-bold whitespace-nowrap"
                style={{ fontFamily: SS }}>Check</button>
            </div>
            {pinMsg && <p className="text-[0.76rem] font-medium mb-2" style={{ fontFamily: SS, color: pinMsg.ok ? "#2d7a4f" : C.burg }}>{pinMsg.t}</p>}
            <div className="delivery-grid">
              {[["30-Day Returns", "Easy Returns"], ["6-Month Warranty", "Warranty"], ["Free Shipping", "Pan India"], ["IGI Certified", "Diamond"]].map(([v, l]) => (
                <div key={l} className="flex items-center gap-[5px]">
                  <Tick />
                  <span className="text-[0.71rem] text-[#4a3f35]" style={{ fontFamily: SS }}><b>{v}</b> · {l}</span>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* ── Make It Special ── */}
      <div className="max-w-[1300px] mx-auto px-4 lg:px-10 pb-8">
        <div className="rounded-[18px] px-[22px] py-5" style={{ border: `1px solid ${C.border}`, background: C.goldBg }}>
          <p className="text-[0.73rem] font-bold uppercase tracking-[0.14em] mb-[13px] text-[#1a1008]" style={{ fontFamily: SS }}>
            Make It A Special <span style={{ color: C.burg }}>Occasion</span>
          </p>
          <div className="flex gap-3 flex-wrap">
            {OCCASION_ITEMS.map((item, i) => (
              <div key={i} onClick={() => setOcCheck(oc => { const n = [...oc]; n[i] = !n[i]; return n; })}
                className="flex items-center gap-[11px] rounded-[13px] px-[14px] py-[9px] cursor-pointer flex-shrink transition-all duration-150"
                style={{ background: ocCheck[i] ? C.burgBg : C.cream, border: `1.5px solid ${ocCheck[i] ? C.burg : C.border}` }}>
                <div className="w-11 h-11 rounded-[9px] overflow-hidden flex-shrink-0">
                  <img src={item.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.76rem] font-semibold text-[#1a1008] mb-[2px] whitespace-nowrap" style={{ fontFamily: SS }}>{item.name}</p>
                  <p className="text-[0.72rem] text-[#9a8878]" style={{ fontFamily: SS }}>₹ {item.price}</p>
                </div>
                <div className="w-[17px] h-[17px] rounded flex-shrink-0 flex items-center justify-center"
                  style={{ background: ocCheck[i] ? C.burg : "transparent", border: `1.5px solid ${ocCheck[i] ? C.burg : C.border}` }}>
                  {ocCheck[i] && <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="2 6 5 9 10 3" /></svg>}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[0.69rem] text-[#9a8878] mt-[10px] font-medium" style={{ fontFamily: SS }}>Checked items will be automatically added to your cart.</p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="max-w-[1300px] mx-auto px-4 lg:px-10 pb-11">
        <div className="flex border-b-2 border-[rgba(184,146,42,0.18)] mb-[26px] overflow-x-auto">
          {(["desc", "rev"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-6 py-[11px] bg-none border-none cursor-pointer text-[0.68rem] font-semibold tracking-[0.06em] uppercase whitespace-nowrap transition-colors duration-200"
              style={{ fontFamily: SS, color: tab === t ? C.burg : C.muted, borderBottom: tab === t ? `2px solid ${C.burg}` : "2px solid transparent", marginBottom: "-2px" }}>
              {t === "desc" ? "Product Description" : `Customer Reviews (${PRODUCT.reviews})`}
            </button>
          ))}
        </div>

        {tab === "desc" ? (
          <div className="max-w-[720px]">
            <Acc title="The Inspiration" open>
              <p className="text-[0.87rem] text-[#4a3f35] leading-[1.85]" style={{ fontFamily: SS }}>{PRODUCT.inspiration}</p>
            </Acc>
            <Acc title="The Design" open>
              <p className="text-[0.87rem] text-[#4a3f35] leading-[1.85] mb-[13px]" style={{ fontFamily: SS }}>{PRODUCT.design}</p>
              <div className="flex flex-col gap-2">
                {PRODUCT.specs.map((s, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-[1px] flex-shrink-0"><Tick /></span>
                    <span className="text-[0.87rem] text-[#4a3f35]" style={{ fontFamily: SS }}>{s}</span>
                  </div>
                ))}
              </div>
            </Acc>
            <Acc title="Styling Tip">
              <p className="text-[0.87rem] text-[#4a3f35] leading-[1.85]" style={{ fontFamily: SS }}>💡 {PRODUCT.styling}</p>
            </Acc>
            <Acc title="Shipping & Returns">
              {["🚚 Free express shipping across all of India", "🔄 30-day no-questions-asked return policy", "📦 Insured delivery with tamper-proof packaging", "💳 Easy EMI options available at checkout"].map((t, i) => (
                <p key={i} className="text-[0.87rem] text-[#4a3f35] leading-[1.75] mb-1" style={{ fontFamily: SS }}>{t}</p>
              ))}
            </Acc>
          </div>
        ) : (
          <div>
            {/* Rating summary */}
            <div className="flex gap-7 items-center p-5 rounded-[18px] mb-[26px] flex-wrap max-w-[480px]"
              style={{ border: `1px solid ${C.border}`, background: C.goldBg }}>
              <div className="text-center flex-shrink-0">
                <p className="font-semibold text-[#1a1008] leading-none mb-[6px]" style={{ fontFamily: SF, fontSize: "3.4rem" }}>{PRODUCT.rating}</p>
                <Stars r={PRODUCT.rating} sz={15} />
                <p className="text-[0.59rem] text-[#9a8878] mt-1" style={{ fontFamily: SS }}>{PRODUCT.reviews} Reviews</p>
              </div>
              <div className="flex-1 min-w-[160px]">
                {([5, 4, 3, 2, 1] as const).map((star, _i) => {
                  const pct = [72, 18, 6, 2, 2][_i];
                  return (
                    <div key={star} className="flex items-center gap-2 mb-[5px]">
                      <span className="text-[0.59rem] text-[#9a8878] w-2" style={{ fontFamily: SS }}>{star}</span>
                      <div className="flex-1 h-[5px] rounded-full overflow-hidden bg-[rgba(184,146,42,0.15)]">
                        <div className="h-full rounded-full bg-[#b8922a]" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[0.56rem] text-[#9a8878] w-[26px] text-right" style={{ fontFamily: SS }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="review-grid">
              {REVIEWS_DATA.map((r, i) => (
                <div key={i} className="rounded-2xl p-[17px] bg-white" style={{ border: `1px solid ${C.border}` }}>
                  <div className="flex items-start justify-between mb-[10px]">
                    <div className="flex items-center gap-[9px]">
                      <img src={r.img} alt="" className="w-[33px] h-[33px] rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-[6px] mb-[3px] flex-wrap">
                          <span className="text-[0.7rem] font-bold text-[#1a1008]" style={{ fontFamily: SS }}>{r.name}</span>
                          {r.verified && <span className="text-[0.5rem] font-semibold rounded-full px-[6px] py-[1px] bg-[rgba(45,122,79,0.1)] text-[#2d7a4f]" style={{ fontFamily: SS }}>✓ Verified</span>}
                        </div>
                        <Stars r={r.rating} sz={11} />
                      </div>
                    </div>
                    <span className="text-[0.57rem] text-[#9a8878] flex-shrink-0 ml-[6px]" style={{ fontFamily: SS }}>{r.date}</span>
                  </div>
                  <p className="text-[0.72rem] text-[#4a3f35] leading-[1.7]" style={{ fontFamily: SS }}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── You May Also Like ── */}
      {similarProducts.length > 0 && (
        <div className="max-w-[1300px] mx-auto px-4 lg:px-10 pb-10">
          <div className="flex items-baseline justify-between mb-5 gap-3">
            <h2 className="font-semibold text-[#1a1008]" style={{ fontFamily: SF, fontSize: "clamp(1.2rem,3vw,1.5rem)" }}>You May Also Like</h2>
            <Link to={`/collections/${categoryInfo?.key || "rings"}`}
              className="no-underline text-[0.6rem] text-[#b8922a] rounded-full px-[14px] py-[5px] cursor-pointer tracking-[0.08em] uppercase whitespace-nowrap"
              style={{ fontFamily: SS, border: `1px solid ${C.gold}` }}>
              View All →
            </Link>
          </div>
          <div className="mini-grid">{similarProducts.map(p => <MiniCard key={p.id} p={p} />)}</div>
        </div>
      )}

      {/* ── Recently Viewed ── */}
      {recentlyViewed.length > 0 && (
        <div className="max-w-[1300px] mx-auto px-4 lg:px-10 pb-16">
          <h2 className="font-semibold text-[#1a1008] mb-5" style={{ fontFamily: SF, fontSize: "clamp(1.2rem,3vw,1.5rem)" }}>Recently Viewed</h2>
          <div className="mini-grid">{recentlyViewed.map(p => <MiniCard key={p.id} p={p} />)}</div>
        </div>
      )}
      {sizeGuide && <SizeGuideModal onClose={() => setSizeGuide(false)} onSelect={(s) => { setSize(s); setSizeGuide(false); }} selectedSize={size} />}
    </div>
  );
}
/* ─── Size Guide Modal ──────────────────────────────── */
const SIZE_DATA = [
  { size: "5", inside_dia: "15.7 mm", inside_circ: "49.3 mm", us: "5", uk: "J½" },
  { size: "6", inside_dia: "16.5 mm", inside_circ: "51.9 mm", us: "6", uk: "L½" },
  { size: "7", inside_dia: "17.3 mm", inside_circ: "54.4 mm", us: "7", uk: "N½" },
  { size: "8", inside_dia: "18.1 mm", inside_circ: "57.0 mm", us: "8", uk: "P½" },
  { size: "9", inside_dia: "18.9 mm", inside_circ: "59.5 mm", us: "9", uk: "R½" },
  { size: "10", inside_dia: "19.8 mm", inside_circ: "62.1 mm", us: "10", uk: "T½" },
];

const HOW_TO_MEASURE = [
  { step: "01", icon: "📏", title: "String Method", desc: "Wrap a thin strip of paper or string around your finger where the ring will sit. Mark where it overlaps, then measure the length in mm. That number is your circumference." },
  { step: "02", icon: "💍", title: "Existing Ring", desc: "Place a ring you already own on a ruler and measure the inner diameter in mm. Match it to the diameter column in the table above." },
  { step: "03", icon: "🏪", title: "Visit a Showroom", desc: "Walk into any Heritage Jewels showroom for a professional sizing using our mandrel set. It takes under 2 minutes and is completely free." },
];

function SizeGuideModal({ onClose, onSelect, selectedSize }: {
  onClose: () => void;
  onSelect: (s: string) => void;
  selectedSize: string | null;
}) {
  const [hovRow, setHovRow] = useState<string | null>(null);

  // Close on backdrop click or Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9000] flex items-end sm:items-center justify-center"
      style={{ background: "rgba(15,10,5,0.7)", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>

      <div className="relative bg-[#fffef0] w-full sm:max-w-[680px] sm:mx-4 rounded-t-[28px] sm:rounded-[28px] overflow-hidden"
        style={{ animation: "modalIn .32s cubic-bezier(0.16,1,0.3,1) both", maxHeight: "92vh" }}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[rgba(184,146,42,0.15)]">
          <div>
            <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[#b8922a] mb-[3px]" style={{ fontFamily: SS }}>Heritage Jewels</p>
            <h2 className="font-semibold text-[#1a1008] leading-tight" style={{ fontFamily: SF, fontSize: "1.5rem" }}>Ring Size Guide</h2>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[rgba(184,146,42,0.08)] border border-[rgba(184,146,42,0.2)] cursor-pointer text-[#9a8878] hover:text-[#1a1008] hover:border-[#b8922a] transition-all text-lg leading-none">
            ✕
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(92vh - 72px)" }}>

          {/* Tip banner */}
          <div className="mx-6 mt-5 rounded-xl px-4 py-3 flex items-start gap-3 bg-[rgba(184,146,42,0.07)] border border-[rgba(184,146,42,0.18)]">
            <span className="text-lg flex-shrink-0">💡</span>
            <p className="text-[0.7rem] text-[#4a3f35] leading-[1.75]" style={{ fontFamily: SS }}>
              Fingers swell slightly in the evening and in warm weather. For the most accurate fit, measure in the evening. If between sizes, choose the larger one.
            </p>
          </div>

          {/* ── Size Table ── */}
          <div className="px-6 mt-6">
            <p className="text-[0.6rem] tracking-[0.18em] uppercase text-[#b8922a] mb-3" style={{ fontFamily: SS }}>Size Chart</p>
            <div className="rounded-2xl overflow-hidden border border-[rgba(184,146,42,0.18)]">
              {/* Table header */}
              <div className="grid grid-cols-5 bg-[#1a1008] px-4 py-3">
                {["Our Size", "Inner Ø", "Circumference", "US/Int'l", "UK/AU"].map(h => (
                  <span key={h} className="text-[0.57rem] font-bold tracking-[0.1em] uppercase text-[#b8922a]" style={{ fontFamily: SS }}>{h}</span>
                ))}
              </div>
              {/* Rows */}
              {SIZE_DATA.map((row, i) => {
                const isSel = selectedSize === row.size;
                const isHov = hovRow === row.size;
                return (
                  <div key={row.size}
                    onClick={() => onSelect(row.size)}
                    onMouseEnter={() => setHovRow(row.size)}
                    onMouseLeave={() => setHovRow(null)}
                    className="grid grid-cols-5 px-4 py-[11px] cursor-pointer transition-colors duration-150 border-t border-[rgba(184,146,42,0.1)]"
                    style={{
                      background: isSel ? "rgba(140,38,53,0.07)" : isHov ? "rgba(184,146,42,0.06)" : i % 2 === 0 ? "#fff" : "rgba(184,146,42,0.02)"
                    }}>
                    {/* Size */}
                    <span className="flex items-center gap-2">
                      <span className="text-[0.78rem] font-bold" style={{ fontFamily: SS, color: isSel ? C.burg : C.dark }}>{row.size}</span>
                      {isSel && (
                        <span className="text-[0.5rem] font-bold uppercase tracking-[0.08em] rounded-full px-[7px] py-[1px] bg-[#8c2635] text-white" style={{ fontFamily: SS }}>Selected</span>
                      )}
                    </span>
                    <span className="text-[0.74rem] text-[#4a3f35]" style={{ fontFamily: SS }}>{row.inside_dia}</span>
                    <span className="text-[0.74rem] text-[#4a3f35]" style={{ fontFamily: SS }}>{row.inside_circ}</span>
                    <span className="text-[0.74rem] text-[#4a3f35]" style={{ fontFamily: SS }}>{row.us}</span>
                    <span className="text-[0.74rem] text-[#4a3f35]" style={{ fontFamily: SS }}>{row.uk}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[0.6rem] text-[#9a8878] mt-2 ml-1" style={{ fontFamily: SS }}>Click any row to select that size and close the guide.</p>
          </div>

          {/* ── How to Measure ── */}
          <div className="px-6 mt-7">
            <p className="text-[0.6rem] tracking-[0.18em] uppercase text-[#b8922a] mb-4" style={{ fontFamily: SS }}>How to Find Your Size</p>
            <div className="flex flex-col gap-4">
              {HOW_TO_MEASURE.map((m, i) => (
                <div key={i} className="flex gap-4 items-start rounded-2xl p-4 bg-[rgba(184,146,42,0.04)] border border-[rgba(184,146,42,0.12)]">
                  <div className="w-10 h-10 rounded-full bg-[#1a1008] border border-[rgba(184,146,42,0.25)] flex items-center justify-center flex-shrink-0 text-base">{m.icon}</div>
                  <div>
                    <p className="text-[0.55rem] tracking-[0.14em] uppercase text-[#b8922a] mb-[3px]" style={{ fontFamily: SS }}>Step {m.step}</p>
                    <p className="text-[0.76rem] font-semibold text-[#1a1008] mb-1" style={{ fontFamily: SS }}>{m.title}</p>
                    <p className="text-[0.7rem] text-[#4a3f35] leading-[1.75]" style={{ fontFamily: SS }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Visual measure helper ── */}
          <div className="mx-6 mt-6 rounded-2xl p-5 bg-[#1a1008] border border-[rgba(184,146,42,0.2)]">
            <p className="text-[0.6rem] tracking-[0.18em] uppercase text-[#b8922a] mb-3" style={{ fontFamily: SS }}>Quick Measure Tool</p>
            <p className="text-[0.7rem] text-[rgba(255,254,240,0.65)] leading-[1.75] mb-4" style={{ fontFamily: SS }}>
              Place your ring flat against your screen. The ruler below is to scale at standard screen resolution (96 PPI). Measure the inner diameter of your ring.
            </p>
            {/* Ruler */}
            <div className="relative h-8 rounded-lg overflow-hidden bg-[rgba(184,146,42,0.08)] border border-[rgba(184,146,42,0.2)]">
              <div className="absolute inset-0 flex">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="flex-1 border-r border-[rgba(184,146,42,0.2)] flex flex-col justify-end pb-1">
                    {i % 5 === 0 && <span className="text-[0.45rem] text-[#b8922a] text-center leading-none" style={{ fontFamily: SS }}>{i + 1}</span>}
                  </div>
                ))}
              </div>
              <div className="absolute top-0 left-0 right-0 flex justify-between px-1">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-[0.48rem] text-[#b8922a]" style={{ fontFamily: SS }}>{i * 5}mm</span>
                ))}
              </div>
            </div>
            <p className="text-[0.58rem] text-[rgba(255,254,240,0.4)] mt-2" style={{ fontFamily: SS }}>
              * Screen ruler accuracy varies by device resolution. For a guaranteed fit, visit any Heritage Jewels showroom.
            </p>
          </div>

          {/* ── CTA ── */}
          <div className="px-6 py-6 mt-2 flex flex-wrap gap-3">
            <a href="/book-appointment"
              className="flex-1 min-w-[160px] rounded-full py-[12px] text-[0.68rem] font-bold tracking-[0.1em] uppercase text-center no-underline bg-[#8c2635] text-white shadow-[0_4px_18px_rgba(140,38,53,0.28)] transition-transform hover:-translate-y-[1px]"
              style={{ fontFamily: SS }}>
              Get Sized In-Store →
            </a>
            <button onClick={onClose}
              className="flex-1 min-w-[120px] rounded-full py-[12px] text-[0.68rem] font-bold tracking-[0.1em] uppercase bg-transparent text-[#b8922a] border border-[#b8922a] cursor-pointer transition-transform hover:-translate-y-[1px]"
              style={{ fontFamily: SS }}>
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}