import MovingObject from "./moving_object.js";

const CONSTANTS = {
    GRAVITY: 0.02,
    FARBOUNCE: 4/3,
    NEARBOUNCE: 3/4
}

export default class Ball extends MovingObject {
    constructor(pos, vel, radius, player) {
        super(pos, vel);
        this.radius = radius;
        this.player = player; // only starts at undefined but does not stay this way
        this.bounceCount = 0;
    }


    draw(ctx) {
        // the shadow
        ctx.fillStyle = "#444444";
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
        ctx.fill();
        // the ball
        ctx.fillStyle = "#ccff00";
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[2], this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    collisionDetector(otherObject) {
        const collisionDist = this.radius + 20;
        const ballPos = this.pos;
        const otherPos = otherObject.pos;
        const currentDist = Math.hypot(ballPos[0] - otherPos[0], ballPos[2] - otherPos[1]);
        if (currentDist < collisionDist) {
            return otherObject;
        } else {
            return '';
        }
    }

    bounce() {
        if (this.bounceCount < 1) {
            // if this is the first bounce ,we are concerned with where in the court the ball bounced
            // if in bounds, we will increment bounce count and keep progressing
            // if out of bounds, we will end the point there, disabling further swings, and let the ball keep bouncing
        } else {
            // if this is the 2nd bounce, that means ball.player hit a winner 
        }
        // we will always allow ball to bounce, returning with 50% height to bounce, until it reaches out of the canvas
    }

    move() {
        // debugger
        if (this.pos[1] - this.pos[2] < 1.0 ) {
            // this.bounce()
            console.log('ground!');
            // debugger
            if (this.vel[2] > 0) {
                this.vel[2] = this.vel[1] * CONSTANTS.NEARBOUNCE;
            } else {
                this.vel[2] = this.vel[1] * CONSTANTS.FARBOUNCE;
            }
        } else {
            this.vel[2] += CONSTANTS.GRAVITY;
        }
        // debugger
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        this.pos[2] += this.vel[2];
    }
}