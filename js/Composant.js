/**
  * Prototype dont tous les composants (cellule, joueurs, plateau,
  * maitre du jeu et page) du jeux hériteront, afin
  * d'avoir un accès au controlleur.
  */

var Composant = {
    initComposant: function(controlleur) {
        this.setControlleur(controlleur);
    },

    init: function(controlleur) {
        this.initComposant(controlleur);
    },

    setControlleur: function(controlleur) {
        if (Controlleur.isPrototypeOf(controlleur)) {
            this.controlleur = controlleur;
        }
        else {
            console.log("Operation impossible : argument Controlleur invalide.");
        }
    },

    getControlleur: function() {
        return this.controlleur;
    },
};
