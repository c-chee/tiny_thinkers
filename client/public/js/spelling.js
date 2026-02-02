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

  const promptTitle = document.getElementById("promptTitle");
  const promptSub = document.getElementById("promptSub");

  const modal = document.getElementById("resultModal");
  const modalClose = document.getElementById("resultClose");
  const modalOk = document.getElementById("resultOkBtn");
  const resultTitle = document.getElementById("resultTitle");
  const resultMsg = document.getElementById("resultMessage");
  const resultImg = document.getElementById("resultTinyImg");

  const yay = new Audio("/audio/yay.mp3");
  yay.volume = 0.7;

  const confettiCanvas = document.createElement("canvas");
  confettiCanvas.id = "confettiCanvas";
  Object.assign(confettiCanvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "20000",
  });
  document.body.appendChild(confettiCanvas);

  const confettiFront = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true,
  });

  function fireConfetti() {
    confettiFront({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.45 },
      zIndex: 1000,
      colors: ["#ff9aa2", "#ffdac1", "#b5ead7", "#c7ceea", "#fdfd96"],
    });
  }

  let bank = [];
  let currentWord = null;

  let gradeLevel = "—";
  let level = 1;

  let correct = 0;
  const total = 10;

  async function fetchSpellingWords() {
    const res = await fetch("/api/spelling/words", {
      credentials: "same-origin", // helps with cookie auth
    });

    if (!res.ok) {
      throw new Error(`Spelling words API failed: ${res.status}`);
    }

    return res.json();
  }

  async function ensureBankLoaded() {
    if (bank.length > 0) return true;

    try {
      const payload = await fetchSpellingWords();

      gradeLevel = payload.grade ?? "—";
      level = payload.level ?? level;

      bank = Array.isArray(payload.words) ? [...payload.words] : [];

      render();

      if (bank.length === 0) {
        if (feedbackText) {
          feedbackText.textContent = "No words available for your grade yet.";
        }
        return false;
      }

      return true;
    } catch (err) {
      console.error(err);
      if (feedbackText) {
        feedbackText.textContent =
          "Couldn't load words. Please log in or try again.";
      }
      return false;
    }
  }

  async function fetchDictionary(word) {
    const res = await fetch(`/api/dictionary/${encodeURIComponent(word)}`);
    if (!res.ok) throw new Error(`Dictionary API failed: ${res.status}`);
    return res.json();
  }

  function merriamAudioUrl(audio) {
    if (!audio) return null;

    const a = String(audio).toLowerCase();
    let subdir = a[0];

    if (a.startsWith("bix")) subdir = "bix";
    else if (a.startsWith("gg")) subdir = "gg";
    else if (/^\d/.test(a)) subdir = "number";

    return `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdir}/${a}.mp3`;
  }

  function extractMerriamAudio(apiData) {
    if (!Array.isArray(apiData) || apiData.length === 0) return null;
    if (typeof apiData[0] === "string") return null; // suggestions

    const entry = apiData.find((x) => x && typeof x === "object");
    const audio =
      entry?.hwi?.prs?.find((p) => p?.sound?.audio)?.sound?.audio || null;

    return audio;
  }

  let audioPlayer = null;

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

    fireConfetti();
    try {
      yay.currentTime = 0;
      yay.play();
    } catch (e) {}

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

  async function playWord() {
    if (!currentWord) return;

    try {
      const data = await fetchDictionary(currentWord);

      const audioName = extractMerriamAudio(data);
      const url = merriamAudioUrl(audioName);

      if (url) {
        if (!audioPlayer) audioPlayer = new Audio();
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        audioPlayer.src = url;
        await audioPlayer.play();
        return;
      }

      speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(currentWord);
      utter.rate = 0.9;
      speechSynthesis.speak(utter);
    } catch (err) {
      console.error(err);

      speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(currentWord);
      utter.rate = 0.9;
      speechSynthesis.speak(utter);
    }
  }

  function hint() {
    if (!feedbackText || !currentWord) return;
    feedbackText.textContent = `Hint: starts with "${currentWord[0].toUpperCase()}"`;
  }

  function check() {
    const guess = (input?.value || "").trim().toLowerCase();

    if (!guess) {
      if (feedbackText) feedbackText.textContent = "Type your spelling first!";
      input?.focus();
      return;
    }

    if (!currentWord) {
      if (feedbackText) feedbackText.textContent = "Press next word first!";
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

  async function nextWord() {
    const ok = await ensureBankLoaded();
    if (!ok) return;

    // Take the next word from the bank
    currentWord = bank.shift();

    if (!currentWord) {
      if (feedbackText) feedbackText.textContent = "No more words right now!";
      return;
    }

    if (promptTitle) promptTitle.textContent = "New word!";
    if (promptSub) promptSub.textContent = "Press play to hear it.";

    if (feedbackText) feedbackText.textContent = "New word ready. Press play!";
    if (input) input.value = "";
    input?.focus();

    try {
      await fetchDictionary(currentWord);
    } catch {}
  }

  modalClose?.addEventListener("click", closeModal);
  modalOk?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) {
      closeModal();
    }
  });

  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !modal?.classList.contains("is-open")) {
      e.preventDefault();
      check();
    }
  });

  playBtn?.addEventListener("click", playWord);
  hintBtn?.addEventListener("click", hint);
  checkBtn?.addEventListener("click", check);
  nextBtn?.addEventListener("click", nextWord);

  render();
  nextWord();

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
