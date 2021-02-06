'use strict';

let money;
let start = function(){

    do{
        money = prompt('Ваш месячный доход?');

    }

    while (isNaN(money)  || money === '' || money === null);
};
start();

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 100000,
    period: 8,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    
    expensesMonth: 0,
    asking: function(){
        
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        for(let i = 0; i < 2; i++){ 
            
            appData.expenses[prompt('Введите обязательную статью расходов?')] = [+prompt('Во сколько это обойдется?')];
            
        }
        appData.getExpensesMonth();
        appData.getBudget();
    },
     getExpensesMonth: function(){

         let sum = 0;

          for(let key in appData.expenses){

              sum += Number(appData.expenses[key]);
          }                

          appData.expensesMonth = sum;

    },
    
    getBudget: function(){

        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;  

    },
    
    getTargetMonth: function(){
       return  appData.mission / appData.budgetMonth;
         
    },
    
    getStatusIncome: function(){
        if(appData.budgetDay >= 1200){
            
            return 'У вас высокий уровень дохода';
            
        }else if( appData.budgetDay < 1200 && appData.budgetDay >= 600){
            
            return 'У вас средний уровень дохода';
            
        }else if(appData.budgetDay >= 0 && appData.budgetDay < 600){
            
            return 'К сожалению у вас уровень дохода ниже среднего';
            
        }else if(appData.budgetDay < 0){
            return 'Цель не будет достигнута';
        }
    },
    
};

appData.asking();

console.log(' Расходы за месяц: ',  appData.expensesMonth);

console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');

console.log( appData.getStatusIncome());



