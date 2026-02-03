async function loadSettings() {
    try {
        const res = await fetch("/api/settings");
        const prefs = await res.json();

        if (!prefs) return;

        // Only run if settings inputs exist
        const gradeInput = document.querySelector(
            `input[name="grade_level"][value="${prefs.grade_level}"]`
        );

        if (gradeInput) {
            gradeInput.checked = true;
        }

        if (prefs.content_type) {
            const types = prefs.content_type.split(",");

            types.forEach(type => {
                const box = document.querySelector(
                    `input[name="content_type"][value="${type}"]`
                );
                if (box) box.checked = true;
            });
        }

    } catch (err) {
        console.error("Failed loading settings", err);
    }
}
