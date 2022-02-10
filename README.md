## Background

"2D Tennis, a tennis game" is a single-player top-down tennis video game. [Refer to the USTA for more information on scoring rules.](https://www.usta.com/en/home/improve/tips-and-instruction/national/tennis-scoring-rules.html) In "2D Tennis", players only need to win 1 set of singles to win the match and the human player always remains on the near side of the court.

## Start serving it up by smashing [here!](https://ywbk.github.io/tennis_game/)

## Technologies Used

- Canvas API is used for drawing the tennis court and all the objects of the game
- Web Audio API is used to play sound effects
- Javascript/HTML/CSS
- Vanilla DOM Manipulation
- Webpack
- Github Pages
- Free video game sound effects from [OpenGameArt](https://opengameart.org/)
- Icons from [Font Awesome](https://fontawesome.com/)

## Features

### In-house physics

2D Tennis achieves the perception of 3D through the use of shadows. By giving the ball object a height, a velocity applied to the height, and a constant gravity applied against the velocity, two images can be drawn from the one ball object: a shadow rendered at the ball object's actual position and a ball rendered at the object's position offset by its height. This makes it appear the ball bounces across the court. For purposes of game balance and feel, the ball has different bounce values based on its Y velocity. 

This height value is used to determine whether a ball bounces in or out of bounds, collides with the net, or is too high for a player to hit. 

```
const CONSTANTS = {
    GRAVITY: -0.05
};

class Ball extends MovingObject {
    constructor(pos, vel, radius, height) {
        super(pos, vel);
        this.radius = radius;
        this.height = height;
    };

    move() {
        if (this.height < 1) {
            this.bounce();
        } else {
            this.vel[2] += CONSTANTS.GRAVITY;
        ;}

        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        this.height += this.vel[2];
        if (this.height < 0) {
            this.height = 0;
        };
    };

    bounce() {
        if (this.vel[1] > 0) {
            this.vel[2] *= -(0.65);
        } else if (this.vel[1] < 0) {
            this.vel[2] *= -(0.5);
        } else {
            this.vel[2] *= -(0.7);
        };
    };
};
```

```
Net.prototype.stopBall(ball) {
        if (ball.netCollisionDetector(this) === this) {
        ball.status.net = true;
        ball.vel[0] = 0;
        ball.vel[1] = 0;
        ball.vel[2] *= (0.5);
    };
};
```

### Computer Opponent

The Computer will either find a path to the oncoming ball or return to its neutral position after hitting the ball. The necessary velocities are calculated using Math.atan2, Math.cos, and Math.sin.

```
findPath(ball) {
    const angle = Math.atan2(
        ball.pos[1] - this.pos[1], 
        ball.pos[0] - this.pos[0]
    );
    const newVel = [
        Math.cos(angle) * (5.4), 
        Math.sin(angle) * (0.2)
    ];

    const returnAngle = Math.atan2(
        40 - this.pos[1],
        392 - this.pos[0]
    );
    const returnVel = [
        Math.cos(returnAngle) * (0.6), 
        Math.sin(returnAngle) * (0.4)
    ];

    if (ball.player === this || ball.status.tossing || ball.status.resetting) {
        this.vel = returnVel;
        if (this.pos[0] !== 392 || this.pos[1]!== 40) {
            this.move();
        };
    } else if ((this.pos[1] + this.height) < this.net.pos[1]) {
        this.vel = newVel;
        this.move();
    };
};
```