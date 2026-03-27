// ─────────────────────────────────────────────────────
//  productsData.ts
//  Dynamic Product Types & Interfaces.
// ─────────────────────────────────────────────────────

export interface Product {
  id: number | string;
  name: string;
  price: number;
  originalPrice?: number;
  img: string;
  hoverImg: string;
  badge?: string;
  carat: string;
  shape: string;
  occasion: string;
  type: string;       // type / necklaceType / eartype etc.
  isNew?: boolean;
  isBestseller?: boolean;
  style?: string;
  metal?: string;
  gender?: string;
}

export interface FilterOptions {
  carat: string[];
  shape: string[];
  occasion: string[];
  type: string[];
  typeLabel: string;  // "Ring Type" / "Necklace Type" / etc.
  gender?: string[];
}

export interface CategoryData {
  title: string;
  breadcrumb: string;
  priceMax: number;
  products: Product[];
  filters: FilterOptions;
}

// ─── CATEGORY CONSTANTS ───────────────────────────────
// Keep the object structure but leave it empty for dynamic population
export const CATEGORIES: Record<string, CategoryData> = {};

// ─── Helper to find product by ID across all categories ───
// NOTE: This will now return undefined since CATEGORIES is empty. 
// You should use hooks like useProduct(id) instead for dynamic data.
export function getProductById(): Product | undefined {
  return undefined;
}

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[];
