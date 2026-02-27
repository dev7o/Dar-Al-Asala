import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts, Product } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import {
    Plus, Pencil, Trash2, LogOut, Package, Star, TrendingUp,
    ShieldCheck, X, Image as ImageIcon, Save, ChevronDown, Loader2, RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ADMIN_PASSWORD = "admin123";

const categoryLabels: Record<string, string> = { men: "رجالي", women: "نسائي", unisex: "للجنسين" };

const emptyForm = () => ({
    name: "", description: "", longDescription: "", price: 0, discountPrice: null as number | null,
    category: "men" as "men" | "women" | "unisex", rating: 5, image: "", bestSeller: false, notes: [] as string[], size: "100 مل",
});

/* ─── Login ─── */
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
    const [pw, setPw] = useState("");
    const [err, setErr] = useState(false);
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pw === ADMIN_PASSWORD) { sessionStorage.setItem("admin_auth", "true"); onLogin(); }
        else { setErr(true); setPw(""); }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-10 max-w-sm w-full text-center">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="h-8 w-8 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold mb-1 gold-gradient-text">لوحة التحكم</h1>
                <p className="text-muted-foreground text-sm mb-8">أدخل كلمة مرور الأدمن</p>
                <form onSubmit={submit} className="space-y-4 text-right">
                    <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); setErr(false); }}
                        className={`w-full bg-muted border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none transition-colors ${err ? "border-red-500" : "border-border focus:border-primary"}`}
                        placeholder="••••••••" autoFocus />
                    {err && <p className="text-red-400 text-xs">كلمة المرور غير صحيحة</p>}
                    <Button variant="gold" className="w-full h-12">دخول</Button>
                </form>
                <div className="section-divider mt-6 mb-4" />
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">← العودة للموقع</Link>
            </motion.div>
        </div>
    );
};

/* ─── Product Form Modal ─── */
interface FormModalProps {
    initial: ReturnType<typeof emptyForm> | null;
    editId: number | null;
    onClose: () => void;
    onSave: (fd: FormData) => Promise<void>;
}

