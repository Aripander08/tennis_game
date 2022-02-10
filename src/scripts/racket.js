
export default class Racket {
    constructor (pivot, radius, armColor, color) {
        this.pivot = pivot;
        this.radius = radius;
        this.armColor = armColor;
        this.color = color;
        this.armLength = 20;
        this.armAngle = Math.PI * (7/4);
        this.handPos = [
            this.pivot[0] + Math.cos(this.armAngle) * this.armLength,
            this.pivot[1] - Math.sin(this.armAngle) * this.armLength
        ];
        this.racketAngle = Math.PI * (2);
        this.racketPos = [
            this.pivot[0] + Math.cos(this.racketAngle) * this.armLength,
            this.pivot[1] - Math.sin(this.racketAngle) * this.armLength
        ];
        this.vel = 0;
    };

    swingStatus = {
        "resting": true,
        "swinging": false,
        "returning": false
    };

    draw(ctx) {
        ctx.lineWidth = 4;
        // the arm
        ctx.strokeStyle = this.armColor;
        ctx.beginPath();
        ctx.moveTo(this.pivot[0], this.pivot[1]);
        ctx.lineTo(this.handPos[0], this.handPos[1]);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        // the racket handle
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.handPos[0], this.handPos[1]);
        ctx.lineTo(this.racketPos[0], this.racketPos[1]);
        ctx.stroke();
        //the racket head
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.arc(this.racketPos[0], this.racketPos[1], 7, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#39FF14";
        // ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(this.racketPos[0], this.racketPos[1], 6, 0, 2 * Math.PI);
        ctx.fill();
    };

    swing() {
        window.clearTimeout(timeout1);
        window.clearTimeout(timeout2);
        this.swingStatus.swinging = true;
        this.swingStatus.resting = false;
        const timeout1 = setTimeout(() => {
            this.swingStatus.swinging = false;
            this.swingStatus.returning = true;
        }, 300);
        const timeout2 = setTimeout(() => {
            this.swingStatus.returning = false;
            this.swingStatus.resting = true;
        }, 420);

    };

    animateSwing() {
        if (this.swingStatus.swinging) {
            this.armAngle += Math.PI * (1/720);
            this.handPos = [
                this.pivot[0] + Math.cos(this.armAngle) * this.armLength,
                this.pivot[1] - Math.sin(this.armAngle) * this.armLength
            ];

            this.racketAngle += Math.PI * (1/720);
            this.racketPos = [
                this.pivot[0] + Math.cos(this.racketAngle) * this.armLength,
                this.pivot[1] - Math.sin(this.racketAngle) * this.armLength
            ];
            requestAnimationFrame(this.animateSwing.bind(this));
        };
        if (this.swingStatus.returning) {
            this.armAngle -= Math.PI * (1/720);
            this.handPos = [
                this.pivot[0] + Math.cos(this.armAngle) * this.armLength,
                this.pivot[1] - Math.sin(this.armAngle) * this.armLength
            ];

            this.racketAngle -= Math.PI * (1/720);
            this.racketPos = [
                this.pivot[0] + Math.cos(this.racketAngle) * this.armLength,
                this.pivot[1] - Math.sin(this.racketAngle) * this.armLength
            ];
            requestAnimationFrame(this.animateSwing.bind(this));
        };
        if (this.swingStatus.resting) {
            this.armAngle = Math.PI * (7/4);
            this.handPos = [
                this.pivot[0] + Math.cos(this.armAngle) * this.armLength,
                this.pivot[1] - Math.sin(this.armAngle) * this.armLength
            ];

            this.racketAngle = Math.PI * (2);
            this.racketPos = [
                this.pivot[0] + Math.cos(this.racketAngle) * this.armLength,
                this.pivot[1] - Math.sin(this.racketAngle) * this.armLength
            ];
        };
    };
};