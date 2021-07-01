// tools.js
// ========
exports.find = (rows, searchCriteria) => {
      if(searchCriteria.species != ''){
          console.log("search for genus and species");
          return findMatchingRowsOnTwoCriteria(rows, searchCriteria.genus, searchCriteria.species, 11, 12);
        }
        if(searchCriteria.genus != ''){
          console.log("search for genus");
          return findMatchingRowsOnOneCriteria(rows, searchCriteria.genus, 11);
        }
        if(searchCriteria.commonName != ''){
          console.log("search for common name");
          return findMatchingRowsOnOneCriteria(rows, searchCriteria.commonName, 15);
        }
      console.log("unkown search");
      return [];
    }

exports.getBioOnlineLocalities = (rows) => {
      return { localities: rows[3].slice(45,rows[3].length )};
    }
exports.getBioOnlineSpeciesInLocality = (rows, locality) => {
  const localityIndex = findLocalityIndex(rows, locality);
  observedInLocalityRows = [];
  for(var i = 4; i < rows.length; i++){
    console.log(rows[i][localityIndex] + "result:"  + (rows[i][localityIndex] !== ''));
    if(rows[i][localityIndex] !== '' && rows[i][localityIndex] !== undefined){
      observedInLocalityRows.push(rows[i]);
    }
  }
  return observedInLocalityRows;
}


var findLocalityIndex = function(rows, locality){
    for(var i = 0; i < rows[0].length; i++){
      if(rows[3][i].trim() === locality){ 
        console.log("index found:" + i);
        return i;
      }
    }
    console.log("index not found:");
    return 0;//execption 
  }

  var findMatchingRowsOnOneCriteria = function (rows, string, index) {
    matchingRows = [];
    for(var i = 4; i < rows.length; i++){
        // console.log(string, rows[i][index]);
        if(string === rows[i][index].trim()){
            matchingRows.push(rows[i]);
        }
    }
    return matchingRows;
}

var findMatchingRowsOnTwoCriteria = function (rows, string1, string2, index1, index2) {
    matchingRows = [];
    for(var i = 4; i < rows.length; i++){
        if(string1 === rows[i][index1].trim() && string2 === rows[i][index2].trim()){
            matchingRows.push(rows[i]);
        }
    }
    return matchingRows;
  }