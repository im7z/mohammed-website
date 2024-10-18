const player1 = document.querySelector("#pl1");
const btn1 = document.querySelector("#btn1");
const player2 = document.querySelector("#pl2");
const btn2 = document.querySelector("#btn2");
const resetbtn = document.querySelector("#reset");
const playto = document.querySelector("#playto");
const w = document.querySelector("#w");


let score1 = 0;
let score2 = 0;
let winner = 5;
let isGameOver = false;




btn1.addEventListener('click', function () {
    if (!isGameOver) {
        score1 = score1 + 1
        if (score1 === winner) {
            isGameOver = true;
            player1.classList.add('win');
            player2.classList.add('lose');
            btn2.disabled = true;
            btn1.disabled = true;
            w.textContent = 'Player 1 is the Winner !!'
        }
        player1.textContent = score1;
    }
})

btn2.addEventListener('click', function () {
    if (!isGameOver) {
        score2 = score2 + 1
        if (score2 === winner) {
            isGameOver = true;
            player2.classList.add('win');
            player1.classList.add('lose');
            btn2.disabled = true;
            btn1.disabled = true;
            w.textContent = 'Player 2 is the Winner !!'
        }
        player2.textContent = score2;
    }
})

resetbtn.addEventListener('click', reset);

playto.addEventListener("change", function () {
    winner = parseInt(this.value);
    reset();
})

function reset() {
    score1 = 0;
    score2 = 0;
    player1.textContent = score1;
    player2.textContent = score2;
    isGameOver = false;
    player2.classList.remove('win', 'lose');
    player1.classList.remove('win', 'lose');
    btn2.disabled = false;
    btn1.disabled = false;
    w.textContent = '';
}