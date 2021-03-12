const pageScroll = () => {
    const menu = document.querySelector('menu'),
          menuItems = menu.querySelectorAll('ul>li>a'),
          body = document.querySelector('body');
          

          
    body.addEventListener('click', (event) => {
        let target = event.target;

    const scroll = (target) => {
        console.log('target: ', target);

        let link = target.getAttribute('href').substring(1);
        const scrollTo = document.getElementById(link);
        const elemPosition = scrollTo.getBoundingClientRect().top;
        event.preventDefault();

        window.scrollBy({
            top: elemPosition,
            behavior: "smooth"
        });
    };  
       
        
        if(target.closest('img[src="images/scroll.svg"]')){

            scroll(target.parentNode);            

        }

        menuItems.forEach(item => {
        
            if(item === target && scrollTo !== null){

                scroll(target);
                menu.classList.toggle('active-menu');
    
            } else{
                return;
            } 
        });


    });


};
    export default pageScroll;
