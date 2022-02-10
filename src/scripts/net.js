import Ball from "./ball";

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
        this.drawNet(
            ctx, CONSTANTS.NET, 
            ctx.canvas.width * CONSTANTS.LEFTX,
            ctx.canvas.width * CONSTANTS.CORDY,
            this.width, this.height
        );

        // net cord
        this.drawNet(
            ctx, CONSTANTS.CORD, 
            ctx.canvas.width * CONSTANTS.LEFTX,
            ctx.canvas.width * CONSTANTS.CORDY,
            this.width, ctx.canvas.width * CONSTANTS.CORDWIDTH
        );

        // net posts
        const lineWidth = ctx.canvas.width * CONSTANTS.POLEWIDTH;
        // left post
        this.drawPost(
            ctx, lineWidth, CONSTANTS.POST, 
            [ctx.canvas.width * 
                (CONSTANTS.LEFTX + CONSTANTS.CORDWIDTH), 
                this.pos[1]],
            [ctx.canvas.width * 
                (CONSTANTS.LEFTX + CONSTANTS.CORDWIDTH), 
                ctx.canvas.width * CONSTANTS.CORDY]
        );
        // right post
        this.drawPost(
            ctx, lineWidth, CONSTANTS.POST, 
            [ctx.canvas.width * 
                (CONSTANTS.RIGHTX - CONSTANTS.CORDWIDTH), 
                this.pos[1]],
            [ctx.canvas.width * 
                (CONSTANTS.RIGHTX - CONSTANTS.CORDWIDTH), 
                ctx.canvas.width * CONSTANTS.CORDY]
        );
        // net shadow
        this.drawShadow(
            ctx, CONSTANTS.SHADOW, 
            [ctx.canvas.width * CONSTANTS.LEFTX, 
            ctx.canvas.width * CONSTANTS.BASEY],
            [ctx.canvas.width * CONSTANTS.RIGHTX, 
            ctx.canvas.width * CONSTANTS.BASEY],
            [ctx.canvas.width * (CONSTANTS.RIGHTX + CONSTANTS.CORDWIDTH / 2), 
            ctx.canvas.width * CONSTANTS.BASEY + this.height * CONSTANTS.RIGHTX],
            [ctx.canvas.width * (CONSTANTS.LEFTX - CONSTANTS.CORDWIDTH / 2), 
            ctx.canvas.width * CONSTANTS.BASEY + this.height * CONSTANTS.RIGHTX]
        );
    };

    drawNet(ctx, color, x, y, w, h) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    };
    drawPost(ctx, width, color, startPos, endPos) {
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startPos[0], startPos[1]);
        ctx.lineTo(endPos[0], endPos[1]);
        ctx.stroke();
    };
    drawShadow(ctx, color, topLeft, topRight, botRight, botLeft) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(topLeft[0], topLeft[1]);
        ctx.lineTo(topRight[0], topRight[1]);
        ctx.lineTo(botRight[0], botRight[1]);
        ctx.lineTo(botLeft[0], botLeft[1]);
        ctx.fill();
    };

    stopBall(ball) {
        if (ball.netCollisionDetector(this) === this) {
            ball.status.net = true;
            ball.vel[0] = 0;
            ball.vel[1] = 0;
            ball.vel[2] *= (0.5);
        };
    };
};