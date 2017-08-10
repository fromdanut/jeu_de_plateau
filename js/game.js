// Génère un plateau.
var PG = Object.create(PlateauGenerateur);
var plateau = PG.creerPlateau();
console.log("le plateau : ");
console.log(plateau);

// Génère les joueurs.
var JG = Object.create(JoueurGenerateur);
var joueurs = JG.creerJoueurs();
console.log("les joueurs : ");
console.log(joueurs);


// Génère le maitre du jeu qui va gérer le plateau.
var MJ = Object.create(MaitreDuJeu);
MJ.init(plateau, joueurs);
MJ.genererCelluleAccessible();
console.log("les éléments du maitre du jeu");
console.log("Le plateau");
console.log(MJ.getPlateau());
console.log("Les joueurs");
console.log(MJ.getJoueurs());

// Génère le PageGenerateur.
var pageGenerateur = Object.create(PageGenerateur);

// Connecter Maitre du Jeu et Page Generateur.
MJ.setPageGenerateur(pageGenerateur);
pageGenerateur.setMaitreDuJeu(MJ);

pageGenerateur.dessinerPlateau(MJ.getPlateau());
