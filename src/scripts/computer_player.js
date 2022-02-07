import HumanPlayer from "./human_player.js";

// const CONSTANTS = {
//     MOVEVEL: [0.006, 0.00025],
//     RETURNVEL: [0.0015, 0.001125]
// };

export default class ComputerPlayer extends HumanPlayer {
    constructor(pos, vel, color, height, net, sfx) {
        super(pos, vel, color, height, net, sfx);
    };

    findPath(ball) {
        // path to ball
        const angle = Math.atan2(
            ball.pos[1] - this.pos[1], 
            ball.pos[0] - this.pos[0]
        );
        const newVel = [
            Math.cos(angle) * (5.1), 
            Math.sin(angle) * (0.2)
        ];

        // path to reset position should prevent computer from endlessly moving forward
        const returnAngle = Math.atan2(
            40 - this.pos[1], // FOR ATAN THIS IS THE Y
            392 - this.pos[0] // THIS IS THE X
        );
        const returnVel = [
            Math.cos(returnAngle) * (1.2), 
            Math.sin(returnAngle) * (0.9)
        ];

        if (ball.player === this || ball.status !== "live") {
            this.vel = returnVel;
            this.move();
        } else if ((this.pos[1] + this.height) < this.net.pos[1]) {
            this.vel = newVel;
            this.move();
        }
    };

    swing(ball) {
        if (ball.roundCollisionDetector(this) === this && ball.status !== "out") {
            ball.vel[0] *= (0); // CURRENT COMPUTER ALWAYS SENDS BALL STRAIGHT BACK
            ball.vel[1] *= -(0.95);
            ball.vel[2] += 1.9;
            ball.player = this;
            ball.bounceCount = 0;
        }
    };
};
