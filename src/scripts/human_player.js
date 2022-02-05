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
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height);
        
        //their shadow
        ctx.fillStyle = "#444444";
        ctx.beginPath();
        ctx.fillRect(this.pos[0] - 10, this.pos[1] + 20, 20, 20);
        
    }

    swing(e, canvas, ball) {
        // let canvas = this.ctx.canvas.getBoundingClientRect()
        const mouseX = e.clientX - canvas.x;
        const mouseY = e.clientY - canvas.y;
        const angle = Math.atan2(mouseY - ball.pos[1], mouseX - ball.pos[0])
        const newVel = [Math.cos(angle) * 3, Math.sin(angle) * 3, Math.sin(angle) * (3 * 4/3)];
        // ball.collisionDetector(this.player1);
        ball.vel = newVel;
        ball.player = this;
    }
}
