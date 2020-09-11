export default class CreatElemOfGame{
    constructor(srcCar) {
        this.srcCar = srcCar;
    }
    
    creatCar() {
        this.car = document.createElement('img');
        this.car.classList.add('game__car');
        this.car.src = this.srcCar;
        this.car.y;
        return this.car
    }
}