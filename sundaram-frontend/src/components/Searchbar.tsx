import { useState, useRef, useEffect } from "react";

const suggestions = {
  trending: [
    { label: "Diamond Rings",       href: "/collections/rings" },
    { label: "Gold Necklaces",      href: "/collections/necklaces" },
    { label: "Mangalsutra",         href: "/collections/mangalsutra" },
    { label: "Engagement Rings",    href: "/collections/engagement-rings" },
    { label: "Pearl Earrings",      href: "/collections/earrings" },
  ],
  categories: [
    { label: "Rings",       icon: "💍", href: "/collections/rings" },
    { label: "Earrings",    icon: "✨", href: "/collections/earrings" },
    { label: "Necklaces",   icon: "📿", href: "/collections/necklaces" },
    { label: "Bracelets",   icon: "🔮", href: "/collections/bracelets" },
    { label: "Mangalsutra",    icon: "🏅", href: "/collections/mangalsutra" },
    { label: "Bangles",     icon: "⭕", href: "/collections/bangles" },
  ],
  popular: [
    {
      label: "Solitaire Diamond Ring",
      price: "From ₹45,000",
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=80&q=80&fit=crop",
      href: "/products/101",
    },
    {
      label: "Gold Mangalsutra",
      price: "From ₹18,000",
      img: "https://images.unsplash.com/photo-1750492272603-43888a3fee4d?w=80&q=80&fit=crop",
      href: "/products/501",
    },
    {
      label: "Diamond Earrings",
      price: "From ₹22,000",
      img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=80&q=80&fit=crop",
      href: "/products/301",
    },
  ],
};

// Flatten all searchable items for live filtering
const allItems = [
  ...suggestions.trending.map((t) => ({ ...t, type: "trending" })),
  ...suggestions.categories.map((c) => ({ label: c.label, href: c.href, type: "category" })),
  ...suggestions.popular.map((p) => ({ label: p.label, href: p.href, type: "popular" })),
];

