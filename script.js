'use strict';

let elemClass = prompt('Enter the element');

function DomElement(selector, height, width, bg, fontSize){
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}
    DomElement.prototype.elementCreate = function(){
        this.selector.split('');
       let elem;
        if(this.selector[0] === '.'){

        elem = document.createElement('div');
        elem.classList.add(this.selector);

        }else if(this.selector[0] === '#'){

        elem = document.createElement('p');
        elem.classList.add(this.selector);
        
        }

        document.body.append(elem);

        elem.style.cssText="height:" + this.height + "px; width:" + this.width + "px; background-color:" + this.bg + ";" + "font-size:" + this.fontSize + "px;"; 

        elem.innerText = prompt('Enter some text');
    };

    let newElement = new DomElement(elemClass, '300', '600', 'green', '40' );
    newElement.elementCreate();
