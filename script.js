//Challange 1

document.querySelector('#clickMe').addEventListener('click',ageinDays);
document.querySelector('#reset').addEventListener('click',reset);
function ageinDays()
{
    let yearofBirth=prompt('What is the year of your birth?');
    let age=(2020-yearofBirth)*365;
    console.log(age);
    let h1=document.createElement("h1");
    let textAnswer=document.createTextNode('You are '+age+' days old.');
    h1.setAttribute('id','AgeInDays');
    h1.appendChild(textAnswer);
    document.getElementById('result').appendChild(h1);
    
}
function reset()
{
    document.getElementById('AgeInDays').remove();
}

//Challange 2

document.querySelector('#generate').addEventListener('click',generateBat)

function generateBat()
{
    let batman=document.createElement('img');
    batman.src="images/bat.jpg";
    let div=document.getElementById("batman-div");
    div.appendChild(batman);
}

//Challange 3


function rpsGame(yourChoice)
{
    let humanChoice,botChoice;
    humanChoice=yourChoice.id;
    botChoice=randomChoice();
    console.log(botChoice);
    let winner=decideWinner(humanChoice,botChoice);
    let message=finalMassage(winner);
    rspFrontEnd(humanChoice,botChoice,message);
    
}

function randomChoice()
{
    let choices=['rock','paper','scissors'];
    let rng=Math.floor(Math.random()*3);
    let botsChoice=choices[rng];
    return botsChoice;
    
}
function decideWinner(humanChoice,botChoice)
{
    let winner=
    {
        rock:{'rock':0.5,'paper':0,'scissors':1},
        paper:{'rock':1,'paper':0.5,'scissors':0},
        scissors:{'rock':0,'paper':1,'scissors':0.5}
    }
    let result=winner[humanChoice][botChoice];
    console.log(result);
    return result;
}
function finalMassage(result)
{   
    if(result===1)
    {
        console.log("You win");
        return{'message':'You Won!','color':'green'};
        
    }
    else if(result===0.5)
    {
        console.log("You Tie");
        return{'message':'You Tied!','color':'yellow'};
        
    }
    else if(result===0)
    {
        console.log("You lose");
        return{'message':'You Lost!','color':'red'};
        
    }
}
function rspFrontEnd(humanChoice,botChoice,massage)
{
    let images=
    {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }
    let div=document.getElementById('game-div');
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    let humanDiv=document.createElement('div');
    let massageDiv=document.createElement('div');
    let botDiv=document.createElement('div');
    humanDiv.innerHTML="<img src='" + images[humanChoice] +"' height=200 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1)'>"
    botDiv.innerHTML="<img src='"+images[botChoice]+"'height=200 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1)'>"
    massageDiv.innerHTML="<h1 style='color:"+massage['color']+";font-size:60px;padding-top:90px;'>"+massage['message']+"</h1>"
    div.appendChild(humanDiv);
    div.appendChild(massageDiv);
    div.appendChild(botDiv);

}
//Challange 4

document.querySelector('#colors').addEventListener('change',changeColor);
var buttons=document.getElementsByTagName('button');
let copyOfButtons=[];
for(let i=0;i<buttons.length;i++)
{
    copyOfButtons.push(buttons[i].classList[0]);
}
let buttoncolors=['green-button','red-button','blue-button','yellow-button'];
function changeColor()
{
    let option=document.getElementById('colors').value;
    console.log(option);
    if(option==='red')
    {
        for(let i=0;i<buttons.length;i++)
        {
            buttons[i].classList.remove(buttons[i].classList[0]);
            buttons[i].classList.add('red-button');
        }
    }
    else if(option==='green')
    {
        for(let i=0;i<buttons.length;i++)
        {
            buttons[i].classList.remove(buttons[i].classList[0]);
            buttons[i].classList.add('green-button');
        }
    }
    else if(option==='random')
    {

        
        for(let i=0;i<buttons.length;i++)
        {
            let rnd=Math.floor(Math.random()*4);
            buttons[i].classList.remove(buttons[i].classList[0]);
            buttons[i].classList.add(buttoncolors[rnd]);
        }
    }
    else if(option==='reset')
    {
        for(let i=0;i<buttons.length;i++)
        {
            buttons[i].classList.remove(buttons[i].classList[0]);
            buttons[i].classList.add(copyOfButtons[i]);
        }
    }
}

