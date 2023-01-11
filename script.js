var btn_pierre = document.querySelector('.pierre');
var btn_feuille = document.querySelector('.feuille');
var btn_ciseaux = document.querySelector('.ciseaux');
var botIcon = document.querySelector('.bot');
var result = document.querySelector('.result');
var resultContent = document.querySelector('.result-content');

var choixBot = [
    `<button class="bot-btn" disabled><i class='bx bx-badge bx-lg'></i></button>`,
    `<button class="bot-btn" disabled><i class='bx bx-file-blank bx-lg'></i></button>`,
    `<button class="bot-btn" disabled><i class='bx bx-cut bx-lg'></i></button>`
]

// Commencer le jeu
function start() {
    var menu = document.querySelector('.static-container');
    var game = document.querySelector('.game');
    menu.style.opacity = "0";
    setTimeout(() => {
        menu.style.display = "none";
        game.style.display = "block";
        game.style.opacity = "1";
    }, 500);
}

// Recommencer le jeu
function restart() {
    var userBtn = document.querySelectorAll('.user-btn');
    botIcon.innerHTML = "";
    result.innerHTML = "";
    userBtn.forEach(element => {
        element.disabled = false;
        element.style.display = "inline-block";
        element.classList.remove('lose');
    });
    resultContent.innerHTML = `<div class="result" style="size: 100%;"></div>`;
    result = document.querySelector('.result');
}

// Si choix = pierre
function pierre() {
    btn_pierre.disabled = true;
    btn_feuille.style.display = "none";
    btn_ciseaux.style.display = "none";
    bot(0);
}

// Si choix = feuille
function feuille() {
    btn_feuille.disabled = true;
    btn_pierre.style.display = "none";
    btn_ciseaux.style.display = "none";
    bot(1);
}

// Si choix = ciseaux
function ciseaux() {
    btn_ciseaux.disabled = true;
    btn_pierre.style.display = "none";
    btn_feuille.style.display = "none";
    bot(2);
}

// Lance le jeu
function bot(user) {
    random = Math.round(Math.random() * 2);
    var i = 0;
    interval = setInterval(() => {
        botIcon.style.opacity = "1";
        botIcon.innerHTML = choixBot[i]
        if (i < choixBot.length - 1) {
            i++
        } else {
            i = 0
        }
    }, 200);
    setTimeout(() => {
        clearInterval(interval);
        botIcon.innerHTML = choixBot[random];
        setTimeout(() => {
            var userBtn = document.querySelectorAll('.user-btn');
            var botBtn = document.querySelector('.bot-btn');
            function defaite() {
                userBtn[user].classList.add('lose');
                result.innerHTML = "Défaite..";
            }
            function victoire() {
                botBtn.classList.add('lose');
                result.innerHTML = "Victoire !";
            }
            if (user == random) {
                botBtn.classList.add('lose');
                userBtn[user].classList.add('lose');
                result.innerHTML = "Egalité !"
            } else if (user == 0) {
                if (random == 1) {
                    defaite();
                } else if (random == 2) {
                    victoire();
                }
            } else if (user == 1) {
                if (random == 0) {
                    victoire();
                } else if (random == 2) {
                    defaite();
                }
            } else if (user == 2) {
                if (random == 0) {
                    defaite();
                } else if (random == 1) {
                    victoire();
                }
            }
            resultContent.innerHTML += `<button class="restart-button" onclick="restart()">RECOMMENCER</button>`
        }, 1000); // Delai avant d'afficher le résultat
    }, 2000); // Animation pendant 2sec
}
