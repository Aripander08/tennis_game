class MovingObject {
    constructor(pos, vel) {
        this.pos = pos;
        this.vel = vel;
    };

    move() {
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
    };
}

module.exports = MovingObject;