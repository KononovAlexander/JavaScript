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


const AppData = function(){

    this.income = {};
    this.expenses = {};
    this.addIncome = [];
    this.addExpenses = [];
    this.incomeMonth = 0;
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;

    const _this = this;

    AppData.prototype.start = function(){
        start.setAttribute('disabled', 'true');
        
        this.eventsListeners();
    };

    AppData.prototype.getWork = function(){
        this.inputToggler(inputs);
        this.getExpenses(this.expenses);
        this.getIncome(this.income);
        
        this.getIncomeMonth();
        this.getExpensesMonth(); 
        this.getAddIncome(this.addIncome);
        this.getAddExpenses(this.addExpenses);

        this.budget = +salaryAmount.value + this.incomeMonth;
        
        this.getBudget();
        this.showResult();
        
    };

    AppData.prototype.reset = function(){
        
        this.clearElements();
        this.clearInputs(inputs);
        this.clearInputs(incomeItems);
        this.clearInputs(expensesItems);
        this.deleteInputs(incomeItems);
        this.deleteInputs(expensesItems);
        this.inputToggler(inputs);

    };

    AppData.prototype.clearElements = function(){

        for(let key in this.income){
            delete this.income[key];
        }

        for(let key in this.expenses){
            delete this.expenses[key];
        }
    
        this.addIncome.length = 0;
        this.addExpenses.length = 0;
        this.incomeMonth = 0;
        this.expensesMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;

        
    };

    AppData.prototype.deleteInputs = function(arr){

          if( arr.length > 1){

             for(let i = 1; i < arr.length; i++){
                 arr[i].parentElement.removeChild(arr[i]);
            }

        }else if(arr.length === 1){

            return;
        }

        plusIncome.style.display = 'block';
        plusExpenses.style.display = 'block';

    };

    AppData.prototype.clearInputs = function(arr){
        arr.forEach(function(item){
            item.value = '';
        });
    };

    AppData.prototype.inputToggler = function(arr){

        arr.forEach(function(item){
            item.toggleAttribute('disabled');
        });

        plusIncome.toggleAttribute('disabled');
        plusExpenses.toggleAttribute('disabled');
        depositCheck.toggleAttribute('disabled');

        start.style.display = (start.style.display === 'none') ? '' : 'none';
        cancel.style.display = (cancel.style.display === 'block') ? '' : 'block';
    };

    AppData.prototype.showResult = function(){
        
        budgMonthValue.value = this.budgetMonth;
        budgDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth(); 
        incomePeriodValue.value = this.calcPeriod();
        
    };

    AppData.prototype.addIncomeBlock = function(){

        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
        incomeItems = document.querySelectorAll('.income-items');
        inputs = document.querySelectorAll('input[type="text"]');

        if(incomeItems.length === 3){
            plusIncome.style.display = 'none';
         }
    };

    AppData.prototype.addExpensesBlock = function(){
         
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        inputs = document.querySelectorAll('input[type="text"]');
        

        if(expensesItems.length === 3){
           plusExpenses.style.display = 'none';
        }
   };

   AppData.prototype.getIncome = function(arr){

    incomeItems.forEach(function(item){

       let itemIncome = item.querySelector('.income-title').value;
       let cashIncome = item.querySelector('.income-amount').value;

       if(itemIncome !== '' && cashIncome !== ''){

        arr[itemIncome] = cashIncome;
        return arr;

       }

     });
    };

    AppData.prototype.getExpenses = function(arr){
        expensesItems.forEach(function(item){

            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== ''){

                arr[itemExpenses] = cashExpenses;
                return arr;
            }
        });
    };

    AppData.prototype.getAddExpenses = function(arr){

        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
           if(item !== ''){
               arr.push(item);
               
           }
        });
    };

    AppData.prototype.getAddIncome = function(arr){
    
        addIncomeItems.forEach(function(item){
          let itemValue = item.value.trim();
          if(itemValue !== ''){
              arr.push(itemValue);

          }

        });
    };

    AppData.prototype.getIncomeMonth = function(){
        
        let sum = 0;

        for(let key in this.income){

            sum += Number(this.income[key]);
        }
        this.incomeMonth = sum;
    };

    AppData.prototype.getExpensesMonth = function(){

        let sum = 0;

         for(let key in this.expenses){

             sum += Number(this.expenses[key]);
         }                

         this.expensesMonth = sum;
   

    };

    AppData.prototype.getBudget = function(){

        this.budgetMonth = this.budget - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);  
        
    };

    AppData.prototype.getTargetMonth = function(){
        return  Math.ceil(targetAmount.value / this.budgetMonth);
 
    };

    AppData.prototype.changePeriodNumber = function(){

        let periodValue = periodSelect.value;
        periodAmount.innerText = periodValue;
        
    };

    AppData.prototype.calcPeriod = function(){
        
        return this.budgetMonth * periodSelect.value;

    };

    AppData.prototype.eventsListeners = function(){
        
        salaryAmount.addEventListener('input', function(){
    
            if(salaryAmount.value){

                start.removeAttribute('disabled');      
            }
        });
        
            
        start.addEventListener('click', function(){
            
            _this.getWork();  
        });
        
        cancel.addEventListener('click', function(){
            start.setAttribute('disabled', 'true');
            
            _this.reset();
        });    
        
        plusIncome.addEventListener('click', this.addIncomeBlock);
        
        plusExpenses.addEventListener('click', this.addExpensesBlock);

        periodSelect.addEventListener('input', this.changePeriodNumber);
        
        periodSelect.addEventListener('input', function(){
          
        incomePeriodValue.value = _this.calcPeriod();
        });
    };
};

const appData = new AppData();

appData.start();




    
   
    
    
    


 



