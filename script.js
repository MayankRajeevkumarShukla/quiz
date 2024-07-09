const questions = [
    {
        question: "Which is the largest animal int world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Monkey",correct:false},
        ]
    },{
        question: "How many continents are there on Earth?",
        answers:[
            {text:"20",correct:false},
            {text:"7",correct:true},
            {text:"50",correct:false},
            {text:"60",correct:false},
        ]
    },{
        question: "What months have 28 days? ",
        answers:[
            {text:"Jan",correct:false},
            {text:"Feb",correct:true},
            {text:"Dec",correct:false},
            {text:"Nov",correct:false},
        ]
    },{
        question: "How many vowels are there?",
        answers:[
            {text:"3",correct:false},
            {text:"5",correct:true},
            {text:"26",correct:false},
            {text:"7",correct:false},
        ]
    }
];
const  questionElement = document.getElementById("questions");
const  answerButtons = document.getElementById("answer-buttons");
const  nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;


    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetstate(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display="block";
}
function showScore(){
    resetstate();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handelnextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handelnextButton();
    }else{
        startQuiz();
    }
})
startQuiz();