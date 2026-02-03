/**
 * Used for all parent dash related JS
 */

document.addEventListener("DOMContentLoaded", () => {

    /* === LOGOUT === */
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            try {
                const res = await fetch("/api/users/logout", {
                    method: "POST",
                    credentials: "include"
                });

                if (res.ok) {
                    window.location.href = "/";
                } else {
                    alert("Logout failed");
                }
            } catch (err) {
                console.error(err);
                alert("Logout error");
            }
        });
    }

    /* === LOAD USER SETTINGS
        (only if inputs exist) ==== */
    loadSettings();
});
