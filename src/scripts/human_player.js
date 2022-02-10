import MovingObject from "./moving_object.js";
import Racket from "./racket.js";

const CONSTANTS = {
    SKIN: "#d5c8b8",
    HAIR: "#b2daed",
    FEET: "#303032",
    LEGS: "#70592d",
    SHADOW: "rgba(23, 23, 23, 0.75)",
    MOVESPEED: 1.95,
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
    };

    toss(ball) {
        ball.status.resetting = false;
        ball.status.tossing = true;
        console.log(ball.status);
        ball.vel = [0, 0, 2.0];
    };

    swing(e, canvas, ball) {
        const mouseX = e.clientX - canvas.x;
        const mouseY = e.clientY - canvas.y;
        const angle = Math.atan2(mouseY - ball.pos[1], mouseX - ball.pos[0])
        let newVel = [Math.cos(angle) * 3, Math.sin(angle) * 3.5, 2.4];
        if (ball.status.tossing) {
            newVel = [Math.cos(angle) * 4, Math.sin(angle) * 4, 1.7];
        }
        const ballHeight = ball.height;
        if ((ball.status.tossing || ball.status.live) && ballHeight <= 50) {
            const sfxIcon = document.querySelector("#sound-button i");
            if (sfxIcon.className === "fas fa-volume-up") this.sfx.play();

            if (ball.status.tossing) {
                ball.status.tossing = false;
                ball.status.serve = true;
            };
    
            ball.vel = newVel;
            ball.player = this;
            ball.bounceCount = 0;
        };
    };
    
    reposition(keys) {
        if ((keys.w || keys.W) && 
            (this.pos[1] + this.height > this.net.pos[1])) {
            this.pos[1] -= CONSTANTS.MOVESPEED; 
            this.racket.pivot[1] -= CONSTANTS.MOVESPEED;
            this.racket.handPos[1] -= CONSTANTS.MOVESPEED;
            this.racket.racketPos[1] -= CONSTANTS.MOVESPEED;
        };  
        if (keys.a || keys.A) {
            this.pos[0] -= CONSTANTS.MOVESPEED;
            this.racket.pivot[0] -= CONSTANTS.MOVESPEED;
            this.racket.handPos[0] -= CONSTANTS.MOVESPEED;
            this.racket.racketPos[0] -= CONSTANTS.MOVESPEED;
        };
        if (keys.s || keys.S) {
            this.pos[1] += CONSTANTS.MOVESPEED;
            this.racket.pivot[1] += CONSTANTS.MOVESPEED;
            this.racket.handPos[1] += CONSTANTS.MOVESPEED;
            this.racket.racketPos[1] += CONSTANTS.MOVESPEED;
        };
        if (keys.d || keys.D) {
            this.pos[0] += CONSTANTS.MOVESPEED;
            this.racket.pivot[0] += CONSTANTS.MOVESPEED;
            this.racket.handPos[0] += CONSTANTS.MOVESPEED;
            this.racket.racketPos[0] += CONSTANTS.MOVESPEED;
        };
    };

    draw(ctx) {
        this.drawBody(ctx);
        this.drawLegs(ctx, CONSTANTS.LEGS);
        this.drawFeet(ctx, CONSTANTS.FEET);
        this.drawHead(ctx, CONSTANTS.SKIN);
        this.drawHair(ctx, CONSTANTS.HAIR);
        this.drawShadow(ctx);
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
    };
    drawFeet(ctx, feet) {
        ctx.fillStyle = feet;
        ctx.beginPath();
        ctx.fillRect(this.pos[0], this.pos[1] + 44, this.width, 4);
    };
    drawHead(ctx, skin) {
        ctx.fillStyle = skin;
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
        // irises
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
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
        ctx.arc(this.pos[0] + 8, this.pos[1] + 4, 14, 0, Math.PI * 2);
        ctx.fill();
    };
    drawShadow(ctx) {
        ctx.fillStyle = CONSTANTS.SHADOW;
        ctx.beginPath();
        ctx.fillRect(this.pos[0], this.pos[1] + (this.height), this.width, 20);
    };
};
