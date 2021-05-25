const express = require('express');
const path = require('path');
const randomId = require('random-id');
const app = express(),
bodyParser = require("body-parser");
const fs = require('fs');
const searchTools = require('./src/searchTools');
const animalRow = require('./src/animalRow');
port = 3080;

const { google } = require("googleapis");
var googleAuth = require('google-auth-library');


// place holder for the data
const users = [];

app.get('/api/genero-especie', async(req,res) => {
    console.log('genero-especie called!!!!!!!');

  const auth = new google.auth.GoogleAuth({
    keyfile: "credentials.json",
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

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/dist')));

app.get('/api/users', (req, res) => {
  console.log('api/users called__@@@__')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  user.id = randomId(10);
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});


app.post('/api/search-animal', async(req, res) => {
  console.log("hahahaha");
  const auth = new google.auth.GoogleAuth({
    keyfile: "credentials.json",
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

  
  const headerRow = animalRow.createHeaderRow(rows);
  var animalRows = animalRow.createAnimalRows(headerRow, matchingRows);
  // console.log(animalRows);
  res.json(animalRows); 
});




app.get('/', async(req,res) => {
  // const auth = new google.auth.GoogleAuth({
  const auth = new google.auth.GoogleAuth({
    keyfile: "credentials.json",
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  });
console.log('aaaa');

  //create cliente instantce for auth
  // const client = await auth.getClient();
  const client = await auth.getClient();

  //instance for googlesheets api
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1yVcNxCu3uxD2dqmvLxkbZhi-DETwPW3ilzwpPzYaUZ4";
  //get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
  });

  const getRows = await googleSheets.spreadsheets.values.get({
    auth, spreadsheetId,
    range: "Banco de Dados_Geral!A:A",
  });

  await googleSheets.spreadsheets.values.append({
    auth, spreadsheetId, range: "Errata!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values:[
        ["make a tutorial", "test123"]
      ]
    }
  })



  res.send(getRows);
  // res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});
app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});