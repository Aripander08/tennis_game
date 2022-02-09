export default class GameView {
    constructor (game) {
        this.game = game;
    };

    gameLoop(game) {
        game.ctx.clearRect(0, 0, 800, 600);
        this.draw(game, game.ctx);
        game.ball.move();
        game.net.stopBall(game.ball);
        game.player2.findPath(game.ball);
        game.player2.swing(game.ball);
        game.p2racket.animateSwing();
        game.player1.reposition(game.keys);
        game.p1racket.animateSwing();
        game.pointOver();
    };

    animate() {
        if (this.game.gameOver) {
            if (this.game.winner.name === "P1") {
                this.drawPostGame('win');
                console.log('you win');
            } else {
                this.drawPostGame('lose');
                console.log('you lose');
            };
        };
        if (this.game.rallyStarted) {
            this.gameLoop(this.game);
            requestAnimationFrame(this.animate.bind(this));
        };
    };

    draw(game, ctx) {
        game.objects.forEach(obj => obj.draw(ctx))
    };

    drawPostGame () {
        this.game.scorekeeper.drawPostGame(this.game.ctx);        
    };
};