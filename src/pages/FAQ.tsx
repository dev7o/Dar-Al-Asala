import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "هل العطور أصلية؟", a: "نعم، جميع عطورنا أصلية 100% ومصنوعة من أجود المكونات الطبيعية في مصانعنا الخاصة." },
  { q: "ما هي مدة ثبات العطور؟", a: "تتميز عطورنا بثبات يتراوح بين 8 إلى 14 ساعة حسب نوع العطر وتركيزه." },
  { q: "هل يمكنني تجربة العطر قبل الشراء؟", a: "نعم، يمكنك طلب عينات مجانية مع أي طلب، أو زيارة أحد فروعنا لتجربة العطور." },
  { q: "ما هي طرق الدفع المتاحة؟", a: "نقبل الدفع بالبطاقات الائتمانية (فيزا، ماستركارد)، مدى، Apple Pay، والدفع عند الاستلام." },
  { q: "هل يوجد ضمان على المنتجات؟", a: "نعم، جميع منتجاتنا مضمونة. إذا وجدت أي عيب في المنتج، يمكنك استبداله أو استرداد المبلغ." },
  { q: "كيف أختار العطر المناسب لي؟", a: "يمكنك التواصل مع فريق خبراء العطور لدينا للحصول على استشارة مجانية ومساعدتك في اختيار العطر المثالي." },
];

const FAQ = () => (
  <Layout>
    <section className="pt-28 pb-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="gold-gradient-text">الأسئلة الشائعة</span></h1>
        </motion.div>
      </div>
    </section>
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 border-none">
                <AccordionTrigger className="text-right font-semibold hover:text-primary hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default FAQ;
