var createAnimalRows = function(headerRow, rows){
    animalRows = [];
    for(var i = 0 ; i < rows.length; i++){
        animalRows.push(createAnimalRow(headerRow, rows[i]));
    }
    return animalRows;
}

var createAnimalRow = function(headerRow, row){
    animalRow = {};
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
    return animalRow
}

var createHeaderRow = function(rows){
    return rows[3];
}


module.exports = {createHeaderRow, createAnimalRows};