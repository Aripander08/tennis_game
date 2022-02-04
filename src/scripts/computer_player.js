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


    findPath(ball) {

        // path to ball
        const angle = Math.atan2(ball.pos[1] - this.pos[1], ball.pos[0] - this.pos[0]);
        const newVel = [Math.cos(angle) * 5, Math.sin(angle)];

        // path to reset position should prevent computer from endlessly moving forward
        const returnAngle = Math.atan2(80 - this.pos[1], 400 - this.pos[0]);
        const returnVel = [Math.cos(returnAngle), Math.sin(returnAngle)];

        if (ball.player.constructor.name === 'HumanPlayer') {

            this.vel = newVel;
            this.move();

        } else {
            this.vel = returnVel; // we need to determin this vel
            this.move();
        }
    }

}
