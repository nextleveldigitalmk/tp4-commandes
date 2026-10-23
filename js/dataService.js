export const fetchAllData = async () => {
    try {
        const [customersRes, productsRes, ordersRes] = await Promise.all([
            fetch("data/customers.json"),
            fetch("data/products.json"),
            fetch("data/orders.json")
        ]);

        if (!customersRes.ok || !productsRes.ok || !ordersRes.ok) {
            throw new Error("Erreur lors du chargement de l'un des fichiers de données.");
        }

        const customers = await customersRes.json();
        const products = await productsRes.json();
        const orders = await ordersRes.json();

        return { customers, products, orders };
    } catch (error) {
        console.error("Erreur DataService:", error);
        throw error;
    }
};