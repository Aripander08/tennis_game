const MovingObject = require("./moving_object.js");

class Ball extends MovingObject {
    constructor(pos, vel, radius) {
        super(pos, vel);
        this.radius = radius;
        this.player = undefined; // only starts at undefined but does not stay this way
        this.bounceCount = 0;
        // debugger
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
        const collisionDist = this.radius + 20;
        const ballPos = this.pos;
        const otherPos = otherObject.pos;
        const currentDist = Math.hypot(ballPos[0] - otherPos[0], ballPos[2] - otherPos[1]);
        // debugger
        if (currentDist < collisionDist) {
            if (otherObject instanceof MovingObject) { // if other object is a Human or Computer Player
                if (this.player !== otherObject) {
                // in current version, collission simply redirects the ball back where it came
                // later down in dev, we must set simple collision to cause ball to "die"
                // there will be an additional conditional for if player is swinging during collision
                // and if they are, the ball will redirect with forces from player's swing
                    this.player = otherObject;
                    this.vel[0] *= -1;
                    this.vel[1] *= -1; 
                    this.vel[2] *= -1;
                }
                // debugger 
            } else {} //this is for if the otherObj is the net
        }
    }

    bounceDetection() {
        if (this.pos[1] === this.pos[2]) {
            if (this.bounceCount < 1) {
                // if this is the first bounce ,we are concerned with where in the court the ball bounced
                // if in bounds, we will increment bounce count and keep progressing
                // if out of bounds, we will end the point there, disabling further swings, and let the ball keep bouncing
            } else {
                // if this is the 2nd bounce, that means ball.player hit a winner 
            }
            // we will always allow ball to bounce, returning with 50% height to bounce, until it reaches out of the canvas
        }
    }
}

module.exports = Ball;