import commandes from './commandes.json' assert { type: 'json' };

const analyseCommandes = (commandes) => {
    // 1. Statistiques globales
    const indicateursGlobaux = commandes.reduce(
        (acc, commande) => {
            acc.totalCommandes += 1;
            acc.totalCA += commande.montant;
            return acc;
        },
        { totalCommandes: 0, totalCA: 0 }
    );
    const cartAverage = indicateursGlobaux.totalCA / indicateursGlobaux.totalCommandes;
    console.log(indicateursGlobaux);
    console.log("cartAverage = ", cartAverage);

    // 2. Groupements (par client, produit, mois)
    const resumeParClient = commandes.reduce((acc, commande) => {
        const proprietaire = commande.client;
        if (!acc[proprietaire]) {
            acc[proprietaire] = {
                totalCA: 0,
                totalProduit: [],
            }
        }
        acc[proprietaire].totalCA += 1;
        acc[proprietaire].totalProduit.push(commande.produit);
        return acc;
    }, {})
    console.log(resumeParClient);

    // 3. Analyses (fidélité, produit populaire)
    const clientRegulier = commandes.reduce((acc, commande) => {
        
    })

    // 4. Affichage
};

analyseCommandes(commandes);
