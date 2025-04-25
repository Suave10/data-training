import commandes from './commandes.json' assert { type: 'json' };

const analyseCommandes = (commandes) => {
    // 1. 📊 Statistiques globales
    const indicateursGlobaux = commandes.reduce(
        (acc, commande) => {
            acc.totalCommandes += 1;
            acc.totalCA += commande.montant;
            return acc;
        },
        { totalCommandes: 0, totalCA: 0 }
    );

    const cartAverage = indicateursGlobaux.totalCA / indicateursGlobaux.totalCommandes;

    console.log("=== Statistiques globales ===");
    console.log("Total commandes :", indicateursGlobaux.totalCommandes);
    console.log("Chiffre d'affaires total :", indicateursGlobaux.totalCA + " €");
    console.log("Panier moyen :", cartAverage.toFixed(2) + " €");
    console.log("");

    // 2. 👥 Groupement par client
    const resumeParClient = commandes.reduce((acc, commande) => {
        const client = commande.client;
        if (!acc[client]) {
            acc[client] = {
                totalCA: 0,
                produits: [],
                nbCommandes: 0
            };
        }
        acc[client].totalCA += commande.montant;
        acc[client].produits.push(commande.produit);
        acc[client].nbCommandes += 1;
        return acc;
    }, {});
    console.log("=== Résumé par client ===");
    console.table(resumeParClient);

    // 2. 🗓️ Nombre de commandes par mois
    const commandesParMois = commandes.reduce((acc, commande) => {
        const date = new Date(commande.date);
        const cle = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        acc[cle] = (acc[cle] || 0) + 1;
        return acc;
    }, {});
    console.log("=== Nombre de commandes par mois ===");
    console.table(commandesParMois);

    // 2. 📦 Groupement par produit
    const produitsCount = commandes.reduce((acc, commande) => {
        acc[commande.produit] = (acc[commande.produit] || 0) + 1;
        return acc;
    }, {});
    console.log("=== Nombre de ventes par produit ===");
    console.table(produitsCount);

    // 3. 🔁 Clients réguliers (plus de 1 commande)
    const clientsReguliers = Object.entries(resumeParClient)
        .filter(([nom, data]) => data.nbCommandes > 1)
        .map(([nom]) => nom);
    console.log("=== Clients réguliers (fidèles) ===");
    console.log(clientsReguliers);

    // 3. 🥇 Produit le plus vendu
    const produitTop = Object.entries(produitsCount).sort((a, b) => b[1] - a[1])[0];
    console.log("=== Produit le plus vendu ===");
    console.log(`${produitTop[0]} (${produitTop[1]} ventes)`);
};

analyseCommandes(commandes);
