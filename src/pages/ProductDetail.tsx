import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
          <Link to="/shop">
            <Button variant="gold">العودة للمتجر</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <Layout>
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              {product.bestSeller && (
                <span className="inline-block gold-gradient text-primary-foreground text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                  الأكثر مبيعاً
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < product.rating ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.rating}/5)</span>
              </div>
              <p className="text-3xl font-bold text-primary mb-6">{product.price} ر.س</p>
              <p className="text-foreground/70 leading-relaxed mb-6">{product.longDescription}</p>

              {/* Notes */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-sm text-muted-foreground">مكونات العطر:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="text-xs border border-primary/30 text-primary px-3 py-1.5 rounded-full"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">الحجم: {product.size}</p>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Button
                  variant="gold"
                  size="lg"
                  className="flex-1 h-14 text-lg font-bold hover:scale-[1.02] transition-transform bg-green-600 hover:bg-green-700 text-white border-none"
                  onClick={() => {
                    const price = product.discountPrice || product.price;
                    const message = encodeURIComponent(`مرحباً، أريد طلب عطر "${product.name}" بسعر ${price} ر.س.`);
                    window.open(`https://wa.me/966501234567?text=${message}`, '_blank');
                  }}
                >
                  <MessageCircle className="h-6 w-6 ml-2" />
                  اطلب الآن عبر الواتساب
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="text-3xl font-bold mb-10">
                منتجات <span className="gold-gradient-text">مشابهة</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
