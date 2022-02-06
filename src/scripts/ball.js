
import MovingObject from "./moving_object.js";

const CONSTANTS = {
    GRAVITY: 0.04,
    FARBOUNCE: 1.5,
    NEARBOUNCE: 0.4,
    BALLCOLOR: "#ccff00",
    SHADEDBALLCOLOR: "#83a300",
    SHADOWCOLOR: "rgba(23, 23, 23, 0.75)",
    NETCOLOR: "rgba(133, 133, 133, 0.73)"
}

export default class Ball extends MovingObject {
    constructor(pos, vel, radius, player, canvas, inPlay = true) {
        super(pos, vel);
        this.radius = radius;
        this.player = player; // only starts at '' but does not stay this way
        this.canvas = canvas;
        this.inPlay = inPlay;
        this.bounceCount = 0;
    };

    drawCircle(ctx, color, circle) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(circle.pos[0], circle.pos[2], this.radius, 0, 2 * Math.PI);
        ctx.fill();
    };

    draw(ctx) {
        // the shadow
        ctx.fillStyle = CONSTANTS.SHADOWCOLOR;
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
        ctx.fill();
        // the ball
        if ((this.pos[1] < ctx.canvas.height / 20 && this.pos[2] < ctx.canvas.height / 20) || 
            (this.pos[1] > 290 && this.pos[1] < 310 && this.pos[1] - this.pos[2] < 20)) {
            // the ball with shadow over it 
            this.drawCircle(ctx, CONSTANTS.SHADEDBALLCOLOR, this);
        } else if (this.pos[1] < 290 && this.pos[1] > 270 && this.pos[1] - this.pos[2] < 20) {
            // the ball with net in front of it
            this.drawCircle(ctx, CONSTANTS.BALLCOLOR, this);
            this.drawCircle(ctx, CONSTANTS.NETCOLOR, this);            
        } else {
            // regular ball
            this.drawCircle(ctx, CONSTANTS.BALLCOLOR, this);

        }
    };

    roundCollisionDetector(otherObject) {
        const collisionDistY = this.radius + otherObject.height * (0.5);
        const currentDist = Math.hypot(
            this.pos[0] - (otherObject.pos[0] + otherObject.width / 2), 
            this.pos[1] - (otherObject.pos[1] + otherObject.height / 2)
        );
        if (currentDist < collisionDistY) {
            return otherObject;
        } else {
            return '';
        }
    };

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
    };

    bounce() {
        // console.log('bounce')
        // if (this.bounceCount < 1) {
        if (this.bounceCount < 2) {
            // debugger
            this.bounceCount += 1;
            if (this.pos[0] >= 200 && this.pos[0] <= 600 && this.pos[1] >= 100 && this.pos[1] <= 500) {
                // console.log('in!');
            } else {
                // console.log('out!');
                this.inPlay = false;
            }
        } else {
            debugger
            console.log('2nd bounce!')
            this.inPlay = false;
            // if this is the 2nd bounce, that means ball.player hit a winner 
        }

        if (this.vel[1] > 0) {
            this.vel[2] = this.vel[1] * CONSTANTS.NEARBOUNCE;
        } else if (this.vel[1] < 0) {
            this.vel[2] = this.vel[1] * CONSTANTS.FARBOUNCE;
        } else {
            this.vel[2] *= -(0.5);
        }
    };

    move() {
        if ((this.vel[2] < 0 && this.pos[1] - this.pos[2] < 1) ||
            (this.vel[2] > 0 && this.pos[1] - this.pos[2] < 1)) {
            this.bounce()
        } else {
            this.vel[2] += CONSTANTS.GRAVITY;
        }

        // bounce of canvas edges
        if (
            (this.pos[0] + this.radius) >= this.canvas.width ||
            (this.pos[0] - this.radius <= 0)) {
                this.vel[0] *= -(0.5);
                this.vel[1] *= (0.5);
        } else if (
            (this.pos[1] + this.radius) >= this.canvas.height ||
            (this.pos[1] - this.radius <= 0)) {
                this.vel[0] *= (0.5);
                this.vel[1] *= -(0.5);
        }

        // apply new vel to ball pos
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        if (this.pos[2] + this.vel[2] > this.pos[1]) {
            this.pos[2] = this.pos[1]; 
        } else {
            this.pos[2] += this.vel[2];
        };
    };
}