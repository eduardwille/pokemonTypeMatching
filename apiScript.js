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
    pokeApiCall();
}