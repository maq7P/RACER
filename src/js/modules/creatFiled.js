import CreatElemOfGame from './creatElemOfGame';
import GameEngine from './gameEngine';

export default class CreatFiled{
    constructor({
        btnStart, 
        filed,
    }){
        this.start = document.querySelector(btnStart);
        this.filed = document.querySelector(filed);

    }

    animation(){

        this.start.addEventListener('click', () => {
            let diagonal = 0;
            while (diagonal != 100) {
                diagonal++;
                this.filed.style.height = diagonal + 'vh';
            }
            diagonal = 0;
            while (diagonal != 100) {
                diagonal++;
                this.filed.children[0].style.height = diagonal + 'vh';
            }
            setTimeout(() => {
                this.mainCar = new CreatElemOfGame('./assets/images/player.png').creatCar();
                this.mainCar.classList.add('main__car')
                this.filed.children[0].append(this.mainCar);

                new GameEngine(this.mainCar, this.filed.children[0]).init();
            }, 2000);
             
        });
    }
    
    // eventListener(){
    //     new GameEngine(this.mainCar).startGame();
    // }
}