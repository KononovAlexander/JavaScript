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
let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));
let budgetDay = accumulatedMonth / 30;


function showTypeOf(a){
    return typeof a;
}

 function getExpensesMonth(a, b){
     return a + b;
 }

 function getAccumulatedMonth(a, b){
     return a - b;
 }

 function getTargetMonth(a, b){
     return a / b;
 }


 function getStatusIncome(a){
    if(a >= 1200){

        return 'У вас высокий уровень дохода';

    }else if( a < 1200 && a >= 600){

        return 'У вас средний уровень дохода';

    }else if(a>= 0 && a < 600){

        return 'К сожалению у вас уровень дохода ниже среднего';

    }else if(a < 0){
        return 'Что то пошло не так!';
    }
}

console.log('money: ' + showTypeOf(money));
console.log('income: ' + showTypeOf(income));
console.log('deposit: ' + showTypeOf(deposit));

console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' юаней');
console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на месяц: ', accumulatedMonth);
console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth(mission, accumulatedMonth)) + ' месяцев');
console.log('Бюджет на день: ' + Math.floor(budgetDay));
console.log( getStatusIncome(budgetDay));


