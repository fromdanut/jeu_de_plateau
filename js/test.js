// D'abord le MJ car il est dans toutes les cellules.
var MJ = Object.create(MaitreDuJeu);

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
console.log("Le page generateur depuis le maitre du jeu");
console.log(MJ.getPageGenerateur());
pageGenerateur.setMaitreDuJeu(MJ);
console.log("Le le maitre du jeut depuis le page generateur ");
console.log(pageGenerateur.getMaitreDuJeu());

pageGenerateur.dessinerPlateau(MJ.getPlateau());
