const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');

// Определяем контрольные суммы
const thresholds = [400, 800, 1000, 2000, 5000, 10000];

function start(){
    setScore(getScore());
    setImage();
}

function setScore(score){
    localStorage.setItem('score', score);
    updateScoreDisplay(score);
}

function updateScoreDisplay(score) {
    const nextThreshold = getNextThreshold(score);
    $score.textContent = `${score} / ${nextThreshold}`;
}

function getNextThreshold(currentScore) {
    for (const threshold of thresholds) {
        if (currentScore < threshold) {
            return threshold;
        }
    }
    return "MAX"; // Если достигнут максимальный порог
}

function setImage(){
    if (getScore() >= 400) {
        $circle.setAttribute('src', './assets/pers2.png');
    }
    if (getScore() >= 10000) {
        $circle.setAttribute('src', './assets/pers3.png');
    } 
}

function getScore(){
    return Number(localStorage.getItem('score')) ?? 0;
}

function addOne(){
    const currentScore = getScore();
    
    if (currentScore >= 700) {
        setScore(currentScore + 16);
    } else if (currentScore >= 400) {
        setScore(currentScore + 8);
    } else {
        setScore(currentScore + 1);
    }
    
    setImage();
}

$circle.addEventListener('click', (event) => {
    const rect = $circle.getBoundingClientRect();

    const offsetX = event.clientX - rect.left - rect.width / 2; 
    const offsetY = event.clientY - rect.top - rect.height / 2; 
    const DEG = 45;

    const tiltX = (offsetY / rect.height) * DEG;
    const tiltY = (offsetX / rect.width) * -DEG;

    $circle.style.setProperty('--tiltX', `${tiltX}deg`);
    $circle.style.setProperty('--tiltY', `${tiltY}deg`);

    setTimeout(() => {
        $circle.style.setProperty('--tiltX', `0deg`);
        $circle.style.setProperty('--tiltY', `0deg`);
    }, 300);

    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
 // текст на +16, +11 или +1 в зависимости от текущего счета 
 if (getScore() >= 700) {
        plusOne.textContent = '+16';
    } else if (getScore() >= 400) {
        plusOne.textContent = '+8';
    } else {
        plusOne.textContent = '+1';
    }

    plusOne.style.left = `${event.clientX - rect.left}px`;
    plusOne.style.top = `${event.clientY - rect.top}px`;

    $circle.parentElement.appendChild(plusOne);

    addOne();

    setTimeout(() => {
        plusOne.remove();
    }, 2000);
});

start();

