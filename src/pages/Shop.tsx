import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

type Category = "all" | "men" | "women" | "unisex";
type SortBy = "default" | "price-asc" | "price-desc" | "best";

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "men", label: "رجالي" },
  { value: "women", label: "نسائي" },
  { value: "unisex", label: "للجنسين" },
];

const Shop = () => {
  const { products } = useProducts();
  const [category, setCategory] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<SortBy>("default");
  const [showFilters, setShowFilters] = useState(false);

  let filtered = category === "all" ? products : products.filter((p) => p.category === category);

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === "best") filtered = [...filtered].sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));

  return (
    <Layout>
      {/* Header */}
      <section className="pt-28 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="gold-gradient-text">المتجر</span>
            </h1>
            <p className="text-muted-foreground">اكتشف مجموعتنا الكاملة من العطور الفاخرة</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filters bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={category === cat.value ? "gold" : "gold-outline"}
                  size="sm"
                  onClick={() => setCategory(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="bg-muted border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
            >
              <option value="default">الترتيب الافتراضي</option>
              <option value="price-asc">السعر: من الأقل</option>
              <option value="price-desc">السعر: من الأعلى</option>
              <option value="best">الأكثر مبيعاً</option>
            </select>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              لا توجد منتجات في هذا التصنيف
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
