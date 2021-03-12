const sendForm = () => {
    const forms = document.querySelectorAll('form');
    const errorMessage = 'Что то пошло не так...',
          loadMessage = 'Загрузка...',
          alertMessage = 'Необходимо заполнить все поля!',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    const postData = (requestBody) => {

        return fetch('./server.php', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(requestBody),
            credentials: 'include'
            
        });

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
            postData(body)
                .then(statusMessage.textContent = loadMessage)
                .then((response) => {
                    console.log('response.type: ', response.type);
                    
                    if(response.status !== 200){
                        throw new Error('network status is not 200');
                    }
                        statusMessage.textContent = successMessage;
                })
                .then(inputs.forEach((input) =>{
                    input.value = '';
                }))
                .catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.log(error);
                });
        }else{
            statusMessage.textContent = alertMessage;
        }
        
    });
});

};

export default sendForm;