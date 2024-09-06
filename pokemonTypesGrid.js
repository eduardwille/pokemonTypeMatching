/** Creates a grid containing every pokemon type so the player can answer with a grid
 * Only creates it if the container for the grid is empty
 */
function createTypeGrid() {
    answerField.style.display = 'none';
    answerFieldGrid.style.display = 'flex';
    gridCheckbox.checked = false;

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

/** for loop that goes through all the weaknesses of the random type 
 * creates input element per weakness   
 * input gets event on enter key which runs the checkAnswer function
*/
function createTypeInputs(randomizedNumber) {
    answerField.style.display = 'block';
    answerFieldGrid.style.display = 'none';

    for (i=0; i < pokemonTypes[randomizedNumber].weakness.length; i++) {
        var input = document.createElement('input');

        answerField.appendChild(input);
        input.addEventListener("keydown", function (e) {
            if (e.key === 'Enter') {
                checkAnswer(this, this.value);
            }
        });
    }
}