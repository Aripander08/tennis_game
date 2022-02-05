import Ball from "./ball";

const CONSTANTS = {
    CORD: "#D9D9D9",
    POST: "#262626",
    NET: "rgba(133, 133, 133, 0.73)",
    SHADOW: "rgba(23, 23, 23, 0.75)",
    HEIGHT: 20,
    WIDTH: 400


}


export default class Net {
    constructor (ctx) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.height = CONSTANTS.HEIGHT;
        this.width = CONSTANTS.WIDTH;
        this.pos = [200, 290];
    }

    draw(ctx) {
        ctx.fillStyle = CONSTANTS.NET;
        ctx.fillRect(200, 270, 400, 20);
        ctx.fillStyle = CONSTANTS.CORD;
        ctx.fillRect(200, 270, 400, 2);
        ctx.lineWidth = 3;
        ctx.strokeStyle = CONSTANTS.POST;
        ctx.beginPath();
        ctx.moveTo(202, 270);
        ctx.lineTo(202,290);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(598, 270);
        ctx.lineTo(598,290);
        ctx.stroke();
    }

    stopBall(ball) {
        // debugger
        if (ball.squareCollisionDetector(this) === this) {
            ball.inPlay = false;
            ball.vel[0] *= (0.01);
            // if (ball.pos[0] < )
            ball.vel[1] *= -(0.01);
            ball.vel[2] *= (0.5);

        }
    }
}