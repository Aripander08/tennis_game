/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\n\nclass Ball extends MovingObject {\n    constructor(pos, vel, radius) {\n        super(pos, vel);\n        this.radius = radius;\n        this.player = null;\n        this.bounceCount = 0;\n    }\n\n\n    draw(ctx) {\n        // the shadow\n        ctx.fillStyle = \"#000\";\n        ctx.beginPath();\n        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n        ctx.fill();\n\n        // the ball\n        ctx.fillStyle = \"#ccff00\";\n        ctx.beginPath();\n        ctx.arc(this.pos[0], this.pos[2], this.radius, 0, 2 * Math.PI);\n        ctx.fill();\n\n    }\n\n\n    collisionDetection(otherObject) {\n        const collisionDist = this.radius + 10;\n        const ballPos = this.pos;\n        const otherPos = otherObject.pos;\n        const currentDist = Math.hypot(ballPos[0] - otherPos[0], ballPos[2] - otherPos[1]);\n        // debugger\n        if (currentDist < collisionDist) {\n            if (otherObject instanceof MovingObject) { // if other object is a Human or Computer Player\n                this.player = otherObject;\n                this.vel[0] *= -1; \n                this.vel[1] *= -1; \n                this.vel[2] *= -1; \n            } else {} //this is for if the otherObj is the net or court\n        }\n    }\n}\n\nmodule.exports = Ball;\n\n//# sourceURL=webpack://tennis_game/./src/ball.js?");

/***/ }),

/***/ "./src/computer_player.js":
/*!********************************!*\
  !*** ./src/computer_player.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\n\nclass ComputerPlayer extends MovingObject {\n    constructor(pos, vel, color) {\n        super(pos, vel);\n        this.color = color;\n    }\n\n    draw(ctx) {\n        // the player\n        ctx.fillStyle = this.color;\n        ctx.beginPath();\n        ctx.fillRect(this.pos[0] - 10, this.pos[1] - 20, 20, 40);\n        \n        //their shadow\n        ctx.fillStyle = \"#000\";\n        ctx.beginPath();\n        ctx.fillRect(this.pos[0] - 10, this.pos[1] + 20, 20, 20);\n        \n    }\n}\n\nmodule.exports = ComputerPlayer;\n\n//# sourceURL=webpack://tennis_game/./src/computer_player.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ball = __webpack_require__(/*! ./ball.js */ \"./src/ball.js\");\nconst HumanPlayer = __webpack_require__(/*! ./human_player.js */ \"./src/human_player.js\");\nconst ComputerPlayer = __webpack_require__(/*! ./computer_player.js */ \"./src/computer_player.js\");\n\nclass Game {\n\n    constructor(ctx) {\n        // debugger\n        this.ctx = ctx;\n        this.ball = new Ball([500, 130, 110], [0, 3, 3], 5); // NEED A WAY TO LET VEL[2] CHANGE DURING TRAVEL\n        this.player1 = new HumanPlayer([500, 500], [0,0], \"red\");\n        this.player2 = new ComputerPlayer([100, 80], [0, 0], \"blue\");\n    };\n\n    start() {\n        // debugger\n        this.animate();\n    } \n    \n    \n    animate() {\n        // debugger\n        requestAnimationFrame(this.animate.bind(this));\n        this.ctx.clearRect(0, 0, 800, 600);\n        this.draw(this.ctx);\n        this.ball.move();\n        this.ball.collisionDetection(this.player1);\n        this.ball.collisionDetection(this.player2);\n    }\n\n    draw(ctx) {\n        // tentative court\n        ctx.fillStyle = \"green\"\n        ctx.fillRect(0, 0, 800, 600);\n        // debugger\n        this.player1.draw(ctx);\n        this.player2.draw(ctx);\n        this.ball.draw(ctx);\n    }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://tennis_game/./src/game.js?");

/***/ }),

/***/ "./src/human_player.js":
/*!*****************************!*\
  !*** ./src/human_player.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\n\nclass HumanPlayer extends MovingObject {\n    constructor(pos, vel, color) {\n        super(pos, vel);\n        this.color = color;\n        this.bindControls();\n    }\n\n    draw(ctx) {\n        // the player\n        ctx.fillStyle = this.color;\n        ctx.beginPath();\n        ctx.fillRect(this.pos[0] - 10, this.pos[1] - 20, 20, 40);\n        \n        //their shadow\n        ctx.fillStyle = \"#000\";\n        ctx.beginPath();\n        ctx.fillRect(this.pos[0] - 10, this.pos[1] + 20, 20, 20);\n        \n    }\n\n    bindControls() {\n        const that = this;\n        // debugger\n        window.addEventListener(\"keydown\", function(e) {\n            if (e.code === \"KeyW\") { // up\n                that.vel = [0, -8];\n                that.move();\n            } else if (e.code === \"KeyS\") { //down\n                that.vel = [0, 8];\n                that.move();\n            } else if (e.code === \"KeyA\") { // left\n                that.vel = [-10, 0];\n                that.move();\n            } else if (e.code === \"KeyD\") { // right\n                that.vel = [10, 0];\n                that.move();\n            } else if (e.code === \"KeyF\") {\n                // swing\n            }\n        })\n    }\n}\n\nmodule.exports = HumanPlayer;\n\n//# sourceURL=webpack://tennis_game/./src/human_player.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n    const canvas = document.getElementById('game-canvas');\n    const ctx = canvas.getContext('2d');\n\n    // debugger\n    const game = new Game(ctx);\n    game.start();\n})\n\n\n//# sourceURL=webpack://tennis_game/./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module) => {

eval("class MovingObject {\n    constructor(pos, vel) {\n        this.pos = pos;\n        this.vel = vel;\n    };\n\n    move() {\n        this.pos[0] += this.vel[0];\n        this.pos[1] += this.vel[1];\n        this.pos[2] += this.vel[2];\n    };\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack://tennis_game/./src/moving_object.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;