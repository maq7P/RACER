import '../assets/styles/index.css';
import '../assets/scss/index.scss';

import Click from './modules/clickEffects';
import CreatFiled from './modules/creatFiled';

window.addEventListener('DOMContentLoaded', () => {
    new Click('.btn-start', 
    `
    box-shadow:0px 0px 12px 2px rgba(147,190,187,0.57);
    -webkit-box-shadow:0px 0px 12px 2px rgba(147,190,187,0.57);
    -moz-box-shadow:0px 0px 12px 2px rgba(147,190,187,0.57);
    `
    ).init();

    const filed = new CreatFiled({
        btnStart: '.btn-start',
        filed: '.filed',
        car: '.game__car'
    }); 
    filed.animation();
})