/**
  * Prototype chargé de créer les composants du programme.
  * C'est lui qui se charge d'affecter le controlleur au composant.
  */

var Fabrique = Object.create(Composant);

/**
  * Créer une cellule du type demandé, avec les dégâts à moyen par
  * défaut pour les armes.
  *
  * @param	    {String}	type	    Le type de cellule  (arme, obstacle, ...).
  * @param	    {Array}	    options	    Liste des options de la cellule.
  * @returns	{Cellule}               La cellule.
  */
Fabrique.creerCellule = function(type, options=[]) {
    switch (type) {
        case "arme":
            var arme = Object.create(Arme);
            if (options.length > 0) {
                var degat = options[0];
            }
            arme.init(this.getControlleur(), degat);
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

/**
  * Créer un joueur avec une arme de base.
  *
  * @returns	{Joueur}    Le joueur.
  */
Fabrique.creerJoueur = function(nom="jean") {
    var arme = this.creerCellule("arme");
    var joueur = Object.create(Joueur);
    joueur.init(this.getControlleur(), arme, nom);
    return joueur;
}

/**
  * Créer le maitre du jeu.
  *
  * @returns	{MaitreDuJeu}    Le maitre du jeu.
  */
Fabrique.creerMaitreDuJeu = function(plateau, joueurs) {
    maitreDuJeu = Object.create(MaitreDuJeu);
    maitreDuJeu.init(controlleur=this.getControlleur(),
                     plateau=plateau,
                     joueurs=joueurs);
    return maitreDuJeu;
}

/**
  * Créer la page générateur.
  *
  * @returns	{Page}    Le page générateur.
  */
Fabrique.creerPage = function() {
    page = Object.create(Page);
    page.init(this.getControlleur());
    return page;
}

/**
  * Créer le plateau générateur.
  *
  * @returns	{PlateauGenerateur}    Le plateau générateur.
  */
Fabrique.creerPlateauGenerateur = function() {
    plateauGenerateur = Object.create(PlateauGenerateur);
    plateauGenerateur.init(this.getControlleur());
    return plateauGenerateur;
}
