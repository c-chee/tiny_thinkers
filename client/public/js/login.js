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