document.addEventListener("DOMContentLoaded", function() {
    const orderNumberField = document.getElementById('orderNumberField');
    const answerField = document.getElementById('answerField');
    const btnRetry = document.getElementById('btnRetry');
    const btnLess = document.getElementById('btnLess');
    const btnOver = document.getElementById('btnOver');
    const btnEqual = document.getElementById('btnEqual');
    const modal = document.getElementById('myModal');
    const modalSubmitBtn = document.getElementById('modalSubmit');
    const modalCloseBtn = document.querySelector('.modal .close');
    const minValueInput = document.getElementById('minValue');
    const maxValueInput = document.getElementById('maxValue');

    let minValue, maxValue, answerNumber, orderNumber, gameRun;

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function showMessage(message) {
        answerField.innerText = message;
    }

    function resetGame() {
        openModal();
    }

    function startGame() {
        minValue = parseInt(minValueInput.value) || 0;
        maxValue = parseInt(maxValueInput.value) || 100;

        
        minValue = minValue > 999 ? 999 : (minValue < -999 ? -999 : minValue);
        maxValue = maxValue > 999 ? 999 : (maxValue < -999 ? -999 : maxValue);

        if (minValue >= maxValue) {
            showMessage("Минимальное значение должно быть меньше максимального!");
            return;
        }

        orderNumber = 1;
        answerNumber = Math.floor((minValue + maxValue) / 2);
        gameRun = true;

        orderNumberField.innerText = orderNumber;
        const spelledNumber = spellOutNumber(answerNumber);
        answerField.innerText = `Вы загадали число ${spelledNumber}?`;
    }

    openModal(); 

    btnRetry.addEventListener('click', function () {
        resetGame();
    });

    btnOver.addEventListener('click', function () {
        if (gameRun){
            if (minValue === maxValue){
                const phraseRandom = Math.round( Math.random());
                const answerPhrase = (phraseRandom === 1) ?
                    `Вы загадали неправильное число!\n\u{1F914}` :
                    `Я сдаюсь..\n\u{1F92F}`;

                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                minValue = answerNumber  + 1;
                answerNumber  = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const spelledNumber = spellOutNumber(answerNumber);
                answerField.innerText = `Вы загадали число ${spelledNumber }?`;
            }
        }
    });

    btnLess.addEventListener('click', function () {
        if (gameRun){
            if (minValue === maxValue){
                const phraseRandom = Math.round(Math.random());
                const answerPhrase = (phraseRandom === 1) ?
                    `Вы загадали неправильное число!\n\u{1F914}` :
                    `Я сдаюсь..\n\u{1F92F}`;

                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                maxValue = answerNumber - 1; 
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const spelledNumber = spellOutNumber(answerNumber);
                answerField.innerText = `Вы загадали число ${spelledNumber }?`;
            }
        }
    });

    btnEqual.addEventListener('click', function () {
        if (gameRun){
            const successMessages = [
                "Я всегда угадываю!\n\u{1F913}",
                "Ура! Я победил!\n\u{1F973}",
                "Победа за мной!\n\u{1F9D0}"
            ];

            const randomIndex = Math.floor(Math.random() * 3);
            const randomSuccessMessage = successMessages[randomIndex];

            answerField.innerText = randomSuccessMessage;
            gameRun = false;
        }
    });

    modalSubmitBtn.addEventListener('click', function () {
        startGame();
        closeModal();
    });

    modalCloseBtn.addEventListener('click', function () {
        closeModal();
    });

    
    maxValueInput.addEventListener('input', function () {
        if (parseInt(this.value) > 999) {
            this.value = '999';
        } else if (parseInt(this.value) < -999) {
            this.value = '-999';
        }
    });

    minValueInput.addEventListener('input', function () {
        if (parseInt(this.value) > 999) {
            this.value = '999';
        } else if (parseInt(this.value) < -999) {
            this.value = '-999';
        }
    });

    function spellOutNumber(number) {
        const numberWords = ["ноль", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
        const tens = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
        const hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];

        if (number === 0) {
            return "ноль";
        }

        let result = "";
        let negative = false;

        if (number < 0) {
            negative = true;
            number = Math.abs(number);
        }

        if (number >= 100) {
            result += hundreds[Math.floor(number / 100)];
            number %= 100;
        }

        if (number >= 20) {
            result += (result !== "" ? " " : "") + tens[Math.floor(number / 10)];
            number %= 10;
        }

        if (number !== 0 || result === "") {
            result += (result !== "" ? " " : "") + numberWords[number];
        }

        return negative ? "минус " + result : result;
    }
});
