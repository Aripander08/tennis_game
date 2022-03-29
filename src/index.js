import Game from "./scripts/game.js";

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('game-canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    const modalTitle = document.querySelector(".modal-title");
    const modalInstructions = document.querySelector(".modal-instructions");
    modalTitle.addEventListener('click', () => {
        modalTitle.classList.remove("active");
        modalInstructions.classList.add("active");
    });
    modalInstructions.addEventListener('click', () => {
        setTimeout(() => modalInstructions.classList.remove("active"), 100);
    });

    const game = new Game(ctx);
    canvas.addEventListener('mouseenter', () => {
        canvas.style.cursor = "pointer";
    });

    const restartBtn = document.getElementById('restart-button');
    restartBtn.addEventListener('click', () => {
        history.go(0);
    });

    const sfxBtn = document.querySelector("#sound-button");
    const sfxIcon = document.querySelector("#sound-button i");
    sfxBtn.addEventListener('click', () => {
        if (sfxIcon.className === "fas fa-volume-up") {
            sfxIcon.className = "fas fa-volume-mute";
        } else if (sfxIcon.className === "fas fa-volume-mute") {
            sfxIcon.className = "fas fa-volume-up";
        };
    });
    
    const instrBtn = document.getElementById('instructions-button');
    const infoModal = document.querySelector('.modal-info')
    instrBtn.addEventListener('click', () => {
        // debugger
        game.togglePause();
        infoModal.className = infoModal.className === "modal-info active" 
            ? "modal-info" 
            : "modal-info active";
    });

    infoModal.addEventListener('click', e => {
        e.stopPropagation();
        game.togglePause();
        infoModal.className = infoModal.className === "modal-info active" 
            ? "modal-info" 
            : "modal-info active";
    });
});
