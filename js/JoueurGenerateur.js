/*
    Génère une liste de joueur.
*/

var JoueurGenerateur = {

    NB_JOUEUR: 2,

    /*
        Créer une liste de joueurs.
    */
    creerJoueurs() {
        var joueurs = []
        for (var i = 0; i < this.NB_JOUEUR; i++) {
            var joueur = this.creerJoueur()
            joueurs.push(joueur);
        }
        // Défini le premier joueur comme actif.
        joueurs[0].setActif(true);
        return joueurs;
    },

    /*
        Créer une joueurs sur laquelle sont placées les cellules (cellule vide, obstacle,
        armes).
    */
    creerJoueur: function() {

        var arme = Object.create(Arme);
        arme.init();
        var joueur = Object.create(Joueur);
        joueur.init(arme);

        return joueur;
    }
};
