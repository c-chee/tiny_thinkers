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

  async function fetchDictionary(word) {
    const res = await fetch(`/api/dictionary/${encodeURIComponent(word)}`);
    if (!res.ok) throw new Error(`Dictionary API failed: ${res.status}`);
    return res.json();
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

  // 1–2 clean example words
  function pickExampleWords(apiData, letter, fallback = []) {
    if (!Array.isArray(apiData) || apiData.length === 0)
      return fallback.slice(0, 2);

    const cleanOneWord = (raw) => {
      if (!raw) return null;

      let w = String(raw).split(":")[0];
      w = w.toLowerCase().trim();
      w = w.replace(/[^a-z'-]/g, "");

      if (w.length < 2 || w.length > 12) return null;
      if (w.includes("--")) return null;
      if (/\s/.test(w)) return null;

      return w;
    };

    const wantLetter = (w) =>
      letter ? w.startsWith(letter.toLowerCase()) : true;

    let candidates = [];

    if (typeof apiData[0] === "string") {
      candidates = apiData.map(cleanOneWord).filter(Boolean);
    } else {
      const ids = apiData.map((x) => x?.meta?.id).filter(Boolean);
      const stems = apiData
        .flatMap((x) => x?.meta?.stems || [])
        .filter(Boolean);
      candidates = [...stems, ...ids].map(cleanOneWord).filter(Boolean);
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

  async function renderCard(letter) {
    title.textContent = `letter: ${letter.toUpperCase()}`;
    subtitle.textContent = `loading…`;
    content.innerHTML = `<p class="body small">loading…</p>`;

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

    try {
      const data = await fetchDictionary(word);
      const audioUrl = getMerriamAudioUrl(data);
      const examples = pickExampleWords(data, letter, [word]);

      subtitle.textContent = `Examples: ${examples.join(", ")}`;
      content.innerHTML = `
        <p class="body small" style="text-align:center; margin-top: 10px;">
          <strong>${examples.join(", ")}</strong>
        </p>
      `;

      if (playBtn) {
        playBtn.onclick = () => {
          if (!audioUrl) {
            alert("No sound available for this word.");
            return;
          }
          const audio = new Audio(audioUrl);
          audio.play().catch((err) => console.error("Audio play failed:", err));
        };
      }
    } catch (err) {
      console.error(err);
      subtitle.textContent = "couldn’t load data";
      content.innerHTML = `
        <p class="body small" style="text-align:center;">
          sorry — we couldn’t load the dictionary info right now.
        </p>
      `;
    }
  }

  async function openCardFor(letter) {
    if (!letter || letter.length !== 1) return;
    const normalized = letter.toLowerCase();

    const exists = grid.querySelector(`.key[data-letter="${normalized}"]`);
    if (!exists) return;

    pressKeyVisual(normalized);
    await renderCard(normalized);
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
