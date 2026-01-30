document.addEventListener("DOMContentLoaded", () => {
  const gradeBadge = document.getElementById("gradeBadge");
  const levelBadge = document.getElementById("levelBadge");
  const feedbackText = document.getElementById("feedbackText");
  const progressPill = document.getElementById("progressPill");

  const playBtn = document.getElementById("playWordBtn");
  const hintBtn = document.getElementById("hintBtn");
  const checkBtn = document.getElementById("checkBtn");
  const nextBtn = document.getElementById("nextBtn");
  const input = document.getElementById("spellInput");

  const modal = document.getElementById("resultModal");
  const modalClose = document.getElementById("resultClose");
  const modalOk = document.getElementById("resultOkBtn");
  const resultTitle = document.getElementById("resultTitle");
  const resultMsg = document.getElementById("resultMessage");
  const resultImg = document.getElementById("resultTinyImg");

  // PLACEHOLDER ( replace later with API + grade )
  let gradeLevel = "2";
  let level = 1;

  const bank = ["apple", "turtle", "garden", "rocket", "cookie", "pencil"];
  let currentWord = bank[Math.floor(Math.random() * bank.length)];

  let correct = 0;
  const total = 10;

  function render() {
    if (gradeBadge) gradeBadge.textContent = `Grade: ${gradeLevel}`;
    if (levelBadge) levelBadge.textContent = `Level: ${level}`;
    if (progressPill) progressPill.textContent = `${correct} / ${total}`;
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    input?.focus();
  }

  function showCorrectPopup() {
    if (!resultImg || !resultTitle || !resultMsg) return;
    resultImg.src = "/images/tiny6.PNG";
    resultImg.alt = "Tiny celebrating";
    resultTitle.textContent = "That’s right!";
    resultMsg.textContent = "Good job! You spelled it correctly!";
    openModal();
  }

  function showIncorrectPopup() {
    if (!resultImg || !resultTitle || !resultMsg) return;
    resultImg.src = "/images/tiny_confused.PNG";
    resultImg.alt = "Tiny encouraging you to try again";
    resultTitle.textContent = "Almost!";
    resultMsg.textContent = "That spelling isn’t correct. Try again!";
    openModal();
  }

  function playWord() {
    if (!currentWord) return;

    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(currentWord);
    utter.rate = 0.9;
    speechSynthesis.speak(utter);
  }

  function hint() {
    if (!feedbackText) return;
    feedbackText.textContent = `Hint: starts with "${currentWord[0].toUpperCase()}"`;
  }

  function check() {
    const guess = (input?.value || "").trim().toLowerCase();

    if (!guess) {
      if (feedbackText) feedbackText.textContent = "Type your spelling first!";
      input?.focus();
      return;
    }

    if (guess === currentWord) {
      correct = Math.min(correct + 1, total);
      if (feedbackText) feedbackText.textContent = "Correct!";
      if (input) input.value = "";
      render();
      showCorrectPopup();
    } else {
      if (feedbackText) feedbackText.textContent = "Not quite. Try again!";
      showIncorrectPopup();
    }
  }

  function nextWord() {
    currentWord = bank[Math.floor(Math.random() * bank.length)];
    if (feedbackText) feedbackText.textContent = "New word ready. Press play!";
    if (input) input.value = "";
    input?.focus();
  }

  // close modal handlers
  modalClose?.addEventListener("click", closeModal);
  modalOk?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // esc closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Enter key checks spelling (only when modal isn't open)
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !modal?.classList.contains("is-open")) {
      e.preventDefault();
      check();
    }
  });

  // button handlers
  playBtn?.addEventListener("click", playWord);
  hintBtn?.addEventListener("click", hint);
  checkBtn?.addEventListener("click", check);
  nextBtn?.addEventListener("click", nextWord);

  // initial render
  render();

  // ===== DEV ONLY: force modal open for styling =====
  window.__showSpellingModal = (type = "correct") => {
    if (!modal) return;

    if (type === "correct") {
      resultImg.src = "/images/tiny6.PNG";
      resultTitle.textContent = "That’s right!";
      resultMsg.textContent = "Good job! You spelled it correctly!";
    } else {
      resultImg.src = "/images/tiny_confused.PNG";
      resultTitle.textContent = "Almost!";
      resultMsg.textContent = "That spelling isn’t correct. Try again!";
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };
});
