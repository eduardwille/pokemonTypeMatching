/** Creates a grid containing every pokemon type so the player can answer with a grid
 * Only creates it if the container for the grid is empty
 */
function createTypeGrid() {
    toggleInputType();
    answerFieldGrid.innerHTML = '';
    pokemonTypes.forEach(item => {
        var typeContainer = document.createElement('p');
        typeContainer.innerHTML = item.type;
        typeContainer.style.backgroundColor = item.color;
        typeContainer.onclick = (function(){
            console.log(pokemonTypes[randomizedNumber].type, item.type);

            checkAnswerInput(item, this);
        });

        answerFieldGrid.appendChild(typeContainer);
    });

    remainingAnswers.innerHTML = pokemonTypes[randomizedNumber].weakness.length + ' types remaining';
}

/** for loop that goes through all the weaknesses of the random type 
 * creates input element per weakness   
 * input gets event on enter key which runs the checkAnswer function
*/
function createTypeInputs() {
    toggleInputType();
    for (i=0; i < pokemonTypes[randomizedNumber].weakness.length; i++) {
        var input = document.createElement('input');

        answerField.appendChild(input);
        input.addEventListener("keydown", function (e) {
            if (e.key === 'Enter') {
                checkAnswerInput(this);
            }
        });
    }
}

/** function that checks answer of a specific input
 * then disables that input, and updates css a little
 */
function checkAnswerInput(answer, gridItem) {
    for(a=0; a < tempWeaknessArray.length; a++){
        if(gridCheckbox.checked == true){
            if(tempWeaknessArray[a] == answer.type){
                gridItem.style.display = 'none';
                tempWeaknessArray.splice(a, 1);
            }
        } else {
            if(tempWeaknessArray[a] == answer.value){
                answer.disabled = 'true';
                answer.style.backgroundColor = 'green';
                answer.style.color = 'white';
                tempWeaknessArray.splice(a, 1);
            }
        }
    }

    if(gridCheckbox.checked == true){
        remainingAnswers.innerHTML = tempWeaknessArray.length + ' types remaining'; /** updates the types remaining counter */
    } 
    /** if answer is incorrect remove text so user can type right away */
    else if (answer.style.backgroundColor != 'green') { 
        answer.value = ''; 
    }

    /** if temporary array is empty all answers were given and reset game */
    if(tempWeaknessArray == 0){
        document.body.style.backgroundColor = 'green';
        setTimeout(() => {
            document.body.style.backgroundColor = 'white';
            reset();
        }, 500);
    }
}

/** this function will give the player a hint */
function getHint(){
    var allInputs = document.getElementById('answerField').children;
    
    /** create a temporary array that will be used to fill in hints per input
     * this is the same as tempWeaknessArray, but it will remove the item after every hint use
     */
    var array = [];
    tempWeaknessArray.forEach((weakness) => {
        array.push(weakness);
    });

    /** for loop that goes through all the inputs 
     * when an input is not disabled, enter the first letter as a hint
     * then remove the item that was used for the hint (remove duplicates)
    */
    for(c=0; c < allInputs.length; c++){
        if(!allInputs[c].disabled){
            console.log(allInputs[c]);
            console.log(array);

            for(d=0; d < array.length; d++){
                allInputs[c].value = array[0].charAt(0);
            }
            array.shift();
        }
    }
}

/** This is to remove clutter from functions with important logic */
function toggleInputType() {
    if(gridCheckbox.checked == true){
        answerField.style.display = 'none';
        answerFieldGrid.style.display = 'flex';
        remainingAnswers.style.display = 'block';
        getHintButton.style.display = 'none';
    } else {
        answerField.style.display = 'block';
        answerFieldGrid.style.display = 'none';
        remainingAnswers.style.display = 'none';
        getHintButton.style.display = 'inline-block';
    }
}