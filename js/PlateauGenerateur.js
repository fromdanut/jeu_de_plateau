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
  * @param   {Number}  nb              Nombre de cellule.
  * @param   {Cellule} type            Le type de cellule (arme, obstacle, etc.).
  * @param   {Array}   plateau         Le plateau.
  * @param   {Array}   options         Les options.
  * @returns {Void}
*/
PlateauGenerateur.ajouterCellule = function(nb, type, plateau, param) {
    for (var i = 0; i < nb; i++) {
        var cellule = this.getControlleur().getFabrique().creerCellule(type, param);
        // Les cellules sont englobées dans un tableau (afin de pouvoir y ajouter les joueurs)
        plateau.push([cellule]);
    }
}

/**
  * Créé une plateau sur laquelle sont placées les cellules.
  *
  * @returns {Array}                  Le plateau avec cellules.
  */
PlateauGenerateur.creerPlateau = function() {
    var plateau = [];
    // Ajoute l'ensemble des cases...
    // ...vide...
    this.ajouterCellule(
        this.getControlleur().getParametre().NB_VIDE,
        "vide",
        plateau,
        this.getControlleur().getParametre().VIDE
    );

    // ...obstacle...
    this.ajouterCellule(
        this.getControlleur().getParametre().NB_OBSTACLE,
        "obstacle",
        plateau,
        this.getControlleur().getParametre().OBSTACLE
    );

    // ...les armes
    this.ajouterCellule(
        this.getControlleur().getParametre().NB_ARME_FAIBLE,
        type="arme",
        plateau,
        this.getControlleur().getParametre().ARME.faible
    );
    this.ajouterCellule(
        this.getControlleur().getParametre().NB_ARME_MOYEN,
        type="arme",
        plateau,
        this.getControlleur().getParametre().ARME.moyen
    );
    this.ajouterCellule(
        this.getControlleur().getParametre().NB_ARME_FORT,
        type="arme",
        plateau,
        this.getControlleur().getParametre().ARME.fort
    );

    // le vortex.
    this.ajouterCellule(
        this.getControlleur().getParametre().NB_VORTEX,
        type="vortex",
        plateau,
        this.getControlleur().getParametre().VORTEX
    );

    // l'échangeur.
    this.ajouterCellule(
        this.getControlleur().getParametre().NB_ECHANGEUR,
        type="echangeur",
        plateau,
        this.getControlleur().getParametre().ECHANGEUR
    );


    // Mélange le plateau.
    this.melanger(plateau);
    return plateau;
}
