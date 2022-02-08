
export default class Racket {
    constructor (pivot, radius, color) {
        this.pivot = pivot;
        this.radius = radius;
        this.color = color;
        this.armLength = 20;
        this.armAngle = Math.PI * (7/4);
        this.handPos = [
            this.pivot[0] + Math.cos(this.armAngle) * this.armLength,
            this.pivot[1] - Math.sin(this.armAngle) * this.armLength
            // this.pivot[0] + Math.cos(armAngle) * this.armLength,
            // this.pivot[1] - Math.sin(armAngle) * this.armLength
        ];
        this.racketAngle = Math.PI * (2);
        this.racketPos = [
            this.pivot[0] + Math.cos(this.racketAngle) * this.armLength,
            this.pivot[1] - Math.sin(this.racketAngle) * this.armLength
        ];
        this.racketAngle = 
        this.vel = 0;

    }

    swingStatus = {
        "resting": true,
        "swinging": false,
        "returning": false
    }


    draw(ctx) {
        // debugger
        ctx.strokeStyle = "pink";
        ctx.beginPath();
        ctx.moveTo(this.pivot[0], this.pivot[1]);
        ctx.lineTo(this.handPos[0], this.handPos[1]);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(this.handPos[0], this.handPos[1]);
        ctx.lineTo(this.racketPos[0], this.racketPos[1]);
        ctx.stroke();
        // console.log(`shoulder ${this.pivot}`);
        // console.log(`hand ${this.handPos}`);
        // console.log(`racket ${[this.pivot[0] + Math.cos(Math.PI * (2)) * this.armLength,
        //     this.pivot[1] - Math.sin(Math.PI * (2)) * this.armLength]}`)
    };

    swing() {        
        this.swingStatus.swinging = true;
        this.swingStatus.resting = false;
        setTimeout(() => {
            this.swingStatus.swinging = false;
            this.swingStatus.returning = true;
        }, 300);
        setTimeout(() => {
            this.swingStatus.returning = false;
            this.swingStatus.resting = true;
        }, 420);

    }

    animateSwing() {
        if (this.swingStatus.swinging) {
            this.armAngle += Math.PI * (1/720);
            this.handPos = [
                this.pivot[0] + Math.cos(this.armAngle) * this.armLength,
                this.pivot[1] - Math.sin(this.armAngle) * this.armLength
            ];
            requestAnimationFrame(this.animateSwing.bind(this));
        }
        if (this.swingStatus.returning) {
            this.armAngle -= Math.PI * (1/720);
            this.handPos = [
                this.pivot[0] + Math.cos(this.armAngle) * this.armLength,
                this.pivot[1] - Math.sin(this.armAngle) * this.armLength
            ];
            requestAnimationFrame(this.animateSwing.bind(this));
        }
        if (this.swingStatus.resting) {
            this.armAngle = Math.PI * (7/4);
            this.handPos = [
                this.pivot[0] + Math.cos(this.armAngle) * this.armLength,
                this.pivot[1] - Math.sin(this.armAngle) * this.armLength
            ];
        }
    }
    // debugger
    // loop(currentTime) {
    //     if(oldTime === 0) {
    //       oldTime = currentTime;
    //     }
      
    //     if((currentTime - oldTime) >= delta){
    //       noise(ctx);  
    //       oldTime = currentTime;
    //     }
    //     requestAnimationFrame(loop);
    // };
    
    // requestAnimationFrame(loop);
};

// this.pivot[0] + Math.cos(this.armAngle) * this.armLength,
// this.pivot[1] - Math.sin(this.armAngle) * this.armLength
// this.pivot[0] + Math.cos(armAngle) * this.armLength,
// this.pivot[1] - Math.sin(armAngle) * this.armLength