import Ball from "./ball.js";
import HumanPlayer from "./human_player.js";
import ComputerPlayer from "./computer_player.js";

export default class Game {

    constructor(ctx) {
        // debugger
        this.ctx = ctx;
        this.ball = new Ball([220, 130, 110], [1, 3, 3], 5); // NEED A WAY TO LET VEL[2] CHANGE DURING TRAVEL
        this.player1 = new HumanPlayer([350, 500], [0,0], "red");
        // debugger
        this.player2 = new ComputerPlayer([500, 80], [0, 0], "orange", this.ball);
        // debugger
        this.keydownHandler = this.keydownHandler.bind(this.player1);
        this.clickHandler = this.clickHandler.bind(this);
        this.bindControls();
    };

    start() {
        this.animate();
    } 
    
    bindControls() {
        // debugger
        document.addEventListener("keydown", this.keydownHandler)
        document.addEventListener("click", this.clickHandler)
    }

    keydownHandler(e) {
        // debugger
        if (e.code === "KeyW") { // up
            this.vel = [0, -8];
            this.move();
            // debugger
        } else if (e.code === "KeyS") { //down
            this.vel = [0, 8];
            this.move();
        } else if (e.code === "KeyA") { // left
            this.vel = [-10, 0];
            this.move();
        } else if (e.code === "KeyD") { // right
            this.vel = [10, 0];
            this.move();
        }
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
        this.draw(this.ctx);
        this.ball.move();
        this.player2.findPath(this.ball);
        this.player2.swing(this.ball);
    }

    draw(ctx) {
        // tentative court - to be refactored to court.js
        ctx.fillStyle = "#6C935C";
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = "#3C638E";
        ctx.fillRect(200, 100, 400, 400);
        
        // tentative net
        ctx.fillStyle = "gray";
        ctx.fillRect(200, 270, 400, 30);
        ctx.fillStyle = "black"
        ctx.fillRect(200, 300, 400, 15);




        // debugger
        this.player2.draw(ctx);
        this.ball.draw(ctx);
        this.player1.draw(ctx); // this order is important so that layering between back player, ball, and fore player is maintained
    }
  
}