//Challange 5: Blackjack
document.querySelector('#hit').addEventListener('click',hit);
document.querySelector('#stand').addEventListener('click',stand);
document.querySelector('#deal').addEventListener('click',deal);
let blackjackGame=
{
    'you':{'scoreSpan':'#yourscore','div':'#you','score':0},
    'dealer':{'scoreSpan':'#dealerscore','div':'#dealer','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardsvalue':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,"Q":10,'J':10,'A':[1,11]},
    

}
let isBust=false;
let isStand=false;
let wins=0;
let losses=0;
let draws=0;

const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];
const hitsound=new Audio('sounds/swish.m4a');
const winsound=new Audio('sounds/cash.mp3');
const losesound=new Audio('sounds/aww.mp3');
function hit()
{
    if(isStand===false&&isBust===false)
    {
        hitsound.play();
        let card=randomCard();
        console.log(card);
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
        console.log(YOU['score']);
        if(YOU['score']>21)
        {
            let ohwin=blackjackWinner();
            showResult(ohwin);
            isBust=true;
        }
    }
}

function randomCard()
{
    let rnd=Math.floor(Math.random()*13);
    let card=blackjackGame['cards'][rnd];
    return card;
}
function showCard(card,activeplayer)
{
    if(activeplayer['score']<=21)
    {
        let image=document.createElement('img');
        image.src=`images/${card}.png`;
        document.querySelector(activeplayer['div']).appendChild(image);
    }
}
function updateScore(card,activeplayer)
{
    if(card==="A")
    {
        if(activeplayer['score']<=10)
        {
            activeplayer['score']+=11;
        }
        else
        {
            activeplayer['score']+=1;
        }
    }
    else
    {
        activeplayer['score']+=blackjackGame['cardsvalue'][card];
    }
    
    
}
function showScore(activeplayer)
{
    if(activeplayer['score']>21)
    {
        isBust=true;
        document.querySelector(activeplayer['scoreSpan']).textContent="BUST!";
        document.querySelector(activeplayer['scoreSpan']).style.color='red';
        
    }
    else
    {
        document.querySelector(activeplayer['scoreSpan']).textContent=activeplayer['score'];
    }
}
function stand()
{
    if(isBust===false)
    {
        isStand=true;
        while(isBust===false&&DEALER['score']<=17)
        {
            let card=randomCard();
            showCard(card,DEALER);
            updateScore(card,DEALER);
            showScore(DEALER);
        }
        let whowins=blackjackWinner();
        showResult(whowins);
    }
}
function deal()
{
    isBust=false;
    isStand=false;
    YOU['score']=0;
    document.querySelector(YOU['scoreSpan']).style.color='white';
    document.querySelector(YOU['scoreSpan']).textContent="0";
    DEALER['score']=0;
    document.querySelector(DEALER['scoreSpan']).style.color='white';
    document.querySelector(DEALER['scoreSpan']).textContent="0";
    document.querySelector('#msg').textContent="Lets Play !";
    document.querySelector('#msg').style.color='black';
    let yourimages=document.querySelector(YOU['div']).querySelectorAll('img');
    for(let i=0;i<yourimages.length;i++)
    {
        yourimages[i].remove();
    }
    let dealerimages=document.querySelector(DEALER['div']).querySelectorAll('img');
    for(let i=0;i<dealerimages.length;i++)
    {
        dealerimages[i].remove();
    }
    
    
    
}
function blackjackWinner()
{
    let winner;
    if(YOU['score']<=21)
    {
        if((YOU['score']>DEALER['score']||DEALER['score']>21))
        {
            winner=YOU;
            wins++;
            console.log("You win");
        }
        else if((DEALER['score']<=21)&&DEALER['score']>YOU['score'])
        {
            winner=DEALER;
            losses++;
            console.log("You lose");
        }
        else if(YOU['score']===DEALER['score'])
        {
            winner="x";
            draws++;
            console.log("Draw");
        }
        
    }
    else if(YOU['score']>21)
    {
        losses++;
        winner=DEALER;
        console.log("You lose");
    }
    return winner;
}
    

function showResult(winner)
{
    let blackjackmassage,massageColor;
    if(winner===YOU)
    {
        winsound.play();
        document.querySelector('#wins').textContent=wins;
        blackjackmassage="YOU WIN !";
        massageColor='green';
    }
    else if(winner===DEALER)
    {
        losesound.play();
        document.querySelector('#losses').textContent=losses;
        blackjackmassage="YOU LOSE !";
        massageColor='red';
    }
    else 
    {
        document.querySelector('#draws').textContent=draws;
        blackjackmassage="DRAW !";
        massageColor='yellow';
    }
    
    document.querySelector('#msg').textContent=blackjackmassage;
    document.querySelector('#msg').style.color=massageColor;
}


