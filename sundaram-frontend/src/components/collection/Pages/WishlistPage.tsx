import { useWishlist } from '../../../context/WishlistContext';
import { type Product } from '../../../Data/productsData';
import { useCurrency } from '../../../context/CurrencyContext';
import { useProducts } from '../../products/hooks/useProducts';
import { getImageUrl } from '../../../lib/api';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

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

export default function WishlistPage() {
    const { wishlist, toggleWishlist } = useWishlist();
    const { formatPrice: fmt } = useCurrency();

    const { products: allProducts } = useProducts();

    const products = useMemo(() => {
        if (!allProducts) return [];
        return allProducts
            .filter(p => wishlist.includes(p._id))
            .map(p => ({
                id: p._id,
                name: p.name,
                price: Number(p.price || 0),
                originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
                img: getImageUrl(p.img),
            } as Product));
    }, [allProducts, wishlist]);

    return (
        <div className="min-h-screen bg-[#fffef0]" style={{ fontFamily: SS }}>
            {/* Spacer for Header */}
            <div className="h-[68px] sm:h-[80px]" />

            <div className="max-w-[1300px] mx-auto px-4 lg:px-10 py-12">
                <h1 className="text-[#1a1008] mb-[30px]" style={{ fontFamily: SF, fontSize: "clamp(2rem, 4vw, 2.5rem)" }}>
                    My Wishlist
                </h1>

                {products.length === 0 ? (
                    <div className="text-center py-20 rounded-[18px]" style={{ border: `1px solid ${C.border}`, backgroundColor: C.goldBg }}>
                        <p className="text-[#9a8878] text-[0.9rem] mb-6">Your wishlist is currently empty.</p>
                        <Link to="/collections">
                            <button
                                className="px-6 py-[12px] bg-[#8c2635] text-white text-[0.7rem] tracking-widest uppercase font-semibold rounded-full border-none cursor-pointer transition-transform hover:-translate-y-[1px]"
                                style={{ boxShadow: "0 4px 18px rgba(140,38,53,0.3)" }}>
                                Explore Collections
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {products.map((p) => p && (
                            <div key={p.id} className="relative group cursor-pointer block">
                                <Link to={`/products/${p.id}`} className="no-underline text-inherit block">
                                    <div className="relative rounded-[14px] overflow-hidden mb-[10px] aspect-square" style={{ border: `1px solid ${C.border}` }}>
                                        <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleWishlist({ id: p.id });
                                            }}
                                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[rgba(255,254,240,0.92)] border-none flex items-center justify-center cursor-pointer z-10 transition-opacity"
                                        >
                                            <svg width="17" height="17" viewBox="0 0 24 24" fill={C.burg} stroke={C.burg} strokeWidth="2" strokeLinecap="round">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <h4 className="text-[0.88rem] font-semibold text-[#1a1008] mb-[3px] truncate" style={{ fontFamily: SF }}>{p.name}</h4>
                                    <div className="flex items-center gap-[6px]">
                                        <span className="text-[0.74rem] font-bold text-[#1a1008]">{fmt(p.price)}</span>
                                        {p.originalPrice && <span className="text-[0.62rem] text-[#9a8878] line-through">{fmt(p.originalPrice)}</span>}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
