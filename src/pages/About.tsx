import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Sparkles, Eye, Target, Heart } from "lucide-react";

const timeline = [
  { year: "2018", title: "البداية", desc: "تأسست دار الأصالة برؤية لإعادة إحياء فن العطور الشرقية" },
  { year: "2020", title: "التوسع", desc: "افتتاح أول فرع لنا في الرياض وإطلاق ١٠ عطور حصرية" },
  { year: "2022", title: "الانتشار", desc: "توسعنا إلى دول الخليج وأطلقنا متجرنا الإلكتروني" },
  { year: "2024", title: "العالمية", desc: "دخلنا الأسواق العالمية وحصلنا على جوائز دولية" },
  { year: "2026", title: "المستقبل", desc: "نواصل الابتكار ونسعى لنكون الوجهة الأولى للعطور الفاخرة" },
];

const About = () => (
  <Layout>
    {/* Header */}
    <section className="pt-28 pb-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="gold-gradient-text">من نحن</span>
          </h1>
          <p className="text-muted-foreground text-lg">قصة شغف بالعطور تمتد عبر الزمن</p>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            قصة <span className="gold-gradient-text">دار الأصالة</span>
          </h2>
          <p className="text-foreground/70 leading-loose text-lg mb-6">
            بدأت رحلتنا من شغف عميق بعالم العطور وتراثها العريق في الثقافة العربية. نؤمن بأن العطر هو أكثر من مجرد رائحة — إنه هوية، وذكرى، وقصة تُروى بدون كلمات.
          </p>
          <p className="text-foreground/70 leading-loose text-lg">
            في دار الأصالة، نمزج بين الحرفية التقليدية والابتكار الحديث لنصنع عطوراً استثنائية تعكس ذوقك الرفيع. نختار أفخر المكونات الطبيعية من حول العالم ونحولها إلى تجارب عطرية لا تُنسى.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Eye,
              title: "رؤيتنا",
              desc: "أن نكون الوجهة الأولى للعطور الفاخرة في العالم العربي، ونقدم تجربة عطرية تجمع بين الأصالة والحداثة.",
            },
            {
              icon: Target,
              title: "رسالتنا",
              desc: "صناعة عطور استثنائية بجودة عالمية تحتفي بالتراث العطري العربي وتلبي تطلعات العملاء المميزين.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-10 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center">
                <item.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          رحلتنا عبر <span className="gold-gradient-text">الزمن</span>
        </motion.h2>
        <div className="relative">
          {/* Line */}
          <div className="absolute right-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0 relative z-10">
                  {item.year}
                </div>
                <div className="glass-card p-6 flex-1">
                  <h3 className="font-bold text-lg text-primary mb-2">{item.title}</h3>
                  <p className="text-foreground/70 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
