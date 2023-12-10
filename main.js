let startBtn = document.querySelector(".start");
let selectLvl = document.querySelector("select");
let levelName = document.querySelector(".message .lvl");
let seconds = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcoming = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeft = document.querySelector(".time span");
let prevScore = document.querySelector(".prev-score span");
let scoreGot = document.querySelector(".score .got");
let totalScore = document.querySelector(".score .total");
let finish = document.querySelector(".finish");
let resetBtn = document.querySelector(".name button");
let date = new Date().toDateString();
let storedScore = localStorage.getItem("score");

resetBtn.onclick = () => {
    location.reload();
}
let words = [
    "HTML",
    "CSS",
    "Javascript",
    "React",
    "Bootstrap",
    "Sass",
    "Algorithms",
    "Angular",
    "Vuejs",
    "SEO"
]

const levels = {
    "easy" : 5,
    "normal" : 4,
    "hard" : 3,
}

// select level name
levelName.innerHTML = selectLvl.value;
seconds.innerHTML = levels[selectLvl.value];
selectLvl.onchange = () => {
    levelName.innerHTML = selectLvl.value;
    seconds.innerHTML = levels[selectLvl.value];
}

// set total score points in local storage
totalScore.innerHTML = words.length;
prevScore.innerHTML = storedScore;

input.onpaste = () => {
    return false;
}
// start game
startBtn.onclick = () => {
    startBtn.remove();
    input.focus();
    generateWords();
}

function generateWords(){
    upcoming.innerHTML = "";
    
    let randomWord = words[Math.trunc(Math.random() * words.length)];
    let wordIndex = words.indexOf(randomWord);

    words.splice(wordIndex, 1);
    theWord.innerHTML = randomWord;

    for(let i = 0; i < words.length; i++){
        let wordDiv = document.createElement("div");
        wordDiv.innerHTML = words[i];
        upcoming.appendChild(wordDiv)
    }

    startPlay();
}

function startPlay(){

    timeLeft.innerHTML = ` ${levels[selectLvl.value]}`;

    let timeCounter = setInterval(() => {
        
        timeLeft.innerHTML --;
        
        if(timeLeft.innerHTML === "0"){
            clearInterval(timeCounter);
            
            if (theWord.innerHTML === input.value) {
                input.value = "";
                scoreGot.innerHTML ++;

                if(words.length === 0){
                    upcoming.remove();
                    finish.innerHTML = "Congratulations";
                    finish.style.color = " rgb(239, 83, 36)";
                }else{
                    generateWords();
                }

            }else{
                finish.innerHTML = "Game Over";
                finish.style.color = "red";
            }
        }
        localStorage.setItem("score", `${scoreGot.innerHTML} out of ${totalScore.innerHTML} on ${date}`)
    },1000)
}