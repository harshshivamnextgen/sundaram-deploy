import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../../../lib/api';

export function useProducts(params?: Record<string, string | number>) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            // Using src/lib/api.ts which takes 1 argument (params) and returns the data array directly
            const data = await fetchProducts(params);
            console.log(`[useProducts] Fetched ${Array.isArray(data) ? data.length : 'non-array'} products`, data);
            setProducts(Array.isArray(data) ? data : []);
        } catch (err: any) {
            console.error('[useProducts] Error fetching products:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(params)]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {
        products,
        loading,
        error,
        refresh,
    };
}
