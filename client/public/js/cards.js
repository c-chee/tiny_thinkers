document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("puzzleGrid");
  const modal = document.getElementById("letterModal");
  const modalCard = modal?.querySelector(".modal-card");
  const closeBtn = document.getElementById("modalClose");
  const title = document.getElementById("modalTitle");
  const subtitle = document.getElementById("modalSubtitle");
  const content = document.getElementById("modalContent");
  const playBtn = document.getElementById("playAudioBtn");

  if (!grid || !modal || !modalCard || !title || !subtitle || !content) {
    console.warn("cards page: missing required dom elements.");
    return;
  }

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // call your backend endpoint (which then calls Merriam)
  async function fetchDictionary(word) {
    const res = await fetch(`/api/dictionary/${encodeURIComponent(word)}`);

    if (!res.ok) {
      throw new Error(`Dictionary API failed: ${res.status}`);
    }

    return res.json();
  }

  // Extract a few “example words” from Merriam response
  function pickExampleWords(apiData, fallback = []) {
    // Merriam sometimes returns an array of strings (suggestions) or entries (objects)
    if (!Array.isArray(apiData) || apiData.length === 0) return fallback;

    // If suggestions (strings)
    if (typeof apiData[0] === "string") return apiData.slice(0, 5);

    // If entries (objects) — try to pull out meta.id words or related forms
    const words = apiData
      .map((x) => x?.meta?.id)
      .filter(Boolean)
      .map((id) => id.split(":")[0]); // "apple:1" -> "apple"

    // de-dupe + take first 5
    return [...new Set(words)].slice(0, 5);
  }

  function getMerriamAudioUrl(apiData) {
    if (!Array.isArray(apiData) || apiData.length === 0) return null;
    if (typeof apiData[0] === "string") return null;

    const entry = apiData[0];
    const audio = entry?.hwi?.prs?.[0]?.sound?.audio;
    if (!audio) return null;

    let folder = audio[0];
    if (audio.startsWith("bix")) folder = "bix";
    else if (audio.startsWith("gg")) folder = "gg";
    else if (/^[0-9_]/.test(audio)) folder = "number";

    return `https://media.merriam-webster.com/audio/prons/en/us/mp3/${folder}/${audio}.mp3`;
  }

  // function that fills the modal with letter data
  async function renderCard(letter) {
    title.textContent = `letter: ${letter.toUpperCase()}`;
    subtitle.textContent = `loading…`;

    content.innerHTML = `
      <p class="body small">loading example words…</p>
    `;

    try {
      // for now: use a simple word per letter (you can improve this later)
      const seedWordMap = {
        a: "apple",
        b: "ball",
        c: "cat",
        d: "dog",
        e: "elephant",
        f: "fish",
        g: "goat",
        h: "hat",
        i: "igloo",
        j: "jump",
        k: "kite",
        l: "lion",
        m: "moon",
        n: "nest",
        o: "octopus",
        p: "pig",
        q: "queen",
        r: "rabbit",
        s: "sun",
        t: "turtle",
        u: "umbrella",
        v: "violin",
        w: "whale",
        x: "xylophone",
        y: "yo-yo",
        z: "zebra",
      };

      const word = seedWordMap[letter] || "apple";

      const data = await fetchDictionary(word);
      const audioUrl = getMerriamAudioUrl(data);

      const words = pickExampleWords(data, [word]);

      subtitle.textContent = `example word: ${word}`;

      const chips = words
        .map((w) => `<span class="word-chip">${w}</span>`)
        .join("");

      content.innerHTML = `
        <p class="body small">example words:</p>
        <div class="word-list">${chips}</div>
        <p class="body small" style="margin-top:10px;">
          from dictionary api
        </p>
      `;

      // if the play button exists , attach a click handler
      if (playBtn) {
        playBtn.onclick = () => {
          if (!audioUrl) {
            alert("No sound available for this word.");
            return;
          }

          const audio = new Audio(audioUrl);
          audio.play().catch((err) => {
            console.error("Audio play failed:", err);
          });
        };
      }
    } catch (err) {
      console.error(err);
      subtitle.textContent = "couldn’t load data";
      content.innerHTML = `
        <p class="body small">
          sorry — we couldn’t load the dictionary info right now.
        </p>
      `;
    }

    const startsWith = candidates.filter((w) => wantLetter(w));
    const others = candidates.filter((w) => !wantLetter(w));

    const unique = (arr) => [...new Set(arr)];

    const result = unique([
      ...startsWith,
      ...others,
      ...fallback.map(cleanOneWord).filter(Boolean),
    ]).slice(0, 2);

    return result.length ? result : fallback.slice(0, 2);
  }

  function pressKeyVisual(letter) {
    const btn = grid.querySelector(`.key[data-letter="${letter}"]`);
    if (!btn) return;
    btn.classList.add("is-pressed");
    setTimeout(() => btn.classList.remove("is-pressed"), 120);
  }

  // function that opens a card for a given letter
  async function openCardFor(letter) {
    // ignore invalid input
    if (!letter || letter.length !== 1) return;

  async function openCardFor(letter) {
    if (!letter || letter.length !== 1) return;
    const normalized = letter.toLowerCase();

    const exists = grid.querySelector(`.key[data-letter="${normalized}"]`);
    if (!exists) return;

    pressKeyVisual(normalized);

    // render the modal content (now async)
    await renderCard(normalized);

    // open the modal
    openModal();
  }

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".key");
    if (!btn) return;
    const letter = (btn.dataset.letter || "").toLowerCase();
    openCardFor(letter);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
      return;
    }

    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea") return;

    if (/^[a-zA-Z]$/.test(e.key)) openCardFor(e.key);
  });

  closeBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});
