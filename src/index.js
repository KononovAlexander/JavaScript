'use strict';
import countTimer from './modules/countTimer'; 
import pageScroll from './modules/pageScroll'; 
import toggleMenu from './modules/toggleMenu'; 
import togglePopUp from './modules/togglePopUp'; 
import tabs from './modules/tabs'; 
import slider from './modules/slider'; 
import fotoToggler from './modules/fotoToggler'; 
import calc from './modules/calc'; 
import formControl from './modules/formControl'; 
import sendForm from './modules/sendForm'; 

//===================timer=========================
countTimer('16 march 2021');

//=====================scroll======================
pageScroll();

//=====================menu========================
toggleMenu();

//=====================popUp=======================
togglePopUp();

//=====================tabs========================
tabs();

//=====================slider======================
slider();

//=====================fotoToggler=================
fotoToggler();

//=====================calculator==================
calc(100);

//=====================formValidation==============
formControl();

//=====================send-ajax-form==============
sendForm();