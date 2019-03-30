/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, activePlayer, roundScore, gamePlaying, winningScore;
var previousCount = 0;

init();

function prevScore(){
    previousCount++;
    if(previousCount === 2){
        
        score[activePlayer]=[0];
       // document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
        if(activePlayer === 0){
          document.querySelector('#current-1').textContent = '0';  
        }else{
            document.querySelector('#current-0').textContent = '0'; 
            
        }
        //document.querySelector('#current-' + activePlayer).textContent = '0';
        //document.querySelector('.dice').style.display = 'none';    
        nextPlayer();
        previousCount = 0;
        
    }
    
}

document.querySelector('.btn-roll').addEventListener('click',function(){
if(gamePlaying){
var dice, dice2;

                                                     
dice = Math.floor(Math.random()*6+1); 
dice2 = Math.floor(Math.random()*6+1);
console.log(dice);
if(dice === 6){
    prevScore();
}else{
    previousCount = 0;
}                                                     
                                                   

var diceDom = document.querySelector('.dice');
    
var diceDom2 = document.querySelector('.dice2');


diceDom.style.display = 'block';
diceDom.src = 'dice-' + dice + '.png';

diceDom2.style.display = 'block';
diceDom2.src = 'dice-' + dice2 + '.png';

  //  document.getElementById('score-0').textContent = dice;
if(dice !== 1 && dice2 !== 1){
    roundScore +=dice + dice2;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;


    
}else{
    
    nextPlayer();        
    
}  

}  
                });

document.querySelector('.btn-hold').addEventListener('click', function()  {
    
    if(gamePlaying){
        score[activePlayer] +=roundScore;
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

if(score[activePlayer] >= winningScore){
    document.querySelector('#name-' + activePlayer).textContent ='Winner!!';
    document.querySelector('.dice').style.display='none';
    document.querySelector('.dice2').style.display='none';
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    gamePlaying = false;
    
}
else{
    nextPlayer();
    
}
    
    
    
}

        
                                                                                                  
                                                     });

// as init function is getting called at begining we dont have to place a separate call to it after hold button click

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-score').addEventListener('click',function(){
    winningScore =  document.querySelector('.winfield').value;
    //console.log(winningScore);
    
    
});

function nextPlayer(){
    
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;
    
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.dice').style.display = 'none';    
    document.querySelector('.dice2').style.display = 'none';    
    
}

function init(){
    score = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    winningScore = 20;
    //console.log(winningScore);
    



//console.log(dice);
document.querySelector('.dice').style.display = 'none';
document.querySelector('.dice2').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('win').value = '';

document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
    
    
    
}






