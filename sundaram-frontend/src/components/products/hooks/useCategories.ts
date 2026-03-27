import { useState, useEffect } from 'react';
import { fetchCategories } from '../../../lib/api';

export function useCategories() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadCategories();
    }, []);

    return { categories, loading };
}
