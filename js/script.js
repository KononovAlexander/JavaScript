window.addEventListener('DOMContentLoaded', () => {
    'use strict';

//    ===================timer=========================

    const countTimer = (deadline) => {
        let timeHours = document.querySelector('#timer-hours'),
            timeMinutes = document.querySelector('#timer-minutes'),
            timeSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(){

            let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};

        }

        const updateClock = setInterval(function(){
            let timer = getTimeRemaining();    
            
                timer.hours >= 10 ? timeHours.textContent = timer.hours : timeHours.textContent = `0${timer.hours}  `;
                timer.minutes >= 10 ? timeMinutes.textContent = timer.minutes : timeMinutes.textContent = `0${timer.minutes}`;
                timer.seconds >= 10 ? timeSeconds.textContent = timer.seconds : timeSeconds.textContent = `0${timer.seconds}`;
                
                if(timer.timeRemaining < 0){
                
                    timeHours.textContent = '00';
                    timeMinutes.textContent = '00';
                    timeSeconds.textContent = '00';
                    clearInterval(updateClock);

                }
        }, 1000);
        
    };

    countTimer('24 february 2021');


    // =====================menu==========================
    
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        btnClose = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul>li');
        
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };      
        
        btnMenu.addEventListener('click', handlerMenu);
        
        btnClose.addEventListener('click', handlerMenu);
        
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
        
    };
    
    toggleMenu();


    //  =====================popUp==========================

const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupContent = popup.querySelector('.popup-content'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close');


            function getAnimation(left){

                const timer = setInterval(() => {
                    
                left += 25;
                popupContent.style.left = `${left}px`;
                console.log('left: ', left);
                console.log('left: ',typeof left);
                
                if(left >= (40 + window.innerWidth - popupContent.offsetWidth) / 2){
                
                    clearTimeout(timer);
                }
            }, 8);
           
            }
                
            popupBtn.forEach((elem) => {

                elem.addEventListener('click', () => {
                    
                    if(window.innerWidth > 768){

                        popup.style.display = 'block';

                        let left = window.innerWidth - (window.innerWidth );
                        popupContent.style.left = `${left}px`;
                        getAnimation(left);

                    }else{

                        popup.style.display = 'block';
                    }
                });
                 
        });
                      
          popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            
        });

};

togglePopUp();
});
