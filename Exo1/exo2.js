import donnees from './clients.json' assert { type: 'json' };

const clients = donnees;

const chiffreAffaire = (clients) => {
    let sum = 0;
    clients.forEach((client) => (sum += client.chiffreAffaire));
    return sum;
};
console.log("Total des chiffres d'affaires = ", chiffreAffaire(clients));

// const ageAveragePerCity = (clients) => {
//   return clients.reduce((acc, curr) => {
//     if (!acc[curr.ville]) acc[curr.ville] = {};
//     acc[curr.ville] = acc[curr.ville] + curr.age;
//   }, {});
// };

const ageAveragePerCity = (clients) => {
    return clients.reduce((acc, curr) => {
        if (!acc[curr.ville]) {
            acc[curr.ville] = {
                sum: 0,
                count: 0,
            };
        }

        acc[curr.ville].sum += curr.age;
        acc[curr.ville].count++;

        return acc;
    }, {});
};
console.log(ageAveragePerCity(clients));

// Calcul des moyennes
const moyenne = (result) => {
    return Object.keys(result).reduce((acc, ville) => {
        acc[ville] = result[ville].sum / result[ville].count;
        return acc;
    }, {});
};
console.log(moyenne(ageAveragePerCity(clients)));

//client avec le chiffre d'affaire élevé

const highChiffreAffaire = (clients) => {
    let high = 0;
    clients.forEach((client) => {
        if (client.chiffreAffaire > high) high = client.chiffreAffaire;
    });
    let max = clients.filter((client) => client.chiffreAffaire == high);
    return max;
};

console.log(highChiffreAffaire(clients));
