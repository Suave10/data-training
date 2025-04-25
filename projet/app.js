import clients from './clients.json' assert { type: 'json' };

const dashboard = (clients) => {
  // 1. Stats globales
  return clients.reduce((total, client) => total + client.chiffreAffaire, 0)

  // 2. Résumé par ville

  // 3. Top client(s)

  // 4. Affichage
};

dashboard(clients);
