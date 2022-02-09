import HumanPlayer from "./human_player.js";

const CONSTANTS = {
    SKIN: "#f8bd91",
    HAIR: "#70592d",
    LEGS: "#3a4767",
    FEET: "#ededee",
    SHADOW: "rgba(23, 23, 23, 0.75)",
    RACKET: "black",
};

export default class ComputerPlayer extends HumanPlayer {
    constructor(pos, vel, color, height, net, sfx, name, racket) {
        super(pos, vel, color, height, net, sfx, name, racket);
    };

    findPath(ball) {
        // path to ball
        const angle = Math.atan2(
            ball.pos[1] - this.pos[1], 
            ball.pos[0] - this.pos[0]
        );
        const newVel = [
            Math.cos(angle) * (5.4), 
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

        // if (ball.player === this || ball.status !== "live") {
        if (ball.player === this || ball.status.tossing || ball.status.resetting) {
            this.vel = returnVel;
            if (this.pos[0] !== 392 || this.pos[1]!== 40) {
                this.move();
            };
        } else if ((this.pos[1] + this.height) < this.net.pos[1]) {
            // debugger
            this.vel = newVel;
            this.move();
        };
    };

    move() {

        const Arr = [this.pos, this.racket.pivot, this.racket.handPos, this.racket.racketPos];
        Arr.forEach(pos => {
            pos[0] += this.vel[0];
            pos[1] += this.vel[1];
        });
        // debugger
    };

    swing(ball) {
        if (ball.roundCollisionDetector(this) === this && 
            // ball.status !== "out" && ball.player !== this) {
            (!ball.status.out && ball.player !== this) ||
            (ball.status.tossing && ball.player === this)) {
            this.racket.swing();
            this.sfx.play();
            // ball.vel[0] *= (0); // CURRENT COMPUTER ALWAYS SENDS BALL STRAIGHT BACK
            if (this.pos[0] > 600) {
                ball.vel[0] *= -0.6;
                ball.vel[2] += 2;
            } else if (this.pos[0] > 400) {
                ball.vel[0] *= 0;
            } else if (this.pos[0] > 200) {
                ball.vel[0] *= 0;
            } else {
                ball.vel[0] *= -0.6;
                ball.vel[2] += 2;
            };

            if (ball.status.tossing) {
                ball.vel[1] = 3.3;
                ball.vel[2] -= 1.9;
            }
            else {
                ball.vel[1] *= -(0.95);
            }
            // The vel that comp imparts on the ball should depend on the balls height and vel
            // ball.vel[2] = 0.5;
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
                ball.vel[2] *= 0.8;
            };
            ball.status.tossing = false;
            ball.status.live = true;
            ball.player = this;
            ball.bounceCount = 0;
        };
    };

    draw(ctx) {
        this.drawBody(ctx);
        this.drawLegs(ctx, CONSTANTS.LEGS);
        this.drawFeet(ctx, CONSTANTS.FEET);
        this.drawHair(ctx, CONSTANTS.HAIR);
        this.drawHead(ctx, CONSTANTS.SKIN);
        this.drawShadow(ctx)
        // this.drawRacket(ctx);
    };
};
