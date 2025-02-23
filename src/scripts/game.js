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
};

export default class Game {
    constructor(ctx) {
        const hitAudio = new Audio('./src/assets/beep.ogg');
        const bounceAudio = new Audio('./src/assets/plop.ogg');
        const applause = new Audio('./src/assets/applause.wav')
        const smallApplause = new Audio('./src/assets/small_applause.ogg')
        this.sounds = [];
        this.sounds.push(hitAudio);
        this.sounds.push(bounceAudio);
        this.sounds.push(applause);
        this.sounds.push(smallApplause);
        
        this.ctx = ctx;
        this.objects = [];
        this.scorekeeper = new Scorekeeper(this);

        this.keydownHandler = this.keydownHandler.bind(this);
        this.keyupHandler = this.keyupHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.bindControls();
        this.gameView = new GameView(this);
        this.gameOver = false;
        this.winner = null;
        this.deuceSide = true;
        this.paused = false;
        this.resetPoint();
    };

    startPoint() {
        if (!this.gameOver) {
            this.rallyStarted = true;
            this.gameView.animate(this);
        };
    };

    togglePause() {
        // debugger
        if (this.paused) {
            this.paused = false;
            this.gameView.animate(this);
        } else {
            this.paused = true;
        }
    }

    resetPoint() {
        let ballStart = [400, 520];

        if ((this.scorekeeper.pointScore.p1 + 
            this.scorekeeper.pointScore.p2) % 2 === 0) {
                this.deuceSide = true;
        } else {
            this.deuceSide = false;
        };

        this.rallyStarted = false;
        // this.paused = false;
        this.court = new Court(this.ctx);
        this.net = new Net(this.ctx);
        this.p1racket = new Racket(
            [(this.deuceSide ? 492 : 292) + 16 * (4/5),
            500 + 48 * (2/5)],
            10, CONSTANTS.P1COLOR,
            CONSTANTS.RACKET1COL
        );
        this.p2racket = new Racket(
            [(this.deuceSide ? 292 : 492) + 16 * (4/5),
            40 + 48 * (2/5)],
            10, CONSTANTS.P2COLOR,
            CONSTANTS.RACKET2COL
        );
        this.player1 = new HumanPlayer(
            // [392, 500], 
            this.deuceSide ? [492, 500] : [292, 500],
            [0,0], 
            CONSTANTS.P1COLOR, 
            this.ctx.canvas.width * CONSTANTS.PLAYERHT,
            this.net,
            this.sounds[0],
            "P1",
            this.p1racket
        );
        this.player2 = new ComputerPlayer(
            // [392, 40], 
            this.deuceSide ? [292, 40] : [492, 40], 
            [0, 0], 
            CONSTANTS.P2COLOR, 
            this.ctx.canvas.width * CONSTANTS.PLAYERHT,
            this.net,
            this.sounds[0],
            "P2",
            this.p2racket
        );
        this.ball = new Ball(
            this.scorekeeper.serveArr[0] === 1 ? 
                [this.deuceSide ? 500 : 300, 520] : 
                [this.deuceSide ? 300 : 500, 98],
            [0, 0, 0], 
            this.ctx.canvas.width * 0.00625,
            10,
            this.scorekeeper.serveArr[0] === 1 ? this.player1 : this.player2, 
            this.ctx.canvas,
            this
        );

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

        if (this.scorekeeper.serveArr[0] === 2 && !this.gameOver) {
            this.rallyStarted = true;
            this.player2.toss(this.ball);
        };
    };
    
    bindControls() {
        document.addEventListener("keydown", this.keydownHandler)
        document.addEventListener("keyup", this.keyupHandler)
        document.addEventListener("click", this.clickHandler)
    };

    keys = {
        "w": false,
        "s": false,
        "a": false,
        "d": false,
        "W": false,
        "S": false,
        "A": false,
        "D": false,
    };

    keydownHandler(e) {
        this.keys[e.key] = true;
    };
    keyupHandler(e) {
        this.keys[e.key] = false;
    };

    clickHandler(e) {
        const canvas = this.ctx.canvas.getBoundingClientRect();
        const mouseX = e.clientX - canvas.x;
        const mouseY = e.clientY - canvas.y;
        if (document.querySelector(".active")) {
        } else {
            if (mouseX >= 0 && mouseX <= 800 && mouseY >= 0 && mouseY <= 600) {
                if (this.gameOver) { 
                    history.go(0);
                } else {
                    if (!this.rallyStarted) {
                        this.startPoint();
                        this.player1.toss(this.ball);
                    } else if (this.ball.roundCollisionDetector(this.player1) === this.player1) {
                        this.player1.swing(e, this.ctx.canvas.getBoundingClientRect(), this.ball);
                        this.p1racket.swing();
                    };
                };
            };
        };
    };

    pointOver() {
        if (this.ball.status.point || this.ball.status.out || this.ball.status.fault) {
            if (this.scorekeeper.serve.second && this.ball.status.fault) {
                this.scorekeeper.serve.second = false;
                this.scorekeeper.serve.double = true;
            } else if (this.scorekeeper.serve.first && this.ball.status.fault) {
                this.scorekeeper.serve.first = false;
                this.scorekeeper.serve.second = true;
            };
            this.scorekeeper.updatePointScore(this.ball);
            this.scorekeeper.updateGameScore();
            this.ball.status.point = false;
            this.ball.status.out = false;
            this.ball.status.fault = false;
            this.ball.status.resetting = true;
            setTimeout(this.resetPoint.bind(this), 1500);
        };
    };

    win() {
        if (this.scorekeeper.gameScore.p1 === 16 &&
            this.scorekeeper.gameScore.p1 - this.scorekeeper.gameScore.p2 >= 2 ) {
                this.gameOver = true;
                this.winner = this.player1;
        } else if (this.scorekeeper.gameScore.p2 === 16 &&
            this.scorekeeper.gameScore.p2 - this.scorekeeper.gameScore.p1 >= 2) {
                this.gameOver = true;
                this.winner = this.player2;
        } else if (this.scorekeeper.gameScore.p1 === 17) {
            this.gameOver = true;
            this.winner = this.player1;
        } else if (this.scorekeeper.gameScore.p2 === 17) {
            this.gameOver = true;
            this.winner = this.player2;
        };
    };
};
