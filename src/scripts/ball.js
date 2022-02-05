
import MovingObject from "./moving_object.js";

const CONSTANTS = {
    GRAVITY: 0.04,
    FARBOUNCE: 1.5,
    NEARBOUNCE: 0.4
}

export default class Ball extends MovingObject {
    constructor(pos, vel, radius, player, canvas, inPlay = true) {
        super(pos, vel);
        this.radius = radius;
        this.player = player; // only starts at undefined but does not stay this way
        this.canvas = canvas;
        this.inPlay = inPlay;
        this.bounceCount = 0;
    }


    draw(ctx) {
        // the shadow
        ctx.fillStyle = "rgba(23, 23, 23, 0.75)";
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
        ctx.fill();
        // the ball
        if ((this.pos[1] < ctx.canvas.height / 20 && this.pos[2] < ctx.canvas.height / 20) || 
            (this.pos[1] < 290 && this.pos[1] > 270 && this.pos[1] - this.pos[2] < 20)
        ) {
            // the ball with shadow over it 
            ctx.fillStyle = "#83a300";
            ctx.beginPath();
            ctx.arc(this.pos[0], this.pos[2], this.radius, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            ctx.fillStyle = "#ccff00";
            ctx.beginPath();
            ctx.arc(this.pos[0], this.pos[2], this.radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    roundCollisionDetector(otherObject) {
        const collisionDistY = this.radius + otherObject.height * (0.5);
        // const collisionDistX = this.radius + otherObject.width;
        const currentDist = Math.hypot(
            this.pos[0] - otherObject.pos[0], 
            this.pos[1] - otherObject.pos[1]
        );
        // debugger
        if (currentDist < collisionDistY) {
            return otherObject;
        } else {
            return '';
        }
    }

    squareCollisionDetector(otherObject) {
        // if ball is on near half
        if (this.pos[1] >= otherObject.pos[1]) {
            // debugger
            if (
                otherObject.pos[0] <= this.pos[0] &&
                otherObject.pos[0] + otherObject.width >= this.pos[0] &&
                otherObject.pos[1] >= this.pos[1] - this.radius &&
                this.pos[1] - this.pos[2] < otherObject.height) {
                return otherObject;
            }
        } else {
            if (
                otherObject.pos[0] <= this.pos[0] &&
                otherObject.pos[0] + otherObject.width >= this.pos[0] &&
                otherObject.pos[1] <= this.pos[1] + this.radius &&
                this.pos[1] - this.pos[2] < otherObject.height) {
                return otherObject;
            }
        }
    }

    bounce() {
        console.log('bounce')
        if (this.bounceCount < 1) {
            this.bounceCount += 1;
            if (this.pos[0] >= 200 && this.pos[0] <= 600 && this.pos[1] >= 100 && this.pos[1] <= 500) {
                console.log('in!');
            } else {
                console.log('out!');
                // this.inPlay = false;
            }
        } else {
                // this.inPlay = false;
            // if this is the 2nd bounce, that means ball.player hit a winner 
        }
        // we will always allow ball to bounce, returning with 50% height to bounce, until it reaches out of the canvas
        if (this.vel[2] > 0) {
            this.vel[2] = this.vel[1] * CONSTANTS.NEARBOUNCE;
        } else {
            this.vel[2] = this.vel[1] * CONSTANTS.FARBOUNCE;
        }
    }

    move() {
        if (this.pos[1] - this.pos[2] < 1.0 ) {
            this.bounce()
        } else {
            this.vel[2] += CONSTANTS.GRAVITY;
        }

        if (
            (this.pos[0] + this.radius) >= this.canvas.width ||
            (this.pos[0] - this.radius <= 0) ||
            (this.pos[1] + this.radius) >= this.canvas.height ||
            (this.pos[1] - this.radius <= 0) 
            // (this.pos[1] + this.radius) >= 290 
        ) {
            this.vel[0] *= -(0.5);
            this.vel[1] *= -(0.5);
        }


        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        this.pos[2] += this.vel[2];
    }
}