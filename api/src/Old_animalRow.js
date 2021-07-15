class AnimalRow{
    constructor(
        kingdom,
        phylum,
        subphylum,
        clazz,
        subclass,
        infraclass,
        order,
        suborder,
        family,
        subfamily,
        tribe,
        genus,
        species,
        subspecies,
        author,
        commonName,
        englishName,
        observations,
        speciesBiology,
        conservationStatus,
        viewRecords
    ){
        this.kingdom = kingdom;
        this.phylum = phylum;
        this.subphylum = subphylum;
        this.clazz = clazz;
        this.subclass = subclass;
        this.infraclass = infraclass;
        this.order = order;
        this.suborder = suborder;
        this.family = family;
        this.subfamily = subfamily;
        this.tribe = tribe;
        this.genus = genus;
        this.species = species;
        this.subspecies = subspecies;
        this.author = author;
        this.commonName = commonName;
        this.englishName = englishName;
        this.observations = observations;
        this.speciesBiology = speciesBiology;
        this.conservationStatus = conservationStatus;
        this.viewRecords = viewRecords;
    }
    static createAnimalRows(rows){
        animalRows = [];
        for(var i = 0; i < rows.length; i++){
            animalRows.push(createAnimalRow(rows[i]));
        }
        return animalRows;
    }


    static createAnimalRow(row){

        const speciesBiology = new SpeciesBiology(
            row[18],
            row[19],
            row[20],
            row[21],
            row[22],
            row[23],
            row[24],
            row[25],
            row[26],
            row[27],
            row[28],
            row[29],
            row[30],
            row[31]
        );

        const conservationStatus = {
            "Decreto Estadual 60.133/2014" : row[32],
            "Decreto Estadual 63.853/2018" : row[33],
            "MMA/2014" : row[34],
            "MMA/2018" : row[35],
            "IUCN/2014" : row[36],
            "IUCN/2019.1e2" : row[37],
            "IUCN/2020" : row[38],
            "IUCN/2020 (versão 2020-3)" : row[39],
            "IUCN/2021 (versão 2021-1)" : row[40]
        }

        const viewRecords = {

        }

        animalRow = new AnimalRow(
            row[0],
            row[1],
            row[2],
            row[3],
            row[4],
            row[5],
            row[6],
            row[7],
            row[8],
            row[9],
            row[10],
            row[11],
            row[12],
            row[13],
            row[14],
            row[15],
            row[16],
            row[17],
            speciesBiology,
            conservationStatus,
            viewRecords,
        )
    }
}
class SpeciesBiology{
    constructor(
        nature,
        nature_invertebratesReview,
        endemism_atlanticForest,
        endemism_Brazil,
        habitat1,
        sensibility,
        biomeOcurrence,
        federalPermanence,
        migratingBirds,
        relativeAbundance,
        diet,
        foodGuild,
        habitat2,
        locomotion){
            this.nature = nature;
            this.nature_invertebratesReview = nature_invertebratesReview;
            this.endemism_atlanticForest = endemism_atlanticForest;
            this.endemism_Brazil = endemism_Brazil;
            this.habitat1 = habitat1;
            this.sensibility = sensibility;
            this.biomeOcurrence = biomeOcurrence;
            this.federalPermanence = federalPermanence;
            this.migratingBirds = migratingBirds;
            this.relativeAbundance = relativeAbundance;
            this.diet = diet;
            this.foodGuild = foodGuild;
            this.habitat2 = habitat2;
            this.locomotion = locomotion;
        }
}


module.exports = {AnimalRow,SpeciesBiology, Test};