'use strict';

let start = document.getElementById('start');
let cancel = document.getElementById('cancel');
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
let inputs = document.querySelectorAll('input[type="text"]');



let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let appData = {
    income: {},
    expenses: {},
    addIncome: [],
    addExpenses: [],
    incomeMonth: 0,
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    


    start: function(){
 
        console.log('this.incomeMonth: ', appData.incomeMonth);
        console.log(appData);
        
        this.getExpenses();
        this.getIncome();
        
        this.getIncomeMonth();
        this.getExpensesMonth(); 
        this.getAddIncome();
        this.getAddExpenses();
        this.budget = +salaryAmount.value + this.incomeMonth;
        
        this.getBudget();
        this.showResult();
        this.inputToggler();
        start.style.display = "none";
        cancel.style.display = "block";
        
    },
    
    reset: function(){
        
        this.inputToggler();
        this.clearInputs();

    },
    clearInputs: function(){
        inputs.forEach(function(item){
            item.value = '';
        });
    },
    inputToggler: function(){

        inputs.forEach(function(item){
            item.toggleAttribute('disabled');
        });
        plusIncome.toggleAttribute('disabled');
        plusExpenses.toggleAttribute('disabled');
        depositCheck.toggleAttribute('disabled');

        start.style.display = (start.style.display === 'none') ? '' : 'none';
        cancel.style.display = (cancel.style.display === 'block') ? '' : 'block';
    },


    showResult: function(){

        budgMonthValue.value = this.budgetMonth;
        budgDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth(); 
        this.changeIncomePeriodValue();
        
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
    
        addIncomeItems.forEach(function(item){
          let itemValue = item.value.trim();
          if(itemValue !== ''){
              appData.addIncome.push(itemValue);
          }

        });
    },

     getIncomeMonth: function(){

        let sum = 0;

        for(let key in this.income){

            sum += Number(this.income[key]);
        }
        this.incomeMonth = sum;
     },   
    
     getExpensesMonth: function(){

         let sum = 0;

          for(let key in this.expenses){

              sum += Number(this.expenses[key]);
          }                

          this.expensesMonth = sum;
    

    },
    
    getBudget: function(){

        this.budgetMonth = this.budget - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);  
        

    },
    
    getTargetMonth: function(){
       return  Math.ceil(targetAmount.value / this.budgetMonth);

    },
    
    // getStatusIncome: function(){
    //     if(appData.budgetDay >= 1200){
            
    //         return 'У вас высокий уровень дохода';
            
    //     }else if( appData.budgetDay < 1200 && appData.budgetDay >= 600){
            
    //         return 'У вас средний уровень дохода';
            
    //     }else if(appData.budgetDay >= 0 && appData.budgetDay < 600){
            
    //         return 'К сожалению у вас уровень дохода ниже среднего';
            
    //     }else if(appData.budgetDay < 0){ 
    //         return 'Цель не будет достигнута';
    //     }
    // },

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
        
        return this.budgetMonth * periodSelect.value;
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

start.addEventListener('click', function(){
    appData.start();
});

cancel.addEventListener('click', function(){
    appData.reset();
});

periodSelect.addEventListener('input', appData.getPeriodValue);

periodSelect.addEventListener('input', appData.changeIncomePeriodValue);

plusExpenses.addEventListener('click', appData.addExpensesBlock);

plusIncome.addEventListener('click', appData.addIncomeBlock);



