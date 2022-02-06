export default class GameView {
    constructor (game) {
        this.game = game;
    };

    gameLoop(game) {
        // debugger
        game.ctx.clearRect(0, 0, 800, 600);
        this.draw(game, game.ctx);
        game.ball.move();
        game.net.stopBall(game.ball);
        game.player2.findPath(game.ball);
        game.player2.swing(game.ball);
        game.player1.reposition(game.keys);
    }

    animate() {
        // debugger
        this.gameLoop(this.game);
        // debugger
        requestAnimationFrame(this.animate.bind(this));
    }

    draw(game, ctx) {
        game.objects.forEach(obj => obj.draw(ctx))
    }
}