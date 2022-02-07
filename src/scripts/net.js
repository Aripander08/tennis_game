const CONSTANTS = {
    CORD: "#D9D9D9",
    POST: "#262626",
    NET: "rgba(133, 133, 133, 0.73)",
    SHADOW: "rgba(23, 23, 23, 0.75)",
    LEFTX: 0.25,
    RIGHTX: 0.75,
    BASEY: 0.3625,
    CORDY: 0.3375,
    HEIGHT: 0.025,
    WIDTH: 0.5,
    POLEWIDTH: 0.00375,
    CORDWIDTH: 0.0025
}

export default class Net {
    constructor (ctx) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.height = ctx.canvas.width * CONSTANTS.HEIGHT;
        this.width = ctx.canvas.width * CONSTANTS.WIDTH;
        this.pos = [ctx.canvas.width * CONSTANTS.LEFTX, ctx.canvas.width * CONSTANTS.BASEY];
    }

    draw(ctx) {
        // net
        ctx.fillStyle = CONSTANTS.NET;
        ctx.fillRect(
            ctx.canvas.width * CONSTANTS.LEFTX, 
            ctx.canvas.width * CONSTANTS.CORDY, 
            this.width, 
            this.height
        );
        // net cord
        ctx.fillStyle = CONSTANTS.CORD;
        ctx.fillRect(
            ctx.canvas.width * CONSTANTS.LEFTX, 
            ctx.canvas.width * CONSTANTS.CORDY, 
            this.width, 
            ctx.canvas.width * CONSTANTS.CORDWIDTH
        );
        // net posts
        ctx.lineWidth = ctx.canvas.width * CONSTANTS.POLEWIDTH;
        ctx.strokeStyle = CONSTANTS.POST;
        // left post
        ctx.beginPath();
        ctx.moveTo(
            ctx.canvas.width * (CONSTANTS.LEFTX + CONSTANTS.CORDWIDTH), 
            this.pos[1]
        );
        ctx.lineTo(
            ctx.canvas.width * (CONSTANTS.LEFTX + CONSTANTS.CORDWIDTH), 
            ctx.canvas.width * CONSTANTS.CORDY
        );
        ctx.stroke();
        // right post
        ctx.beginPath();
        ctx.moveTo(
            ctx.canvas.width * (CONSTANTS.RIGHTX - CONSTANTS.CORDWIDTH), 
            this.pos[1]
        );
        ctx.lineTo(
            ctx.canvas.width * (CONSTANTS.RIGHTX - CONSTANTS.CORDWIDTH), 
            ctx.canvas.width * CONSTANTS.CORDY
        );
        ctx.stroke();

        // net shadow
        ctx.fillStyle = "rgba(23, 23, 23, 0.75)";
        ctx.beginPath();
        ctx.moveTo(
            ctx.canvas.width * CONSTANTS.LEFTX, 
            ctx.canvas.width * CONSTANTS.BASEY
            
        );
        ctx.lineTo(
            ctx.canvas.width * CONSTANTS.RIGHTX, 
            ctx.canvas.width * CONSTANTS.BASEY
        );
        ctx.lineTo(
            ctx.canvas.width * (CONSTANTS.RIGHTX + CONSTANTS.CORDWIDTH / 2), 
            ctx.canvas.width * CONSTANTS.BASEY + this.height * CONSTANTS.RIGHTX
        );
        ctx.lineTo(
            ctx.canvas.width * (CONSTANTS.LEFTX - CONSTANTS.CORDWIDTH / 2), 
            ctx.canvas.width * CONSTANTS.BASEY + this.height * CONSTANTS.RIGHTX
        );
        ctx.fill();
    }

    stopBall(ball) {
        if (ball.squareCollisionDetector(this) === this) {
        // if (ball.status === "net") {
            // ball.status = "out";
            ball.vel[0] = 0;
            ball.vel[1] *=(0.01);
            ball.vel[2] *= (0.5);
        }
    }
}