var Maitre = {
    attributMaitre: "attributMaitre"
};

var maitre = Object.create(Maitre);

console.log("maitre.prototype.attributMaitre");
console.log(Object.getPrototypeOf(maitre).attributMaitre);


/*

    parametre sous forme de JSON.
    MaitreDuJeu a besoin de parametre pour init.
    créé un attribut parametre (parametres.param1, etc.)
    calculer et ajouter des parametres (nbcasevide, etc.)

*/
