const MovingObject = require("./moving_object.js");

class ComputerPlayer extends MovingObject {
    constructor(pos, vel, color) {
        super(pos, vel);
        this.color = color;
    }

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
}

module.exports = ComputerPlayer;