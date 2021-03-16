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

    const showMessage = (block, message, time) =>{
        clearTimeout(showMessage);

        block.appendChild(statusMessage);
        statusMessage.textContent = message;

        setTimeout(() => {
            statusMessage.textContent = '';
        }, time);
        
    };

    forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let target = event.target;
        const inputs = target.querySelectorAll('input'),
              inputName =  target.querySelector('input[type="text"]'),
              inputTel =  target.querySelector('input[type="tel"]');

        const formData = new FormData(target);
        let body = {};
        
        formData.forEach((val, key) => {
            if(val){
                body[key] = val;
            }
    });

        if(Object.keys(body).length === inputs.length){

            if(inputName.value.length > 2 && inputTel.value.replace(/ /g, '').length < 12 && inputTel.value.replace(/ /g, '').length > 7) {
                
               showMessage(target, loadMessage, 10000);
                postData(body)
                .then((response) => {
 
                    if(response.status !== 200){
                        throw new Error('network status is not 200');
                    }
                    showMessage(target, successMessage, 3000);
                    
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
                    showMessage(target, errorMessage, 3000);
                    console.log(error);
                });
            }else{

                showMessage(target, strMessage, 3000);
            }

        }else{
           showMessage(target, alertMessage, 3000);
        }
        
    });
});

};

export default sendForm;