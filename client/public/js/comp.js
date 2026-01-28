// const selectGrade = document.getElementById('grade');
// const tipsList = document.getElementById('reading-tips');
// const booksList = document.getElementById('books');

// selectGrade.addEventListener('change', async () =>{
//     const grade = selectGrade.value;
//     if(!grade) return;

//     const response = await fetch(`/api/reading/${grade}`);
//     const data = await response.json();

//     tipsList.innerHTML = '';
//     booksList.innerHTML = '';

//     //tips
//     data.tips?.forEach(tip => {
//         const li = document.createElement('li');
//         li.textContent = tip;
//         tipsList.appendChild(li);
//     });

//     //books
//      data.books?.forEach(book => {
//         const li = document.createElement('li');
//         li.classList.add('book-item');
    

//     const img = document.createElement('img');
//     img.src = book.image;
//     img.alt = book.title;

//     const title = document.createElement('p');
//     title.textContent = book.title;

//     li.appendChild(img);
//     li.appendChild(title);
//     booksList.appendChild(li);
//     });
// });