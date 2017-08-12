/*
    Prototype dont tous les composants du jeux hériteront, afin d'avoir un accès
    au controlleur (cellule, joueurs, plateau, maitre du jeu et pageGenerateur).
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
            console.log(controlleur);
            console.log(typeof controlleur);
        }
    },

    getControlleur: function() {
        return this.controlleur;
    },
};
