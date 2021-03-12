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
export default togglePopUp;