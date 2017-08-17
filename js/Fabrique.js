/**
  * Prototype chargé de créer les composants du programme.
  * C'est lui qui se charge d'affecter le controlleur au composant.
  */

var Fabrique = Object.create(Composant);

/**
  * Créer une cellule du type demandé, avec les param.
  *
  * @param	    {String}	type	    Le type de cellule  (arme, obstacle, ...).
  * @param	    {Object}	param	    Contient les parametres de la cellule.
  * @returns	{Cellule}               La cellule.
  */
Fabrique.creerCellule = function(type, param) {
    switch (type) {
        case "arme":
            var arme = Object.create(Arme);
            arme.init(this.getControlleur(), param);
            return arme;
            break;
        case "obstacle":
            var obstacle = Object.create(Obstacle);
            obstacle.init(this.getControlleur(), param);
            return obstacle;
            break;
        case "vortex":
            var vortex = Object.create(Vortex);
            vortex.init(this.getControlleur(), param);
            return vortex;
            break;
        case "vide":
            // Correspond à une Cellule vide (ni arme ni obstacle).
            var cellule = Object.create(Vide);
            cellule.init(this.getControlleur(), param);
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
Fabrique.creerJoueur = function(param) {
    var arme = this.creerCellule(
        "arme",
        this.getControlleur().getParametre().ARME.minimum
    );
    var joueur = Object.create(Joueur);
    joueur.init(this.getControlleur(), arme, param);
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
