import MovingObject from "./moving_object.js";

export default class HumanPlayer extends MovingObject {
    constructor(pos, vel, color, height) {
        super(pos, vel);
        this.color = color;
        this.height = height;
        this.width = height / 2;
    }

    draw(ctx) {
        // the player
        // player shirt
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height);
        //player hair
        ctx.fillStyle = "#D2B48C";
        ctx.beginPath()
        ctx.fillRect(this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height * (3/7));
        //player hair
        ctx.fillStyle = "#574022";
        ctx.beginPath()
        ctx.fillRect(this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height / 8);


        //their shadow
        ctx.fillStyle = "#362815";
        // ctx.fillStyle = "#444444";
        ctx.beginPath();
        ctx.fillRect(this.pos[0] - (this.width / 2), this.pos[1] + (this.width), this.width, 20);
        
    }

    reposition(keys) {
        if (keys.w) this.pos[1] -= 1.2; 
        if (keys.a) this.pos[0] -= 1.2;
        if (keys.s) this.pos[1] += 1.2;
        if (keys.d) this.pos[0] += 1.2;
        // debugger
    }

    swing(e, canvas, ball) {
        const mouseX = e.clientX - canvas.x;
        const mouseY = e.clientY - canvas.y;
        const angle = Math.atan2(mouseY - ball.pos[1], mouseX - ball.pos[0])
        const newVel = [Math.cos(angle) * 3, Math.sin(angle) * 3, Math.sin(angle) * (3 * 1.78)];

        const ballHeight = Math.abs(ball.pos[2] - ball.pos[1]);
        if (ball.inPlay && ballHeight <= this.height) {
            // debugger
            ball.vel = newVel;
            ball.player = this;
            ball.bounceCount = 0;
        }
    }
}
