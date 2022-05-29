//Blackjack
let min = 2;
let max = 12;
let hasBlackJack = false;
let isAlive = true;
let message = "";
let cards = [];
let num = 0;
let sum = 0;
let gameStarted = false;
let firstCard;
let secondCard;

let pName = prompt("What is your name?");
let pChips = parseInt(prompt("How much do you want to play for? (number only)"));

//name and chips both relate to the player object
let player = {
    name: pName,
    chips: pChips
}

document.querySelector("#player").innerText = player.name + ": $" + player.chips;

//Start Game
//draws two cards and calls playGame()
function startGame() {
    if(gameStarted == false) {
        gameStarted = true;
        isAlive = true;
        hasBlackJack = false;
        firstCard = getRandNum(min, max);
        secondCard = getRandNum(min, max);
        cards = [firstCard, secondCard];
        sum = firstCard + secondCard;
        playGame();
   }
}

//logic of the game. Handles the play again button, the chip count, message displayed, and blackjack sum total
function playGame() {
    if(player.chips >= 50)  { 
        if(gameStarted == false) {
            gameStarted = true;
            isAlive = true;
            hasBlackJack = false;
            firstCard = getRandNum(min, max);
            secondCard = getRandNum(min, max);
            cards = [firstCard, secondCard];
            sum = firstCard + secondCard;
            document.querySelector("#cards").textContent = "Cards:";
        }
        
       document.querySelector("#sum").textContent = "Sum: " + sum;
        
        while(num != cards.length) {
            document.querySelector("#cards").textContent += cards[num] + " ";
            num++;
        }
        
        if (sum <= 20) {
            message = "Do you want to draw a new card?";
        } else if (sum === 21) {
            message = "Wohoo! You've got Blackjack! +$100";
            hasBlackJack = true;
            gameStarted = false;
            player.chips += 100;
        } else if(sum > 21 &&  player.chips >= 100) {
            message = "You lost! -$50...Do you want to play again?";
            isAlive = false;
            gameStarted = false;
            player.chips -= 50;
        } else {
            message = "You lost! -$50... GAME OVER! You do not have sufficient funds.";
            isAlive = false;
            gameStarted = false;
            player.chips -= 50;
        }
        document.querySelector(".message").textContent = message;
        document.querySelector("#player").textContent = player.name + ": $" + player.chips;
    }
}

//keep drawing a new card until conditions aren't met
function newCard() {
    if(isAlive == true && hasBlackJack == false && gameStarted == true && player.chips >= 50) {
        let newCardVal = getRandNum(min, max);
        sum += newCardVal;
        cards.push(newCardVal);
        playGame();
    }
}

//button if the user wants to play again
function playAgain() {  
    if(isAlive == false || hasBlackJack == true) {
        num = 0;
        playGame();
    }
}

//generate a random number between a given range
function getRandNum(min, max) {
    let randNum = Math.floor(Math.random() * (max-min) + min);
    return randNum;
}

var startButton = document.querySelector("#startButtonHide");

//hide start button if it is clicked
startButton.addEventListener("click", () => {
    startButton.style.display = 'none';
})