# Application de Gestion des Commandes TP4

## Description
Application web frontend développée dans le cadre du TP4. Elle permet de charger, lier et analyser dynamiquement des données issues de trois fichiers JSON distincts (`customers.json`, `products.json`, et `orders.json`).

## Structure du Projet
tp4/
├── index.html
├── css/
│   └── style.css
├── data/
│   ├── customers.json
│   ├── products.json
│   └── orders.json
└── js/
    ├── app.js
    ├── state.js
    ├── dataService.js
    ├── selectors.js
    └── view.js

## Fonctionnalités principales
- Chargement asynchrone des données avec `fetch` et `async/await`.
- Gestion d'un état centralisé (`state.js`).
- Relation entre entités (Association des commandes aux clients et aux produits via les identifiants).
- Calcul dynamique des indicateurs (total clients, produits, commandes, et chiffre d'affaires global).
- Recherche dynamique par nom de client.
- Filtres combinés par statut et par catégorie de produit.
- Affichage détaillé d'une commande via une modale Bootstrap.
- Gestion robuste des erreurs de chargement.

## Instructions pour lancer le projet
1. Cloner le dépôt ou télécharger les fichiers.
2. Lancer un serveur local (via Live Server dans VS Code par exemple, car `fetch` nécessite un serveur HTTP).
3. Ouvrir `index.html` dans le navigateur.