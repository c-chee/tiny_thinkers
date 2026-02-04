document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("wordInput");
    const btn = document.getElementById("lookupBtn");
    const result = document.getElementById("result");

    async function lookup() {
        const word = input.value.trim();
        if (!word) return;

        result.innerHTML = "Loading...";

        try {
        const res = await fetch(`/api/dictionary/${word}`);
        const data = await res.json();

        console.log(data); // helps debugging

        if (!data || data.length === 0) {
            result.innerHTML = "No definition found.";
            return;
        }

        // Generic handling (API structure may vary)
        const first = data[0];
        const def =
            first?.shortdef?.[0] ||
            first?.definition ||
            "Definition not available.";

        result.innerHTML = `
            <h3>${word}</h3>
            <p>${def}</p>
        `;
        } catch (err) {
        result.innerHTML = "Dictionary lookup failed.";
        }
    }

    btn.addEventListener("click", lookup);
    input.addEventListener("keypress", e => {
        if (e.key === "Enter") lookup();
    });
});
