import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const Shipping = () => (
  <Layout>
    <section className="pt-28 pb-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="gold-gradient-text">الشحن والتوصيل</span></h1>
        </motion.div>
      </div>
    </section>
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 md:p-12 space-y-8">
          {[
            { title: "مناطق التوصيل", text: "نوفر خدمة التوصيل لجميع مناطق المملكة العربية السعودية ودول مجلس التعاون الخليجي." },
            { title: "مدة التوصيل", text: "داخل المملكة: 2-4 أيام عمل. دول الخليج: 5-7 أيام عمل. الدول الأخرى: 7-14 يوم عمل." },
            { title: "تكلفة الشحن", text: "شحن مجاني لجميع الطلبات داخل المملكة التي تزيد قيمتها عن 200 ر.س. للطلبات الأقل، رسوم الشحن 25 ر.س." },
            { title: "تتبع الطلب", text: "بعد شحن طلبك، ستتلقى رسالة بريدية تحتوي على رقم التتبع لمتابعة حالة طلبك." },
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

export default Shipping;
