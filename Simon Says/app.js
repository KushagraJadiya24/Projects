let gameSeq=[];
let userSeq=[];
let btns= ["yellow","purple","green","red"];
let level=0;
let started=false;
let h2 = document.querySelector("h2");
let highscore = 0;

document.addEventListener("keydown",function(){
    if(started==false){
        started=true;
        console.log("game Started");

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");

    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp(){
    level++;
    h2.innerText =`Level ${level}`;
    userSeq=[];
    let randIdx = Math.floor(Math.random()*3); 
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
    
    if(highscore<level){
        highscore=level;
        document.getElementById("highscore").innerText=`Highscore: ${highscore}`;
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAnswer(userSeq.length-1);
}

function checkAnswer(idx){

    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
            setTimeout(levelUp,900);
        }
    }else{
        h2.innerHTML = `Game Over.
        Your Score was <b>${level}</b> Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor="";

        },300);
        reset();
    }
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}


function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}


