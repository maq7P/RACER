export default class Click{
    constructor(element, style){
        this.elements = document.querySelectorAll(element);
        this.style = style;
    }

    addEffects(){
        this.elements.forEach(elem => {
            elem.addEventListener('click', () => {
                elem.style = this.style;
                setTimeout(() => {
                    elem.style = '';
                }, 500);
            });
        });
    }
    init(){
        this.addEffects();
    }
}