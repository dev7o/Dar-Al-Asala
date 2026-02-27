import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const Terms = () => (
  <Layout>
    <section className="pt-28 pb-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="gold-gradient-text">شروط الاستخدام</span></h1>
        </motion.div>
      </div>
    </section>
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 md:p-12 space-y-8">
          {[
            { title: "القبول بالشروط", text: "باستخدامك لموقع دار الأصالة، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل استخدام الموقع." },
            { title: "استخدام الموقع", text: "يُسمح لك باستخدام هذا الموقع للأغراض الشخصية والتجارية المشروعة فقط. يُحظر أي استخدام غير قانوني أو ضار للموقع." },
            { title: "حقوق الملكية الفكرية", text: "جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والصور والشعارات والتصاميم، هي ملكية حصرية لدار الأصالة." },
            { title: "سياسة الخصوصية", text: "نحرص على حماية بياناتك الشخصية ولا نشاركها مع أي طرف ثالث إلا بموافقتك أو حسب ما يقتضيه القانون." },
            { title: "تعديل الشروط", text: "تحتفظ دار الأصالة بحق تعديل هذه الشروط في أي وقت. ستُنشر التعديلات على هذه الصفحة ويُعتبر استمرارك في استخدام الموقع قبولاً لها." },
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

export default Terms;
