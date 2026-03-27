import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavConfig } from "./Navconfig";
import Megamenu from "./Megamenu";
import SearchBar from "./Searchbar";
import CurrencySelector from "./CurrencySelector";
import { useNavigate } from "react-router-dom";

// ── Icons ─────────────────────────────────────


const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="10" height="10" viewBox="0 0 10 10" fill="none"
    style={{
      transition: "transform 0.25s ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <polyline
      points="1 3 5 7 9 3"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
    />
  </svg>
);

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const NAV_ITEMS = useNavConfig();

  useEffect(() => {
    const onScroll = () => { };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const toggleMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (activeMenu === label) {
      setActiveMenu(null);
    } else {
      setActiveMenu(label);
    }
  };

  const closeAll = () => {
    setActiveMenu(null);
    setMobileOpen(false);
  };

  const activeItem = NAV_ITEMS.find((n) => n.label === activeMenu && n.megaMenu);

  return (
    <>
      {/* Mega menu — full-width, outside header flow */}
      {activeItem && (
        <Megamenu
          item={activeItem}
          onMouseLeave={closeMenu}
          onMouseEnter={() => openMenu(activeItem.label)}
          onClick={closeAll}
        />
      )}

      <header
        className={`fixed w-full top-0 z-50 transition-shadow duration-300 bg-[#fffef0]`}
      // className={`fixed w-full top-0 z-50 transition-shadow duration-300`}


      >
        {/* Gold accent bar */}
        <div
          className="h-[3px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #b8922a 30%, #d4a843 50%, #b8922a 70%, transparent 100%)",
          }}
        />

        {/* Nav row */}
        <nav
          className="flex items-center justify-between h-[68px] px-6 md:px-10"
          style={{
            borderBottom: activeMenu
              ? "2px solid transparent"
              : "2px solid transparent"
          }}
        >
          {/* ── Logo ── */}
          <div className="flex items-center">

            <a
              href="/"
              className="flex items-center no-underline cursor-pointer"
            >
              <img src="/Sundaram_Horizontal_Logo.svg" alt="Sundaram Jewels" className="w-[140px] sm:w-[170px] md:w-[200px] lg:w-[250px]" height={50} />
            </a>
          </div>
          {/* ── Desktop nav links ── */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-9 list-none m-0 p-0">
            {NAV_ITEMS.map((item) => {
              const isOpen = activeMenu === item.label;
              const hasMega = !!item.megaMenu;

              return (
                <li
                  key={item.label}
                  onMouseEnter={() => (hasMega ? openMenu(item.label) : closeMenu())}
                  onMouseLeave={hasMega ? closeMenu : undefined}
                >
                  {hasMega ? (
                    <button
                      className="font-['Montserrat',sans-serif] flex items-center gap-[5px] text-[0.7rem] xl:text-[0.78rem] font-medium uppercase tracking-[0.06em] border-none bg-transparent cursor-pointer pb-[2px] transition-colors duration-200"
                      style={{
                        color: isOpen ? "#b8922a" : "#1a1008",
                      }}
                      // onClick={() => toggleMenu(item.label)}
                      onClick={() => {
                        toggleMenu(item.label)
                        if (item.label === "Collections") {
                          navigate("/collections");
                        } else {
                          navigate(item.label.toLowerCase().trim().replace(/[#\s]+/g, "-"))
                        }
                      }}

                    >
                      {item.label}
                      <ChevronDown open={isOpen} />
                    </button>
                  ) : (
                    <Link
                      // to={item.href ? (item.href.startsWith('/') ? item.href : `/${item.href}`) : `/${item.label.toLowerCase().trim().replace(/[#\s]+/g, "-")}`}
                      to={
                        (item.href ?? `/${item.label}`)
                          .toLowerCase()
                          .trim()
                          .replace("#", "")          // Remove any existing hash
                          .replace(/\s+/g, "-")      // Replace spaces with dashes
                          .replace(/^\/?/, "/")      // Ensure it starts with exactly one "/"
                      }
                      className="font-['Montserrat',sans-serif] text-[#1a1008] text-[0.7rem] xl:text-[0.78rem] flex items-center font-medium uppercase tracking-[0.06em] no-underline pb-[2px] transition-colors duration-200"
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "#b8922a")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "#1a1008")
                      }
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* ── Right side: Currency · Search · Book ── */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">

            {/* Currency / Country selector */}
            <CurrencySelector
              onCountryChange={(country) => {
                console.log("Country changed:", country.name, country.symbol);
              }}
            />

            <div
              className="w-[1px] h-5 flex-shrink-0 bg-[#b8922a]"
            // style={{ backgroundColor: "rgba(184,146,42,0.3)" }}
            />

            {/* Search bar */}
            <SearchBar />

            {/* Thin gold divider between search and Wishlist */}
            <div className="w-[1px] h-5 flex-shrink-0 bg-[#b8922a]" />

            {/* Wishlist Link */}
            <Link to="/wishlist" className="flex items-center justify-center w-8 h-8 rounded-full border border-transparent transition-colors hover:bg-[rgba(184,146,42,0.1)] hover:border-[#b8922a]/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1008" strokeWidth="2" strokeLinecap="round" className="transition-colors">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>

            {/* Thin gold divider between Wishlist and CTA */}
            <div className="w-[1px] h-5 flex-shrink-0 bg-[#b8922a]" />

            {/* Book Appointment CTA */}
            <button
              className="font-['Montserrat',sans-serif] bg-[#8c2635] rounded-full px-4 xl:px-[22px] py-2 xl:py-[10px] text-white text-[0.7rem] xl:text-[0.75rem] font-semibold uppercase tracking-widest border-none cursor-pointer transition-all duration-200 hover:-translate-y-[1px]"
              style={{
                boxShadow: "0 2px 12px rgba(140,38,53,0.18)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#a02d3e")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#8c2635")
              }
              onClick={() => navigate("/book-appointment")}
            >
              Book Appointment
            </button>
          </div>

          {/* ── Hamburger — mobile only ── */}
          <button
            className="flex lg:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-[22px] h-[1.5px] rounded-sm"
                style={{ backgroundColor: "#1a1008" }}
              />
            ))}
          </button>
        </nav>

        {/* ── Mobile dropdown ── */}
        {mobileOpen && (
          <div
            className="flex lg:hidden flex-col px-6 pb-6 pt-4 gap-1 bg-[#fffef0]"
            style={{
              borderTop: "1px solid rgba(184,146,42,0.25)",
            }}
          >
            {/* Search in mobile menu */}
            <div className="mb-4">
              <SearchBar />
            </div>

            {NAV_ITEMS.map((item) => {
              const hasMega = !!item.megaMenu;
              const isOpen = activeMenu === item.label;

              return hasMega ? (
                <button
                  key={item.label}
                  onClick={() => toggleMenu(item.label)}
                  className="font-['Montserrat',sans-serif] flex items-center justify-between w-full text-[0.82rem] font-medium uppercase tracking-widest no-underline py-[10px] bg-transparent border-none text-left cursor-pointer"
                  style={{
                    color: isOpen ? "#b8922a" : "#1a1008",
                    borderBottom: "1px solid rgba(184,146,42,0.1)",
                  }}
                >
                  {item.label}
                  <ChevronDown open={isOpen} />
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.href ?? `#${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={closeAll}
                  className="font-['Montserrat',sans-serif] text-[#1a1008] text-[0.82rem] font-medium uppercase tracking-widest no-underline py-[10px]"
                  style={{
                    borderBottom: "1px solid rgba(184,146,42,0.1)",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Currency selector in mobile */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[0.7rem] uppercase tracking-widest font-semibold opacity-60">Currency</span>
              <CurrencySelector />
            </div>

            {/* Wishlist link in mobile */}
            <Link to="/wishlist" onClick={closeAll} className="mt-4 flex items-center justify-between no-underline border-b border-[rgba(184,146,42,0.1)] pb-3">
              <span className="text-[0.82rem] uppercase tracking-widest font-medium text-[#1a1008]" style={{ fontFamily: "'Montserrat',sans-serif" }}>Wishlist</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1008" strokeWidth="2" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>

            <button
              className="font-['Montserrat',sans-serif] bg-[#8c2635] mt-6 rounded-full py-3 text-white text-[0.75rem] font-semibold uppercase tracking-widest border-none cursor-pointer"
            >
              Book Appointment
            </button>
          </div>
        )}

      </header>
    </>
  );
}