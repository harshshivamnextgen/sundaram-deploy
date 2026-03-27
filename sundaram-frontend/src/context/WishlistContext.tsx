import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface WishlistContextType {
    wishlist: (number | string)[];
    toggleWishlist: (product: { id: number | string }) => void;
    isInWishlist: (id: number | string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlist, setWishlist] = useState<(number | string)[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("wishlist");
        if (saved) {
            try {
                setWishlist(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse wishlist from local storage", e);
            }
        }
    }, []);

    const toggleWishlist = (product: { id: number | string }) => {
        setWishlist((prev) => {
            const newWishlist = prev.includes(product.id)
                ? prev.filter((id) => id !== product.id)
                : [...prev, product.id];
            localStorage.setItem("wishlist", JSON.stringify(newWishlist));
            return newWishlist;
        });
    };

    const isInWishlist = (id: number | string) => wishlist.includes(id);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};
