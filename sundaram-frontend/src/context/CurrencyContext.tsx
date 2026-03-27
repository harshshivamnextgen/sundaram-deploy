import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export const countries = [
    { code: "IN", name: "India", currency: "INR", symbol: "₹", flag: "🇮🇳" },
    { code: "US", name: "United States", currency: "USD", symbol: "$", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", currency: "GBP", symbol: "£", flag: "🇬🇧" },
    { code: "AU", name: "Australia", currency: "AUD", symbol: "A$", flag: "🇦🇺" },
    { code: "AE", name: "UAE", currency: "AED", symbol: "د.إ", flag: "🇦🇪" },
    { code: "SG", name: "Singapore", currency: "SGD", symbol: "S$", flag: "🇸🇬" },
    { code: "CA", name: "Canada", currency: "CAD", symbol: "C$", flag: "🇨🇦" },
    { code: "EU", name: "Europe", currency: "EUR", symbol: "€", flag: "🇪🇺" },
];

export type Country = typeof countries[number];

interface CurrencyContextType {
    selectedCountry: Country;
    setSelectedCountry: (country: Country) => void;
    formatPrice: (priceInINR: number) => string;
    rates: Record<string, number> | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
    const [rates, setRates] = useState<Record<string, number> | null>(null);

    useEffect(() => {
        // Fetch real-time exchange rates with INR as base
        fetch("https://open.er-api.com/v6/latest/INR")
            .then(res => res.json())
            .then(data => {
                if (data && data.rates) {
                    setRates(data.rates);
                }
            })
            .catch(err => console.error("Failed to fetch exchange rates:", err));
    }, []);

    const formatPrice = (priceInINR: number) => {
        const currency = selectedCountry.currency;
        const symbol = selectedCountry.symbol;

        let finalPrice = priceInINR;
        if (rates && rates[currency]) {
            finalPrice = priceInINR * rates[currency];
        } else if (currency !== 'INR') {
            // Fallback default rates if API fails
            const fallbacks: Record<string, number> = {
                USD: 0.012, GBP: 0.0095, AUD: 0.018, AED: 0.044, SGD: 0.016, CAD: 0.016, EUR: 0.011
            };
            if (fallbacks[currency]) finalPrice = priceInINR * fallbacks[currency];
        }

        // Format integer or up to 2 decimals if small
        const formattedNum = finalPrice.toLocaleString("en-IN", {
            maximumFractionDigits: currency === 'INR' ? 0 : 2,
            minimumFractionDigits: currency === 'INR' ? 0 : 2
        });

        return `${symbol} ${formattedNum}`;
    };

    return (
        <CurrencyContext.Provider value={{ selectedCountry, setSelectedCountry, formatPrice, rates }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}
