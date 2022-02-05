import Ball from "./ball.js";
import HumanPlayer from "./human_player.js";
import ComputerPlayer from "./computer_player.js";

export default class Game {

    constructor(ctx) {
        // debugger
        this.ctx = ctx;
        this.player1 = new HumanPlayer([470, 500], [0,0], "red", ctx.canvas.width * 0.05);
        // debugger
        this.player2 = new ComputerPlayer([350, 80], [0, 0], "orange", ctx.canvas.width * 0.05);

        this.ball = new Ball(
            [480, 500, 400], 
            [0, 0,-2], 
            ctx.canvas.width * 0.00625, 
            this.player2, 
            ctx.canvas
        ); // NEED A WAY TO LET VEL[2] CHANGE DURING TRAVEL
        
        // debugger
        this.keydownHandler = this.keydownHandler.bind(this);
        this.keyupHandler = this.keyupHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.bindControls();
    };

    start() {
        this.animate();
    } 

    reset() {
        // setTimeout(this.animate.bind(this),2000);
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
        "d": false
    }

    keydownHandler(e) {
        this.keys[e.key] = true;
        // debugger
    }

    keyupHandler(e) {
        // debugger
        this.keys[e.key] = false;
    }

    clickHandler(e) { // need to add a cooldown to this so user can't spam click
        if (this.ball.collisionDetector(this.player1) === this.player1) {
            this.player1.swing(e, this.ctx.canvas.getBoundingClientRect(), this.ball);
        }
    }
    
    animate() {
        // debugger
        requestAnimationFrame(this.animate.bind(this)); // this will let the animation pause when outside of tab
        this.ctx.clearRect(0, 0, 800, 600);
        this.ball.move();
        this.player2.findPath(this.ball);
        this.player2.swing(this.ball);
        this.player1.reposition(this.keys);
        this.draw(this.ctx);
        if (!this.ball.inPlay) {

        }
    }

    draw(ctx) {
        // tentative court - to be refactored to court.js
        ctx.fillStyle = "#6C935C";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "#3C638E";
        // ctx.fillRect(ctx.canvas.width / 4, ctx.canvas.width / 8, ctx.canvas.width / 2, ctx.canvas.width / 2);
        ctx.beginPath();
        ctx.moveTo(ctx.canvas.width / 4 + 10, ctx.canvas.width / 8);
        ctx.lineTo(ctx.canvas.width * (3/4) - 10, ctx.canvas.width / 8);
        ctx.lineTo(ctx.canvas.width * (3/4) + 10, ctx.canvas.width * (5/8));
        ctx.lineTo(ctx.canvas.width / 4 - 10, ctx.canvas.width * (5/8));
        ctx.fill();


        // tentative net
        ctx.fillStyle = "gray";
        ctx.fillRect(200, 260, 400, 30);
        ctx.fillStyle = "#362815"
        // ctx.fillRect(200, 290, 400, 15);
        ctx.beginPath();
        ctx.moveTo(200, 290);
        ctx.lineTo(600, 290);
        ctx.lineTo(601, 305);
        ctx.lineTo(199, 305);
        ctx.fill();

        // debugger
        this.player2.draw(ctx);
        this.ball.draw(ctx);
        this.player1.draw(ctx); // this order is important so that layering between back player, ball, and fore player is maintained
    }
  
}