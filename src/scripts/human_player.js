import MovingObject from "./moving_object.js";
import Racket from "./racket.js";

const CONSTANTS = {
    SKIN: "#d5c8b8",
    HAIR: "#b2daed",
    FEET: "#303032",
    LEGS: "#70592d",
    SHADOW: "rgba(23, 23, 23, 0.75)",
    MOVESPEED: 1.75,
    
    // RACKETSTRINGS: "rgba(56, 255, 20, 0.45)"
};

export default class HumanPlayer extends MovingObject {
    constructor(pos, vel, color, height, net, sfx, name, racket) {
        super(pos, vel);
        this.color = color;
        this.height = height;
        this.width = height / 3;
        this.net = net;
        this.sfx = sfx;
        this.name = name;
        this.racket = racket;
        // this.racket = new Racket(this, [this.pos[0] + this.width / 2, this.pos[1] + this.height * (2/3)], 10, "red");
    };

    toss(ball) {
        ball.status = "tossing";
        console.log("tossing");
        ball.vel = [0, 0, 2.0];
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
        if ((ball.status === "tossing" || ball.status === "live") && ballHeight <= 50) {
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
                // debugger
            this.pos[1] -= CONSTANTS.MOVESPEED; 
            this.racket.pivot[1] -= CONSTANTS.MOVESPEED;
            this.racket.handPos[1] -= CONSTANTS.MOVESPEED;
            this.racket.racketPos[1] -= CONSTANTS.MOVESPEED;
            // debugger
        }  
        if (keys.a || keys.A) {
            this.pos[0] -= CONSTANTS.MOVESPEED;
            this.racket.pivot[0] -= CONSTANTS.MOVESPEED;
            this.racket.handPos[0] -= CONSTANTS.MOVESPEED;
            this.racket.racketPos[0] -= CONSTANTS.MOVESPEED;
        }
        if (keys.s || keys.S) {
            this.pos[1] += CONSTANTS.MOVESPEED;
            this.racket.pivot[1] += CONSTANTS.MOVESPEED;
            this.racket.handPos[1] += CONSTANTS.MOVESPEED;
            this.racket.racketPos[1] += CONSTANTS.MOVESPEED;
        }
        if (keys.d || keys.D) {
            this.pos[0] += CONSTANTS.MOVESPEED;
            this.racket.pivot[0] += CONSTANTS.MOVESPEED;
            this.racket.handPos[0] += CONSTANTS.MOVESPEED;
            this.racket.racketPos[0] += CONSTANTS.MOVESPEED;
        }
    };

    draw(ctx) {
        // this.drawRacket(ctx, CONSTANTS.RACKET);
        this.drawBody(ctx);
        this.drawLegs(ctx, CONSTANTS.LEGS);
        this.drawFeet(ctx, CONSTANTS.FEET);
        this.drawHead(ctx, CONSTANTS.SKIN);
        this.drawHair(ctx, CONSTANTS.HAIR);
        this.drawShadow(ctx);
        // this.racket.draw(ctx);
    };

    drawBody(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
    };
    
    drawLegs(ctx, legs) {
        ctx.fillStyle = legs;
        ctx.beginPath();
        ctx.fillRect(this.pos[0], this.pos[1] + 33, this.width, 15);
    }

    drawFeet(ctx, feet) {
        ctx.fillStyle = feet;
        ctx.beginPath();
        ctx.fillRect(this.pos[0], this.pos[1] + 44, this.width, 4);
    }
    drawHead(ctx, skin) {
        ctx.fillStyle = skin;
        // ctx.fillRect(this.pos[0] - 2, this.pos[1] + 5, this.width + 4, this.height * (0.2));
        ctx.beginPath()
        ctx.arc(this.pos[0] + 8, this.pos[1] + 8, 12, 0, Math.PI * 2);
        ctx.fill();

        // eye whites
        ctx.fillStyle = "white";
        ctx.beginPath()
        ctx.arc(this.pos[0] + 2, this.pos[1] + 7, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath()
        ctx.arc(this.pos[0] + 14, this.pos[1] + 7, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        // irises
        ctx.beginPath()
        ctx.moveTo(this.pos[0] + 2, this.pos[1] + 7);
        ctx.lineTo(this.pos[0] + 2, this.pos[1] + 9);
        ctx.stroke();
        ctx.beginPath()
        ctx.moveTo(this.pos[0] + 14, this.pos[1] + 7);
        ctx.lineTo(this.pos[0] + 14, this.pos[1] + 9);
        ctx.stroke();
        // eyebrows
        ctx.lineWidth = 0.5;
        ctx.beginPath()
        ctx.moveTo(this.pos[0] + 4, this.pos[1]);
        ctx.lineTo(this.pos[0] - 2, this.pos[1] + 2);
        ctx.stroke();
        ctx.beginPath()
        ctx.moveTo(this.pos[0] + 12, this.pos[1]);
        ctx.lineTo(this.pos[0] + 18, this.pos[1] + 2);
        ctx.stroke();

    };

    drawHair(ctx, hair) {
        ctx.fillStyle = hair;
        ctx.beginPath()
        // ctx.fillRect(this.pos[0] - 2, this.pos[1], this.width + 4, this.height * (0.2));
        ctx.arc(this.pos[0] + 8, this.pos[1] + 4, 14, 0, Math.PI * 2);
        ctx.fill();
    }

    drawShadow(ctx) {
        ctx.fillStyle = CONSTANTS.SHADOW;
        ctx.beginPath();
        ctx.fillRect(this.pos[0], this.pos[1] + (this.height), this.width, 20);
    };

};
