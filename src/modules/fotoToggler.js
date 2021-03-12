const fotoToggler = () => {
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
export default fotoToggler;