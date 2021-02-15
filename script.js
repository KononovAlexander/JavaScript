'use strict';

let start = document.getElementById('start');
let plusIncome = document.getElementsByTagName('button')[0];
let plusExpenses = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let incomeTitle = document.querySelector('.income-title');
let incomeItems = document.querySelectorAll('.income-items');
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let periodSelect = document.querySelector('.period-select');
let expensesTitle = document.querySelector('expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let addIncomeItems = document.querySelectorAll('.additional_income-item');
let addExpensesItem = document.querySelector('.additional_expenses-item');
let addIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let budgDayValue = document.getElementsByClassName('budget_day-value')[0];
let budgMonthValue = document.getElementsByClassName('budget_month-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let incomeAmount = document.querySelector('.income-amount');
let salaryAmount = document.querySelector('.salary-amount');
let targetAmount = document.querySelector('.target-amount');
let periodAmount = document.querySelector('.period-amount');


let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    incomeMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    


    start: function(){
 
        appData.budget = +salaryAmount.value + +incomeAmount.value;

        appData.getExpenses();
        appData.getIncome();
        
        appData.getExpensesMonth(); 
        appData.getAddIncome();
        appData.getAddExpenses();
        
        appData.getBudget();
        appData.showResult();
        console.log(targetAmount.value);
        console.log(appData.changeIncomePeriodValue());
    },

    showResult: function(){
        budgMonthValue.value = appData.budgetMonth;
        budgDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        addExpensesValue.value = appData.addExpenses.join(', ');
        addIncomeValue.value = appData.addIncome.join(', ');
        periodSelect.addEventListener('input', appData.changeIncomePeriodValue);
        targetMonthValue.value = appData.getTargetMonth(); 

    },

    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3){
            plusIncome.style.display = 'none';
         }
    },

    addExpensesBlock: function(){
     
         let cloneExpensesItem = expensesItems[0].cloneNode(true);
         expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
         expensesItems = document.querySelectorAll('.expenses-items');

         if(expensesItems.length === 3){
            plusExpenses.style.display = 'none';
         }
    },

    getIncome: function(){
        incomeItems.forEach(function(item){

           let itemIncome = item.querySelector('.income-title').value;
           let cashIncome = item.querySelector('.income-amount').value;

           if(itemIncome !== '' && cashIncome !== ''){

            appData.income[itemIncome] = cashIncome;

           }

        });
    },

    getExpenses: function(){
        expensesItems.forEach(function(item){

            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== ''){

                appData.expenses[itemExpenses] = cashExpenses;

            }
        });
    },

    getAddExpenses: function(){
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
           if(item !== ''){
               appData.addExpenses.push(item);
           }
        });
    },

    getAddIncome: function(){
         let addIncome = 
        addIncomeItems.forEach(function(item){
          let itemValue = item.value.trim();
          if(itemValue !== ''){
              appData.addIncome.push(itemValue);
          }

        });
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
       return  Math.ceil(targetAmount.value / appData.budgetMonth);

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
    getPeriodValue: function(){

        let periodValue = periodSelect.value;
        periodAmount.innerText = periodValue;
        
    },

    calcPeriod: function(){
        
        return appData.budgetMonth * periodSelect.value;
    },

    changeIncomePeriodValue: function(){
        incomePeriodValue.value = appData.calcPeriod();
    },
     
};

start.setAttribute('disabled', 'disabled');

salaryAmount.addEventListener('input', function(){

    if(salaryAmount.value){
        start.removeAttribute('disabled');
}});

start.addEventListener('click', appData.start);

periodSelect.addEventListener('input', appData.getPeriodValue);

periodSelect.addEventListener('input', appData.changeIncomePeriodValue);

plusExpenses.addEventListener('click', appData.addExpensesBlock);

plusIncome.addEventListener('click', appData.addIncomeBlock);

console.log(appData.addExpenses);





