import MovingObject from "./moving_object.js";
import Racket from "./racket.js";

const CONSTANTS = {
    SKIN: "#D2B48C",
    HAIR: "#574022",
    SHOES: "#D3D3D3",
    SHADOW: "rgba(23, 23, 23, 0.75)",
    MOVESPEED: 1.75,
    
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
        // this.racket = new Racket(this, [this.pos[0] + this.width / 2, this.pos[1] + this.height * (2/3)], 10, "red");
    };

    toss(ball) {
        ball.status = "tossing";
        console.log("tossing");
        ball.vel = [0, 0, 4];
        // debugger
    }

    swing(e, canvas, ball) {
        // debugger
        // this.racket.swing();
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
    
    reposition(keys) {
        if ((keys.w || keys.W) && 
            (this.pos[1] + this.height > this.net.pos[1])) {
            this.pos[1] -= CONSTANTS.MOVESPEED; 
        }  
        if (keys.a || keys.A) {
            this.pos[0] -= CONSTANTS.MOVESPEED;
        }
        if (keys.s || keys.S) {
            this.pos[1] += CONSTANTS.MOVESPEED;
        }
        if (keys.d || keys.D) {
            this.pos[0] += CONSTANTS.MOVESPEED;
        }
    };

    draw(ctx) {
        // this.drawRacket(ctx, CONSTANTS.RACKET);
        this.drawBody(ctx);
        this.drawHead(ctx);
        this.drawHair(ctx);
        this.drawShadow(ctx);
        // this.racket.draw(ctx);
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

};
