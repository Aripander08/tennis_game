import HumanPlayer from "./human_player.js";


export default class ComputerPlayer extends HumanPlayer {
    constructor(pos, vel, color, height) {
        super(pos, vel, color, height);
    } 

    findPath(ball) {
        // path to ball
        const angle = Math.atan2(ball.pos[1] - this.pos[1], ball.pos[0] - this.pos[0]);
        const newVel = [Math.cos(angle) * 20, Math.sin(angle) * (4/10)];

        // path to reset position should prevent computer from endlessly moving forward
        const returnAngle = Math.atan2(40 - this.pos[1], 400 - this.pos[0]);
        const returnVel = [Math.cos(returnAngle) * (1.2), Math.sin(returnAngle) * (0.3)];

        if (ball.player.constructor.name === 'HumanPlayer') {
            this.vel = newVel;
            this.move();

        } else {
            this.vel = returnVel; // we need to determin this vel
            this.move();
        }
    }

    swing(ball) {
        if (ball.collisionDetector(this) === this && ball.inPlay) {
            ball.vel[0] *= -1;
            ball.vel[1] *= -1;
            ball.vel[2] *= -1/10;
            ball.player = this;
            ball.bounceCount = 0;
        }
    }

}
