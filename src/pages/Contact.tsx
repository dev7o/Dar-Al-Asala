import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  { icon: MapPin, title: "العنوان", desc: "الرياض، المملكة العربية السعودية" },
  { icon: Phone, title: "الهاتف", desc: "966+ 50 123 4567" },
  { icon: Mail, title: "البريد الإلكتروني", desc: "info@daralasala.com" },
  { icon: Clock, title: "ساعات العمل", desc: "السبت - الخميس: 9 صباحاً - 10 مساءً" },
];

const Contact = () => (
  <Layout>
    <section className="pt-28 pb-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="gold-gradient-text">تواصل معنا</span>
          </h1>
          <p className="text-muted-foreground text-lg">نسعد بتواصلك معنا</p>
        </motion.div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h2>
            <form className="space-y-5">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">الاسم</label>
                <input
                  type="text"
                  placeholder="اسمك الكامل"
                  className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">الرسالة</label>
                <textarea
                  rows={5}
                  placeholder="اكتب رسالتك هنا..."
                  className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <Button variant="gold" className="w-full h-12 text-base">
                إرسال الرسالة
              </Button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((item, i) => (
              <div key={item.title} className="glass-card p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="glass-card overflow-hidden h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-10 w-10 mx-auto mb-3 text-primary/50" />
                <p className="text-sm">خريطة الموقع</p>
                <p className="text-xs mt-1">الرياض، المملكة العربية السعودية</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;
