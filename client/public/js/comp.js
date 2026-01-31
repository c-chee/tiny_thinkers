const inputs = document.querySelectorAll('.day-tracker input');

const totalMinutesEl = document.getElementById('totalMinutes');

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