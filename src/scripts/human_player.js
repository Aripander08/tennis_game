import MovingObject from "./moving_object.js";

const CONSTANTS = {
    SKIN: "#D2B48C",
    HAIR: "#574022",
    SHOES: "#D3D3D3",
    SHADOW: "rgba(23, 23, 23, 0.75)",
    MOVESPEED: 1.75,
    RACKET: "red",
    // RACKETSTRINGS: "rgba(56, 255, 20, 0.45)"
};

export default class HumanPlayer extends MovingObject {
    constructor(pos, vel, color, height, net, sfx, name) {
        super(pos, vel);
        this.color = color;
        this.height = height;
        this.width = height / 3;
        this.net = net;
        this.sfx = sfx;
        this.name = name;
    };

    toss(ball) {
        ball.status = "tossing";
        console.log("tossing");
        ball.vel = [0, 0, 4];
        // debugger
    }

    swing(e, canvas, ball) {
        const mouseX = e.clientX - canvas.x;
        const mouseY = e.clientY - canvas.y;
        const angle = Math.atan2(mouseY - ball.pos[1], mouseX - ball.pos[0])
        const newVel = [Math.cos(angle) * 3, Math.sin(angle) * 3, 2.4];
        // const newVel = [0, -3, 1.5];
        const ballHeight = ball.height;
        if ((ball.status === "tossing" || ball.status === "live") && ballHeight <= this.height) {
            // debugger
            this.sfx.play();
            ball.status = "live"
            ball.vel = newVel;
            ball.player = this;
            ball.bounceCount = 0;
        };
    };

    draw(ctx) {
        this.drawRacket(ctx, CONSTANTS.RACKET);
        this.drawBody(ctx);
        this.drawHead(ctx);
        this.drawHair(ctx);
        this.drawShadow(ctx);
    };

    drawRacket(ctx, racket) {
        // ctx.fillStyle = CONSTANTS.RACKETSTRINGS;
        ctx.arc(this.pos[0], this.pos[1] + 20, 8, 0, 2 * Math.PI)
        ctx.fill();
        ctx.strokeStyle = racket;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1] + 20, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.pos[0] + Math.sqrt(50), this.pos[1] + 20 + Math.sqrt(50));
        ctx.lineTo(this.pos[0] + 20, this.pos[1] + 40); // this will be pivot point
        ctx.stroke();
    };

    drawBody(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
    };
    
    drawHead(ctx) {
        ctx.fillStyle = CONSTANTS.SKIN;
        ctx.beginPath()
        ctx.fillRect(this.pos[0], this.pos[1] + 5, this.width, this.height * (0.2));

    };

    drawHair(ctx) {
        ctx.fillStyle = CONSTANTS.HAIR;
        ctx.beginPath()
        ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height * (0.2));
    }

    drawShadow(ctx) {
        ctx.fillStyle = CONSTANTS.SHADOW;
        ctx.beginPath();
        ctx.fillRect(this.pos[0], this.pos[1] + (this.height), this.width, 20);
    };

    reposition(keys) {
        if ((keys.w || keys.W) && 
            (this.pos[1] + this.height > this.net.pos[1])) {
            this.pos[1] -= CONSTANTS.MOVESPEED; 
        }  
        if (keys.a || keys.A) this.pos[0] -= CONSTANTS.MOVESPEED;
        if (keys.s || keys.S) this.pos[1] += CONSTANTS.MOVESPEED;
        if (keys.d || keys.D) this.pos[0] += CONSTANTS.MOVESPEED;
        // debugger
    };
};
