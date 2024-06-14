// Define the API URL
const apiUrl = 'https://pokeapi.co/api/v2/type/';

// Make a GET request
function pokeApiCall(){
    if(sessionStorage.pokemonTypes){
        console.log('types retrieved from session instead of making an API call');
        console.log(getPokemonTypes());
        sessionStorage.clear();
    } else {
        console.log('Types retrieved from API instead of session');
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            sessionStorage.setItem('pokemonTypes', JSON.stringify(data.results));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function getPokemonTypes(){
    return JSON.parse(sessionStorage.pokemonTypes);
}

pokeApiCall();