// wait until the html page is fully loaded before running any javascript
document.addEventListener("DOMContentLoaded", () => {
  // get the keyboard grid that holds all letter buttons
  const grid = document.getElementById("puzzleGrid");

  // get the modal overlay element
  const modal = document.getElementById("letterModal");

  // get the actual card inside the modal
  const modalCard = modal?.querySelector(".modal-card");

  // get the close (x) button on the modal
  const closeBtn = document.getElementById("modalClose");

  // get the modal title
  const title = document.getElementById("modalTitle");

  // get the modal subtitle
  const subtitle = document.getElementById("modalSubtitle");

  // get the main content area inside the modal
  const content = document.getElementById("modalContent");

  // get the play sound button
  const playBtn = document.getElementById("playAudioBtn");

  // if any required elements are missing , stop the script
  if (!grid || !modal || !modalCard || !title || !subtitle || !content) {
    console.warn("cards page: missing required dom elements.");
    return;
  }

  // function to open the modal
  function openModal() {
    // add the open class so the modal becomes visible
    modal.classList.add("is-open");

    // update aria attribute for accessibility
    modal.setAttribute("aria-hidden", "false");

    // prevent the page behind the modal from scrolling
    document.body.style.overflow = "hidden";
  }

  // function to close the modal
  function closeModal() {
    // remove the open class so the modal hides
    modal.classList.remove("is-open");

    // update aria attribute for accessibility
    modal.setAttribute("aria-hidden", "true");

    // restore page scrolling
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
  }

  // function to briefly animate a key press
  function pressKeyVisual(letter) {
    // find the matching key button
    const btn = grid.querySelector(`.key[data-letter="${letter}"]`);

    // if the button does not exist , stop
    if (!btn) return;

    // add pressed class
    btn.classList.add("is-pressed");

    // remove pressed class after a short delay
    setTimeout(() => btn.classList.remove("is-pressed"), 120);
  }

  // function that opens a card for a given letter
  async function openCardFor(letter) {
    // ignore invalid input
    if (!letter || letter.length !== 1) return;

    // normalize letter to lowercase
    const normalized = letter.toLowerCase();

    // check if the letter exists on the keyboard
    const exists = grid.querySelector(`.key[data-letter="${normalized}"]`);

    // stop if the key does not exist
    if (!exists) return;

    // show key press animation
    pressKeyVisual(normalized);

    // render the modal content (now async)
    await renderCard(normalized);

    // open the modal
    openModal();
  }

  // listen for clicks on the keyboard grid
  grid.addEventListener("click", (e) => {
    // find the closest key button
    const btn = e.target.closest(".key");

    // stop if click was not on a key
    if (!btn) return;

    // get the letter from the button
    const letter = (btn.dataset.letter || "").toLowerCase();

    // open the card for that letter
    openCardFor(letter);
  });

  // listen for keyboard presses
  document.addEventListener("keydown", (e) => {
    // if modal is open and escape is pressed, close it
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
      return;
    }

    // get the active element type
    const tag = document.activeElement?.tagName?.toLowerCase();

    // do not interfere with typing in inputs or textareas
    if (tag === "input" || tag === "textarea") return;

    // if a letter key is pressed , open its card
    if (/^[a-zA-Z]$/.test(e.key)) {
      openCardFor(e.key);
      return;
    }
  });

  // close modal when x button is clicked
  closeBtn?.addEventListener("click", closeModal);

  // close modal when clicking the overlay background
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});
