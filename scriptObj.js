'use strict';

const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const plusIncome = document.getElementsByTagName('button')[0];
const plusExpenses = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const incomeTitle = document.querySelector('.income-title');
  let incomeItems = document.querySelectorAll('.income-items');
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const periodSelect = document.querySelector('.period-select');
const expensesTitle = document.querySelector('expenses-title');
  let expensesItems = document.querySelectorAll('.expenses-items');
const addIncomeItems = document.querySelectorAll('.additional_income-item');
const addExpensesItem = document.querySelector('.additional_expenses-item');
const addIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const budgDayValue = document.getElementsByClassName('budget_day-value')[0];
const budgMonthValue = document.getElementsByClassName('budget_month-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const incomeAmount = document.querySelector('.income-amount');
const salaryAmount = document.querySelector('.salary-amount');
const targetAmount = document.querySelector('.target-amount');
const periodAmount = document.querySelector('.period-amount');
  let inputs = document.querySelectorAll('input[type="text"]');  


class AppData {
    constructor(){
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
    }

    

    start(){
        start.setAttribute('disabled', 'true');
        
        this.eventsListeners();
    }

    getWork(){
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
        
    }

    reset(){
        
        this.clearElements();
        this.clearInputs(inputs);
        this.clearInputs(incomeItems);
        this.clearInputs(expensesItems);
        this.deleteInputs(incomeItems);
        this.deleteInputs(expensesItems);
        this.inputToggler(inputs);

    }

    clearElements(){

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

        
    }

    deleteInputs(arr){

          if( arr.length > 1){

             for(let i = 1; i < arr.length; i++){
                 arr[i].parentElement.removeChild(arr[i]);
            }

        }else if(arr.length === 1){

            return;
        }

        plusIncome.style.display = 'block';
        plusExpenses.style.display = 'block';

    }

    clearInputs(arr){
        arr.forEach(function(item){
            item.value = '';
        });
    }

    inputToggler(arr){

        arr.forEach(function(item){
            item.toggleAttribute('disabled');
        });

        plusIncome.toggleAttribute('disabled');
        plusExpenses.toggleAttribute('disabled');
        depositCheck.toggleAttribute('disabled');

        start.style.display = (start.style.display === 'none') ? '' : 'none';
        cancel.style.display = (cancel.style.display === 'block') ? '' : 'block';
    }

    showResult(){
        
        budgMonthValue.value = this.budgetMonth;
        budgDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth(); 
        incomePeriodValue.value = this.calcPeriod();
        
    }

    addIncomeBlock(){

        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
        incomeItems = document.querySelectorAll('.income-items');
        inputs = document.querySelectorAll('input[type="text"]');

        if(incomeItems.length === 3){
            plusIncome.style.display = 'none';
         }
    }

    addExpensesBlock(){
         
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        inputs = document.querySelectorAll('input[type="text"]');
        

        if(expensesItems.length === 3){
           plusExpenses.style.display = 'none';
        }
    }

    getIncome(arr){

    incomeItems.forEach(function(item){

       const itemIncome = item.querySelector('.income-title').value;
       const cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== '' && cashIncome !== ''){

                arr[itemIncome] = cashIncome;
                return arr;

            }

     });
    }

    getExpenses(arr){

    expensesItems.forEach(function(item){

        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== ''){

                arr[itemExpenses] = cashExpenses;
                return arr;
            }
        });
    }

    getAddExpenses(arr){

        const addExpenses = addExpensesItem.value.split(',');

           addExpenses.forEach(function(item){
                 item = item.trim();

            if(item !== ''){
                arr.push(item);
                
            }
        });
    }

    getAddIncome(arr){
    
        addIncomeItems.forEach(function(item){
          const itemValue = item.value.trim();
          if(itemValue !== ''){
              arr.push(itemValue);

          }

        });
    }

    getIncomeMonth(){
        
        let sum = 0;

        for(let key in this.income){

            sum += Number(this.income[key]);
        }
        this.incomeMonth = sum;
    }

    getExpensesMonth(){

        let sum = 0;

         for(let key in this.expenses){

             sum += Number(this.expenses[key]);
         }                

         this.expensesMonth = sum;
   

    }

    getBudget(){

        this.budgetMonth = this.budget - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);  
        
    }

    getTargetMonth(){
        return  Math.ceil(targetAmount.value / this.budgetMonth);
 
    }

    changePeriodNumber(){

        const periodValue = periodSelect.value;
        periodAmount.innerText = periodValue;
        
    }

    calcPeriod(){
        
        return this.budgetMonth * periodSelect.value;

    }

    eventsListeners(){
        const _this = this;
        
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
    }
}

const appData = new AppData();

appData.start();




    
   
    
    
    


 



