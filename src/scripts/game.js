import Court from "./court.js";
import Ball from "./ball.js";
import HumanPlayer from "./human_player.js";
import ComputerPlayer from "./computer_player.js";
import Net from "./net.js";
import GameView from "./game_view.js";

const CONSTANTS = {
    P1ADSTART: [392, 500],
    P1COLOR: "pink",
    P2ADSTART: [392, 40],
    P2COLOR: "gold",
    PLAYERHT: 0.06,
    BALLSTART: [400, 520],
    BALLTOSSHT: 0.0125,
    BALLTOSSVEL: [0, 0, 0]
}

export default class Game {

    constructor(ctx) {
        // debugger
        this.ctx = ctx;
        this.objects = [];
        this.keydownHandler = this.keydownHandler.bind(this);
        this.keyupHandler = this.keyupHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.bindControls();
        this.resetPoint();
        this.gameView = new GameView(this);
    };
    
    startPoint() {
        // debugger
        this.ball.status = "serving";
        // this.animate();
        this.gameView.animate(this);
    }

    resetPoint() {
        this.court = new Court(this.ctx);
        this.net = new Net(this.ctx);
        this.player1 = new HumanPlayer(
            CONSTANTS.P1ADSTART, 
            [0,0], 
            CONSTANTS.P1COLOR, 
            this.ctx.canvas.width * CONSTANTS.PLAYERHT,
            this.net
        );
        this.player2 = new ComputerPlayer(
            CONSTANTS.P2ADSTART, 
            [0, 0], 
            CONSTANTS.P2COLOR, 
            this.ctx.canvas.width * CONSTANTS.PLAYERHT,
            this.net
        );
        this.ball = new Ball(
            CONSTANTS.BALLSTART,
            CONSTANTS.BALLTOSSVEL, 
            this.ctx.canvas.width * 0.00625,
            this.ctx.canvas.width * CONSTANTS.BALLTOSSHT,
            this.player1, 
            this.ctx.canvas
        );

        this.objects.push(this.court);
        this.objects.push(this.net);
        // if (this.ball.status === "resetting") this.animate();
        this.objects.push(this.player2);
        this.objects.push(this.ball);
        this.objects.push(this.player1);
    } 
    
    bindControls() {
        // debugger
        document.addEventListener("keydown", this.keydownHandler)
        document.addEventListener("keyup", this.keyupHandler)
        document.addEventListener("click", this.clickHandler)
    }

    keys = {
        "w": false,
        "s": false,
        "a": false,
        "d": false,
        "W": false,
        "S": false,
        "A": false,
        "D": false,
    }

    keydownHandler(e) {
        this.keys[e.key] = true;
    }
    keyupHandler(e) {
        this.keys[e.key] = false;
    }

    clickHandler(e) {
        if (this.ball.status === "resetting") {
            this.startPoint();
        } else if (this.ball.status === "serving") {
            // debugger
            this.player1.toss(this.ball);
            // debugger
        } else if (this.ball.roundCollisionDetector(this.player1) === this.player1) {
            this.player1.swing(e, this.ctx.canvas.getBoundingClientRect(), this.ball);
            // debugger
        }
        // debugger
    }

    pointOver() {
        return this.ball.status === "point" || this.ball.status === "out";
    }


    newGame() {
        this.p1score = 0;
        this.p2score = 0;
        console.log(this.p1score);
        console.log(this.p2score);
    }
}