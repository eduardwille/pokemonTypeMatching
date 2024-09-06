/**
 * Creates a grid containing every pokemon type so the player can answer with a grid
 * Only creates it if the container for the grid is empty
 */
function createTypeGrid() {
    if(answerFieldGrid.innerHTML == ''){
        pokemonTypes.forEach(item => {
            var typeContainer = document.createElement('p');
            typeContainer.innerHTML = item.type;
            typeContainer.style.backgroundColor = item.color;
            typeContainer.style.display = 'inline-block';

            answerFieldGrid.appendChild(typeContainer);
        });
    }
}