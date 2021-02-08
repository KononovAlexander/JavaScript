'use strict';

let money;
let start = function(){

    do{
        money = +prompt('Ваш месячный доход?');

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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000,
    period: 8,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function(){
        let itemIncome;
        let cashIncome;

        if(confirm('Есть ли у вас дополнительный источник зароботка?')){
            do{
              itemIncome = prompt('Какой у вас дополнительный зароботок?','Торговля');
            }
            while(!isNaN(itemIncome) || itemIncome ==='' || itemIncome === null);
            do{
              cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 100);
            }
            while(isNaN(cashIncome) || cashIncome ==='' || cashIncome === null);
            appData.income[itemIncome] = cashIncome;
        }
        
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        
        appData.addExpenses = appData.addExpenses.replace(/(^|\,)\S/g,
         function(a) {return a.toUpperCase();}).split(',').join(', ');
     
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        for(let i = 0; i < 2; i++){ 
            let itemExpenses;
            let cashExpenses;
            do{
                itemExpenses = prompt('Введите обязательную статью расходов?');
            }
            while(!isNaN(itemExpenses) || itemExpenses ==='' || itemExpenses === null);

            do{
                cashExpenses = +prompt('Во сколько это обойдется?');
            }
            while(isNaN(cashExpenses) || cashExpenses ==='' || cashExpenses === null);

            appData.expenses[itemExpenses] = cashExpenses;
            
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
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);  

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

    getInfoDeposit: function(){
        if(appData.deposit){
            do{
            appData.percentDeposit = prompt('Какой у вас годовой процент?', '1');
            }
            while(isNaN(appData.percentDeposit) || appData.percentDeposit ==='' || appData.percentDeposit === null);
            do{
            appData.moneyDeposit = prompt('Какая сумма заложена?', 1000);
            }
            while(isNaN(appData.moneyDeposit) || appData.moneyDeposit ==='' || appData.moneyDeposit === null);
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
    
};

appData.asking();

console.log(typeof appData.addExpenses);

console.log(' Расходы за месяц: ',  appData.expensesMonth);

console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');

console.log( appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');

for(let key in appData){
    console.log(key, appData[key]);
}
appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney() );




 