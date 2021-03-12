const toggleMenu = () => {
    const  header = document.querySelector('header'),
           menu = document.querySelector('menu');
      
    header.addEventListener('click', (event) => {
        let target = event.target;
        
        if(target.closest('.close-btn') || target.closest('.menu')){
            
            menu.classList.toggle('active-menu');
        }

    });
    
};

export default toggleMenu;