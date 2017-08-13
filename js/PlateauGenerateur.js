/**
  * Prototype du générateur de plateau. Il ne sert qu'une fois pour créer le plateau.
  */

var PlateauGenerateur = Object.create(Composant);

/**
  * Mélange un tableau.
  *
  * @param   {Array}   tableau        Un tableau.
  * @returns {Arary}                  Le tableau mélangé.
*/
PlateauGenerateur.melanger = function(tableau) {
  var indexCourant = tableau.length, valeurTemporaire, indexHasard;

  // Tant qu'il y a un index à mélanger.
  while (0 !== indexCourant) {

    // Selectionne un index au hasard.
    indexHasard = Math.floor(Math.random() * indexCourant);
    indexCourant -= 1;

    // Remplace les deux éléments.
    valeurTemporaire = tableau[indexCourant];
    tableau[indexCourant] = tableau[indexHasard];
    tableau[indexHasard] = valeurTemporaire;
  }

  return tableau;
}


/**
  * Ajoute un nombre de cellule au plateau.
  *
  * @param   {Number}  nbCellule      Nombre de cellule.
  * @param   {Cellule} typeCellule    Le type de cellule (arme, obstacle, etc.).
  * @param   {Array}   plateau        Le plateau.
  * @returns {Void}
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


/**
  * Créé une plateau sur laquelle sont placées les cellules.
  *
  * @param   {Number}  nbCellule      Nombre de cellule.
  * @param   {Cellule} typeCellule    Le type de cellule (arme, obstacle, etc.).
  * @returns {Array}                  Le plateau avec cellules.
  */
PlateauGenerateur.creerPlateau = function() {
    var plateau = [];

    this.ajouter(this.getControlleur().getParametre().NB_VIDE, "vide", plateau);
    this.ajouter(this.getControlleur().getParametre().NB_OBSTACLE, "obstacle", plateau);
    this.ajouter(this.getControlleur().getParametre().NB_ARME, "arme", plateau);

    this.melanger(plateau);
    return plateau;
}
