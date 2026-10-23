import { state } from "./state.js";
import { fetchAllData } from "./dataService.js";
import { getFilteredOrders, calculateStats, getOrderDetails } from "./selectors.js";
import { renderStats, renderOrders, showModalDetails, showError } from "./view.js";

const searchInput = document.querySelector("#searchInput");
const statusFilterSelect = document.querySelector("#statusFilter");
const categoryFilterSelect = document.querySelector("#categoryFilter");
const ordersContainer = document.querySelector("#ordersContainer");

const render = () => {
    const filteredOrders = getFilteredOrders();
    const stats = calculateStats();
    renderStats(stats);
    renderOrders(filteredOrders);
};

searchInput.addEventListener("input", (e) => {
    state.search = e.target.value.trim();
    render();
});

statusFilterSelect.addEventListener("change", (e) => {
    state.statusFilter = e.target.value;
    render();
});

categoryFilterSelect.addEventListener("change", (e) => {
    state.categoryFilter = e.target.value;
    render();
});

ordersContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-details");
    if (!btn) return;
    const orderId = Number(btn.dataset.id);
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
        const detailedOrder = getOrderDetails(order);
        showModalDetails(detailedOrder);
    }
});


const init = async () => {
    try {
        const data = await fetchAllData();
        state.customers = data.customers;
        state.products = data.products;
        state.orders = data.orders;
        render();
    } catch (error) {
        console.error("Erreur d'initialisation:", error);
        showError("Impossible de charger les fichiers JSON. Vérifiez votre connexion ou les chemins de fichiers.");
    }
};

init();