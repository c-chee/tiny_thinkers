/**
 * Used for all parent dash related JS
 */

// Logout
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", async (e) => {
        console.log("Logout clicked");

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
});

