/* eslint-disable no-loop-func */
import dataDB from './data';

// Elements
const $table = document.getElementsByClassName('table__body')[0];
const idBtn = document.getElementById('id');
const titleBtn = document.getElementById('title');
const yearBtn = document.getElementById('year');
const imdbBtn = document.getElementById('imdb');


// Start position
const initTable = (data) => {
  for (let i = 0; i < data.length; i += 1) {
    const trEl = document.createElement('tr');
    trEl.insertAdjacentHTML('beforeend', `<td>${data[i].id}</td>`);
    trEl.insertAdjacentHTML('beforeend', `<td>${data[i].title}</td>`);
    trEl.insertAdjacentHTML('beforeend', `<td>${data[i].year}</td>`);
    trEl.insertAdjacentHTML('beforeend', `<td>imdb: ${data[i].imdb.toFixed(2)}</td>`);

    $table.appendChild(trEl);
  }
};

initTable(dataDB);

// Title of sorting column
let sortTarget = null;

// Events
for (const btn of [idBtn, titleBtn, yearBtn, imdbBtn]) {
  btn.addEventListener('click', (event) => {
    // Clear table
    $table.innerHTML = '';

    // Clean sorting classes
    for (const th of document.querySelectorAll('th')) {
      th.classList.remove('asc');
      th.classList.remove('desc');
    }

    const field = event.target.id;

    // Array sorting
    let sortData;

    if (sortTarget === field) {
      sortTarget = null;
      document.getElementById(field).classList.add('desc');
      sortData = dataDB.sort((a, b) => {
        if (a[field] < b[field]) {
          return 1;
        }
        if (a[field] > b[field]) {
          return -1;
        }
        return 0;
      });
    } else {
      sortTarget = field;
      document.getElementById(field).classList.add('asc');
      sortData = dataDB.sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        }
        if (a[field] > b[field]) {
          return 1;
        }
        return 0;
      });
    }

    // Redraw table
    initTable(sortData);
  });
}
