import MovingObject from "./moving_object.js";

const CONSTANTS = {
    GRAVITY: -0.05,
    FARBOUNCE: 1.5,
    NEARBOUNCE: 1.5,
    BALLCOLOR: "#ccff00",
    SHADEDBALLCOLOR: "#83a300",
    SHADOWCOLOR: "rgba(23, 23, 23, 0.75)",
    NETCOLOR: "rgba(133, 133, 133, 0.73)"
};

export default class Ball extends MovingObject {
    constructor(pos, vel, radius, height, player, canvas, game) {
        super(pos, vel);
        this.radius = radius;
        this.player = player; // only starts at '' but does not stay this way
        this.height = height;
        this.canvas = canvas;
        this.game = game;
        this.bounceCount = 0;
        
    };
    
    status = {
        "resetting": true,
        "tossing": false,
        "fault": false,
        "live": false,
        "out": false,
        "point": false,
        "serve": false,
        "net:": false
    };

    drawCircle(ctx, color, circle) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(circle.pos[0], circle.pos[1] - circle.height, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    };

    draw(ctx) {
        // the shadow
        ctx.fillStyle = CONSTANTS.SHADOWCOLOR;
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
        ctx.fill();
        // the ball
        if ((this.pos[1] < ctx.canvas.height / 20) && 
            (this.height < ctx.canvas.height / 20) || 
            (this.pos[1] > 290 && this.pos[1] < 310 &&
            this.pos[0] < 600 && this.pos[0] > 200 && this.height < 20)) {
            // the ball with shadow over it 
            this.drawCircle(ctx, CONSTANTS.SHADEDBALLCOLOR, this);
        } else if (this.pos[1] < 290 && 
            this.pos[1] > 270 && this.height < 20) {
            // the ball with net in front of it
            this.drawCircle(ctx, CONSTANTS.BALLCOLOR, this);
            this.drawCircle(ctx, CONSTANTS.NETCOLOR, this);            
         } else {
            // regular ball
            this.drawCircle(ctx, CONSTANTS.BALLCOLOR, this);
        };
    };

    roundCollisionDetector(otherObject) {
        const collisionDist = this.radius + 40;
        const currentDist = Math.hypot(
            this.pos[0] - (otherObject.pos[0]), 
            this.pos[1] - (otherObject.pos[1])
        );
        if (currentDist < collisionDist) {
            return otherObject;
        } else {
            return '';
        };
    };

    netCollisionDetector(otherObject) { 
        if (this.pos[0] > otherObject.pos[0] &&
            this.pos[0] < (otherObject.pos[0] + otherObject.width)) {
                if (this.vel[1] < 0 &&
                    this.pos[1] >= otherObject.pos[1] &&
                    (this.pos[1] - this.radius) <= otherObject.pos[1] &&
                    this.height <= otherObject.height) {
                    console.log('net');
                    // debugger
                    return otherObject;
                };
                if (this.vel[1] > 0 &&
                    this.pos[1] < otherObject.pos[1] &&
                    (this.pos[1] + this.radius) > otherObject.pos[1] &&
                    this.height <= otherObject.height) {
                    console.log('net');
                    // debugger
                    return otherObject;
                };
        };
    };

    bounce() {
        // debugger
        if (this.bounceCount < 1 && !this.status.tossing) {
            this.bounceCount += 1;
            if (this.status.serve) {
                // double fault logic handler -- only handles human double fault as CPU never double faults in current version
                if (this.player.name === "P1") {
                    if (this.game.deuceSide) {
                        if (this.pos[0] > 200 && this.pos[0] < 400 &&
                        this.pos[1] > 199.8 && this.pos[1] < 290) {
                            this.status.serve = false;
                            this.status.live = true;
                        } else if (this.status.net) {
                            this.bounceCount += 2;
                            this.status.fault = true;
                            this.status.serve = false;
                            this.status.net = false
                        } else {
                            this.status.fault = true;
                            this.status.serve = false;
                        };
                    } else {
                        if (this.pos[0] > 400 && this.pos[0] < 600 &&
                        this.pos[1] > 199.8 && this.pos[1] < 290) {
                            this.status.serve = false;
                            this.status.live = true;
                        } else if (this.status.net) {
                            this.bounceCount += 2;
                            this.status.fault = true;
                            this.status.serve = false;
                            this.status.net = false
                        } else {
                            this.status.fault = true;
                            this.status.serve = false;
                        };
                    };
                } else {
                    this.status.serve = false;
                    this.status.live = true;
                }
            } else if(this.pos[0] > 200 && this.pos[0] < 600 && this.pos[1] > 100 && this.pos[1] < 500) {

            } else {
                this.status.live = false;
                this.status.out = true;
            }
        //     if ((this.pos[0] < 200 || this.pos[0] > 600) ||
        //         (this.pos[1] < 100 || this.pos[1] > 500)) {
        //             if (this.status.serve) {
        //                 this.status.serve = false;
        //                 this.status.fault = true;
        //             } else {
        //                 this.status.live = false;
        //                 this.status.out = true;
        //             };
        //     } else if (this.vel[1] < 0 && (this.pos[1] > 290)) {
        //         if (this.status.serve && this.vel[1] < 0 && 
        //             (this.pos[1] < 199.9 )) {
        //             debugger
        //                     this.status.serve = false;
        //                     this.status.fault = true;
        //         }

        //         } else if (!this.status.fault) {
        //             this.status.live = false;
        //             this.status.out = true;
        //         };
        //     } else if (this.status.serve && this.status.net) {
        //         this.bounceCount += 22;
        //         this.status.fault = true;
        //         this.status.serve = false;
        //         this.status.net = false;
        //     } else {
        //         this.status.serve = false;
        //         this.status.live = true;
        //     };
        } else if (this.bounceCount < 1 && this.status.tossing ) {
            this.status.tossing = false;
            this.status.fault = true;
            this.bounceCount += 2;
        } else if (this.bounceCount < 2) {
            this.bounceCount += 1;
            if (this.status.live) {
                // if the second bounce comes on a live ball, this is a winner
                this.status.live = false;
                this.status.point = true;
            };
        };

        if (this.vel[1] > 0) {
            // if ball path is moving down
            this.vel[2] *= -(0.65);
        } else if (this.vel[1] < 0) { 
            // if ball is path is moving up
            this.vel[2] *= -(0.5);
        } else {
            this.vel[2] *= -(0.7);
        };

        // console.log(this.status);
    };

    move() {
        if (this.height < 1) {
            this.bounce(this.status);
        } else {
            this.vel[2] += CONSTANTS.GRAVITY;
        };

        // canvas edges
        if (
            (this.pos[0] + this.radius) >= (this.canvas.width) ||
            (this.pos[0] - this.radius <= 0)) {
                this.vel[0] *= -(0.5);
                this.vel[1] *= (0.5);
        } else if (
            (this.pos[1] - this.height + this.radius) >= this.canvas.height ||
            (this.pos[1] - this.radius <= 0)) {
                this.vel[0] *= (0.5);
                this.vel[1] *= -(0.5);
        };

        // apply new vel to ball pos
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        this.height += this.vel[2];
        if (this.height < 0) {
            this.height = 0;
        };
    };
};