var createAnimalRows = function(headerRow, rows){
    animalRows = [];
    for(var i = 0 ; i < rows.length; i++){
        animalRows.push(createAnimalRow(headerRow, rows[i]));
    }
    return animalRows;
}

var createAnimalRow = function(headerRow, row){
    animalRow = {
        "Nome Científico": '',
        "Nome Comum": '',
        "IUCN/2021 (versão 2021-1)": '',
        "CITES/2021": ''
    }
    for(var i = 0; i < row.length; i++){
        if(i > 43){
            if(i === 44){
                animalRow['Observações registradas'] = {};
            }
            if(row[i] != ''){
                animalRow['Observações registradas'][headerRow[i]] = row[i];
            }
        }else{
            animalRow[headerRow[i]] = row[i];
        }
    }
    animalRow["Nome Científico"] = animalRow["Gênero"] + " " + animalRow["Espécie"];
    console.log(animalRow);
    return animalRow;
}

var createHeaderRow = function(rows){
    headerRow = [];
    for(var i = 0; i < rows.length; i++){
        if(typeof rows[3][i] === "string"){
            headerRow.push(rows[3][i].trim());
        }else{
            headerRow.push(rows[3][i]);
        }
    }
    return headerRow;
}


module.exports = {createHeaderRow, createAnimalRows};