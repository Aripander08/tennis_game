import MovingObject from "./moving_object.js";

const CONSTANTS = {
    SKIN: "#D2B48C",
    HAIR: "#574022",
    SHOES: "#D3D3D3",
    SHADOW: "rgba(23, 23, 23, 0.75)",
    MOVESPEED: 1.75
}

export default class HumanPlayer extends MovingObject {
    constructor(pos, vel, color, height, net) {
        super(pos, vel);
        this.color = color;
        this.height = height;
        this.width = height / 3;
        this.net = net;
        // this.sfx = sfx;
    };

    draw(ctx) {
        // player shirt
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
        //player head
        ctx.fillStyle = CONSTANTS.SKIN;
        ctx.beginPath()
        ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height * (0.3));
        //player hair
        ctx.fillStyle = CONSTANTS.HAIR;
        ctx.beginPath()
        ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height * (0.1));

        //their shadow
        ctx.fillStyle = CONSTANTS.SHADOW;
        // ctx.fillStyle = "#444444";
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

        const ballHeight = ball.height;
        if ((ball.status === "tossing" || ball.status === "live") && ballHeight <= this.height) {
            // debugger
            // this.sfx.play();
            ball.status = "live"
            ball.vel = newVel;
            ball.player = this;
            ball.bounceCount = 0;
        };
    };
};
