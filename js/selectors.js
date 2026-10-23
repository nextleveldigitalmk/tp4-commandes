import { state } from "./state.js";

export const getOrderDetails = (order) => {
    const customer = state.customers.find(c => c.id === order.customerId) 
    || { name: "Inconnu", city: "Inconnue" };
    
    let total = 0;
    const itemsWithDetails = order.items.map(item => {
        const product = state.products.find(p => p.id === item.productId) 
        || { name: "Produit inconnu", price: 0, category: "Autre" };
        const lineTotal = product.price * item.quantity;
        total += lineTotal;
        return {
            ...item,
            productName: product.name,
            productPrice: product.price,
            category: product.category,
            lineTotal
        };
    });

    return {
        ...order,
        customerName: customer.name,
        customerCity: customer.city,
        itemsWithDetails,
        total
    };
};

export const getFilteredOrders = () => {
    return state.orders.map(order => getOrderDetails(order)).filter(order => {
        
        const matchesSearch = order.customerName.toLowerCase().includes(state.search.toLowerCase());

        const matchesStatus = state.statusFilter === "all" || order.status === state.statusFilter;

        const matchesCategory = state.categoryFilter === "all" || order.itemsWithDetails.some(item => item.category === state.categoryFilter);

        return matchesSearch && matchesStatus && matchesCategory;
    });
};

export const calculateStats = () => {
    const totalCustomers = state.customers.length;
    const totalProducts = state.products.length;
    const totalOrders = state.orders.length;

    let totalRevenue = 0;
    state.orders.forEach(order => {
        const details = getOrderDetails(order);
        totalRevenue += details.total;
    });

    return {
        totalCustomers,
        totalProducts,
        totalOrders,
        totalRevenue
    };
};