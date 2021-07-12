const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const searchTools = require('./src/searchTools');
const animalRow = require('./src/animalRow');
const scraper = require('./src/scraper');
const ebird = require('./src/ebird');
const inaturalist = require('./src/inaturalist');
const downloadableDataMaker = require('./src/downloadableDataMaker');
const port = 3000;
const { google } = require("googleapis");
var googleAuth = require('google-auth-library');
app.use(bodyParser.json());
const LAST_DATA_COLUMN = 43; //última coluna antes das informações de observações
var rows = [];
var headerRow = [];


//conecta com a planilha google e constroi os objetos em memória para as queries
(async () => {
  try{
    console.log("Carregando planilha em memória..........")
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
    rows = datasheetData.data.values;
    headerRow = animalRow.createHeaderRow(rows);
    console.log("Planilha carregada em memória..........")
  } catch(e){
  console.log(e);
}
})();

app.get('/api/bio-online-columns', async(req,res) => {
  var columns = searchTools.getBioOnlineColumns(headerRow);
  res.json(columns);
});

app.get('/api/search-animal', async(req, res) => {
  const matchingRows = searchTools.find(rows, req.query);
  var animalRows = animalRow.createAnimalRows(headerRow, matchingRows);
  res.json(animalRows); 
});

app.get('/api/get-bio-online-localities', async(req, res) => {
  const bioOnlineLocalities = searchTools.getBioOnlineLocalities(rows);
  res.json(bioOnlineLocalities); 
});

app.get('/api/get-genera-species-commonnames', async(req, res) => {
  const generaSpeciesCommonNames = searchTools.getGeneraSpeciesCommonNames(rows);
  sleep(50000);
  res.json(generaSpeciesCommonNames); 
});

app.get('/api/bio-online-search-species-in-locality', async(req, res) => {
  const locality = req.query.locality;
  const observedInLocalityRows = searchTools.getBioOnlineSpeciesInLocality(rows, locality);
  const animalRows = animalRow.createAnimalRows(headerRow, observedInLocalityRows);
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

app.post('/api/inaturalist-search', async(req, res) => {
  const searchCriteria = req.body.searchCriteria;
  console.log(searchCriteria)
  inaturalist.inaturalistSearch(searchCriteria.scientificName)
  .then((data) => {
    res.json(data); 
  });
});

app.post("/api/download-from-locality", function (req, res) {
  console.log(req.body);
  const locality = req.body.searchCriteria.locality;
  const observedInLocalityRows = searchTools.getBioOnlineSpeciesInLocality(rows, locality);
  const animalRows = animalRow.createAnimalRows(headerRow, observedInLocalityRows);
  downloadableDataMaker.makeSheet(res, req.body.searchCriteria, animalRows);
})

app.get("/", function (req, res) {
  res.send("<h1>Bem vindo à API da FaunaSP!</h1>")
})


app.post("/api/download-bio-online-list", function (req, res) {
  const searchCriteria = req.body.searchCriteria;
  console.log(searchCriteria);
  const matchingRows = searchTools.find(rows, req.body.searchCriteria);
  var animalRows = animalRow.createAnimalRows(headerRow, matchingRows);
  const fileURL = downloadableDataMaker.makeSheet(res, animalRows);
  res.sendFile(fileURL.blob);
})


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on the port::${process.env.PORT} or 3000`);
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}