document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const wordInput = document.getElementById("wordInput");
    const resultDiv = document.getElementById("result");

    searchBtn.addEventListener("click", searchWord);

    async function searchWord() {
        const word = wordInput.value.trim();
        if (!word) return;

        resultDiv.innerHTML = "Loading...";

        try {
            const res = await fetch(`/api/dictionary/${word}`);
            const data = await res.json();

            if (!Array.isArray(data) || !data.length) {
                resultDiv.innerHTML = "No results found.";
                return;
            }

            const entry = data[0];

            const phonetic = entry.hwi?.hw || "";
            const pronunciation = entry.hwi?.prs?.[0]?.mw || "";
            const partOfSpeech = entry.fl || "";
            const definition = entry.shortdef?.[0] || "";

            const example = getExample(entry);
            const audioUrl = getAudio(entry);

            resultDiv.innerHTML = `
                <div class="dict-card">
                    <h2>${word}</h2>
                    <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
                    <p><strong>Definition:</strong> ${definition}</p> 
                    ${
                        audioUrl
                            ? `<button id="playAudio">Play</button>`
                            : `<p class="no-audio">Audio not available</p>`
                        }

                </div>
            `;

            if (audioUrl) {
                document
                    .getElementById("playAudio")
                    .addEventListener("click", () => {
                        new Audio(audioUrl).play();
                    });
            }
        } catch (err) {
            console.error(err);
            resultDiv.innerHTML = "Dictionary lookup failed.";
        }
    }

    /* Extract example sentence */
    function getExample(entry) {
        try {
            const dt = entry.def?.[0]?.sseq?.[0]?.[0]?.[1]?.dt;
            if (!dt) return null;

            const example = dt.find(x => x[0] === "text");
            return example ? example[1].replace(/{.*?}/g, "") : null;
        } catch {
            return null;
        }
    }

    /* Build audio URL */
    function getAudio(entry) {
        const audio = entry.hwi?.prs?.[0]?.sound?.audio;
        if (!audio) return null;

        const subdir = audio[0];
        return `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdir}/${audio}.mp3`;
    }

});
