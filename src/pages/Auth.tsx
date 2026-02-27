import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Layout>
      <section className="pt-28 pb-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 md:p-12 max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 gold-gradient-text">
                {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
              </h1>
              <p className="text-muted-foreground text-sm">
                {isLogin ? "أدخل بياناتك للوصول إلى حسابك" : "أنشئ حسابك للاستمتاع بتجربة تسوق فاخرة"}
              </p>
            </div>

            <form className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">الاسم الكامل</label>
                  <input
                    type="text"
                    placeholder="اسمك الكامل"
                    className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              )}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="كلمة المرور"
                    className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button variant="gold" className="w-full h-12 text-base">
                {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
              </Button>
            </form>

            <div className="section-divider mt-8 mb-6" />

            <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-semibold hover:underline"
              >
                {isLogin ? "إنشاء حساب جديد" : "تسجيل الدخول"}
              </button>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
