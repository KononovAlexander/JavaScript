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
export default countTimer;