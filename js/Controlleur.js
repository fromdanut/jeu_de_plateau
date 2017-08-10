var Controlleur = {
    init: function(maitreDuJeu, pageGenerateur) {
        this.maitreDuJeu = maitreDuJeu;
        this.pageGenerateur = pageGenerateur;
    },

    faireJouerTour: function(position) {
        this.maitreDuJeu.jouerTour(position);
        var plateau = this.maitreDuJeu.getPlateau();
        this.pageGenerateur.dessinerPlateau(plateau);
    }
}
