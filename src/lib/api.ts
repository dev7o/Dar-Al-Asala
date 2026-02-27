const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5001/api";

// ── helper ────────────────────────────────────────────────
async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { Accept: "application/json" },
        ...options,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "خطأ في الخادم");
    return data as T;
}

// ── Products API ──────────────────────────────────────────
export const api = {
    products: {
        getAll: () => request<unknown[]>("/products"),
        getOne: (id: number) => request<unknown>(`/products/${id}`),

        create: (formData: FormData) =>
            request<unknown>("/products", {
                method: "POST",
                body: formData,
                // لا تضع Content-Type — متروك للمتصفح ليضع boundary تلقائياً
            }),

        update: (id: number, formData: FormData) =>
            request<unknown>(`/products/${id}`, {
                method: "PUT",
                body: formData,
            }),

        delete: (id: number) =>
            request<{ message: string; id: number }>(`/products/${id}`, {
                method: "DELETE",
            }),
    },
};
