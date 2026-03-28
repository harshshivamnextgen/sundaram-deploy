import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5013');

// Create an instance for cleaner reusable config
const api = axios.create({
     baseURL: API_BASE ? `${API_BASE}/api` : '/api',
});

export async function fetchProducts(params: Record<string, string | number> = {}) {
    try {
        // Axios handles the URL construction and filtering undefined/null params automatically
        const response = await api.get('/products', { params });

        // Axios stores the parsed JSON in 'data'
        // Based on your original code, we return response.data.data
        return response.data.data;
    } catch (error: any) {
        // Axios throws on non-2xx status codes automatically
        const message = error.response?.data?.message || 'Failed to fetch products';
        throw new Error(message);
    }
}

export async function fetchProduct(id: string) {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data.data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to fetch product';
        throw new Error(message);
    }
}

export async function fetchCategories() {
    try {
        const response = await api.get('/categories');
        return response.data.data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to fetch categories';
        throw new Error(message);
    }
}


export const getImageUrl = (path: string | undefined) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    const cleanPath = path.replace(/^\//, '');
    // alert(cleanPath)
    // const finalPath = `uploads/products/Necklace/${cleanPath}`;
    const finalPath = `${cleanPath}`;

    return `${API_BASE}/${finalPath}`;
};
