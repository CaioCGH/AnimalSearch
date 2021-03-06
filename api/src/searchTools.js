// tools.js
// ========

const TAXONOMY_RANGE = [0, 18];
const BIOLOGY_RANGE = [18, 32];
const CONCERN_RANGE = [32, 44];

const GENUS_COLUMN = 11;
const SPECIES_COLUMN = 12;
const COMMON_NAME_COLUMN = 15;

exports.find = (rows, searchCriteria) => {
  if (searchCriteria.species != "") {
    console.log("search for genus and species");
    return findMatchingRowsOnTwoCriteria(
      rows,
      searchCriteria.genus,
      searchCriteria.species,
      11,
      12
    );
  }
  if (searchCriteria.genus != "") {
    console.log("search for genus");
    return findMatchingRowsOnOneCriteria(rows, searchCriteria.genus, 11);
  }
  if (searchCriteria.commonName != "") {
    console.log("search for common name");
    return findMatchingRowsOnOneCriteria(rows, searchCriteria.commonName, 15);
  }
  console.log("unkown search");
  return [];
};

exports.getBioOnlineLocalities = (rows) => {
  return { localities: rows[3].slice(45, rows[3].length) };
};

exports.getGeneraSpeciesCommonNames = (rows) => {
  generaSpeciesDict = {};
  commonNames = [];
  for (var i = 4; i < rows.length; i++) {
    if (generaSpeciesDict[rows[i][GENUS_COLUMN]] === undefined) {
      generaSpeciesDict[rows[i][GENUS_COLUMN]] = [];
    }
    generaSpeciesDict[rows[i][GENUS_COLUMN]].push(rows[i][SPECIES_COLUMN]);
    commonNames.push(rows[i][COMMON_NAME_COLUMN]);
  }

  const orderedGeneraSpeciesDict = sortKeys(generaSpeciesDict);
  return {
    generaSpeciesDict: orderedGeneraSpeciesDict,
    commonNames: uniq(commonNames),
  };
};

function sortKeys(unorderedKeysObject) {
  return Object.keys(unorderedKeysObject)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unorderedKeysObject[key];
      return obj;
    }, {});
}
function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}
exports.getBioOnlineColumns = (headerRows) => {
  var columnsData = {
    Básico: [
      "Nome Científico",
      "Nome Comum",
      "IUCN/2021 (versão 2021-1)",
      "CITES/2021",
    ],
    Taxonomia: headerRows.slice(TAXONOMY_RANGE[0], TAXONOMY_RANGE[1]),
    Biologia: headerRows.slice(BIOLOGY_RANGE[0], BIOLOGY_RANGE[1]),
    "Categorias de Ameaça": headerRows.slice(
      CONCERN_RANGE[0],
      CONCERN_RANGE[1]
    ),
    "Observações registradas": ["Observações registradas"],
  };
  return columnsData;
};

exports.getBioOnlineSpeciesInLocalities = (rows, localities) => {
  var observedInLocalitiesRows = [];
  for (let i = 0; i < localities.length; i++) {
    const localityIndex = findLocalityIndex(rows, localities[i]);
    for (let j = 4; j < rows.length; j++) {
      if (
        rows[j][localityIndex] !== "" &&
        rows[j][localityIndex] !== undefined
      ) {
        observedInLocalitiesRows.push(rows[j]);
      }
    }
  }
  return uniq(observedInLocalitiesRows);
};

var findLocalityIndex = function (rows, locality) {
  locality = locality.trim().replace(/\s+/g, " ");
  for (var i = 0; i < rows[3].length; i++) {
    // console.log(rows[3][i].trim());
    if (rows[3][i].trim().replace(/\s+/g, " ") === locality) {
      console.log("locality index found for [" + locality + "]: " + i);
      return i;
    }
  }
  console.log("locality index not found for locality [" + locality + "]");
  return Number.MAX_SAFE_INTEGER; //exception
};

var findMatchingRowsOnOneCriteria = function (rows, string, index) {
  matchingRows = [];
  for (var i = 4; i < rows.length; i++) {
    // console.log(string, rows[i][index]);
    if (string === rows[i][index].trim()) {
      matchingRows.push(rows[i]);
    }
  }
  return matchingRows;
};

var findMatchingRowsOnTwoCriteria = function (
  rows,
  string1,
  string2,
  index1,
  index2
) {
  matchingRows = [];
  for (var i = 4; i < rows.length; i++) {
    if (
      string1 === rows[i][index1].trim() &&
      string2 === rows[i][index2].trim()
    ) {
      matchingRows.push(rows[i]);
    }
  }
  return matchingRows;
};
