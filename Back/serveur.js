const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const csvFilePath = path.join(__dirname, './Data/data.csv');

app.get('/data.csv', (req, res) => {
  res.sendFile(csvFilePath);
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});