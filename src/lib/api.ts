// API base configuration
const API_BASE_URL = '/api';

// Helper function for API calls
async function apiCall<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
}

// Authentication API
export const authApi = {
    login: async (email: string, password: string) => {
        return apiCall<{ user: { id: string; email: string; name: string }; message: string }>(
            '/auth/login',
            {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            }
        );
    },

    register: async (email: string, password: string, name: string) => {
        return apiCall<{ user: { id: string; email: string; name: string }; message: string }>(
            '/auth/register',
            {
                method: 'POST',
                body: JSON.stringify({ email, password, name }),
            }
        );
    },

    logout: async () => {
        return apiCall<{ message: string }>('/auth/logout', {
            method: 'POST',
        });
    },
};

// Products API
export const productsApi = {
    getAll: async (params?: {
        category?: string;
        search?: string;
        minPrice?: number;
        maxPrice?: number;
    }) => {
        const queryParams = new URLSearchParams();
        if (params?.category) queryParams.append('category', params.category);
        if (params?.search) queryParams.append('search', params.search);
        if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString());
        if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());

        const query = queryParams.toString();
        return apiCall<{ products: any[] }>(`/products${query ? `?${query}` : ''}`);
    },

    getById: async (id: string) => {
        return apiCall<{ product: any }>(`/products/${id}`);
    },

    getCategories: async () => {
        return apiCall<{ categories: string[] }>('/products/categories/list');
    },
};

// Cart API
export const cartApi = {
    get: async (userId: string) => {
        return apiCall<{ items: any[] }>(`/cart/${userId}`);
    },

    addItem: async (userId: string, productId: string, quantity: number) => {
        return apiCall<{ message: string; cart: { items: any[] } }>(
            `/cart/${userId}/items`,
            {
                method: 'POST',
                body: JSON.stringify({ productId, quantity }),
            }
        );
    },

    updateQuantity: async (userId: string, productId: string, quantity: number) => {
        return apiCall<{ message: string; cart: { items: any[] } }>(
            `/cart/${userId}/items/${productId}`,
            {
                method: 'PUT',
                body: JSON.stringify({ quantity }),
            }
        );
    },

    removeItem: async (userId: string, productId: string) => {
        return apiCall<{ message: string; cart: { items: any[] } }>(
            `/cart/${userId}/items/${productId}`,
            {
                method: 'DELETE',
            }
        );
    },

    clear: async (userId: string) => {
        return apiCall<{ message: string }>(`/cart/${userId}`, {
            method: 'DELETE',
        });
    },
};

// Orders API
export const ordersApi = {
    getAll: async (userId: string) => {
        return apiCall<{ orders: any[] }>(`/orders/${userId}`);
    },

    getById: async (userId: string, orderId: string) => {
        return apiCall<{ order: any }>(`/orders/${userId}/${orderId}`);
    },

    create: async (userId: string, shippingAddress: any) => {
        return apiCall<{ message: string; order: any }>(`/orders/${userId}`, {
            method: 'POST',
            body: JSON.stringify({ shippingAddress }),
        });
    },

    updateStatus: async (userId: string, orderId: string, status: string) => {
        return apiCall<{ message: string; order: any }>(
            `/orders/${userId}/${orderId}/status`,
            {
                method: 'PATCH',
                body: JSON.stringify({ status }),
            }
        );
    },
};
