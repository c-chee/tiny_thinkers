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

  // function that returns fake data for each letter
  function getPlaceholderCard(letter) {
    // map of letter data
    const map = {
      a: { sound: "/a/", words: ["apple", "ant", "astronaut"] },
      b: { sound: "/b/", words: ["ball", "bat", "book"] },
      c: { sound: "/k/", words: ["cat", "car", "cookie"] },
      d: { sound: "/d/", words: ["dog", "duck", "drum"] },
      e: { sound: "/e/", words: ["egg", "elephant", "elf"] },
    };

    // return matching letter data or a default placeholder
    return (
      map[letter] || {
        sound: "(placeholder)",
        words: ["(example 1)", "(example 2)", "(example 3)"],
      }
    );
  }

  // function that fills the modal with letter data
  function renderCard(letter) {
    // get the data for this letter
    const data = getPlaceholderCard(letter);

    // set the title text
    title.textContent = `letter: ${letter.toUpperCase()}`;

    // set the subtitle text
    subtitle.textContent = `sound: ${data.sound}`;

    // create word chips html
    const chips = data.words
      .map((w) => `<span class="word-chip">${w}</span>`)
      .join("");

    // insert the card content into the modal
    content.innerHTML = `
      <p class="body small">example words:</p>
      <div class="word-list">${chips}</div>
      <p class="body small" style="margin-top:10px;">
        (later: this will load from our api → dictionary api)
      </p>
    `;

    // if the play button exists , attach a click handler
    if (playBtn) {
      // handle play sound click
      playBtn.onclick = () => {
        console.log("play sound for:", letter);
      };
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
  function openCardFor(letter) {
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

    // render the modal content
    renderCard(normalized);

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
