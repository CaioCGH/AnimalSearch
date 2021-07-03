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

export async function getBioOnlineColumns() {
    const url = `/api/bio-online-columns`;
    console.log(url);
    const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
    return await response.json();
}