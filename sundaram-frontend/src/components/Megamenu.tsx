import type { NavItem } from "./Navconfig";
import { Link, useNavigate } from 'react-router-dom'

interface MegaMenuProps {
  item: NavItem;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const getHref = (item: string): string => {
  const tag = item.toUpperCase().trim();

  // 1. Define specific overrides
  const routes: Record<string, string> = {
    "BOOK A SERVICE": "/book-appointment",
    "PRICING": "/collections",
    "FAQ": "/contact",
    "WARRANTY": "/contact",
    "NEW ARRIVALS": "/collections",
    "BEST SELLERS": "/collections",
    "GIFT SETS": "/collections",
    "SALE": "/collections"
  };

  // 2. Return the override if it exists
  if (routes[tag]) {
    return routes[tag];
  }

  // 3. Fallback for any other links (default slug logic)
  return `/${tag.split(" ")[0].toLowerCase()}`;
};

export default function MegaMenu({ item, onMouseEnter, onMouseLeave, onClick }: MegaMenuProps) {
  const menu = item.megaMenu;
  if (!menu) return null;
  const navigate = useNavigate();

  return (
    <>
      {/* Dark backdrop only for mobile/tablet — when it's a side menu */}
      <div
        className="fixed inset-0 bg-black/40 z-[95] lg:hidden animate-fadeIn"
        onClick={onClick}
        style={{ backdropFilter: 'blur(2px)' }}
      />

      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={(e) => e.stopPropagation()}
        className="fixed z-[100] overflow-y-auto bg-[#fffef0] transition-all duration-300 ease-out
                   inset-y-0 left-0 w-[85%] sm:w-[50%] 
                   lg:inset-x-0 lg:top-[68px] lg:w-full lg:h-auto lg:bottom-auto lg:shadow-xl lg:animate-megaFadeIn"
        style={{
          boxShadow: "20px 0 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* Keyframes */}
        <style>{`
          @keyframes megaFadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
          @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        `}</style>

        {/* Main grid */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 relative pt-20 lg:pt-12">
          {/* Close Button — always visible on touch screens (mobile/tablet < 1024px) */}
          <button
            onClick={onClick}
            className="lg:hidden absolute top-6 right-6 p-2 bg-transparent border-none cursor-pointer hover:bg-black/5 rounded-full transition-colors z-[110]"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1008" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Dynamic columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {menu.columns.map((col) => (
              <div key={col.heading}>
                <p
                  className="font-['Montserrat',sans-serif] text-[#b8922a] text-[1rem] font-semibold uppercase tracking-[0.18em] mb-4"
                >
                  {col.heading}
                </p>

                <div className="flex flex-col">
                  {col.links.map((link, i) => (
                    <Link
                      key={link.label}
                      to={link.href ?? "#"}
                      className="group flex flex-col py-2 no-underline transition-all duration-200 hover:pl-[6px]"
                      style={{
                        borderBottom:
                          i < col.links.length - 1
                            ? "1px solid rgba(184,146,42,0.1)"
                            : "none",
                      }}
                      onClick={onClick}
                    >
                      <span
                        className="font-['Montserrat',sans-serif] text-[#1a1008] text-[1rem] font-medium tracking-[0.03em] transition-colors duration-200 group-hover:text-[#8c2635]"
                      >
                        {link.label}
                      </span>
                      {/* {link.sub && (
                        <span
                          className="font-['Montserrat',sans-serif] text-[#9a8878] text-[0.85rem] mt-[2px]"
                        >
                          {link.sub}
                        </span>
                      )} */}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Vertical divider */}
          <div
            className="hidden md:block w-[1px] flex-shrink-0 bg-[#b8922a]"
          />

          <div
            className="relative overflow-hidden rounded-2xl flex-shrink-0 mx-auto md:mx-0 w-full max-w-[300px] md:w-[260px] max-h-[350px]"
          >
            <img
              src={menu.featured.img}
              alt={menu.featured.title}
              className="w-full h-full object-cover"
              style={{ minHeight: "140px" }}
            />

            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
              }}
            />

            {/* Badge */}
            <div
              className="absolute top-3 left-3 rounded-full px-3 py-[4px]"
              style={{
                border: "1px solid rgba(184,146,42,0.7)",
                backgroundColor: "rgba(0,0,0,0.3)",
              }}
            >
              <span
                className="font-['Montserrat',sans-serif] text-[black] text-[0.55rem] uppercase tracking-[0.18em]"
              >
                {menu.featured.badge}
              </span>
            </div>

            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3
                className="font-['Cormorant Garamond',serif] text-white whitespace-pre-line mb-3 text-[1.2rem] font-semibold leading-snug"
              >
                {menu.featured.title}
              </h3>
              <button
                className="font-['Montserrat',sans-serif] bg-[#8c2635] text-white rounded-full px-4 py-[6px] text-[0.62rem] font-semibold uppercase tracking-wider border-none cursor-pointer transition-opacity duration-200 hover:opacity-90"
                onClick={() => navigate(menu.featured.link)}
              >
                {menu.featured.cta}
              </button>
            </div>
          </div>
        </div>

        {/* Quick links strip */}
        <div
          className="px-10 py-[10px] flex items-center gap-6"
          style={{
            borderTop: "1px solid rgba(184,146,42,0.12)",
            backgroundColor: "rgba(184,146,42,0.04)",
          }}
        >
          <div className="max-w-6xl mx-auto flex items-center gap-6">
            {menu.quickLinks.map((tag) => (
              <a
                key={tag}
                href={getHref(tag)}
                className="font-['Montserrat',sans-serif] text-[0.68rem] font-medium uppercase tracking-[0.06em] no-underline transition-colors duration-200 hover:text-[#b8922a]"
                style={{
                  color: tag === "Sale" ? "#8c2635" : "#4a3f35",
                }}
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}