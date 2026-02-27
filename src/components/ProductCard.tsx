import { Link } from "react-router-dom";
import { MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { Product } from "@/context/ProductContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="glass-card overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/10">
          {/* Image */}
          <div className="relative overflow-hidden aspect-[3/4] bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {product.bestSeller && (
              <span className="absolute top-3 right-3 gold-gradient text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                الأكثر مبيعاً
              </span>
            )}
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < product.rating ? "fill-primary text-primary" : "text-muted"}`}
                />
              ))}
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {product.discountPrice ? (
                  <>
                    <span className="text-sm line-through text-muted-foreground">{product.price} ر.س</span>
                    <span className="text-primary font-bold text-lg">{product.discountPrice} ر.س</span>
                  </>
                ) : (
                  <span className="text-primary font-bold text-lg">{product.price} ر.س</span>
                )}
              </div>
              <Button
                variant="gold"
                size="sm"
                className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const price = product.discountPrice || product.price;
                  const message = encodeURIComponent(`مرحباً، أود طلب عطر "${product.name}" بسعر ${price} ر.س.`);
                  window.open(`https://wa.me/966501234567?text=${message}`, '_blank');
                }}
              >
                <MessageCircle className="h-4 w-4" />
                اطلب عبر الواتساب
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
