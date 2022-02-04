const MovingObject = require("./moving_object.js");

class ComputerPlayer extends MovingObject {
    constructor(pos, vel, color, ball) {
        super(pos, vel);
        this.color = color;
        this.bindControls();
        this.ball = ball; // there needs t obe a way for computer to access game or ball to figure out it's trajectory
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

    bindControls() {
        const that = this;
        // debugger
        
    }
}

module.exports = ComputerPlayer;