import donnees from './clients.json' assert { type: 'json' };

const clients = donnees;

//Total CA
const chiffreAffaire = (clients) =>
  clients.reduce((total, client) => total + client.chiffreAffaire, 0);

//ageAveragePerCity
const ageAveragePerCity = (clients) => {
  return clients.reduce((acc, client) => {
    const ville = client.ville;

    if (!acc[ville]) {
      acc[ville] = { sum: 0, count: 0 };
    }

    acc[ville].sum += client.age;
    acc[ville].count += 1;

    // On transforme directement en moyenne ici
    acc[ville] = acc[ville].sum / acc[ville].count;

    return acc;
  }, {});
};

//Client avec le CA élevé

const highChiffreAffaire = (clients) => {
  return clients.reduce(
    (acc, client) => {
      if (client.chiffreAffaire > acc.max) {
        return { max: client.chiffreAffaire, list: [client] };
      } else if (client.chiffreAffaire === acc.max) {
        acc.list.push(client);
      }
      return acc;
    },
    { max: 0, list: [] }
  ).list;
};
