var Controlleur = {

    init: function() {
        this.setParametre();
        this.setFabrique();
        this.setPlateau();
        this.setJoueurs();
        this.setMaitreDuJeu();
        this.setPageGenerateur();
    },

    setParametre: function() {
        // Les parametres sont définis dans parametre.js (1er fichier sourcé).
        this.parametre = parametre;
    },

    getParametre: function() {
        return this.parametre;
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

    setPlateau: function() {
        // On utilise le générateur de plateau pour fabriquer le plateau.
        var plateauGenerateur = this.getFabrique().creerPlateauGenerateur();
        this.plateau = plateauGenerateur.creerPlateau();
        console.log("Fin controlleur.setPlateauGenerateur");
    },

    getPlateau: function() {
        return this.plateau;
    },

    setJoueurs: function() {
        // Joueurs est une liste de joueurs.
        console.log("Début controlleur.setJoueurs");
        this.joueurs = [];
        for (var i = 0; i < this.getParametre().NB_JOUEUR; i++) {
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
