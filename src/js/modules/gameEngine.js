import CreatElemOfGame from './creatElemOfGame';
export default class GameEngine{
    constructor(car, road){
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowRight: false,
            ArrowLeft: false,
        }

        this.settings = {
            start: false,
            score: 0,
            speed: 6,
            traffic: 1,
        }

        this.car = car;
        this.road = road;
    }

    startGame(){
        this.settings.start = true;
        this.settings.x = this.car.offsetLeft;
        this.settings.y = this.car.offsetTop;
        requestAnimationFrame(this.playGame.bind(this))
    }

    playGame(){
        if (this.settings.start) {
            this.moveRoad();
            this.moveEnemy();
            if (this.keys.ArrowLeft && this.settings.x > 0) {
                this.settings.x -= this.settings.speed;
            }
            if (this.keys.ArrowRight && this.settings.x < this.road.offsetWidth - this.car.offsetWidth) {
                this.settings.x += this.settings.speed;
            }
            if (this.keys.ArrowDown && this.settings.y < this.road.offsetHeight - this.car.offsetHeight) {
                this.settings.y += this.settings.speed;
            }
            if (this.keys.ArrowUp && this.settings.y > 0) {
                this.settings.y -= this.settings.speed;
            }

            this.car.style.left = this.settings.x + 'px';
            this.car.style.top = this.settings.y + 'px';
        }
        requestAnimationFrame(this.playGame.bind(this))
    }
    countTrafficElements(heightElement){
        return ((document.documentElement.clientHeight / heightElement + 1))
    }

    creatEnemyCar(){
        for (let i = 0; i < this.countTrafficElements(100 * this.settings.traffic); i++) {
            const enemy = document.createElement('div');
            enemy.classList.add('enemy');
            enemy.appendChild(new CreatElemOfGame('./assets/images/enemy2.png').creatCar());
            enemy.y = -100 * this.settings.traffic * (i+1);
            enemy.style.top = enemy.y + 'px';
            enemy.style.left = Math.floor((Math.random() * (this.road.offsetWidth - 50))) + 'px';
            this.road.appendChild(enemy);
        }
    }

    creatRoad(){
        for (let i = 0; i < this.countTrafficElements(100); i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            line.style.top = (i * 100) + 'px';
            line.y = i * 100;
            this.road.appendChild(line);
        }
    }
    moveRoad(){
        let lines = document.querySelectorAll('.line');
        lines.forEach(line => {
            line.y += this.settings.speed;
            line.style.top = line.y + 'px';
            if (line.y >= document.documentElement.clientHeight){
                line.y = -100;
            }
        });
    }

    moveEnemy(){
        let enemies = document.querySelectorAll('.enemy');
        enemies.forEach(enemy => {
            enemy.y += this.settings.speed / 2;
            enemy.style.top = enemy.y + 'px';
            if (enemy.y >= document.documentElement.clientHeight){
                enemy.y = -100*this.settings.traffic
                enemy.style.left = Math.floor((Math.random() * (this.road.offsetWidth - 50))) + 'px'
            }
        });
    }

    startRun(e){
        e.preventDefault();
        this.keys[e.key] = true;
    } 
    stopRun(e){
        e.preventDefault();
        this.keys[e.key] = false;
    } 
    
    init(){
        this.creatRoad();
        this.creatEnemyCar();
        this.startGame();
        document.addEventListener('keydown', this.startRun.bind(this))
        document.addEventListener('keyup', this.stopRun.bind(this))
    }
}