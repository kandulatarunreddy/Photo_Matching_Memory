document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    const timerDisplay = document.getElementById('timer');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let timer;
    let timeRemaining;

    const cardArray = [
        { name: 'card1', img: 'images/elon.png' },
        { name: 'card1', img: 'images/elon.png' },
        { name: 'card2', img: 'images/mark.png' },
        { name: 'card2', img: 'images/mark.png' },
        { name: 'card3', img: 'images/prabhas.png' },
        { name: 'card3', img: 'images/prabhas.png' },
        { name: 'card4', img: 'images/sundar.png' },
        { name: 'card4', img: 'images/sundar.png' },
        { name: 'card5', img: 'images/trump.png' },
        { name: 'card5', img: 'images/trump.png' },
        // ...add more pairs as needed
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];
        timeRemaining = 60;
        updateTimerDisplay();
        clearInterval(timer);
        timer = setInterval(countdown, 1000);

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            const cardImage = document.createElement('img');
            cardImage.setAttribute('src', 'images/blank.png');
            card.appendChild(cardImage);
            grid.appendChild(card);
        }
    }

    function countdown() {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert('Time is up! Game over.');
            disableAllCards();
        }
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = `Time Remaining: ${timeRemaining} seconds`;
    }

    function disableAllCards() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.removeEventListener('click', flipCard);
        });
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.querySelector('img').setAttribute('src', cardArray[cardId].img);
            this.classList.add('show');
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].querySelector('img').setAttribute('src', 'images/blank.png');
            cards[secondCardId].querySelector('img').setAttribute('src', 'images/blank.png');
            cards[firstCardId].classList.remove('show');
            cards[secondCardId].classList.remove('show');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            clearInterval(timer);
            alert('Congratulations! You found them all!');
        }
    }

    startButton.addEventListener('click', createBoard);
});
