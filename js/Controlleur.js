var Controlleur = {

    NB_JOUEUR: 2,

    init: function() {
        this.setFabrique();
        this.setPlateauGenerateur();
        this.setPlateau();
        this.setJoueurs();
        this.setMaitreDuJeu();
        this.setPageGenerateur();
    },

    setFabrique: function() {
        /*
        le controlleur de la fabrique vaut "this". C'est la
        fabrique qui est chargée de transmettre la référence
        vers le controlleur à chaque composant.
        */
        var fabrique = Object.create(Fabrique);
        fabrique.init(this);
        this.fabrique = fabrique;
        console.log("Fin controlleur.setFabrique");
    },

    getFabrique: function() {
        return this.fabrique;
    },

    setPlateauGenerateur: function() {
        this.plateauGenerateur = this.getFabrique().creerPlateauGenerateur();
        console.log("Fin controlleur.setPlateauGenerateur");
    },

    getPlateauGenerateur: function() {
        return this.plateauGenerateur;
    },

    setPlateau: function() {
        this.plateau = this.getPlateauGenerateur().creerPlateau();
        console.log("Fin controlleur.setPlateauGenerateur");
    },

    getPlateau: function() {
        return this.plateau;
    },

    setJoueurs: function() {
        console.log("Début controlleur.setJoueurs");
        this.joueurs = [];
        for (var i = 0; i < this.NB_JOUEUR; i++) {
            var joueur = this.getFabrique().creerJoueur()
            this.joueurs.push(joueur);
        }
        // Défini le premier joueur comme actif.
        this.joueurs[0].setActif(true);
        console.log("Fin controlleur.setJoueurs");
    },

    getJoueurs: function() {
        return this.joueurs;
    },

    setMaitreDuJeu: function() {
        this.maitreDuJeu = this.getFabrique().creerMaitreDuJeu(plateau=this.getPlateau(),
                                                            joueurs=this.getJoueurs(),
                                                            );
        console.log("Fin controlleur.setMaitreDuJeu");
    },

    getMaitreDuJeu: function() {
        return this.maitreDuJeu;
    },

    setPageGenerateur: function() {
        this.pageGenerateur = this.getFabrique().creerPageGenerateur();
        console.log("Fin controlleur.setPageGenerateur");
    },

    getPageGenerateur: function() {
        return this.pageGenerateur;
    },

    lancerPartie: function() {
        this.getPageGenerateur().dessinerPlateau(this.getPlateau());
    }
};
