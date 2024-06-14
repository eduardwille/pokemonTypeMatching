// Define the API URL
const apiUrl = 'https://pokeapi.co/api/v2/type/';

// Make a GET request
function pokeApiCall(){
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            pokemonTypesFromAPI = data;
            console.log(pokemonTypesFromAPI);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.onload = function(){
    //pokeApiCall();
    if(sessionStorage.pokemonTypes){
        console.log('types retrieved from session instead of making an API call');
        console.log(getPokemonTypes());
    } else {
        console.log('Types retrieved from API instead of session');
        sessionStorage.setItem('pokemonTypes', JSON.stringify(pokemonTypes));
        console.log(getPokemonTypes());
    }
    
}

function getPokemonTypes(){
    return JSON.parse(sessionStorage.pokemonTypes)
}