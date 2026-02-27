import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";
import { testimonials } from "@/data/products";
import { useProducts } from "@/context/ProductContext";
import { Star, Sparkles, Clock, Leaf, Truck, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-perfume.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <img
      src={heroImage}
      alt="عطر فاخر"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="hero-overlay absolute inset-0" />
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block text-primary text-sm font-medium tracking-wider mb-4 border border-primary/30 px-4 py-1.5 rounded-full">
            مجموعة 2026 الحصرية
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          عطرٌ يروي{" "}
          <span className="gold-gradient-text">قصتك</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed"
        >
          اكتشف مجموعة عطورنا الفاخرة المصممة لتترك أثراً لا يُنسى.
          <br />
          من أعماق الشرق إلى أناقة الغرب، نصنع لك تجربة عطرية استثنائية.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-wrap gap-4"
        >
          <Link to="/shop">
            <Button variant="gold" size="lg" className="text-base px-8 h-12">
              تسوق الآن
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="gold-outline" size="lg" className="text-base px-8 h-12">
              اكتشف المجموعة
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
    {/* Scroll indicator */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs text-muted-foreground">اكتشف المزيد</span>
      <div className="w-5 h-8 border border-primary/40 rounded-full flex justify-center pt-1.5">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1 h-1 rounded-full bg-primary"
        />
      </div>
    </motion.div>
  </section>
);

const FeaturedProducts = () => {
  const { products } = useProducts();
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider">مجموعتنا المميزة</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            عطور <span className="gold-gradient-text">استثنائية</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            اكتشف تشكيلة مختارة من أجود العطور الشرقية والغربية
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/shop">
            <Button variant="gold-outline" size="lg">
              عرض جميع المنتجات
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const features = [
  { icon: Sparkles, title: "جودة فاخرة", desc: "مكونات مختارة بعناية من أجود المصادر العالمية" },
  { icon: Clock, title: "ثبات طويل الأمد", desc: "تركيبات مركزة تدوم أكثر من ١٢ ساعة" },
  { icon: Leaf, title: "مكونات طبيعية", desc: "نستخدم مكونات طبيعية ١٠٠٪ بدون مواد كيميائية" },
  { icon: Truck, title: "شحن سريع وآمن", desc: "توصيل مجاني لجميع الطلبات داخل المملكة" },
];

const WhyChooseUs = () => (
  <section className="py-24 bg-secondary/50">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-medium tracking-wider">لماذا نحن</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-3">
          ما يميز <span className="gold-gradient-text">دار الأصالة</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card p-8 text-center group hover:border-primary/30 transition-all duration-500"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <f.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const BestSellers = () => {
  const { products } = useProducts();
  const best = products.filter((p) => p.bestSeller);
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="text-primary text-sm font-medium tracking-wider">الأكثر مبيعاً</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              عطور <span className="gold-gradient-text">مفضلة</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <Button
              variant="gold-outline"
              size="icon"
              onClick={() => setCurrent((p) => (p > 0 ? p - 1 : best.length - 1))}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
              variant="gold-outline"
              size="icon"
              onClick={() => setCurrent((p) => (p < best.length - 1 ? p + 1 : 0))}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {best.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => (
  <section className="py-24 bg-secondary/50">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-medium tracking-wider">آراء عملائنا</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-3">
          ماذا يقول <span className="gold-gradient-text">عملاؤنا</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 relative"
          >
            <Quote className="h-8 w-8 text-primary/20 absolute top-4 left-4" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground/80 text-sm mb-4 leading-relaxed">{t.text}</p>
            <div className="section-divider mb-3" />
            <p className="font-semibold text-sm text-primary">{t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const NewsletterSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-12 md:p-16 text-center max-w-3xl mx-auto relative overflow-hidden"
      >
        <div className="absolute inset-0 gold-gradient opacity-[0.03]" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
          انضم إلى عالم <span className="gold-gradient-text">العطور</span>
        </h2>
        <p className="text-muted-foreground mb-8 relative">
          اشترك في نشرتنا البريدية لتكون أول من يعرف عن أحدث إصداراتنا وعروضنا الحصرية
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
          <input
            type="email"
            placeholder="بريدك الإلكتروني"
            className="flex-1 bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <Button variant="gold" className="px-8 py-3 h-auto">
            اشترك الآن
          </Button>
        </form>
      </motion.div>
    </div>
  </section>
);

const Index = () => (
  <Layout>
    <HeroSection />
    <div className="section-divider" />
    <FeaturedProducts />
    <WhyChooseUs />
    <BestSellers />
    <TestimonialsSection />
    <NewsletterSection />
  </Layout>
);

export default Index;
