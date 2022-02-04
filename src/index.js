const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');

    // debugger
    const game = new Game(ctx);
    game.start();
})
