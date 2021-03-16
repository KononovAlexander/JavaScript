const sendForm = () => {
    const forms = document.querySelectorAll('form');
    const errorMessage = 'Что то пошло не так...',
          loadMessage = 'Загрузка...',
          alertMessage = 'Необходимо заполнить все поля!',
          strMessage = 'Введите корректные данные!',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';
    statusMessage.style.cssText = 'color: #fff;';

    const postData = (requestBody) => {

        return fetch('./server.php', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(requestBody),
            credentials: 'include'
            
        });

    };

    const showMessage = (message) =>{
        clearTimeout(showMessage);
        statusMessage.textContent = message;
        setTimeout(() => {
            statusMessage.textContent = '';
        }, 3000);
        
    };

    forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let target = event.target;
        const inputs =  target.querySelectorAll('input');
        
        target.appendChild(statusMessage);

      

        const formData = new FormData(target);
        let body = {};
        
        formData.forEach((val, key) => {
            if(val){
                body[key] = val;
            }
    });

        if(Object.keys(body).length === inputs.length){

            if(inputs[0].value.length > 2 && inputs[2].value.replace(/ /g, '').length < 12 && inputs[2].value.replace(/ /g, '').length > 7) {
                
                showMessage(loadMessage);
                postData(body)
                .then((response) => {
 
                    if(response.status !== 200){
                        throw new Error('network status is not 200');
                    }
                    showMessage(successMessage);
                    
                })
                .then(inputs.forEach((input) =>{
                    setTimeout(() =>{
                        input.value = '';
                        
                    }, 2000);
                }))
                .then(setTimeout(() => {
                    document.querySelector('.popup').style.display = 'none';
                }, 5000))
                .catch((error) => {
                    showMessage(errorMessage);
                    console.log(error);
                });
            }else{

                showMessage(strMessage);
            }

        }else{
           showMessage(alertMessage);
        }
        
    });
});

};

export default sendForm;