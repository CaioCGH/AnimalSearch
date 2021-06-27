const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const searchTools = require('./src/searchTools');
const animalRow = require('./src/animalRow');
const scraper = require('./src/scraper');
const ebird = require('./src/ebird');

port = 3000;

const { google } = require("googleapis");
var googleAuth = require('google-auth-library');


app.use(bodyParser.json());


app.get('/api/genero-especie', async(req,res) => {
    console.log('genero-especie called!!!!!!!');

  const auth = new google.auth.GoogleAuth({
    // keyfile: "credentials.json",
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1yVcNxCu3uxD2dqmvLxkbZhi-DETwPW3ilzwpPzYaUZ4";

  const getRows = await googleSheets.spreadsheets.values.get({
    auth, spreadsheetId,
    range: "Banco de Dados_Geral!L:M",
  });
  res.json(getRows);
});


app.post('/api/user', (req, res) => {
  const searchCriteria = req.body.searchCriteria;
  scraper.scrapeWikiavesName(searchCriteria.wikiavesCode)
  .then((data) => {
    console.log("data");
    console.log(data);
    res.json(data); 
  });
});


app.post('/api/search-animal', async(req, res) => {
  const auth = new google.auth.GoogleAuth({
    // keyfile: "credentials.json",
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1yVcNxCu3uxD2dqmvLxkbZhi-DETwPW3ilzwpPzYaUZ4";

  const datasheetData = await googleSheets.spreadsheets.values.get({
    auth, spreadsheetId,
    range: "Banco de Dados_Geral!A:IM",
  });
  const rows = datasheetData.data.values;

  const searchCriteria = req.body.searchCriteria;
  console.log(searchCriteria);
  const matchingRows = searchTools.find(rows, req.body.searchCriteria);
  console.log(matchingRows);

  
  const headerRow = animalRow.createHeaderRow(rows);
  var animalRows = animalRow.createAnimalRows(headerRow, matchingRows);
  res.json(animalRows); 
});

app.post('/api/wikiaves-search', async(req, res) => {
  const searchCriteria = req.body.searchCriteria;
  console.log(searchCriteria)
  scraper.scrapeWikiavesSearch(searchCriteria.wikiavesSearchTerm)
  .then((data) => {
    res.json(data); 
  });
});

app.post('/api/wikiaves-search-wid', async(req, res) => {
  const searchCriteria = req.body.searchCriteria;
  console.log(searchCriteria)
  scraper.scrapeWikiavesSearchWid(searchCriteria.wid)
  .then((data) => {
    res.json(data); 
  });
});

app.post('/api/ebird-search', async(req, res) => {
  const searchCriteria = req.body.searchCriteria;
  console.log(searchCriteria)
  ebird.ebirdSearch(searchCriteria.scientificName)
  .then((data) => {
    res.json(data); 
  });
});

app.get("/", function (req, res) {
  res.send("<h1>Hello World! in FaunaSP</h1>")
})


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on the port::${process.env.PORT} or 3000`);
});