const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TrendIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b8922a" strokeWidth="2" strokeLinecap="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default function SearchBar() {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState("");
  const inputRef              = useRef<HTMLInputElement>(null);
  const containerRef          = useRef<HTMLDivElement>(null);

  // Live filtered results
  const filtered = query.trim().length > 0
    ? allItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : [];

  // Open and auto-focus
  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); setQuery(""); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">

      {/* ── Collapsed: icon button ── */}
      {!open && (
        <button
          onClick={handleOpen}
          className="font-['Montserrat',sans-serif] bg-transparent border-[#b8922a] text-[#4a3f35] flex items-center gap-2 rounded-full px-4 py-[9px] border transition-all duration-200 hover:-translate-y-[1px] cursor-pointer"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#8c2635";
            (e.currentTarget as HTMLButtonElement).style.color = "#8c2635";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,146,42,0.4)";
            (e.currentTarget as HTMLButtonElement).style.color = "#4a3f35";
          }}
          aria-label="Search"
        >
          <SearchIcon />
          <span className="text-[0.72rem] font-medium tracking-wide hidden lg:block">
            Search
          </span>
        </button>
      )}

      {/* ── Expanded: input + dropdown ── */}
      {open && (
        <div className="relative" style={{ width: "320px" }}>
          {/* Input */}
          <div
            className=" flex items-center gap-2 rounded-full px-4 py-[9px]"
            style={{
              border: "1.5px solid #8c2635",
              backgroundColor: "#fffef0",
              boxShadow: "0 0 0 3px rgba(140,38,53,0.08)",
            }}
          >
            <span style={{ color: "#8c2635" }}><SearchIcon /></span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jewellery..."
              className="font-['Montserrat',sans-serif] text-[#1a1008] flex-1 bg-transparent border-none outline-none text-[0.8rem]"
            />
            <button
              onClick={() => { setOpen(false); setQuery(""); }}
              className="flex-shrink-0 cursor-pointer border-none bg-transparent p-0 transition-opacity hover:opacity-60 text-[#4a3f35]"
            >
              <CloseIcon />
            </button>
          </div>

          {/* ── Dropdown panel ── */}
          <div
            className="absolute top-[calc(100%+8px)] left-0 right-0 rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "#fffef0",
              border: "1px solid rgba(184,146,42,0.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
              animation: "searchDrop 0.22s cubic-bezier(0.16,1,0.3,1) both",
              zIndex: 60,
            }}
          >
            <style>{`@keyframes searchDrop{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>

            {/* ── Live filtered results ── */}
            {filtered.length > 0 ? (
              <div className="p-3">
                <p
                  className="font-['Montserrat',sans-serif] text-[#b8922a] text-[0.6rem] uppercase tracking-[0.18em] px-2 mb-2"
                >
                  Results
                </p>
                {filtered.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-[9px] rounded-xl no-underline transition-colors duration-150 hover:bg-[rgba(184,146,42,0.07)]"
                  >
                    <SearchIcon />
                    <span
                      className="font-['Montserrat',sans-serif] text-[#1a1008] text-[0.8rem]"
                    >
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            ) : query.trim().length > 0 ? (
              // No results
              <div className="px-5 py-8 text-center">
                <p
                  className="font-['Montserrat',sans-serif] text-[#9a8878] text-[0.8rem]"
                >
                  No results for "{query}"
                </p>
                <p
                  className="font-['Montserrat',sans-serif] text-[#b8a898] text-[0.72rem] mt-1"
                >
                  Try searching rings, earrings, gold…
                </p>
              </div>
            ) : (
              // Default suggestions
              <>
                {/* Trending */}
                <div className="px-4 pt-4 pb-2">
                  <p
                    className="font-['Montserrat',sans-serif] text-[#b8922a] text-[0.6rem] uppercase tracking-[0.18em] mb-3 flex items-center gap-2"
                  >
                    <TrendIcon /> Trending Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.trending.map((t) => (
                      <a
                        key={t.label}
                        href={t.href}
                        className="font-['Montserrat',sans-serif] text-[#4a3f35] border-[#b8922a] bg-transparent rounded-full px-3 py-[5px] text-[0.7rem] no-underline transition-all duration-150 hover:-translate-y-[1px]"
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "#8c2635";
                          (e.currentTarget as HTMLAnchorElement).style.color = "#8c2635";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(184,146,42,0.35)";
                          (e.currentTarget as HTMLAnchorElement).style.color = "#4a3f35";
                        }}
                        onClick={() => {
                          setOpen(false);
                          setQuery("");
                        }}
                      >
                        {t.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-4 my-2" style={{ height: "1px", backgroundColor: "rgba(184,146,42,0.15)" }} />

                {/* Categories */}
                <div className="px-4 pb-3">
                  <p
                    className="font-['Montserrat',sans-serif] text-[#b8922a] text-[0.6rem] uppercase tracking-[0.18em] mb-3"
                  >
                    Browse Categories
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {suggestions.categories.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl no-underline transition-colors duration-150 hover:bg-[rgba(184,146,42,0.07)]"
                      >
                        <span className="text-sm">{c.icon}</span>
                        <span
                          className="font-['Montserrat',sans-serif] text-[#1a1008] text-[0.72rem] font-medium"
                        >
                          {c.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-4 my-1" style={{ height: "1px", backgroundColor: "rgba(184,146,42,0.15)" }} />

                {/* Popular picks */}
                <div className="px-4 pt-3 pb-4">
                  <p
                    className="font-['Montserrat',sans-serif] text-[#b8922a] text-[0.6rem] uppercase tracking-[0.18em] mb-3"
                  >
                    Popular Picks
                  </p>
                  <div className="flex flex-col gap-2">
                    {suggestions.popular.map((p) => (
                      <a
                        key={p.label}
                        href={p.href}
                        className="flex items-center gap-3 px-2 py-2 rounded-xl no-underline transition-colors duration-150 hover:bg-[rgba(184,146,42,0.07)]"
                      >
                        <img
                          src={p.img}
                          alt={p.label}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div>
                          <p
                            className="font-['Montserrat',sans-serif] text-[#1a1008] text-[0.78rem] font-medium leading-tight"
                          >
                            {p.label}
                          </p>
                          <p
                            className="font-['Montserrat',sans-serif] text-[#b8922a] text-[0.65rem] mt-[2px]"
                          >
                            {p.price}
                          </p>
                        </div>
                      </a>  
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}