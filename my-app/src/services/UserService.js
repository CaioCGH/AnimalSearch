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

export async function createUser(data) {
    console.log("criando usuário");
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}
