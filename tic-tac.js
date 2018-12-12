var gameOn = true;
var whoTurn = 1;
var player1Sq = [];
var player2Sq = [];
var player1Img = '<img src="chris.jpg" />';
var player2Img = '<img src="kevin.jpg" />';
var numberPlayers = 1;
var name = "Icognito";

const winningCombos = [
    ["A1", "B1", "C1"], // row 1
    ["A2", "B2", "C2"], // row 2
    ["A3", "B3", "C3"], // row 3
    ["A1", "A2", "A3"], // col 1
    ["B1", "B2", "B3"], // col 2
    ["C1", "C2", "C3"], // col 3
    ["A1", "B2", "C3"], // diag 1
    ["A3", "B2", "C1"], // diag 2
];
var gameOver = true;
var scores = [
    0,
    0
]

// const squares = document.getElementsByClassName("square");
// for(let i = 0; i < squares.length; i++){
//     squares[i].addEventListener("click", function(event){
//         if (gameOn){
//         if(this.innerHTML === "-"){
//             if(whoTurn === 1){
//                 this.innerHTML = "X";
//                 whoTurn = 2;
//                 document.getElementById("message").innerHTML = "O's turn!";
//                 player1Sq.push(this.id);
//                 win(player1Sq, 1);
//             } else {
//                 this.innerHTML = "O";
//                 whoTurn = 1;
//                 document.getElementById("message").innerHTML = "X's turn!";
//                 player2Sq.push(this.id);
//                 win(player2Sq, 2);
//             }
//         } else{
//             document.getElementById("message").innerHTML = "Square not available";
//         }
//         }
//     })
// }
var markSquare = function(squareClicked){
	// console.log(squareClicked.innerHTML);
	if(squareClicked.innerHTML !== '-'){
		document.getElementById('message').innerHTML = "Square unavailable"
	}else if(whoTurn === 1){
		squareClicked.innerHTML = player1Img; //'X';
		whoTurn = 2;
		player1Sq.push(squareClicked.id);
		console.log(player1Sq)
		document.getElementById('message').innerHTML = "O's turn"
		if(player1Sq.length >= 3){
			checkWin(player1Sq,1);
		}
		if((numberPlayers == 1) && (!gameOver)){
			computerMove();
		}
	}else{
		squareClicked.innerHTML = player2Img;  //'O';
		whoTurn = 1;
		player2Sq.push(squareClicked.id);
		document.getElementById('message').innerHTML = "X's turn"
		if(player2Sq.length >= 3){
			checkWin(player2Sq,2);
		}		
	}
	// checkWin();
}

function win(playerSquares, whoMarked){
    console.log("checking for winner")
    for(let i = 0; i < winningCombos.length; i++){
        var squareCount = 0;
        for(x =0; x < winningCombos.length; x++){
            const winningSquare = winningCombos[i][x];
            if(playerSquares.includes(winning-square)){
                squareCount++;
            }
        } if(squareCount == 3){
            endGame(winningCombos[i], whoMarked)
        }
    }
}
function endGame(winningCombo,whoJustMarked){
	// WINNER WINNER CHICKEN DINNER
	if(whoJustMarked === 1){
		var nameToShow = name;
		scores[0]++;
	}else{
		var nameToShow = 'Player 2';
		scores[1]++;
	}
	console.log(`${nameToShow} won the game`);
	document.getElementById('message').innerHTML = `Congrats to ${nameToShow}!`
	gameOver = true;
	// Loop through the winning combo, and add a class.	
	for(let i = 0; i < winningCombo.length; i++){
		var theSquare = document.getElementById(winningCombo[i])
		console.dir(theSquare);
		theSquare.className += ' winning-square';
	}
	document.getElementById('reset-button').innerHTML = '<button id="reset" class="btn btn-lg btn-success">Reset Game</button>';
	var resetButton = document.getElementById('reset');
	resetButton.addEventListener('click', reset);
	// The game is over. The scores have been updated. Now update the DOM with the new score
	document.getElementsByClassName('player1-score')[0].innerHTML = scores[0];
	document.getElementsByClassName('player2-score')[0].innerHTML = scores[1];
}
// function endGame(winningCombo, whoWon){
//     document.querySelector("#message").innerHTML = `CONGRATS TO PLAYER ${whoWon}`;

//     var friendButton = document.createElement("button");
//     friendButton.textContent = "Play Against Your Friend";
//     document.querySelector(".buttons-section").appendChild(friendButton);
//     friendButton.classList.add("play-again");

//     var compButton = document.createElement("button");
//     compButton.textContent = "Play Against the Computer";
//     document.querySelector(".buttons-section").appendChild(compButton);
//     compButton.classList.add("play-again");
    
//     for(let i=0; i < winningCombo.length; i++){
//         const winningSquare = winningCombo[i];
//         const squareElem = document.getElementById(winningSquare);
//         squareElem.className += " winning-square";
//     }
//     gameOn = false;
// }

function playAgain(){
    gameOn = true;
    for(let i = 0; i < player1Sq; i++){
        player1Sq.pop(i);
        console.log(player1Sq);
    }
    for(let i = 0; i < player2Sq; i++){
        player2Sq.pop(i);
        console.log(player2Sq);
    }
}
function reset(){
    player1Sq = [];
    player2Sq = [];
    for(let i = 0; i < squares.length; i++){
        squares[i].innerHTML = '-';
        squares.className = 'square';
    }
    gameOver = false;
}
function computerTurn(){
    var squareFound = false;
    while(!squareFound){
        rand = Math.floor(Math.random() * 9);
        var isTaken = squares[rand].innerHTML;
        if(isTaken === '-'){
            squareFound = true;
        }
    }
    markSquare(squares[rand]);
}
var squares = document.getElementsByClassName('square');
for (let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', function(event){
		// console.log(this);
		// call the markSquare funciton and pass the square user clicked on.
		// Only call markSquare if gameOver === false
		// in JS, ! = not, !gameOver means not gameOver, or gameOver == false
		if(!gameOver){
			markSquare(this);
		}else{
			console.log("Haha, you cant play.")
		}
	});
}

document.getElementById('one-player').addEventListener('click', function(event){
	// console.log("User has chosen a one player game")
	gameOver = false;
	numberPlayers= 1;
	var nameBox = document.getElementById('player-name');
	if(nameBox.value !== ""){
		name = nameBox.value
	}
});

document.getElementById('two-player').addEventListener('click', function(event){
	// console.log("User has chosen a two player game");
	gameOver = false;
	numberPlayers = 2;
	var nameBox = document.getElementById('player-name');
	if(nameBox.value !== ""){
		name = nameBox.value
	}	
});