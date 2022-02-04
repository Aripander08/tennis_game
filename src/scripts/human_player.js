import MovingObject from "./moving_object.js";

export default class HumanPlayer extends MovingObject {
    constructor(pos, vel, color) {
        super(pos, vel);
        this.color = color;
        this.bindControls();
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

    bindControls() {
        const that = this;
        // debugger
        window.addEventListener("keydown", function(e) {
            if (e.code === "KeyW") { // up
                that.vel = [0, -8];
                that.move();
            } else if (e.code === "KeyS") { //down
                that.vel = [0, 8];
                that.move();
            } else if (e.code === "KeyA") { // left
                that.vel = [-10, 0];
                that.move();
            } else if (e.code === "KeyD") { // right
                that.vel = [10, 0];
                that.move();
            } else if (e.code === "KeyF") {
                // swing
            }
        })
    }
}
