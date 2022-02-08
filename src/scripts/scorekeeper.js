export default class Scorekeeper {
    constructor(game) {
        this.game = game;
        this.tb = false;
        this.bp = false;
        this.sp = false;
        this.mp = false;

        this.pointScore = {
            p1: 0,
            p2: 0
        };
        this.gameScore = {
            p1: 0,
            p2: 0
        };
    }

    updatePointScore(ball) {
        // debugger
        if (ball.status === "point") {
            if (ball.pos[1] < 290) {
                this.pointScore.p1 += 1;
            } else {
                this.pointScore.p2 += 1;
            };
        } else if (ball.status === "out") {
            if (ball.player.name === "P2") {
                this.pointScore.p1 += 1;
            } else {
                this.pointScore.p2 += 1;
            };
        };
        console.log(this.pointScore);
    };

    updateGameScore() {
        let target = 4;
        if (this.tb) target = 7;
        if (this.pointScore.p1 >= target && (this.pointScore.p1 - this.pointScore.p2) >= 2) {
            this.gameScore.p1 += 1;
            this.pointScore.p1 = 0;
            this.pointScore.p2 = 0;
            console.log(this.GameScore);
        } else if (this.pointScore.p2 >= target && (this.pointScore.p2 - this.pointScore.p1) >= 2) {
            this.gameScore.p2 += 1;
            this.pointScore.p1 = 0;
            this.pointScore.p2 = 0;
            console.log(this.gameScore);
            // debugger
        };

        if (this.gameScore.p1 === 6 && this.gameScore.p2 === 6) this.tb = true;
    };

    isBreakPoint() { // this will just be used for announcer purposes down the line
        let target = 3;
        if (this.tb) target = 6;
        if (this.pointScore.p1 >= target && 
            (this.pointScore.p1 - this.pointScore.p2) > 0 &&
            this.game.ball.player.name === "P2") {
                this.bp = true;
                console.log("breakpoint");
        } else if (this.pointScore.p2 >= target && 
            (this.pointScore.p2 - this.pointScore.p1) > 0 &&
            this.game.ball.player.name === "P1") {
                this.bp = true;
                console.log("breakpoint");
        } else {
            this.bp = false;
        };
    };
    
    matchPoint() {};

    showPoints(player) {
        let oppPlayer = player === "p1" ? "p2" : "p1";
        if (this.pointScore[player] < 3) {
            return this.pointScore[player] * 15;
        } else if (this.pointScore[player] < 4 ||
            this.pointScore[player] <= this.pointScore[oppPlayer]) {
            return 40;
        } else if (this.pointScore[player] > this.pointScore[oppPlayer]) {
            return "AD";
        };
    };

    draw(ctx) {
        // theme 1
        // ctx.fillStyle = "#F5F5F5";
        // theme 2
        ctx.fillStyle = "#115740";
        ctx.fillRect(0, 0, 125, 65);

        // ctx.font = "20px IBM Plex Sans Thai Looped";
        // theme 1
        // ctx.fillStyle = "black";
        // theme 2
        ctx.fillStyle = "#f5f5f5";
        ctx.font = "18px Merriweather Sans";
        // ctx.fillText(`P1      | ${this.gameScore.p1} | ${this.showPoints('p1')}*`, 10, 25);
        ctx.fillText(`P1`, 10, 25);
        ctx.fillText(`CPU`, 10, 50);
        ctx.fillText(`| ${this.gameScore.p1}`, 55, 25);
        ctx.fillText(`| ${this.gameScore.p2}`, 55, 50);
        ctx.fillText(`| ${this.showPoints('p1')}`, 82, 25);
        ctx.fillText(`| ${this.showPoints('p2')}`, 82, 50);
    }
}