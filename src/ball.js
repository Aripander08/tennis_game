const MovingObject = require("./moving_object.js");

class Ball extends MovingObject {
    constructor(pos, vel, radius) {
        super(pos, vel);
        this.radius = radius;
        this.player = null;
        this.bounceCount = 0;
    }


    draw(ctx) {
        // the shadow
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
        ctx.fill();

        // the ball
        ctx.fillStyle = "#ccff00";
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[2], this.radius, 0, 2 * Math.PI);
        ctx.fill();

    }


    collisionDetection(otherObject) {
        const collisionDist = this.radius + 10;
        const ballPos = this.pos;
        const otherPos = otherObject.pos;
        const currentDist = Math.hypot(ballPos[0] - otherPos[0], ballPos[2] - otherPos[1]);
        // debugger
        if (currentDist < collisionDist) {
            if (otherObject instanceof MovingObject) { // if other object is a Human or Computer Player
                this.player = otherObject;
                this.vel[0] *= -1; 
                this.vel[1] *= -1; 
                this.vel[2] *= -1; 
            } else {} //this is for if the otherObj is the net or court
        }
    }
}

module.exports = Ball;