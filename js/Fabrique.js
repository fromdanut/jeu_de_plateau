/*
    Prototype chargé de créer les composants du programme.
    C'est lui qui se charge d'affecter le controlleur au composant.
*/

var Fabrique = Object.create(Composant);

/*
    Creer une cellule du type choisie.
    type est une string.
*/
Fabrique.creerCellule = function(type) {
    switch (type) {
        case "arme":
            var arme = Object.create(Arme);
            arme.init(this.getControlleur());
            return arme;
            break;
        case "obstacle":
            var obstacle = Object.create(Obstacle);
            obstacle.init(this.getControlleur());
            return obstacle;
            break;
        case "vide":
            // Correspond à une Cellule vide (ni arme ni obstacle).
            var cellule = Object.create(Cellule);
            cellule.init(this.getControlleur());
            return cellule;
            break;
        default:
            console.log("Operation impossible: argument type invalide.");
            return false;
    };
}

/*
    La fabrique créer un joueur avec son arme directement.
*/
Fabrique.creerJoueur = function() {
    var arme = this.creerCellule("arme");
    var joueur = Object.create(Joueur);
    joueur.init(this.getControlleur(), arme);
    return joueur;
}

Fabrique.creerMaitreDuJeu = function(plateau, joueurs) {
    maitreDuJeu = Object.create(MaitreDuJeu);
    maitreDuJeu.init(controlleur=this.getControlleur(),
                     plateau=plateau,
                     joueurs=joueurs);
    return maitreDuJeu;
}

Fabrique.creerPageGenerateur = function() {
    pageGenerateur = Object.create(PageGenerateur);
    pageGenerateur.init(this.getControlleur());
    return pageGenerateur;
}

Fabrique.creerPlateauGenerateur = function() {
    plateauGenerateur = Object.create(PlateauGenerateur);
    plateauGenerateur.init(this.getControlleur());
    return plateauGenerateur;
}
