'use strict';

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'Фриланс';
let period = 8;
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 100000;
let expenses = [];

let start = function(){

    do{
        money = prompt('Ваш месячный доход?');

    }

    while (!isNumber(money));
};
start();


let showTypeOf = function (data){
    
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let getExpensesMonth = function(){
    let sum = 0;

    for(let i = 0; i < 2; i++){

        expenses[i] = prompt('Введите обязательную статью расходов?');

        do{

            sum = prompt('Во сколько это обойдется?');
    
        }
        while (!isNumber(sum));
        
        sum = Number(sum);
        sum += sum;
    }

    console.log('sum: ', sum);
    console.log('sum: ', typeof (sum));
    return sum;
};

function getAccumulatedMonth(a, b){
    console.log(a);
    console.log(typeof (a));
    return a - b;
  
}
let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth());
let budgetDay = accumulatedMonth / 30;

 function getTargetMonth(a, b){
     return a / b;
 }


 let getStatusIncome = function(a){
    if(a >= 1200){

        return 'У вас высокий уровень дохода';

    }else if( a < 1200 && a >= 600){

        return 'У вас средний уровень дохода';

    }else if(a>= 0 && a < 600){

        return 'К сожалению у вас уровень дохода ниже среднего';

    }else if(a < 0){
        return 'Цель не будет достигнута';
    }
}

console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' юаней');
console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на месяц: ', accumulatedMonth);
console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth(mission, accumulatedMonth)) + ' месяцев');
console.log('Бюджет на день: ' + Math.floor(budgetDay));
console.log( getStatusIncome(budgetDay));


