window.addEventListener('DOMContentLoaded', () => {
    'use strict';

//    ===================timer=========================

    const countTimer = (deadline) => {
        let timeHours = document.querySelector('#timer-hours'),
            timeMinutes = document.querySelector('#timer-minutes'),
            timeSeconds = document.querySelector('#timer-seconds');
            timeHours.textContent = '00';
            timeMinutes.textContent = '00';
            timeSeconds.textContent = '00';

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
            
                timer.hours >= 10 ? timeHours.textContent = timer.hours : 
                timeHours.textContent = `0${timer.hours}`;

                timer.minutes >= 10 ? timeMinutes.textContent = timer.minutes : 
                timeMinutes.textContent = `0${timer.minutes}`;

                timer.seconds >= 10 ? timeSeconds.textContent = timer.seconds :
                timeSeconds.textContent = `0${timer.seconds}`;
                
                if(timer.timeRemaining < 0){
                
                    timeHours.textContent = '00';
                    timeMinutes.textContent = '00';
                    timeSeconds.textContent = '00';
                    clearInterval(updateClock);

                }
        }, 1000);
        
    };

    countTimer('8 march 2021');

  //  =====================scroll==========================

    const pageScroll = (link) => {

                let target = link.getAttribute('href').substring(1);


                const scrollTo = document.getElementById(target);

               if(scrollTo !== null){ 
                   const elemPosition = scrollTo.getBoundingClientRect().top;

                window.scrollBy({
                    top: elemPosition,
                    behavior: "smooth"
                });
            }else{
                    return;
                }

    };


    // =====================menu==========================
    
    const toggleMenu = () => {
        const menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li>a'),
        body = document.querySelector('body');
        
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };      

        body.addEventListener('click', (event) => {
            let target = event.target;
            
            if(target.closest('.close-btn') || target.closest('.menu')){
                
                handlerMenu();
            }
            if(target.closest('img[src="images/scroll.svg"]')){
                event.preventDefault();
                
                pageScroll(target.parentNode);
            }
            
            menuItems.forEach(item => {
                
                if(item === target){
                    event.preventDefault();
                    handlerMenu();
                    pageScroll(item);

                }  
            });

        });
        
    };
    
    toggleMenu();


    //  =====================popUp==========================
    
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupContent = popup.querySelector('.popup-content'),
        popupBtn = document.querySelectorAll('.popup-btn');

                
        function getAnimation(){
            let left = window.innerWidth - window.innerWidth;
            popupContent.style.left = `${left}px`;
            const timer = setInterval(() => {
                
                left += 25;
                popupContent.style.left = `${left}px`;
                
                if(left >= (40 + window.innerWidth - popupContent.offsetWidth) / 2){
                    
                    clearTimeout(timer);
                }
            }, 8);
            
        }
        
        popupBtn.forEach((elem) => {
            
            elem.addEventListener('click', () => {
           
                if(window.innerWidth > 768){
                    
                    popup.style.display = 'block';
                    getAnimation();
                    
                }else{
                    
                    popup.style.display = 'block';
                }
            });
            
        });
        
        popup.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')){
                
                popup.style.display = 'none';
                }else{

                    target = target.closest('.popup-content');
                    if(!target){
                        popup.style.display = 'none';
                    }
                }
        });
        
    };
    
    togglePopUp();
    
    //  =====================tabs==========================

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
              tab = tabHeader.querySelectorAll('.service-header-tab'),
              tabContent = document.querySelectorAll('.service-tab');

              const toggleTabContent = (index) => {
                  for(let i = 0; i < tabContent.length; i++){
                      if(index === i){
                          tab[i].classList.add('active');
                          tabContent[i].classList.remove('d-none');
                        }else{
                          tab[i].classList.remove('active');
                          tabContent[i].classList.add('d-none');
                      }
                  }
              };

              tabHeader.addEventListener('click', (event) => {
                  let target = event.target;

                        target = target.closest('.service-header-tab');

                        if(target){

                            tab.forEach((item, index) => {

                            if(item === target){

                                toggleTabContent(index);

                            }
                        });
                    }
                
            });

    };

    tabs();

       //  =====================slider==========================

        const slider = () => {
            const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            dots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

            
            
            let currentSlide = 0,
                interval;

                const addDots = () =>{
                    slide.forEach((item, index) => {
                        const elem = document.createElement('li');
                        dots.appendChild(elem);

                        if(index === 0){

                            elem.classList.add('dot', 'dot-active');
                        }else{
                            
                            elem.classList.add('dot');
                        }
                    });
                    
                    return document.querySelectorAll('.dot');
                };

            const dot = addDots();


            const prevSlide = (elem, index, strClass) => {
                elem[index].classList.remove(strClass);
            };
            
            const nextSlide = (elem, index, strClass) => {
                elem[index].classList.add(strClass);
            };



            const autoPlaySlide = () => {

                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');
                currentSlide ++;
                
                if(currentSlide >= slide.length){
                    currentSlide = 0;
                }
                
                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');
            };

            const startSlide = (time = 3000) => {
                interval = setInterval(autoPlaySlide, time);
            };

            const stopSlide = () => {
                clearInterval(interval);
            };



            slider.addEventListener('click', (event) => {
                event.preventDefault();
                let target = event.target;

                if(!target.matches('.portfolio-btn, .dot')){
                    return;
                }

                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');


                if(target.matches('#arrow-right')){
                    currentSlide++;
                }else if(target.matches('#arrow-left')){
                    currentSlide--;
                }else if(target.matches('.dot')){
                    dot.forEach((elem, index) => {
                        if(elem === target){
                            currentSlide = index;
                        }
                    });
                }

                if(currentSlide >= slide.length){
                    currentSlide = 0;
                }else if(currentSlide < 0){
                    currentSlide = slide.length - 1;
                }

                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');


            });

            slider.addEventListener('mouseover', (event) => {
                if(event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')){
                    stopSlide();
                }
            });

            slider.addEventListener('mouseout', (event) => {
                if(event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')){
                    startSlide();
                }
            });

            
            startSlide(5500);
        };

    slider();

        //  =====================fotoToggler==========================

        
        const fotoToggler = () =>{
            const img = document.querySelectorAll('.command__photo');

            img.forEach((item) => {    
                let str = item.src;
                
                item.addEventListener('mouseover', (event) => {

                let target = event.target;
                if(item === target){
                    target.src = target.dataset.img;

                }
                
            });
            
            
            item.addEventListener('mouseout', (event) =>{
                let target = event.target;
                
                target.src = str;
            });
         });

        };
    fotoToggler();

        //  =====================calculator==========================
        
        const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
              calcType = document.querySelector('.calc-type'),
              calcSquare = document.querySelector('.calc-square'),
              calcDay = document.querySelector('.calc-day'),
              caclCount = document.querySelector('.calc-count'),
              totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
            countValue = 1,
            dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;



                if(caclCount.value > 1){
                    countValue += (caclCount.value - 1) / 10;

                }

                if(calcDay.value && calcDay.value < 5){
                    dayValue *= 2;

                }else if(calcDay.value && calcDay.value < 10){
                    dayValue *= 1.5;

                }

                if(typeValue && squareValue){
                    total = price * typeValue * squareValue * countValue * dayValue; 
                }

            totalValue.textContent = total ;
        };
        
        calcBlock.addEventListener('change', (event) => {
            let target = event.target;

            if(target.matches('select') || target.matches('input')){

                countSum(); 
            }
        });    

        calcBlock.addEventListener('input', (event) => {
            let target = event.target;

            if(target.matches('input')) {

                target.value = target.value.replace(/\D/g, '');

            }
    
        });
    };
    calc(100);
        //  =====================formValidation==========================
        const formControl = () => {

            const inputs = document.querySelectorAll('input');

            inputs.forEach((input) => {
                
            input.addEventListener('input', (event) => {
                let target = event.target;

            if(target.closest('#form1-name') || 
            target.closest('#form2-name') || 
            target.closest('#form3-name')){

            target.value = target.value.replace(/[a-zA-Z0-9=+()*?:;№"!%$#@^<>/"']/g, '');
               
            }else if(target.matches('#form2-message')){
          
                target.value = target.value.replace(/[a-zA-Z+=(){}%^#@<>]/g, '');

            }else if(target.closest('#form1-email') || 
            target.closest('#form2-email') || 
            target.closest('#form3-email')){
                
                target.value = target.value.replace(/[ а-яА-ЯЁё\-+"%/&?#$(){}]/g, '');
            }else if(target.closest('#form1-phone') || 
            target.closest('#form2-phone') || 
            target.closest('#form3-phone')){
                
                target.value = target.value.replace(/[=?/{}^#@"'<>!.:;,A-Za-zа-яА-ЯЁё]/g, '');
            
                }
            });
        });

        inputs.forEach((input) =>{

            input.addEventListener('blur', (event) => {
                let target = event.target;

                if(target.closest('#form1-name') || 
            target.closest('#form2-name') || 
            target.closest('#form3-name')){
                target.value = target.value.replace(/ +/g, ' ').trim();
                target.value = target.value.replace(/-+/g, '').trim();
                target.value = target.value.replace(/(.|\s'')/g, function(a) {return a.toLowerCase();});
                target.value = target.value.trim().replace(/(^|\s)\S/g, function(a) {return a.toUpperCase();});
            }else if(target.matches('#form2-message')){
                target.value = target.value.replace(/ +/g, ' ').trim();
                target.value = target.value.replace(/^-+|-+$/g, '').trim();
                target.value = target.value.replace(/-+/g, '-').trim();
            }

            });

        });
    
        };
        formControl();

    //  =====================send-ajax-form==========================

    const sendForm = () => {
        const forms = document.querySelectorAll('form');
        const errorMessage = 'Что то пошло не так...',
              loadMessage = 'Загрузка...',
              alertMessage = 'Необходимо заполнить все поля!',
              successMessage = 'Спасибо! Мы скоро с вами свяжемся!';


        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';

        const postData = (requestBody) => {
            const request = new XMLHttpRequest();
            return new Promise((resolve, reject) => {
                setTimeout(() => {

                    request.addEventListener('readystatechange', () => {
    
                        if(request.readyState !== 4){
                            statusMessage.textContent = loadMessage;
                            return;
                        }
    
                        if(request.status === 200){
                       
                            resolve(statusMessage.textContent = successMessage);
                        }else{
                            reject(statusMessage.textContent = errorMessage);
                        }
                    });

                    request.open('POST', './server.php');
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.send(JSON.stringify(requestBody));
                    
                }, 0);
              
                    
            });  
        };

        // const clearInputs = (inputs) => {
        //     inputs.forEach((input) =>{
        //         input.value = '';
        //     });
        // };

        const formValid = (inputs, body) => {
            let count = 0; 
            inputs.forEach((input) =>{
                if(input.value){
                            count++;
                            console.log('count: ', count);
                }

                if(count === inputs.length){ 
                   postData(body)
                   .then(inputs.forEach((input) =>{
                    input.value = '';
                }))
                   .catch(statusMessage.textContent = errorMessage);
                }else{
                   statusMessage.textContent = alertMessage;

               }
            });
        };

        
        forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let target = event.target;
            
            target.appendChild(statusMessage);
            const formData = new FormData(target);
            let body = {};
            
            formData.forEach((val, key) => {
                body[key] = val;
            });
            
            formValid(target.querySelectorAll('input'), body);
           
        });
    });
    

    };
    sendForm();
});
