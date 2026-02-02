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

/* =========================
    LOGIN
========================= */
document.querySelector(".form-box.login form")
?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    try {
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

    } catch (err) {
        console.error(err);
        alert("Login error");
    }
});


/* =========================
    REGISTER
========================= */
document.querySelector(".form-box.register form")
?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = e.target.querySelectorAll("input");

    const data = {
        first_name: inputs[0].value,
        last_name: inputs[1].value,
        email: inputs[2].value,
        password: inputs[3].value
    };

    try {
        // Step 1 — Create account
        const signupRes = await fetch("/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const signupResult = await signupRes.json();

        if (!signupRes.ok) {
            alert(signupResult.message);
            return;
        }

        // Step 2 — Auto login
        const loginRes = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        });

        const loginData = await loginRes.json();

        if (loginRes.ok) {
            window.location.href = "/dashboard";
        } else {
            alert("Account created. Please login manually.");
            document.querySelector('.container').classList.remove('active');
        }

    } catch (err) {
        console.error(err);
        alert("Signup failed");
    }
});

