'use strict';

const bGround = document.querySelector('body');
const comertial = document.querySelector('.adv');
const bookCollection = document.querySelector('.books');
const bookElems = document.querySelectorAll('.book');
const linkCollection = document.querySelectorAll('a');
const ulCollection = document.querySelectorAll('ul');
const ulElems = document.querySelectorAll('li');
const newLi = document.createElement('li');

bGround.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

console.log('bookCollection: ', bookCollection);
console.log('bookElems[1]: ', bookElems);
console.log('linkCollection: ', linkCollection);
console.log('ulCollection: ', ulCollection);
console.log('ulElems: ', ulElems);


bookCollection.prepend(bookElems[1]);
bookCollection.append(bookElems[2]);
bookElems[3].before(bookElems[4]);
linkCollection[4].innerText = 'Книга 3. this и Прототипы Объектов';

ulElems[9].after(ulElems[2]);
ulElems[9].before(ulElems[7]);
ulElems[3].after(ulElems[6]);
ulElems[4].before(ulElems[8]);

ulElems[56].before(ulElems[54]);
ulElems[53].after(ulElems[51]);
ulElems[47].after(ulElems[55]);
ulElems[50].after(ulElems[48]);

newLi.textContent = 'Глава 8: За пределами ES6';
ulElems[25].after(newLi);


comertial.remove();