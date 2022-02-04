const Ball = require("./ball.js");

class Game {

    constructor(ctx) {
        // debugger
        this.ctx = ctx;
        this.ball = new Ball([500, 500], [-1, -4], 5);
    };

    start() {
        // debugger
        this.animate();
    } 
    
    
    animate() {
        // debugger
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, 800, 600);
        this.draw(this.ctx);
        this.ball.move();
    }

    draw(ctx) {
        // tentative court
        ctx.fillStyle = "green"
        ctx.fillRect(0, 0, 800, 600);
        // debugger
        this.ball.draw(ctx);
    }
}

module.exports = Game;