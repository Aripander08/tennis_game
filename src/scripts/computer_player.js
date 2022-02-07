import HumanPlayer from "./human_player.js";

const CONSTANTS = {
    SKIN: "#D2B48C",
    HAIR: "#574022",
    SHOES: "#D3D3D3",
    SHADOW: "rgba(23, 23, 23, 0.75)",
    RACKET: "black",
};

export default class ComputerPlayer extends HumanPlayer {
    constructor(pos, vel, color, height, net, sfx, name) {
        super(pos, vel, color, height, net, sfx, name);
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
            Math.cos(returnAngle) * (0.6), 
            Math.sin(returnAngle) * (0.4)
        ];

        if (ball.player === this || ball.status !== "live") {
            this.vel = returnVel;
            this.move();
        } else if ((this.pos[1] + this.height) < this.net.pos[1]) {
            this.vel = newVel;
            this.move();
        };
    };

    swing(ball) {
        if (ball.roundCollisionDetector(this) === this && 
            ball.status !== "out" && ball.player !== this) {
            this.sfx.play();
            ball.vel[0] *= (0); // CURRENT COMPUTER ALWAYS SENDS BALL STRAIGHT BACK
            ball.vel[1] *= -(0.95);
            // The vel that comp imparts on the ball should depend on the balls height and vel
            // ball.vel[2] = 1;
            if (ball.height < 20) {
                ball.vel[2] += 1.1;
            } else if (ball.height < 40) {
                ball.vel[2] += 0.9;
            } else {
                ball.vel[2] += 0.7;
            };

            if (ball.vel[2] < 1) {
                ball.vel[2] += 1.5;
            } else if (ball.vel[2] < 3.0) {
                ball.vel[2] += 1.0;
            } else if (ball.vel[2] < 5) {
                ball.vel[2] += 0.5;
            } else {
                ball.vel[2] *= 0.75;
            };
            ball.player = this;
            ball.bounceCount = 0;
        };
    };

    draw(ctx) {
        this.drawBody(ctx);
        this.drawHair(ctx);
        this.drawHead(ctx);
        this.drawShadow(ctx)
        this.drawRacket(ctx);
    };
};
