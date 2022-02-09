export default class Scorekeeper {
    constructor(game) {
        this.game = game;
        this.tb = false;
        this.bp = true;
        this.sp = false;
        this.mp = false;

        this.serve = {
            first: true,
            second: false,
            double: false
        };

        this.serveArr = [1,2];

        this.pointScore = {
            p1: 0,
            p2: 0
        };
        this.gameScore = {
            p1: 6,
            p2: 5
        };

        this.totalWinners = {
            p1: 0,
            p2: 0
        };
        this.totalUEs = {
            p1: 0,
            p2: 0
        };
        this.totalDFs = {
            p1: 0,
            p2: 0,
        }
        this.totalBPs = {
            p1: 0,
            p2: 0,
            p1Won: 0,
            p2Won: 0
        };

    }
        
    rotate(arr, t = 1) {
        let pivot = t % arr.length;
        return arr.splice(pivot).concat(arr);
    };

    updatePointScore(ball) {
        // debugger
        // if (ball.status === "point") {
        if (ball.status.point) {
            if (ball.pos[1] < 290) {
                this.pointScore.p1 += 1;
                this.totalWinners.p1 += 1;
            } else {
                this.pointScore.p2 += 1;
                this.totalWinners.p2 += 1;
            };
        // } else if (ball.status === "out" || this.serve "dF") {
        } else if (ball.status.out || this.serve.double) {
            if (ball.player.name === "P2") {
                this.serve.double = false;
                this.serve.first = true;
                this.pointScore.p1 += 1;
                // ball.status === "out" ? this.totalUEs.p2 += 1 : this.totalDFs.p2 += 1;
                ball.status.out ? this.totalUEs.p2 += 1 : this.totalDFs.p2 += 1;
            } else {
                this.pointScore.p2 += 1;
                // ball.status === "out" ? this.totalUEs.p1 += 1 : this.totalDFs.p1 += 1;
                ball.status.out ? this.totalUEs.p1 += 1 : this.totalDFs.p1 += 1;
            };
            console.log(ball.status);
            // this.serve = "first";
            this.serve.first;
        };
        // debugger
        if (this.tb) {  
            // debugger
            this.serveArr = this.rotate(this.serveArr, 1);
            // debugger
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
            this.serveArr = this.rotate(this.serveArr, 1);

            if (this.bp) this.totalBPs.p1Won += 1;
        } else if (this.pointScore.p2 >= target && (this.pointScore.p2 - this.pointScore.p1) >= 2) {
            this.gameScore.p2 += 1;
            this.pointScore.p1 = 0;
            this.pointScore.p2 = 0;
            console.log(this.gameScore);
            this.serveArr = this.rotate(this.serveArr, 1);
            // debugger
            if (this.bp) this.totalBPs.p2Won += 1;
        };
        // debugger
        if (this.gameScore.p1 === 6 && this.gameScore.p2 === 6) {
            this.tb = true;
            if (this.serveArr.length < 3) this.serveArr = [1,2,2,1];
            // debugger
        };
        // debugger
    };

    isBreakPoint() { // this will just be used for announcer purposes down the line
        let target = 3;
        if (this.tb) target = 6;
        if (this.pointScore.p1 >= target && 
            (this.pointScore.p1 - this.pointScore.p2) > 0 &&
            this.game.ball.player.name === "P2") {
                this.bp = true;
                this.totalBPs.p1 += 1;
                console.log("breakpoint");
        } else if (this.pointScore.p2 >= target && 
            (this.pointScore.p2 - this.pointScore.p1) > 0 &&
            this.game.ball.player.name === "P1") {
                this.bp = true;
                this.totalBPs.p2 += 1;
                console.log("breakpoint");
        } else {
            this.bp = false;
        };
    };

    showPoints(player) {
        let oppPlayer = player === "p1" ? "p2" : "p1";
        if (this.tb) {
            return this.pointScore[player];
        } else {
            if (this.pointScore[player] < 3) {
                return this.pointScore[player] * 15;
            } else if (this.pointScore[player] < 4 ||
                this.pointScore[player] <= this.pointScore[oppPlayer]) {
                return 40;
            } else if (this.pointScore[player] > this.pointScore[oppPlayer]) {
                return "AD";
            };
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
    };

    drawPostGame(ctx) {
        ctx.fillStyle = "#115740";
        ctx.fillRect(150, 125, 500, 300);

        ctx.fillStyle = "#f5f5f5";
        ctx.font = "20px Merriweather Sans";
        ctx.fillText(`Match Summary`, 320, 160);

        ctx.font = "18px Merriweather Sans";
        ctx.fillText(`${this.gameScore.p1} - ${this.gameScore.p2}`, 379, 200);
        ctx.fillText(`P1`, 225, 200);
        ctx.fillText(`CPU`, 520, 200);

        ctx.font = "16px Merriweather Sans";
        ctx.fillText(`Winners `, 363, 240);
        ctx.fillText(`Unforced Errors`, 340, 280);
        // ctx.fillText(`Break Points Won`, 332, 320);
        ctx.fillText(`Click anywhere to play again`, 285, 400);
        // p1 stats
        ctx.fillText(`${this.totalWinners.p1}`, 225, 240);
        ctx.fillText(`${this.totalUEs.p1}`, 225, 280);
        // ctx.fillText(`${this.totalBPs.p1Won} / ${this.totalBPs.p1}`, 225, 320);

        //p2 stats
        ctx.fillText(`${this.totalWinners.p2}`, 520, 240);
        ctx.fillText(`${this.totalUEs.p2}`, 520, 280);
        // ctx.fillText(`${this.totalBPs.p2Won} / ${this.totalBPs.p2}`, 520, 320);
    };
};