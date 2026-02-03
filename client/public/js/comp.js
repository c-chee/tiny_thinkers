document.addEventListener('DOMContentLoaded', () => {

    // READIING DAY TRACKER

const inputs = document.querySelectorAll('.day-tracker input');
const totalMinutesEl = document.getElementById('totalMinutes');
const titleEL = document.querySelector('#typingTitle')
const text = titleEL.textContent;

function updateTotal(){
    let total = 0;
    inputs.forEach(input => {
        total += Number(input.value) || 0;
    });
    totalMinutesEl.textContent = total;
}

inputs.forEach((input, index) => {
    const saved = localStorage.getItem(`readingMinutes${index}`);
    if (saved !== null) input.value = saved;

    input.addEventListener('input', () => {
        localStorage.setItem(`readingMinutes${index}`, input.value);
        updateTotal();
    });
});

updateTotal();

// TYPING EFFECT 
titleEL.textContent = "";

let index = 0;
const speed = 200;

function type() {
    if (index < text.length) {
        titleEL.textContent += text.charAt(index);
        index++
        setTimeout(type, speed);
    }
}

type();

});