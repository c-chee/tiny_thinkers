document.addEventListener("DOMContentLoaded", () => {
    const gradeBadge = document.getElementById("gradeBadge");
    const titleEl = document.getElementById("passageTitle");
    const textEl = document.getElementById("passageText");
    const questionsEl = document.getElementById("questions");
    const submitBtn = document.getElementById("submitAnswers");
    const nextBtn = document.getElementById("nextPassage");
    const feedbackEl = document.getElementById("feedback");

    let currentQuestions = [];

    async function loadPassage() {
        feedbackEl.textContent = "";
        questionsEl.innerHTML = "";
        titleEl.textContent = "Loading...";
        textEl.textContent = "Fetching passage, please wait.";
        gradeBadge.textContent = "Grade: —";

        try {
            const res = await fetch("/api/reading/passage", { credentials: "include" });
            const data = await res.json();

            if (!data.passage) throw new Error("No passage returned from API");

            const passage = data.passage;

            // Display passage and grade
            titleEl.textContent = passage.title;
            textEl.textContent = passage.text;
            gradeBadge.textContent = `Grade: ${String(data.grade).toUpperCase()}`;

            currentQuestions = passage.questions || [];
            renderQuestions(currentQuestions);
        } catch (err) {
            console.error("Reading loadPassage error:", err);
            titleEl.textContent = "Error loading passage";
            textEl.textContent = "Please refresh or try again later.";
        }
    }

    function renderQuestions(questions) {
        questionsEl.innerHTML = "";
        questions.forEach((q, i) => {
            const div = document.createElement("div");
            div.classList.add("question-block");
            div.innerHTML = `
                <p>${i + 1}. ${q.question}</p>
                ${q.choices.map(choice => `
                    <label>
                        <input type="radio" name="q${i}" value="${choice}">
                        ${choice}
                    </label>
                `).join("")}
            `;
            questionsEl.appendChild(div);
        });
    }

    function checkAnswers() {
        let score = 0;
        currentQuestions.forEach((q, i) => {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (selected && selected.value === q.answer) score++;
        });
        feedbackEl.textContent = `You scored ${score} / ${currentQuestions.length}`;
    }

    submitBtn.addEventListener("click", checkAnswers);
    nextBtn.addEventListener("click", loadPassage);

    // Load first passage on page load
    loadPassage();
});
