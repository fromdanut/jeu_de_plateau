var controlleur = Object.create(Controlleur);
controlleur.init();

console.log("Fin initialisation du controleur, controleur :");
console.log(controlleur);

controlleur.getPage().dessinerPlateau(controlleur.getPlateau());
