// API Configuration and utilities
const API_BASE_URL = 'http://localhost:3000/api';

// API Client
const API = {
    // Helper to make requests
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const token = localStorage.getItem('sobody_token');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro na requisição');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Auth endpoints
    auth: {
        async register(name, email, password) {
            return API.request('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password })
            });
        },

        async login(email, password) {
            const data = await API.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            if (data.token) {
                localStorage.setItem('sobody_token', data.token);
                localStorage.setItem('sobody_user', JSON.stringify(data.user));
            }

            return data;
        },

        logout() {
            localStorage.removeItem('sobody_token');
            localStorage.removeItem('sobody_user');
            window.location.href = 'login.html';
        },

        getUser() {
            const user = localStorage.getItem('sobody_user');
            return user ? JSON.parse(user) : null;
        },

        isAuthenticated() {
            return !!localStorage.getItem('sobody_token');
        },

        isAdmin() {
            const user = this.getUser();
            return user && user.role === 'ADMIN';
        }
    },

    // Categories endpoints
    categories: {
        async getAll() {
            return API.request('/categories');
        },

        async create(categoryData) {
            return API.request('/categories', {
                method: 'POST',
                body: JSON.stringify(categoryData)
            });
        },

        async update(id, categoryData) {
            return API.request(`/categories/${id}`, {
                method: 'PUT',
                body: JSON.stringify(categoryData)
            });
        },

        async delete(id) {
            return API.request(`/categories/${id}`, {
                method: 'DELETE'
            });
        }
    },

    // Products endpoints
    products: {
        async getAll(categoryId = null) {
            const query = categoryId ? `?categoryId=${categoryId}` : '';
            return API.request(`/products${query}`);
        },

        async getById(id) {
            return API.request(`/products/${id}`);
        },

        async create(productData) {
            return API.request('/products', {
                method: 'POST',
                body: JSON.stringify(productData)
            });
        },

        async update(id, productData) {
            return API.request(`/products/${id}`, {
                method: 'PUT',
                body: JSON.stringify(productData)
            });
        },

        async delete(id) {
            return API.request(`/products/${id}`, {
                method: 'DELETE'
            });
        }
    },

    // Orders endpoints
    orders: {
        async create(orderData) {
            return API.request('/orders', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });
        },

        async getAll() {
            return API.request('/orders');
        },

        async getById(id) {
            return API.request(`/orders/${id}`);
        },

        async getUserOrders() {
            return API.request('/orders/my-orders');
        }
    }
};
