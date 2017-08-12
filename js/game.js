var controlleur = Object.create(Controlleur);
controlleur.init();

console.log("Fin initialisation du controleur, controleur :");
console.log(controlleur);

controlleur.getPageGenerateur().dessinerPlateau(controlleur.getPlateau());
