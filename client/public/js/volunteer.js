const form = document.querySelector('#volunteerForm');
const thankYouMessage = document.querySelector('.thankYouMessage');
const confettiContainer = document.querySelector('.confetti');

form.addEventListener('submit', function (e){
    e.preventDefault();

    const firstName = document.querySelector('#firstName').value.trim();

    document.querySelector('.contactForm').style.display = 'none';
    document.querySelector('.contactInfo').style.display = 'none';
    thankYouMessage.style.display = 'block';

    thankYouMessage.innerHTML = `<h2>Thank You, ${firstName}!</h2><p>We appreciate your interest in volunteering with Tiny Thinkers. Our team will reach out to you soon with more information.</p>`;

});

