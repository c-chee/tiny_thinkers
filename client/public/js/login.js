const loginPage = document.querySelector('.login-page');

if (loginPage) {
    const container = loginPage.querySelector('.container');
    const registerBtn = loginPage.querySelector('.register-btn');
    const loginBtn = loginPage.querySelector('.login-btn');

    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });

    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');

    if (mode === 'register') {
        container.classList.add('active');
    } else {
        container.classList.remove('active');
    }
}

// LOGIN
document.getElementById("loginForm")
?.addEventListener("submit", async e => {
    e.preventDefault();

    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
        localStorage.setItem("token", result.token);
        window.location.href = "/dashboard";
    } else {
        alert(result.message);
    }
});


// REGISTER
document.getElementById("registerForm")
?.addEventListener("submit", async e => {
    e.preventDefault();

    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
        alert("Account created! Please login.");
    } else {
        alert(result.message);
    }
});

// Login to Dashboard Redirect
document.querySelector(".form-box.login form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = e.target.querySelector('input[type="email"]').value;
        const password = e.target.querySelector('input[type="password"]').value;

        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // IMPORTANT for cookies
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            window.location.href = "/dashboard";
        } else {
            alert(data.message || "Login failed");
        }
});
