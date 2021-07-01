export async function getAllUsers() {
    const response = await fetch('/api/users');
    return await response.json();
}

export async function getGenreSpecies() {
    var response = await fetch('/api/genero-especie');
    return await response.json();
}


export async function searchAnimal(data) {
    const response = await fetch(`/api/search-animal`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({searchCriteria: data})
      })
    return await response.json();
}

export async function wikiavesSearch(data) {
    console.log(JSON.stringify({searchCriteria: data}));
    const response = await fetch(`/api/wikiaves-search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({searchCriteria: data}),
      })
    return await response.json();
}

export async function wikiavesSearchWid(data) {
    console.log(JSON.stringify("searchCriteria: data"));
    console.log(JSON.stringify({searchCriteria: data}));
    const response = await fetch(`/api/wikiaves-search-wid`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({searchCriteria: data}),
      })
    return await response.json();
}

export async function ebirdSearch(data) {
    const response = await fetch(`/api/ebird-search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({searchCriteria: data}),
      })
    return await response.json();
}

export async function inaturalistSearch(data) {
    const response = await fetch(`/api/inaturalist-search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({searchCriteria: data}),
      })
    return await response.json();
}

export async function getBioOnlineLocalities() {
    const response = await fetch(`/api/get-bio-online-localities`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
    return await response.json();
}

export async function getGeneraSpeciesCommonName() {
    const response = await fetch(`/api/get-genera-species-commonnames`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
    return await response.json();
}

export async function bioOnlineSearchAnimalsInLocality(payload) {
    const url = `/api/bio-online-search-species-in-locality?locality=${payload.locality}`;
    console.log(url);
    const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
    return await response.json();
}
