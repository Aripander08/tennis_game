import Game from "./scripts/game.js";

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('game-canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    // debugger
    let game = new Game(ctx);
    // game.resetPoint();
    // debugger
    canvas.addEventListener('mouseenter', () => {
        canvas.style.cursor = "pointer";
    })

    // const restartBtn = document.getElementById('restart-button');
    // restartBtn.addEventListener('click', () => {
    //     debugger
    //     // ctx.clearRect(0, 0, ctx.width, ctx.height);
    //     // let oldGame = this.
    //     game = new Game(ctx);
    //     // debugger
    // });

    const sfxBtn = document.querySelector("#sound-button");
    const sfxIcon = document.querySelector("#sound-button i");
    sfxBtn.addEventListener('click', () => {
        if (sfxIcon.className === "volume up icon") {
            sfxIcon.className = "volume off icon";
            // debugger
        } else if (sfxIcon.className === "volume off icon") {
            // debugger
            sfxIcon.className = "volume up icon";
            // debugger
        }
    })
})
