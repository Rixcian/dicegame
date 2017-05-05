/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var score = [0, 0];
var roundScore = 0;
var activePlayer = 0;
var isPlaying = true;
var previousDice;
var winScore;

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousDice = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function init() {
    score[0] = 0;
    score[1] = 0;
    roundScore = 0;
    activePlayer = 0;
    isPlaying = true;
    previousDice = 0;
    winScore = 50;

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');


    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-0').style.color = '#222';
    document.querySelector('#name-0').style.fontWeight = '100';

    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('#name-1').style.color = '#222';
    document.querySelector('#name-1').style.fontWeight = '100';

    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;

    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.querySelector('.input-group').style.display = 'flex';
    document.querySelector('.scoreSet').innerHTML = '';
    document.querySelector('.scoreSet').style.display = 'none';

}

init();

document.querySelector('.btn-roll').addEventListener('click', function(){

    if (isPlaying === true)
    {
        // 1. Generate random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        // 3. Update round score IF the rolled number was NOT a 1
        if (dice !== 1 && dice2 !== 1)
        {
            // Add score
            roundScore += dice;
            roundScore += dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else
        {
            // Next player
            nextPlayer();
        }
    }

});

document.querySelector('.btn-set').addEventListener('click', function () {
   var inputValue = document.querySelector('#scoreInput').value;
   winScore = inputValue;

   $('.input-group').fadeToggle();
   document.querySelector('.scoreSet').innerHTML = 'Your goal was set to <b class="newScore">' + inputValue +'</b>';
   $('.scoreSet').fadeToggle();
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (isPlaying === true)
    {
        // 1. Add current score to global score
        score[activePlayer] += roundScore;

        // 2. Update UI score
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

        // 3. Set current score to 0
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = 0;

        // 4. Check if one of the players won the game
        if (score[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#name-' + activePlayer).style.color = '#e2b3e3';
            document.querySelector('#name-' + activePlayer).style.fontWeight = '600';

            isPlaying = false;
        } else {
            nextPlayer();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click', function () {
   init();
});