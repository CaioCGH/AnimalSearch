exports.createAnimalRows = function(headerRow, rows){
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
    return animalRow;
}

exports.createHeaderRow = function(rows){
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

exports.addObservationDetailColumn = function(rows, localities){
    for(let i = 0; i < rows.length; i++){
        for(let j = 0; j < localities.length; j++){
            rows[i][localities[j]] = rows[i]['Observações registradas'][localities[j]];
        }
    }
    return rows;
}