'use strict';

const oClock = function(){
const date = new Date(),  
      body = document.querySelector('body'),   
      newYear = new Date('31 december 2021'),
      day = date.getDay(),
      hours = date.getHours(),
      daysLeft = Math.floor((newYear - date) / 1000 / 60 / 60 / 24);

console.log('date: ', day);
console.log('hours: ', hours);
console.log('dayLeft: ', daysLeft);



const buildHtml = function(){
    let greeting = document.createElement('h1'),
        weekDay = document.createElement('p'),
        currentTime = document.createElement('p'),
        counter =  document.createElement('p');
        body.append(greeting, weekDay, currentTime, counter);

        let greet,
            whatDay;


        (6 < hours && hours < 12) ? greet ='Доброе утро!' :
        (12 <= hours && hours < 18) ? greet = 'Добрый день!' :
        (18 <= hours && hours < 22) ? greet = 'Добрый вечер!': greet = 'Доброй ночи!';
        

        (day === 1) ? whatDay = 'Понедельник': 
        (day === 2) ? whatDay = 'Вторник' :  
        (day === 3) ? whatDay = 'Среда' :  
        (day === 4) ? whatDay = 'Четверг' :  
        (day === 5) ? whatDay = 'Пятница' :  
        (day === 6) ? whatDay = 'Суббота' : whatDay = 'Воскресенье' ;  

        greeting.textContent = greet;
        weekDay.textContent = `Сегодня: ${whatDay}`;
        currentTime.textContent = `Текущее время: ${date.toLocaleTimeString('en')}`;
        counter.textContent = `До нового года осталось ${daysLeft}  дней`;

};
buildHtml();
};
oClock();