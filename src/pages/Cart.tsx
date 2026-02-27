import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => (
  <Layout>
    <section className="pt-28 pb-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="gold-gradient-text">سلة التسوق</span>
          </h1>
        </motion.div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 md:p-16 text-center max-w-lg mx-auto"
        >
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-primary/30" />
          <h2 className="text-2xl font-bold mb-3">سلة التسوق فارغة</h2>
          <p className="text-muted-foreground mb-8">لم تقم بإضافة أي منتجات بعد. ابدأ التسوق الآن!</p>
          <Link to="/shop">
            <Button variant="gold" size="lg">
              تسوق الآن
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Cart;
