import HumanPlayer from "./human_player.js";


export default class ComputerPlayer extends HumanPlayer {
    constructor(pos, vel, color) {
        super(pos, vel);
        this.color = color;
    }   // will need to study how to get angles and lengths of right triangles

    draw(ctx) {
        // the player
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.pos[0] - 10, this.pos[1] - 20, 20, 40);
        
        //their shadow
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.fillRect(this.pos[0] - 10, this.pos[1] + 20, 20, 20);
        
    }


    findPath(ball, ctx) {

        let ballX = ball.pos[0];
        let ballY = ball.pos[1];

        // visualize ball path for my dev purposes
        while ((ballX > 0 && ballX < 600) && (ballY > 0 && ballY < 800)) {
            ballX += ball.vel[0];
            ballY += ball.vel[1];
        }

        // debugger

        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ball.pos[0], ball.pos[1]);
        ctx.lineTo(ballX, ballY);
        ctx.strokeStyle = "white";
        ctx.stroke();

        const angle = Math.atan2(ball.pos[1] - this.pos[1], ball.pos[0] - this.pos[0]);
        const newVel = [Math.cos(angle) * 6, Math.sin(angle)];

        if (ball.player.constructor.name === 'HumanPlayer') {
            // debugger
            this.vel = newVel; // we need to determin this vel
            this.move();
            // debugger
        } else {
            this.vel = [0, 0];
        }
    }

}
