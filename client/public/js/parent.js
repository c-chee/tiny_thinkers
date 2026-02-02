/**
 * Used for all parent dash related JS
 */

// Logout
function attachLogoutHandler(id) {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener("click", (e) => {
        e.preventDefault();

        // remove login token
        localStorage.removeItem("token");

        // redirect to login
        // window.location.href = "/login";
        fetch("/api/users/logout", {
            method: "POST",
            credentials: "include"
        }).then(() => {
            window.location.href = "/login";
        });

    });
}

document.addEventListener("DOMContentLoaded", () => {
    attachLogoutHandler("logoutBtnMobile");
    attachLogoutHandler("logoutBtnDesktop");
});
