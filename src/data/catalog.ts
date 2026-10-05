export type Product = {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  image: string;
  reviews: number;
};

export const products: Product[] = [
  {
    id: "royal-blue-soft-silk",
    name: "Royal Blue Soft Silk Saree",
    price: "₹2,499",
    originalPrice: "₹3,499",
    discount: "29% OFF",
    image: "/images/royal-blue-saree.png",
    reviews: 128,
  },
  {
    id: "lavender-banarasi",
    name: "Lavender Banarasi Saree",
    price: "₹3,199",
    originalPrice: "₹4,599",
    discount: "30% OFF",
    image: "/images/lavender-saree.png",
    reviews: 156,
  },
  {
    id: "peach-kanjivaram",
    name: "Peach Kanjivaram Saree",
    price: "₹2,899",
    originalPrice: "₹4,199",
    discount: "31% OFF",
    image: "/images/peach-saree.png",
    reviews: 102,
  },
  {
    id: "sea-green-soft-silk",
    name: "Sea Green Soft Silk Saree",
    price: "₹2,399",
    originalPrice: "₹3,299",
    discount: "27% OFF",
    image: "/images/sea-green-saree.png",
    reviews: 98,
  },
  {
    id: "beige-banarasi",
    name: "Beige Banarasi Saree",
    price: "₹3,099",
    originalPrice: "₹4,499",
    discount: "31% OFF",
    image: "/images/beige-saree.png",
    reviews: 84,
  },
];

export const categories = [
  { name: "Sarees", image: "/images/royal-blue-saree.png" },
  { name: "Banarasi", image: "/images/lavender-saree.png" },
  { name: "Kanjivaram", image: "/images/peach-saree.png" },
  { name: "Soft Silk", image: "/images/sea-green-saree.png" },
  { name: "Festive", image: "/images/beige-saree.png" },
];
