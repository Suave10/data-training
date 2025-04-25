import clients from './clients.json' assert { type: 'json' };

const dashboard = (clients) => {
  // 1. 📊 Statistiques globales
  const statsGlobales = clients.reduce(
    (acc, client) => {
      acc.totalCA += client.chiffreAffaire;
      acc.totalAge += client.age;
      acc.totalClients += 1;
      return acc;
    },
    { totalCA: 0, totalAge: 0, totalClients: 0 }
  );

  const moyenneAge = statsGlobales.totalAge / statsGlobales.totalClients;

  console.log('=== Statistiques globales ===');
  console.log('Nombre total de clients :', statsGlobales.totalClients);
  console.log("Chiffre d'affaires total :", statsGlobales.totalCA + ' €');
  console.log('Âge moyen :', moyenneAge.toFixed(1), 'ans');
  console.log('');

  // 2. 🏙️ Résumé par ville
  const resumeParVille = clients.reduce((acc, client) => {
    const ville = client.ville;

    if (!acc[ville]) {
      acc[ville] = {
        nbClients: 0,
        totalCA: 0,
        totalAge: 0,
      };
    }

    acc[ville].nbClients += 1;
    acc[ville].totalCA += client.chiffreAffaire;
    acc[ville].totalAge += client.age;

    return acc;
  }, {});

  // Transformer pour afficher avec console.table
  const tableauVilles = Object.entries(resumeParVille).map(([ville, data]) => ({
    Ville: ville,
    'Nombre de clients': data.nbClients,
    'CA Total (€)': data.totalCA,
    'Âge moyen': (data.totalAge / data.nbClients).toFixed(1),
  }));

  console.log('=== Résumé par ville ===');
  console.table(tableauVilles);

  // 3. 🥇 Top client(s)
  const maxCA = Math.max(...clients.map((c) => c.chiffreAffaire));
  const topClients = clients.filter((c) => c.chiffreAffaire === maxCA);

  console.log("=== Top client(s) par chiffre d'affaires ===");
  console.table(topClients);
};

dashboard(clients);
