const express = require('express'); //npm install express
const path = require('path');
const app = express();
const port = 3000;

/* --------- Code à compléter pour faire l'exo4 et l'exo5 ------- */
/* --------- Lancez le serveur !! cmd = "node serveur.js" ------- */

// Chemin vers le fichier CSV
const csvFilePath = path.join(__dirname, './Data/data.csv');

// Route pour servir le fichier CSV
app.get(
/**
 * ... à completer ...
 * 
 */
);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});


