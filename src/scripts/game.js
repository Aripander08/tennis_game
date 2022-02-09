import Court from "./court.js";
import Ball from "./ball.js";
import HumanPlayer from "./human_player.js";
import ComputerPlayer from "./computer_player.js";
import Net from "./net.js";
import GameView from "./game_view.js";
import Scorekeeper from "./scorekeeper.js";
import Racket from "./racket.js";

const CONSTANTS = {
    P1ADSTART: [392, 500],
    P1COLOR: "#9fded5",
    P2ADSTART: [392, 40],
    P2COLOR: "#f7f07b",
    PLAYERHT: 0.06,
    BALLSTART: [400, 520],
    BALLTOSSHT: 0.0125,
    BALLTOSSVEL: [0, 0, 0],
    RACKET1COL: "#454545",
    RACKET2COL: "#454545"
}

export default class Game {

    constructor(ctx) {
        // debugger
        this.sounds = [];
        const hitAudio = new Audio('./src/assets/beep.ogg');
        const bounceAudio = new Audio('./src/assets/plop.ogg');
        this.sounds.push(hitAudio);
        this.sounds.push(bounceAudio);

        this.ctx = ctx;
        this.objects = [];
        this.scorekeeper = new Scorekeeper(this);
        
        this.keydownHandler = this.keydownHandler.bind(this);
        this.keyupHandler = this.keyupHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.bindControls();
        this.gameView = new GameView(this);
        // debugger
        this.gameOver = false;
        this.winner = null;

        this.resetPoint();

    };

    startPoint() {
        // debugger
        if (!this.gameOver) {
            this.rallyStarted = true;
            this.gameView.animate(this);
        };
    }

    resetPoint() {

        this.rallyStarted = false;
        this.court = new Court(this.ctx);
        this.net = new Net(this.ctx);
        this.p1racket = new Racket(
            [392 + 16 * (4/5),
            500 + 48 * (2/5)],
            10, CONSTANTS.P1COLOR,
            CONSTANTS.RACKET1COL
        );
        this.p2racket = new Racket(
            [392 + 16 * (4/5),
            40 + 48 * (2/5)],
            10, CONSTANTS.P2COLOR,
            CONSTANTS.RACKET2COL
        );
        this.player1 = new HumanPlayer(
            [392, 500], 
            [0,0], 
            CONSTANTS.P1COLOR, 
            this.ctx.canvas.width * CONSTANTS.PLAYERHT,
            // this.ctx.canvas.width * CONSTANTS.PLAYERHT,
            this.net,
            this.sounds[0],
            "P1",
            this.p1racket
        );
        this.player2 = new ComputerPlayer(
            [392, 40], 
            [0, 0], 
            CONSTANTS.P2COLOR, 
            this.ctx.canvas.width * CONSTANTS.PLAYERHT,
            this.net,
            this.sounds[0],
            "P2",
            this.p2racket
        );
        // debugger
        this.ball = new Ball(
            // CONSTANTS.BALLSTART,
            this.scorekeeper.serveArr[0] === 1 ? [400, 520] : [400, 98],
            [0, 0, 0], 
            this.ctx.canvas.width * 0.00625,
            // this.scorekeeper.serveArr[0] === 1 ? 10 : 50,
            10,
            this.scorekeeper.serveArr[0] === 1 ? this.player1 : this.player2, 
            this.ctx.canvas
        );
            // debugger
        this.objects.push(this.court);
        this.objects.push(this.net);
        this.objects.push(this.player2);
        this.objects.push(this.p2racket);
        this.objects.push(this.ball);
        this.objects.push(this.p1racket);
        this.objects.push(this.player1);
        this.objects.push(this.scorekeeper);
        this.gameView.draw(this, this.ctx);

        if (!this.scorekeeper.tb) this.scorekeeper.isBreakPoint();
        this.win();

        // debugger
        if (this.scorekeeper.serveArr[0] === 2 && !this.gameOver) {
            // debugger
            this.rallyStarted = true;
            // debugger
            this.player2.toss(this.ball);
            // debugger
        }
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
        // debugger
        this.keys[e.key] = true;
    }
    keyupHandler(e) {
        this.keys[e.key] = false;
    }

    clickHandler(e) {
        // debugger
        const canvas = this.ctx.canvas.getBoundingClientRect();
        const mouseX = e.clientX - canvas.x;
        const mouseY = e.clientY - canvas.y;
        if (mouseX >= 0 && mouseX <= 800 && mouseY >= 0 && mouseY <= 600) {
            // debugger
            if (this.gameOver) { 
                history.go(0);
            } else {
                if (!this.rallyStarted) {
                    this.startPoint();
                    this.player1.toss(this.ball);
                } else if (this.ball.roundCollisionDetector(this.player1) === this.player1) {
                // } else if (this.ball.roundCollisionDetector(this.p1racket) === this.p1racket) {
                    // debugger
                    this.player1.swing(e, this.ctx.canvas.getBoundingClientRect(), this.ball);
                    this.p1racket.swing();
                // } else {
                //     this.p1racket.swing();
                };
            };
        };
    };

    pointOver() {
        if (this.ball.status.point || this.ball.status.out || this.ball.status.fault) {
        // if (this.ball.status === "point" || this.ball.status === "out" || this.ball.status === "fault") {
            // console.log(this.scorekeeper.serve)
            if (this.scorekeeper.serve.second && this.ball.status.fault) {
            // if (this.scorekeeper.serve === "second" && this.ball.status === "fault") {
                this.scorekeeper.serve.second = false;
                this.scorekeeper.serve.double = true;
                // this.ball.status = "dF";
                // console.log(this.scorekeeper.serve);
            } else if (this.scorekeeper.serve.first && this.ball.status.fault) {
            // } else if (this.scorekeeper.serve === "first" && this.ball.status === "fault") {
                this.scorekeeper.serve.first = false;
                this.scorekeeper.serve.second = true;
                // this.scorekeeper.serve = "second";
                // console.log(this.scorekeeper.serve);
            };

            this.scorekeeper.updatePointScore(this.ball);
            this.scorekeeper.updateGameScore();
            // this.ball.status = "resetting";
            this.ball.status.point = false;
            this.ball.status.out = false;
            this.ball.status.fault = false;
            this.ball.status.resetting = true;
            // this.ball.status = "resetting";
            setTimeout(this.resetPoint.bind(this), 2000);
        };
    };

    win() {
        if (this.scorekeeper.gameScore.p1 === 6 &&
            this.scorekeeper.gameScore.p1 - this.scorekeeper.gameScore.p2 >= 2 ) {
                // debugger
                this.gameOver = true;
                this.winner = this.player1;
        } else if (this.scorekeeper.gameScore.p2 === 6 &&
            this.scorekeeper.gameScore.p2 - this.scorekeeper.gameScore.p1 >= 2) {
                this.gameOver = true;
                this.winner = this.player2;
        } else if (this.scorekeeper.gameScore.p1 === 7) {
            this.gameOver = true;
            this.winner = this.player1;
        } else if (this.scorekeeper.gameScore.p2 === 7) {
            // debugger
            this.gameOver = true;
            this.winner = this.player2;
            // debugger
        };
    };
};