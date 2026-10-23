const totalCustomersEl = document.querySelector("#totalCustomers");
const totalProductsEl = document.querySelector("#totalProducts");
const totalOrdersEl = document.querySelector("#totalOrders");
const totalRevenueEl = document.querySelector("#totalRevenue");
const ordersContainer = document.querySelector("#ordersContainer");
const resultCountEl = document.querySelector("#resultCount");
const errorMessageEl = document.querySelector("#errorMessage");

export const renderStats = (stats) => {
    totalCustomersEl.textContent = stats.totalCustomers;
    totalProductsEl.textContent = stats.totalProducts;
    totalOrdersEl.textContent = stats.totalOrders;
    totalRevenueEl.textContent = `${stats.totalRevenue} MAD`;
};

const getStatusBadgeClass = (status) => {
    switch (status) {
        case "Livree": return "bg-success";
        case "En attente": return "bg-warning text-dark";
        case "Annulee": return "bg-danger";
        default: return "bg-secondary";
    }
};

export const renderOrders = (orders) => {
    resultCountEl.textContent = `${orders.length} commande(s) affichée(s)`;

    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">Aucune commande ne correspond à vos critères.</div>
            </div>
        `;
        return;
    }

    ordersContainer.innerHTML = orders.map(order => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm border-0 bg-dark text-light">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title mb-0 text-info">Cmd #${order.id}</h5>
                            <span class="badge ${getStatusBadgeClass(order.status)}">${order.status}</span>
                        </div>
                        <p class="mb-1"><strong>Client :</strong> ${order.customerName} (${order.customerCity})</p>
                        <p class="mb-2 text-muted small">Date : ${order.date}</p>
                        <hr class="border-secondary">
                        <p class="mb-1 fw-semibold text-secondary small">Produits :</p>
                        <ul class="list-unstyled small mb-3">
                            ${order.itemsWithDetails.map(item => `
                                <li>• ${item.productName} (x${item.quantity}) -${item.lineTotal} MAD</li>
                            `).join("")}
                        </ul>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary">
                        <span class="fw-bold text-success fs-5">${order.total} MAD</span>
                        <button class="btn btn-outline-light btn-sm btn-details" data-id="${order.id}" data-bs-toggle="modal" data-bs-target="#orderModal">
                            Détails
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
};

export const showModalDetails = (order) => {
    document.querySelector("#modalOrderId").textContent = order.id;
    document.querySelector("#modalCustomerName").textContent = order.customerName;
    document.querySelector("#modalCustomerCity").textContent = order.customerCity;
    document.querySelector("#modalDate").textContent = order.date;
    document.querySelector("#modalStatus").textContent = order.status;
    document.querySelector("#modalTotal").textContent = `${order.total} MAD`;

    const itemsList = document.querySelector("#modalItemsList");
    itemsList.innerHTML = order.itemsWithDetails.map(item => `
        <li class="list-group-item bg-dark text-light d-flex justify-content-between align-items-center">
            <div>
                <strong>${item.productName}</strong> 
                <span class="text-muted small">(${item.category})</span> x${item.quantity}
            </div>
            <span>${item.lineTotal} MAD (${item.productPrice} MAD / unité)</span>
        </li>
    `).join("");
};

export const showError = (message) => {
    errorMessageEl.textContent = message;
    errorMessageEl.classList.remove("d-none");
};