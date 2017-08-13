/**
  * Prototype chargé de controller les différents composants du programme.
  * Il est rendu accessible dans l'ensemble des composant.
  * Il a accès aux parametres.
  */


var Controlleur = {

    init: function() {
        this.setParametre();
        this.setFabrique();
        this.setPlateau();
        this.setJoueurs();
        this.setMaitreDuJeu();
        this.setPage();
    },

    setParametre: function() {
        // Les parametres sont définis dans parametre.js (1er fichier sourcé).
        this.parametre = parametre;
    },

    getParametre: function() {
        return this.parametre;
    },

    setFabrique: function() {
        // Le controlleur de la fabrique vaut "this". C'est la
        // fabrique qui est chargée de transmettre la référence
        // vers le controlleur à chaque composant.
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
        // Joueurs est un tableau de joueurs.
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

    setPage: function() {
        this.page = this.getFabrique().creerPage();
        console.log("Fin controlleur.setPage");
    },

    getPage: function() {
        return this.page;
    },

    /**
      * Lance la partie en demandant au générateur de page de dessinger le plateau.
      *
      * @returns	{Void}
      */
    lancerPartie: function() {
        this.getPage().dessinerPlateau(this.getPlateau());
    }
};
