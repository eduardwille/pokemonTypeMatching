/** get container divs from html */
var homeMenu = document.getElementById('homeMenu');
var container = document.getElementById('weaknessContainer');
var answerFieldGrid = document.getElementById('answerFieldGrid');
var answerField = document.getElementById('answerField');
var type = document.getElementById('type');
var gridCheckbox = document.getElementById('gridCheckbox');

/** create a temporary array
 * this will be used to check and remove correct answers so no duplicate answers
 */
var tempWeaknessArray = [];

/** starts the weakness guessing game and hides the home menu */
function startWeaknessGame() {
    startGame();
    container.style.display = 'block';
    homeMenu.style.display = 'none';
}

/** large function that sets up everything needed for the game */
function startGame() {
    /** generate random number based on how many pokemon types */
    var randomizedNumber = Math.floor(Math.random() * pokemonTypes.length);
    
    /** push the weakness of current type into array per item so there is no link to array pokemonTypes */
    for(b=0; b < pokemonTypes[randomizedNumber].weakness.length; b++){
        tempWeaknessArray.push(pokemonTypes[randomizedNumber].weakness[b]);
    }

    /** put randomized pokemontype into the title and change color to match*/
    type.innerHTML = pokemonTypes[randomizedNumber].type;
    type.style.backgroundColor = pokemonTypes[randomizedNumber].color;

    /** Function that creates the input fields where the player guesses */
    if(gridCheckbox.checked == true){
        createTypeGrid();
    } else {
        createTypeInputs(randomizedNumber);
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

/** reset function, clears title, answers and starts a new game */
function reset(){
    tempWeaknessArray = [];
    answerField.innerHTML = '';
    type.innerHTML = '';
    startGame();
}

/** function that quits the game and goes back to the home menu
 * The confirm function runs a yes or no dialog for the user
 * Empty all the gameplay variables so it'll be ready for the next game
 * then hide the game window and show the home menu again
 */
function quitGame() {
    if(confirm("Are you sure you want to quit?")){
        tempWeaknessArray = [];
        answerField.innerHTML = '';
        type.innerHTML = '';
    
        container.style.display = 'none';
        homeMenu.style.display = 'block';
    }
}