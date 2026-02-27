import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { api } from "@/lib/api";

export interface Product {
    id: number;
    name: string;
    description: string;
    longDescription: string;
    price: number;
    discountPrice?: number | null;
    category: "men" | "women" | "unisex";
    rating: number;
    image: string;
    bestSeller: boolean;
    notes: string[];
    size: string;
}

interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    addProduct: (formData: FormData) => Promise<Product>;
    updateProduct: (id: number, formData: FormData) => Promise<Product>;
    deleteProduct: (id: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.products.getAll();
            setProducts(data as Product[]);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "خطأ في جلب المنتجات";
            setError(msg);
            console.error("ProductContext error:", msg);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const addProduct = async (formData: FormData): Promise<Product> => {
        const created = (await api.products.create(formData)) as Product;
        setProducts((prev) => [created, ...prev]);
        return created;
    };

    const updateProduct = async (id: number, formData: FormData): Promise<Product> => {
        const updated = (await api.products.update(id, formData)) as Product;
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        return updated;
    };

    const deleteProduct = async (id: number): Promise<void> => {
        await api.products.delete(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <ProductContext.Provider
            value={{ products, loading, error, refetch: fetchProducts, addProduct, updateProduct, deleteProduct }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const ctx = useContext(ProductContext);
    if (!ctx) throw new Error("useProducts must be used inside ProductProvider");
    return ctx;
};
