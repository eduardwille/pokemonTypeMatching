/** get container divs from html */
var homeMenu = document.getElementById('homeMenu');
var container = document.getElementById('weaknessContainer');
var answerFieldGrid = document.getElementById('answerFieldGrid');
var answerField = document.getElementById('answerField');
var remainingAnswers = document.getElementById('remainingAnswers');
var type = document.getElementById('type');
var getHintButton = document.getElementById('getHint');
var gridCheckbox = document.getElementById('gridCheckbox');

/** create a temporary array
 * this will be used to check and remove correct answers so no duplicate answers
 */
var tempWeaknessArray = [];

/** creates the oldRandomizedNumber variable so it can be "if checked" before it being filled */
var oldRandomizedNumber;

/** starts the weakness guessing game and hides the home menu */
function startWeaknessGame() {
    startGame();
    container.style.display = 'block';
    homeMenu.style.display = 'none';
}

/** large function that sets up everything needed for the game */
function startGame() {
    /** generate random number based on how many pokemon types */
    randomizedNumber = Math.floor(Math.random() * pokemonTypes.length);
    /** A simple check that sees if the random number is the exact same as previous
     * Only runs once since chance of getting the same number 3x is incredibly small
     */
    if(oldRandomizedNumber == randomizedNumber){
        randomizedNumber = Math.floor(Math.random() * pokemonTypes.length);
    }   
    
    oldRandomizedNumber = randomizedNumber;
    
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
        createTypeInputs();
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