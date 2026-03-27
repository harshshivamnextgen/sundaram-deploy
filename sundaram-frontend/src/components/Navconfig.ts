// ─────────────────────────────────────────────
//  navConfig.ts
//  Central config for ALL header navigation.
//  Add / remove nav items here only.
// ─────────────────────────────────────────────

export interface NavLink {
  label: string;
  sub?: string;
  href?: string;
}

export interface NavColumn {
  heading: string;
  links: NavLink[];
}

export interface FeaturedCard {
  badge: string;
  title: string;
  cta: string;
  img: string;
  link: string;
}

export interface NavItem {
  label: string;
  href?: string;                // if set → simple link, no mega menu
  megaMenu?: {
    columns: NavColumn[];
    featured: FeaturedCard;
    quickLinks: string[];
  };
}

import { useCategories } from "./products/hooks/useCategories";
import { getImageUrl } from "../lib/api";

// ─── NAV ITEMS ───────────────────────────────
export const useNavConfig = (): NavItem[] => {
  const { categories } = useCategories();

  // Helper to map DB categories to individual links
  const mapLinks = (list: any[], defaultRoutePrefix: string) => list.map((c: any) => ({
    label: c.name,
    sub: c.description || "",
    href: c.route || `${defaultRoutePrefix}/${c.name.toLowerCase().replace(/\s+/g, '-')}`
  }));

  const dynamicCategoryLinks = mapLinks(categories?.filter((c: any) => !c.type || c.type === 'category') || [], "/collections");
  const dynamicStyleLinks = mapLinks(categories?.filter((c: any) => c.type === 'style') || [], "/collections/style");
  const dynamicMetalLinks = mapLinks(categories?.filter((c: any) => c.type === 'metal') || [], "/collections/metal");

  // Determine featured cards from DB
  const featuredCats = categories?.filter((c: any) => c.heroImage) || [];

  // Pick the most recent for Collections, second most recent for Services
  const colCat = featuredCats[featuredCats.length - 1];
  const srvCat = featuredCats.length > 1 ? featuredCats[featuredCats.length - 2] : null;

  const featuredCollection: FeaturedCard = {
    badge: colCat ? (colCat.type || "Collection").toUpperCase() : "NEW ARRIVALS",
    title: colCat ? colCat.name : "The Lock\nCollection",
    cta: "Explore Now",
    img: colCat ? getImageUrl(colCat.heroImage) : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85&fit=crop",
    link: colCat ? (colCat.route || `/collections/${colCat.name.toLowerCase().replace(/\s+/g, '-')}`) : "/collections",
  };

  const featuredService: FeaturedCard = {
    badge: srvCat ? (srvCat.type || "Bespoke").toUpperCase() : "BESPOKE",
    title: srvCat ? srvCat.name : "Custom\nCreations",
    cta: "Start Exploring",
    img: srvCat ? getImageUrl(srvCat.heroImage) : "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=85&fit=crop",
    link: srvCat ? (srvCat.route || `/collections/${srvCat.name.toLowerCase().replace(/\s+/g, '-')}`) : "/products/104",
  };

  return [
    // ① Collections — full mega menu
    {
      label: "Collections",
      megaMenu: {
        columns: [
          {
            heading: "BY CATEGORY",
            links: dynamicCategoryLinks,
          },
          {
            heading: "BY STYLE",
            links: dynamicStyleLinks,
          },
          {
            heading: "BY METAL",
            links: dynamicMetalLinks,
          },
        ],
        featured: featuredCollection,
        quickLinks: ["New Arrivals", "Best Sellers", "Gift Sets", "Sale"],
      },
    },

    // ③ Services — mega menu
    {
      label: "Services",
      megaMenu: {
        columns: [
          {
            heading: "JEWELLERY CARE",
            links: [
              { label: "Cleaning", sub: "Restore original shine", href: "/services/cleaning" },
              { label: "Resizing", sub: "Perfect fit, every time", href: "/services/resizing" },
              { label: "Repair", sub: "Restore damaged pieces", href: "/services/repair" },
              { label: "Engraving", sub: "Personal touch", href: "/services/engraving" },
            ],
          },
          {
            heading: "EXPERT SERVICES",
            links: [
              { label: "Authentication", sub: "Certified verification", href: "/services/authentication" },
              { label: "Appraisal", sub: "Know your value", href: "/services/appraisal" },
              { label: "Restoration", sub: "Heirloom revival", href: "/services/restoration" },
              { label: "Custom Design", sub: "Create your dream piece", href: "/services/custom-design" },
            ],
          },
        ],
        featured: featuredService,
        quickLinks: ["Book a Service", "Pricing", "FAQ", "Warranty"],
      },
    },

    // ④ About — simple link (no mega menu)
    {
      label: "About Us",
      href: "#about",
    },

    // ④ Contact — simple link (no mega menu)
    {
      label: "Contact",
      href: "#contact",
    },

  ];
}