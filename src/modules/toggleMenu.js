const toggleMenu = () => {
    const  body = document.querySelector('body'),
           menu = document.querySelector('menu');
      
    body.addEventListener('click', (event) => {
        let target = event.target;
        
        if(target.closest('.close-btn') || target.closest('.menu')){
            
            menu.classList.toggle('active-menu');

        }else if( !target.closest('menu')){

            menu.classList.remove('active-menu');
        }

    });
    
};

export default toggleMenu;