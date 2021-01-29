let money =11000;
let income = 'Фриланс';
let addExpenses = 'Комуналка, Кафе, Интернет, Кино';
let deposit = true;
let mission = 100000;
let period = 8;
let budgetDay = money / 30;

console.log('money: ' + typeof money);
console.log('income: ' + typeof  income);
console.log('deposit: ' + typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' юаней');

console.log(addExpenses.toLowerCase().split(', '));

console.log('budgetDay: ' + budgetDay);

