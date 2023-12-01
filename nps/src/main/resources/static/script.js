document.addEventListener('DOMContentLoaded', function () {
    // Perguntas
    const questions = document.querySelectorAll('.question');

    // Botões
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');
    const thankYouMessage = document.getElementById('thank-you-message');

    // Índice da pergunta atual
    let currentQuestionIndex = 0;

    function showCurrentQuestion() {
        questions[currentQuestionIndex].style.display = 'block';
    }

    function hideCurrentQuestion() {
        questions[currentQuestionIndex].style.display = 'none';
    }

    function showThankYouMessage(duration = 1000) {
        thankYouMessage.style.display = 'block';

        setTimeout(function () {
            thankYouMessage.style.display = 'none';
            restartSurvey();
        }, duration);
    }

    function showNextQuestion() {
        hideCurrentQuestion();
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showCurrentQuestion();
        } else {
            showThankYouMessage(1000);
            submitButton.style.display = 'block';
            nextButton.style.display = 'none';
        }
    }

    function restartSurvey() {
        currentQuestionIndex = 0;
        questions.forEach(function (question) {
            if (question.querySelector('input[type=\'radio\']')) {
                const radioOptions = question.querySelectorAll('input[type=\'radio\']');
                radioOptions.forEach(function (option) {
                    option.checked = false;
                });
            } else {
                const textInput = question.querySelector('input[type=\'text\']');
                if (textInput) {
                    textInput.value = '';
                }
            }
            question.style.display = 'none';
        });
        nextButton.style.display = 'block';
        showCurrentQuestion();
        thankYouMessage.style.display = 'none';
    }

    function sendDataToServer() {
        const question1 = document.querySelector('input[name="q1"]:checked').value;
        const question2 = document.querySelector('input[name="q2"]:checked') ? document.querySelector('input[name="q2"]:checked').value : null;
        const question3 = document.getElementById('q3') ? document.getElementById('q3').value : null;

        const formData = { question1, question2, question3 };

        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
                console.log('Dados do formulário enviados com sucesso para o servidor.');
            } else {
                console.error('Erro ao enviar dados do formulário para o servidor.');
            }
        })
        .catch((error) => {
            console.error('Erro ao enviar dados do formulário para o servidor:', error);
        });
    }

    showCurrentQuestion();

    const radioOptions = document.querySelectorAll('input[type=\'radio\']');
    radioOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            if (currentQuestionIndex === 1) {
                // Lógica especial para a pergunta 2
                if (option.value === 'Sim') {
                    showNextQuestion();  // Se a resposta à pergunta 2 for "Sim", vá para a próxima pergunta
                } else {
                    sendDataToServer();   // Se a resposta à pergunta 2 for "Não", envie os dados e mostre a mensagem de agradecimento
                    showThankYouMessage(1000);
                    nextButton.style.display = 'none';
                }
            } else {
                showNextQuestion();
            }
        });
    });

    nextButton.addEventListener('click', function () {
        showNextQuestion();
    });

    submitButton.addEventListener('click', function () {
        sendDataToServer();
        showThankYouMessage(1000);
        nextButton.style.display = 'none';
    });
});
