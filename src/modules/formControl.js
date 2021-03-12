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
export default formControl;