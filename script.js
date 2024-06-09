/** get container divs from html */
var container = document.getElementById('container');
var answerField = document.getElementById('answerField');
var type = document.getElementById('type');

/** create a temporary array
 * this will be used to check and remove correct answers so no duplicate answers
 */
var tempWeaknessArray = [];

/** starts first game on opening the window */
window.onload = startGame();

function startGame() {
    /** generate random number based on how many pokemon types */
    var randomizedNumber = Math.floor(Math.random() * pokemonTypes.length);
    
    /** push the weakness of current type into array per item so there is no link to array pokemonTypes */
    for(b=0; b < pokemonTypes[randomizedNumber].weakness.length; b++){
        tempWeaknessArray.push(pokemonTypes[randomizedNumber].weakness[b]);
    }

    console.log(tempWeaknessArray);

    /** put randomized pokemontype into the title and change color to match*/
    type.innerHTML = pokemonTypes[randomizedNumber].type;
    type.style.backgroundColor = pokemonTypes[randomizedNumber].color;

    /** for loop that goes through all the weaknesses of the random type 
     * creates input element per weakness
     * input gets event on enter key which runs the checkAnswer function
    */
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

/** function that checks answer of a specific input
 * then disables that input, and updates css a little
 */
function checkAnswer(input, answer) {
    for(a=0; a < tempWeaknessArray.length; a++){
        if(tempWeaknessArray[a] == answer){
            input.disabled = 'true';
            input.style.backgroundColor = 'green';
            input.style.color = 'white';
            tempWeaknessArray.splice(a, 1);
        }
    }

    /** if answer is incorrect remove text so user can type right away */
    if(input.style.backgroundColor != 'green'){
        input.value = '';
    }

    /** if temporary array is empty all answers were given and reset game */
    if(tempWeaknessArray == 0){
        reset();
    }
}

/** this function will give the player a hint */
function getHint(){
    console.log(tempWeaknessArray);

    var allInputs = document.getElementById('answerField').children;

    for(c=0; c < allInputs.length; c++){
        console.log(allInputs[c]);

        if(!allInputs[c].disabled){
            console.log(tempWeaknessArray);
            for(d=0; d < tempWeaknessArray.length; d++){
                allInputs[c].value = tempWeaknessArray[d].charAt(0);
            }
        }
    }
}

/** reset function, clears title, answers and starts a new game */
function reset(){
    tempWeaknessArray = [];
    answerField.innerHTML = '';
    type.innerHTML = '';
    startGame();
}