const ProductFormModal = ({ initial, editId, onClose, onSave }: FormModalProps) => {
    const [form, setForm] = useState(initial ?? emptyForm());
    const [noteInput, setNoteInput] = useState("");
    const [preview, setPreview] = useState<string>(initial?.image ?? "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const set = (key: string, value: unknown) => setForm((p) => ({ ...p, [key]: value }));

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) { toast.error("حجم الصورة يجب أن يكون أقل من 10 ميغابايت"); return; }
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const addNote = () => {
        const t = noteInput.trim();
        if (t && !form.notes.includes(t)) { set("notes", [...form.notes, t]); setNoteInput(""); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) { toast.error("اسم المنتج مطلوب"); return; }
        if (!editId && !imageFile) { toast.error("يجب إضافة صورة للمنتج"); return; }
        if (form.price <= 0) { toast.error("السعر يجب أن يكون أكبر من صفر"); return; }

        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("description", form.description);
        fd.append("longDescription", form.longDescription);
        fd.append("price", String(form.price));
        fd.append("discountPrice", form.discountPrice !== null ? String(form.discountPrice) : "");
        fd.append("category", form.category);
        fd.append("rating", String(form.rating));
        fd.append("bestSeller", String(form.bestSeller));
        fd.append("notes", JSON.stringify(form.notes));
        fd.append("size", form.size);
        if (imageFile) fd.append("image", imageFile);

        setSaving(true);
        try {
            await onSave(fd);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold gold-gradient-text">{editId ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>
                    <button onClick={onClose} disabled={saving} className="text-muted-foreground hover:text-primary transition-colors"><X className="h-5 w-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5 text-right">
                    {/* Image */}
                    <div>
                        <label className="text-sm text-muted-foreground block mb-2">صورة المنتج {!editId && "*"}</label>
                        <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors overflow-hidden">
                            {preview ? <img src={preview} alt="معاينة" className="w-full h-48 object-cover" /> : (
                                <div className="h-48 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                                    <ImageIcon className="h-10 w-10" />
                                    <span className="text-sm">انقر لرفع صورة المنتج</span>
                                    <span className="text-xs">JPG, PNG, WEBP — بحد أقصى 10 ميغابايت</span>
                                </div>
                            )}
                        </div>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
                        {preview && <button type="button" onClick={() => { setPreview(""); setImageFile(null); }} className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"><X className="h-3 w-3" /> إزالة الصورة</button>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Price */}
                        <div>
                            <label className="text-sm text-muted-foreground block mb-1">السعر الأساسي (ر.س) *</label>
                            <input type="number" min="0" value={form.price} onChange={(e) => set("price", Number(e.target.value))}
                                className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                        </div>
                        {/* Discount Price */}
                        <div>
                            <label className="text-sm text-muted-foreground block mb-1">السعر بعد الخصم (اختياري)</label>
                            <input type="number" min="0" value={form.discountPrice ?? ""} onChange={(e) => set("discountPrice", e.target.value ? Number(e.target.value) : null)}
                                placeholder="مثال: 299"
                                className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="text-sm text-muted-foreground block mb-1">اسم المنتج *</label>
                        <input value={form.name} onChange={(e) => set("name", e.target.value)}
                            className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="مثال: عود الملوك" />
                    </div>

                    {/* Short desc */}
                    <div>
                        <label className="text-sm text-muted-foreground block mb-1">وصف مختصر</label>
                        <input value={form.description} onChange={(e) => set("description", e.target.value)}
                            className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="وصف قصير" />
                    </div>

                    {/* Long desc */}
                    <div>
                        <label className="text-sm text-muted-foreground block mb-1">وصف تفصيلي</label>
                        <textarea value={form.longDescription} onChange={(e) => set("longDescription", e.target.value)} rows={3}
                            className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none" placeholder="وصف مفصل لصفحة المنتج" />
                    </div>

                    {/* Price + Category + Size */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm text-muted-foreground block mb-1">السعر (ر.س) *</label>
                            <input type="number" min={1} value={form.price || ""} onChange={(e) => set("price", Number(e.target.value))}
                                className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="450" />
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground block mb-1">الفئة</label>
                            <div className="relative">
                                <select value={form.category} onChange={(e) => set("category", e.target.value)}
                                    className="w-full appearance-none bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors">
                                    <option value="men">رجالي</option>
                                    <option value="women">نسائي</option>
                                    <option value="unisex">للجنسين</option>
                                </select>
                                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground block mb-1">الحجم</label>
                            <input value={form.size} onChange={(e) => set("size", e.target.value)}
                                className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="100 مل" />
                        </div>
                    </div>

                    {/* Rating + BestSeller */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-muted-foreground block mb-1">التقييم</label>
                            <div className="relative">
                                <select value={form.rating} onChange={(e) => set("rating", Number(e.target.value))}
                                    className="w-full appearance-none bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors">
                                    {[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>{"⭐".repeat(r)} ({r}/5)</option>)}
                                </select>
                                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                            <button type="button" onClick={() => set("bestSeller", !form.bestSeller)}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${form.bestSeller ? "gold-gradient" : "bg-muted border border-border"}`}>
                                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${form.bestSeller ? "left-7" : "left-1"}`} />
                            </button>
                            <label className="text-sm text-foreground cursor-pointer" onClick={() => set("bestSeller", !form.bestSeller)}>الأكثر مبيعاً</label>
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="text-sm text-muted-foreground block mb-1">مكونات العطر</label>
                        <div className="flex gap-2 mb-2">
                            <input value={noteInput} onChange={(e) => setNoteInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addNote(); } }}
                                className="flex-1 bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="مثال: العود الكمبودي" />
                            <Button type="button" variant="gold-outline" size="sm" onClick={addNote}>إضافة</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {form.notes.map((note) => (
                                <span key={note} className="flex items-center gap-1 text-xs border border-primary/30 text-primary px-3 py-1.5 rounded-full">
                                    {note}
                                    <button type="button" onClick={() => set("notes", form.notes.filter((x) => x !== note))} className="hover:text-red-400"><X className="h-3 w-3" /></button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button type="submit" variant="gold" className="flex-1 h-11" disabled={saving}>
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            {editId ? "حفظ التعديلات" : "إضافة المنتج"}
                        </Button>
                        <Button type="button" variant="gold-outline" onClick={onClose} disabled={saving} className="h-11 px-6">إلغاء</Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

/* ─── Main Admin ─── */
const Admin = () => {
    const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "true");
    const { products, loading, error, refetch, addProduct, updateProduct, deleteProduct } = useProducts();
    const [showForm, setShowForm] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);

    if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

    const openAdd = () => { setEditProduct(null); setShowForm(true); };
    const openEdit = (p: Product) => { setEditProduct(p); setShowForm(true); };

    const handleSave = async (fd: FormData) => {
        if (editProduct) {
            await updateProduct(editProduct.id, fd);
            toast.success("تم تعديل المنتج بنجاح ✨");
        } else {
            await addProduct(fd);
            toast.success("تم إضافة المنتج بنجاح ✨");
        }
        setShowForm(false);
    };

    const handleDelete = async (id: number) => {
        setDeleting(true);
        try {
            await deleteProduct(id);
            toast.success("تم حذف المنتج");
        } catch {
            toast.error("فشل في حذف المنتج");
        } finally {
            setDeleting(false);
            setDeleteConfirm(null);
        }
    };

    const totalRevenue = products.reduce((s, p) => s + p.price, 0);
    const bestCount = products.filter((p) => p.bestSeller).length;

    return (
        <div className="min-h-screen bg-background" dir="rtl">
            {/* Header */}
            <header className="bg-secondary border-b border-border sticky top-0 z-40">
                <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center">
                            <ShieldCheck className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-lg gold-gradient-text">لوحة التحكم — دار الأصالة</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" onClick={refetch} className="text-muted-foreground hover:text-primary">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Link to="/" target="_blank"><Button variant="gold-outline" size="sm">عرض الموقع</Button></Link>
                        <Button variant="ghost" size="sm" onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthed(false); }} className="text-muted-foreground hover:text-red-400">
                            <LogOut className="h-4 w-4" /> خروج
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 lg:px-8 py-8">
                {/* Error banner */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center justify-between">
                        <span>⚠️ {error} — تأكد من تشغيل الخادم وقاعدة البيانات</span>
                        <Button variant="ghost" size="sm" onClick={refetch} className="text-red-400 hover:text-red-300"><RefreshCw className="h-4 w-4" /></Button>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    {[
                        { icon: Package, label: "إجمالي المنتجات", value: products.length, suffix: "منتج" },
                        { icon: Star, label: "الأكثر مبيعاً", value: bestCount, suffix: "منتج" },
                        { icon: TrendingUp, label: "متوسط السعر", value: products.length ? Math.round(totalRevenue / products.length) : 0, suffix: "ر.س" },
                    ].map((stat, i) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                <div className="w-9 h-9 gold-gradient rounded-full flex items-center justify-center">
                                    <stat.icon className="h-4 w-4 text-primary-foreground" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold">{stat.value} <span className="text-base font-normal text-muted-foreground">{stat.suffix}</span></p>
                        </motion.div>
                    ))}
                </div>

                {/* Table header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">إدارة <span className="gold-gradient-text">المنتجات</span></h2>
                    <Button variant="gold" onClick={openAdd}><Plus className="h-4 w-4" /> إضافة منتج جديد</Button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                )}

                {/* Products */}
                {!loading && products.length === 0 && (
                    <div className="glass-card p-16 text-center text-muted-foreground">
                        <Package className="h-16 w-16 mx-auto mb-4 opacity-20" />
                        <p className="text-lg mb-2">لا توجد منتجات بعد</p>
                        <p className="text-sm mb-6">إذا كانت البيانات موجودة في MySQL تأكد من تشغيل الخادم</p>
                        <Button variant="gold" onClick={openAdd}><Plus className="h-4 w-4" /> أضف أول منتج</Button>
                    </div>
                )}

                {!loading && products.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {products.map((product, i) => (
                            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card overflow-hidden group">
                                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground"><ImageIcon className="h-12 w-12 opacity-20" /></div>
                                    )}
                                    {product.bestSeller && <span className="absolute top-2 right-2 gold-gradient text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">الأكثر مبيعاً</span>}
                                    <span className="absolute top-2 left-2 bg-background/70 backdrop-blur-sm text-xs px-2 py-0.5 rounded-full">{categoryLabels[product.category]}</span>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="font-bold text-base">{product.name}</h3>
                                        <span className="text-primary font-bold whitespace-nowrap">{product.price} ر.س</span>
                                    </div>
                                    <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{product.description}</p>
                                    <div className="flex gap-2">
                                        <Button variant="gold-outline" size="sm" className="flex-1" onClick={() => openEdit(product)}><Pencil className="h-3.5 w-3.5" /> تعديل</Button>
                                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20" onClick={() => setDeleteConfirm(product.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirm */}
            <AnimatePresence>
                {deleteConfirm !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="glass-card p-8 max-w-sm w-full text-center">
                            <Trash2 className="h-12 w-12 text-red-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">حذف المنتج؟</h3>
                            <p className="text-muted-foreground text-sm mb-6">هذا الإجراء لا يمكن التراجع عنه.</p>
                            <div className="flex gap-3">
                                <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white" onClick={() => handleDelete(deleteConfirm)} disabled={deleting}>
                                    {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "نعم، احذف"}
                                </Button>
                                <Button variant="gold-outline" className="flex-1" onClick={() => setDeleteConfirm(null)} disabled={deleting}>إلغاء</Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <ProductFormModal
                        initial={editProduct ? { ...editProduct, longDescription: editProduct.longDescription, discountPrice: editProduct.discountPrice ?? null } : null}
                        editId={editProduct?.id ?? null}
                        onClose={() => setShowForm(false)}
                        onSave={handleSave}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Admin;
