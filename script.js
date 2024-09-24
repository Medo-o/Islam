const questions = [
    { question: "ما هو أول أركان الإسلام؟", choices: ["الصلاة", "الزكاة", "الشهادة", "الصيام"], answer: "الشهادة" },
    { question: "كم عدد ركعات صلاة الفجر؟", choices: ["اثنتان", "ثلاثة", "أربعة", "خمسة"], answer: "اثنتان" },
    { question: "ما هو شهر الصيام؟", choices: ["محرم", "رمضان", "رجب", "شعبان"], answer: "رمضان" },
    { question: "كم عدد الأيام في الحج؟", choices: ["5 أيام", "10 أيام", "6 أيام", "7 أيام"], answer: "5 أيام" },
    { question: "ما هو الكتاب المقدس في الإسلام؟", choices: ["التوراة", "الإنجيل", "الزبور", "القرآن"], answer: "القرآن" }
    // يمكنك إضافة المزيد من الأسئلة هنا وتجنب الأسئلة غير اللائقة
];

let currentQuestionIndex = 0;
let score = 0;
let usedQuestions = [];

document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);

function startQuiz() {
    document.getElementById('start-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    // اختيار سؤال عشوائي وتجنب التكرار
    if (usedQuestions.length === questions.length) {
        document.getElementById('question').textContent = "لقد أتممت جميع الأسئلة!";
        return;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(randomIndex));

    usedQuestions.push(randomIndex);

    const currentQuestion = questions[randomIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    loadChoices(currentQuestion.choices, currentQuestion.answer);
}

function loadChoices(choices, correctAnswer) {
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = ""; // مسح الاختيارات السابقة

    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', () => handleAnswer(choice, correctAnswer, button)); // زر واحد فقط يمكن الضغط عليه
        choicesContainer.appendChild(button);
    });
}

function handleAnswer(selectedChoice, correctAnswer, button) {
    const buttons = document.querySelectorAll('#choices button');
    
    // تعطيل جميع الأزرار بعد الضغط
    buttons.forEach(btn => {
        btn.disabled = true;
    });

    const feedback = document.getElementById('feedback');
    if (selectedChoice === correctAnswer) {
        feedback.textContent = "إجابتك صحيحة! حصلت على نقطة واحدة.";
        score++;
    } else {
        feedback.textContent = "إجابتك خاطئة! تم خصم نقطة.";
        score--;
    }

    setTimeout(() => {
        feedback.textContent = "";
        loadQuestion();
        buttons.forEach(btn => {
            btn.disabled = false; // إعادة تفعيل الأزرار عند تحميل السؤال الجديد
        });
    }, 5000);
}
