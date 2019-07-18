const playArea = {};
const player = {};

let gameObj;
playArea.stats = document.querySelector(".stats");
playArea.main = document.querySelector(".main");
playArea.game = document.querySelector(".game");
playArea.btn = Array.from(document.querySelectorAll(".btn"));
playArea.page = Array.from(document.querySelectorAll(".page"));


player.score = 0;
player.items = 3;

const getData = function () {
    playArea.main.classList.add("visible");
        fetch("http://api.myjson.com/bins/gungm").then(function (rep) {
            return rep.json();
    }).then(function (data) {
        gameObj = data.data;
        buildBoard();
    })
};

document.addEventListener('DOMContentLoaded', getData);

const buildBoard = function () {
    const rows = 4;
    const cols = 4;
    let cnt = 0;
    playArea.game.style.width = cols * 100 + (cols * 2);
    playArea.game.style.margin = "auto";

    for(let i = 0; i < rows; i++){
        let divMain = document.createElement("div");
        divMain.setAttribute("class", "row");
        divMain.style.width = cols * 100 + (cols*2);
        for(let j = 0; j < cols; j++){
            let div = document.createElement("div");
            div.setAttribute("class", "pop");
            cnt++;
            div.innerText = cnt;
            div.cnt = cnt;
            divMain.appendChild(div);
        }

        playArea.game.appendChild(divMain);
    }
};

const handleBtn = function(e){
    console.log(e.target);
    if(e.target.classList.contains("newGame")){
        startGame();
    }
};

const startGame = function(){
    player.score = 0;
    player.items = 3;
    playArea.main.classList.remove("visible");
    playArea.game.classList.add("visible");
    player.gameOver = false;
    startPop();
};

const randomUp = function(){
    const pops = document.querySelectorAll(".pop");
    const idx = Math.floor(Math.random * pops.length);

    if(pops[idx].cnt === playArea.last){
        return randomUp();
    }

    playArea.last = pops[idx].cnt;
    return pops[idx];
};

const startPop = function(){
    let newPop = randomUp();
     console.log(newPop);
};


playArea.btn.forEach(function (item) {
    item.addEventListener("click", handleBtn);

});

