const MovingObject = require("./moving_object.js");

class Ball extends MovingObject {
    constructor(pos, vel, radius) {
        super(pos, vel);
        this.radius = radius;
    }


    draw(ctx) {
        // the shadow
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#000";
        ctx.fill();

        // the ball
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#ccff00";
        ctx.fill();

    }
}

module.exports = Ball;