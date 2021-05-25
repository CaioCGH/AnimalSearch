// tools.js
// ========
module.exports = {
    find: function (rows, searchCriteria) {
      if(searchCriteria.species != ''){
          console.log("a");
          return findMatchingRowsOnTwoCriteria(rows, searchCriteria.genus, searchCriteria.species, 11, 12);
      }
      if(searchCriteria.genus != ''){
          return findMatchingRowsOnOneCriteria(rows, searchCriteria.genus, 11);
      }
      if(searchCriteria.commonName != ''){
          return findMatchingRowsOnOneCriteria(rows, searchCriteria.commonName, 15);
      }
      return [];
    }
  };
  
  var findMatchingRowsOnOneCriteria = function (rows, string, index) {
    matchingRows = [];
    for(var i = 4; i < rows.length; i++){
        // console.log(string, rows[i][index]);
        if(string === rows[i][index]){
            matchingRows.push(rows[i]);
        }
    }
    return matchingRows;
}

var findMatchingRowsOnTwoCriteria = function (rows, string1, string2, index1, index2) {
    matchingRows = [];
    for(var i = 4; i < rows.length; i++){
        if(string1 === rows[i][index1] && string2 === rows[i][index2]){
            matchingRows.push(rows[i]);
        }
    }
    return matchingRows;
  }