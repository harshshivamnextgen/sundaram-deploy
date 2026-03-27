import { useState, useRef, useEffect } from "react";
import { useCurrency, countries } from "../context/CurrencyContext";
import type { Country } from "../context/CurrencyContext";

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
    className="transition-transform duration-[250ms] flex-shrink-0"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="1 3 5 7 9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8c2635" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface CurrencySelectorProps {
  onCountryChange?: (country: Country) => void;
}

export default function CurrencySelector({ onCountryChange }: CurrencySelectorProps) {
  const { selectedCountry: selected, setSelectedCountry: setSelected } = useCurrency();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.currency.toLowerCase().includes(search.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false); setSearch("");
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Auto-focus search
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 60);
  }, [open]);

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setSearch(""); } };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (country: Country) => {
    setSelected(country); setOpen(false); setSearch(""); onCountryChange?.(country);
  };

  return (
    <div ref={containerRef} className="relative">

      {/* ── Trigger ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Select country and currency"
        className="flex items-center gap-[6px] rounded-full px-3 py-2 cursor-pointer transition-all duration-200 hover:-translate-y-[1px] bg-transparent text-[#4a3f35] border border-[rgba(184,146,42,0.35)] hover:border-[#8c2635] hover:text-[#8c2635] font-['Montserrat',sans-serif]">
        <span className="text-base leading-none pb-[5px]">{selected.flag}</span>
        <span className="text-[0.72rem] font-medium tracking-wide hidden lg:block">{selected.currency}</span>
        <ChevronDown open={open} />
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-[260px] rounded-2xl overflow-hidden z-[60] bg-[#fffef0] border border-[rgba(184,146,42,0.2)] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          style={{ animation: "currencyDrop 0.22s cubic-bezier(0.16,1,0.3,1) both" }}>
          <style>{`@keyframes currencyDrop{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>

          {/* Header */}
          <div className="px-4 pt-4 pb-3 border-b border-[rgba(184,146,42,0.15)]">
            <p className="text-[0.6rem] uppercase tracking-[0.18em] mb-3 text-[#b8922a] font-['Montserrat',sans-serif]">
              Select Country & Currency
            </p>
            {/* Search */}
            <div className="flex items-center gap-2 rounded-xl px-3 py-[7px] border border-[rgba(184,146,42,0.3)] bg-[rgba(184,146,42,0.04)]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9a8878" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input ref={searchRef} type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search country..."
                className="flex-1 bg-transparent border-none outline-none text-[0.75rem] text-[#1a1008] font-['Montserrat',sans-serif]" />
            </div>
          </div>

          {/* Country list */}
          <div className="py-2 overflow-y-auto max-h-[280px]">
            {filtered.length > 0 ? filtered.map(country => {
              const isSel = selected.code === country.code;
              return (
                <button key={country.code} onClick={() => handleSelect(country)}
                  className={`w-full flex items-center gap-3 px-4 py-[10px] border-none cursor-pointer transition-colors duration-150 text-left font-['Montserrat',sans-serif] ${isSel ? "bg-[rgba(140,38,53,0.06)]" : "bg-transparent hover:bg-[rgba(184,146,42,0.07)]"}`}>
                  <span className="text-xl leading-none flex-shrink-0">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[0.78rem] font-medium leading-tight truncate ${isSel ? "text-[#8c2635]" : "text-[#1a1008]"}`}>
                      {country.name}
                    </p>
                    <p className="text-[0.65rem] mt-[1px] text-[#9a8878]">
                      {country.currency} · {country.symbol}
                    </p>
                  </div>
                  {isSel && <span className="flex-shrink-0"><CheckIcon /></span>}
                </button>
              );
            }) : (
              <div className="px-4 py-6 text-center">
                <p className="text-[0.75rem] text-[#9a8878] font-['Montserrat',sans-serif]">No results for "{search}"</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-[rgba(184,146,42,0.15)] bg-[rgba(184,146,42,0.03)]">
            <p className="text-[0.6rem] leading-relaxed text-[#9a8878] font-['Montserrat',sans-serif]">
              Prices shown in{" "}
              <span className="text-[#8c2635] font-semibold">{selected.currency} ({selected.symbol})</span>
              {" "}· Rates updated daily
            </p>
          </div>
        </div>
      )}
    </div>
  );
}