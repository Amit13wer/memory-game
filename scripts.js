document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const restartButton = document.getElementById('restart-button');
    const timerElement = document.getElementById('timer');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;
    let timer;
    let startTime;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.cardValue === secondCard.dataset.cardValue;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairs++;
        resetBoard();

        if (matchedPairs === 8) {
            clearInterval(timer);
            setTimeout(() => {
                alert(`Congratulations! You've matched all pairs in ${Math.floor((Date.now() - startTime) / 1000)} seconds!`);
            }, 500);
        }
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 16);
            card.style.order = randomPos;
        });
    }

    function startTimer() {
        startTime = Date.now();
        timerElement.textContent = "Time: 0 seconds";
        timer = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            timerElement.textContent = `Time: ${elapsedTime} seconds`;
        }, 1000);
    }

    function resetGame() {
        clearInterval(timer);
        matchedPairs = 0;
        cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
        });
        shuffle();
        startTimer();
    }

    shuffle();
    startTimer();
    cards.forEach(card => card.addEventListener('click', flipCard));
    restartButton.addEventListener('click', resetGame);
});




