const clients = [
    { nom: 'Alice', age: 34 },
    { nom: 'Bob', age: 45 },
    { nom: 'Claire', age: 29 },
];

// Affiche tous les noms des clients
const displayName = (clients) => {
    return clients.map((client) => client.nom);
};
console.log(displayName(clients));

// Calcule la moyenne d’âge du tableau clients
const ageAverage = (clients) => {
    let sum = 0;

    clients.forEach((client) => (sum += client.age));

    return sum / clients.length;
};
console.log('ageAverage = ' + ageAverage(clients));

// Retourne un tableau avec uniquement les clients de plus de 30 ans
const filterByAge = (clients, ageReferer) => {
    console.log('age>>', ageReferer);

    return clients.filter((client) => client.age > ageReferer);
};
console.log(filterByAge(clients, 30));
