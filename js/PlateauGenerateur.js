var PlateauGenerateur = {

    LARGEUR_PLATEAU : 10,
    NB_CASE: 100,
    NB_JOUEUR: 2,
    NB_ARME: 3,
    NB_OBSTACLE: 12,
    NB_CASE_VIDE: 85,

    melanger: function(array) {
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
  },


    /*
        Ajouter un nombre (nbCellule) d'Objet de prototype (CelluleType) au plateau.
    */
    ajouter: function(nbCellule, CelluleType, plateau) {
        for (var i = 0; i < nbCellule; i++) {
            var cellule = Object.create(CelluleType);
            cellule.init();
            // Les cellule sont englobées dans un tableau (afin de pouvoir y ajouter les joueurs)
            plateau.push([cellule]);
        }
    },

    /*
        Créé une plateau sur laquelle sont placées les cellules (cellule vide, obstacle,
        armes).
    */
    creerPlateau: function() {
        var plateau = [];

        this.ajouter(this.NB_CASE_VIDE, Cellule, plateau);
        this.ajouter(this.NB_OBSTACLE, Obstacle, plateau);
        this.ajouter(this.NB_ARME, Arme, plateau);

        this.melanger(plateau);
        return plateau;
    }
}
