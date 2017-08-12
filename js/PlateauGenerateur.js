/*
    Créer le plateau.
*/

var PlateauGenerateur = Object.create(Composant);

PlateauGenerateur.LARGEUR_PLATEAU  = 10;
PlateauGenerateur.NB_CASE = 100;
PlateauGenerateur.NB_JOUEUR = 2;
PlateauGenerateur.NB_ARME = 3;
PlateauGenerateur.NB_OBSTACLE = 12;
PlateauGenerateur.NB_CASE_VIDE = 85;

PlateauGenerateur.melanger = function(array) {
  var indexCourant = array.length, valeurTemporaire, indexHasard;

  // Tant qu'il y a un index à mélanger.
  while (0 !== indexCourant) {

    // Selectionne un index au hasard.
    indexHasard = Math.floor(Math.random() * indexCourant);
    indexCourant -= 1;

    // Remplace les deux éléments.
    valeurTemporaire = array[indexCourant];
    array[indexCourant] = array[indexHasard];
    array[indexHasard] = valeurTemporaire;
  }

  return array;
}


/*
    Ajouter un nombre (nbCellule) d'un type de cellule ("arme",
    "obstacle", "vide") au plateau.
*/
PlateauGenerateur.ajouter = function(nbCellule, typeCellule, plateau) {
    for (var i = 0; i < nbCellule; i++) {
        //console.log("début PlateauGenerateur.ajouter()");
        var cellule = this.getControlleur().getFabrique().creerCellule(typeCellule);
        //console.log("fin PlateauGenerateur.ajouter(), iter : " + String(i));
        // Les cellule sont englobées dans un tableau (afin de pouvoir y ajouter les joueurs)
        plateau.push([cellule]);
    }
}

/*
    Créé une plateau sur laquelle sont placées les cellules (cellule vide, obstacle,
    armes).
*/
PlateauGenerateur.creerPlateau = function() {
    var plateau = [];

    this.ajouter(this.NB_CASE_VIDE, "vide", plateau);
    this.ajouter(this.NB_OBSTACLE, "obstacle", plateau);
    this.ajouter(this.NB_ARME, "arme", plateau);

    this.melanger(plateau);
    return plateau;
}
