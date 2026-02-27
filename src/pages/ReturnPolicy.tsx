import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { RotateCcw } from "lucide-react";

const ReturnPolicy = () => (
  <Layout>
    <section className="pt-28 pb-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="gold-gradient-text">سياسة الإرجاع</span></h1>
        </motion.div>
      </div>
    </section>
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 md:p-12 space-y-8">
          {[
            { title: "شروط الإرجاع", text: "يمكنك إرجاع المنتج خلال 14 يوماً من تاريخ الاستلام بشرط أن يكون المنتج في حالته الأصلية ولم يُفتح أو يُستخدم." },
            { title: "كيفية الإرجاع", text: "تواصل مع خدمة العملاء عبر البريد الإلكتروني أو الهاتف لطلب إرجاع المنتج. سيتم إرسال بطاقة شحن مجانية لإعادة المنتج." },
            { title: "استرداد المبلغ", text: "يتم استرداد المبلغ خلال 5-7 أيام عمل بعد استلام المنتج المُرجع والتأكد من حالته." },
            { title: "المنتجات المستثناة", text: "لا يمكن إرجاع العطور التي تم فتحها أو استخدامها، وذلك لأسباب صحية وسلامة المنتج." },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default ReturnPolicy;
