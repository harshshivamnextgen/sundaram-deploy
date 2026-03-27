import { useState, useEffect } from 'react';
import { fetchProduct } from '../../../lib/api';

export function useProduct(id: string | undefined) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        // If it looks like a purely numeric ID string and not a mongodb ID length, 
        // we could skip, but let's just let it fail gracefully or fetch if it happens to match.
        // Actually, if it's a number we might still want to avoid hitting the API.
        
        if (!isNaN(Number(id)) && id.length < 24) {
            setLoading(false);
            return;
        }

        async function loadProduct() {
            try {
                setLoading(true);
                const data = await fetchProduct(id as string);
                setProduct(data);
                setError(null);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [id]);

    return { product, loading, error };
}
