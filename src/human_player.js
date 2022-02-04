const MovingObject = require("./moving_object.js");

class HumanPlayer extends MovingObject {
    constructor(pos, vel, color) {
        super(pos, vel);
        this.color = color;
    }

    draw(ctx) {
        // the shadow
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // ctx.ellipse(this.pos[0], this.pos[1], )
        ctx.fillRect(this.pos[0] - 10, this.pos[1] - 20, 20, 40);
    }
}

module.exports = HumanPlayer;