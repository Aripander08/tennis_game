import HumanPlayer from "./human_player.js";


export default class ComputerPlayer extends HumanPlayer {
    constructor(pos, vel, color, height) {
        super(pos, vel, color, height);
    } 

    findPath(ball) {
        // path to ball
        const angle = Math.atan2(ball.pos[1] - this.pos[1], ball.pos[0] - this.pos[0]);
        const newVel = [Math.cos(angle) * (4.8), Math.sin(angle) * (0.2)];

        // path to reset position should prevent computer from endlessly moving forward
        const returnAngle = Math.atan2(40 - this.pos[1], 400 - this.pos[0]);
        const returnVel = [Math.cos(returnAngle) * (1.2), Math.sin(returnAngle) * (0.9)];

        // if (ball.player.constructor.name === 'HumanPlayer') {
        if (ball.player === this || ball.player === '') {
            // debugger
            this.vel = returnVel; // we need to determin this vel
            this.move();
        } else {
            this.vel = newVel;
            this.move();
        }
    }

    swing(ball) {
        if (ball.roundCollisionDetector(this) === this && ball.inPlay) {
            
            ball.vel[0] *= (0);
            // if (ball.pos[0] < )
            ball.vel[1] *= -(0.95);
            ball.vel[2] *= -(0.25);
            ball.player = this;
            ball.bounceCount = 0;
        }
    }

}
