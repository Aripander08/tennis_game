import  Game from "./scripts/game.js";

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('game-canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    // debugger
    const game = new Game(ctx);
    game.start();
})
