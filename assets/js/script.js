const start_btn = document.querySelector('.start_btn button');
const info_box = document.querySelector('.info_box');
const continue_btn = info_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer_sec");
const win = document.querySelector(".win");
const lose = document.querySelector(".lose"); 

const option_list = document.querySelector (".option_list");




start_btn.onclick = ()=>{ 
    info_box.classList.add("activeInfo");
}
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);   
    startTimer(15);
}

let que_count = 0;
let counter;
let timeValue = 15;
let userScore = 0;
let winCount = 0;
let loseCount = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".restart");
const quit_quiz = result_box.querySelector(".quit");
const highscores_quiz = result_box.querySelector(".score");

quit_quiz.onclick = () =>{
    window.location.reload();   
}
restart_quiz.onclick = () =>{
    quiz_box.classList.add("activeQuiz");
    let que_count = 0;
    let timeValue = 15;
    let userScore = 0;
    showQuestions(que_count);
    clearInterval(counter);
    startTimer(timeValue);
    next_btn.style.display = "block";
    result_box.classList.remove("activeResult");
}


next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
    que_count++;
    showQuestions(que_count);
    clearInterval(counter);
    startTimer(timeValue);
    next_btn.style.display = "block";
}else{
    console.log("Questions completed");
    showResultBox();
}
}

function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' +questions[index].numb + ". " + questions[index].title + '</span>';
    let option_tag = '<div class="option">'+ questions[index].choices[0] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].choices[1] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].choices[2] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].choices[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
function optionSelected(answer){
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        alert("Correct");
        console.log("Answer is Correct");
    }else{
        alert("Wrong\n " +correctAns);
        console.log("Answer is Wrong");

        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");
            } 

    }
}
for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
}
next_btn.style.display = "block";
  
}
function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if(userScore >= 3){
        let scoreTag = "<span> Great, You got<p>" + userScore + "</p> out of <p>" + questions.length + "</p></span>";
        scoreText.innerHTML = scoreTag;
    }else if(userScore < 3){
        let scoreTag = "<span> Sorry, You got only<p>" + userScore + "</p> out of <p>" + questions.length + "</p></span>";
        scoreText.innerHTML = scoreTag;

    }
    
}
function setWins() {
    win.textContent = userScore;
    localStorage.setItem("userScore", userScore);
  }
function setLosses() {
    lose.textContent = userScore;
    localStorage.setItem("userScore", userScore);
  }
  function getWins() {
    var storedWins = localStorage.getItem("winCount");
    if(userScore >= 3){
        winCount++;
        winCount = storedWins;
}
}
function getLosses() {
    var storedLosses = localStorage.getItem("loseCount");
    if(userScore < 3){
        loseCount = 0;
        loseCount = storedLosses;
}
}
   
       

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "0";
            alert("Time Off");

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class","option correct");
                } 
        }
            for (let i = 0; i < allOptions; i++) {
            option_list.children[i].classList.add("disabled");
        }
        next_btn.style.display = "block";


        }
    }
} 

 