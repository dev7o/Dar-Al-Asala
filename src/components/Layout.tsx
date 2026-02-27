import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "الرئيسية", path: "/" },
  { label: "المتجر", path: "/shop" },
  { label: "من نحن", path: "/about" },
  { label: "تواصل معنا", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/90 backdrop-blur-xl shadow-lg shadow-primary/5" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold gold-gradient-text">دار الأصالة</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-300 hover:text-primary ${location.pathname === link.path ? "text-primary" : "text-foreground/80"
                  }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 right-0 left-0 h-0.5 gold-gradient"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-medium py-2 transition-colors ${location.pathname === link.path ? "text-primary" : "text-foreground/70"
                    }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-secondary border-t border-border">
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-bold gold-gradient-text mb-4">دار الأصالة</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            نقدم أجود العطور الشرقية والغربية المصنوعة من أفخر المكونات الطبيعية. تجربة عطرية فاخرة تليق بذوقك الرفيع.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-primary font-semibold mb-4">روابط سريعة</h4>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-primary font-semibold mb-4">خدمة العملاء</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/return-policy" className="hover:text-primary transition-colors">سياسة الإرجاع</Link></li>
            <li><Link to="/shipping" className="hover:text-primary transition-colors">الشحن والتوصيل</Link></li>
            <li><Link to="/faq" className="hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
            <li><Link to="/terms" className="hover:text-primary transition-colors">شروط الاستخدام</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-primary font-semibold mb-4">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>البريد: info@daralasala.com</li>
            <li>الهاتف: 966+ 50 123 4567</li>
            <li>الرياض، المملكة العربية السعودية</li>
          </ul>
          <div className="flex gap-4 mt-4">
            {["انستغرام", "تويتر", "سناب شات"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-muted-foreground hover:text-primary transition-colors border border-border rounded-full px-3 py-1"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider mt-12 mb-6" />
      <p className="text-center text-sm text-muted-foreground">
        © 2026 دار الأصالة. جميع الحقوق محفوظة
      </p>
    </div>
  </footer>
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;
