'use strict';

let money = +prompt('Ваш месячный доход?','0');
let income = 'Фриланс';
let period = 8;
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 100000;



let expenses1 = prompt('Введите обязательную статью расходов?'); 
let amount1 = +prompt('Во сколько это обойдется?','0');

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?','0');

let budgetMonth = money - (amount1 + amount2);
let missionTime = mission / budgetMonth;
let budgetDay = budgetMonth / 30;






console.log('money: ' + typeof money);
console.log('income: ' + typeof income);
console.log('deposit: ' + typeof deposit);

console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' юаней');
console.log('addExpenses: ', addExpenses);
console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на месяц: ', budgetMonth);
console.log('Цель будет достигнута за ' + Math.ceil(missionTime) + ' месяцев');


console.log('Бюджет на день: ' + Math.floor(budgetDay));

    if(budgetDay >= 1200){

        console.log('У вас высокий уровень дохода');

    }else if( budgetDay < 1200 && budgetDay >= 600){

        console.log('У вас средний уровень дохода');

    }else if(budgetDay >= 0 && budgetDay < 600){

        console.log('К сожалению у вас уровень дохода ниже среднего');

    }else if(budgetDay < 0){
          console.log('Что то пошло не так!');
    }


