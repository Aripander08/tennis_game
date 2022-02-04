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

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\n\nclass Ball extends MovingObject {\n    constructor(pos, vel, radius) {\n        super(pos, vel);\n        this.radius = radius;\n    }\n\n\n    draw(ctx) {\n        // the shadow\n        ctx.beginPath();\n        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n        ctx.fillStyle = \"#000\";\n        ctx.fill();\n\n        // the ball\n        ctx.beginPath();\n        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n        ctx.fillStyle = \"#ccff00\";\n        ctx.fill();\n\n    }\n}\n\nmodule.exports = Ball;\n\n//# sourceURL=webpack://tennis_game/./src/ball.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ball = __webpack_require__(/*! ./ball.js */ \"./src/ball.js\");\n\nclass Game {\n\n    constructor(ctx) {\n        // debugger\n        this.ctx = ctx;\n        this.ball = new Ball([500, 500], [-1, -4], 5);\n    };\n\n    start() {\n        // debugger\n        this.animate();\n    } \n    \n    \n    animate() {\n        // debugger\n        requestAnimationFrame(this.animate.bind(this));\n        this.ctx.clearRect(0, 0, 800, 600);\n        this.draw(this.ctx);\n        this.ball.move();\n    }\n\n    draw(ctx) {\n        // tentative court\n        ctx.fillStyle = \"green\"\n        ctx.fillRect(0, 0, 800, 600);\n        // debugger\n        this.ball.draw(ctx);\n    }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://tennis_game/./src/game.js?");

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

eval("class MovingObject {\n    constructor(pos, vel) {\n        this.pos = pos;\n        this.vel = vel;\n    };\n\n    move() {\n        this.pos[0] += this.vel[0];\n        this.pos[1] += this.vel[1];\n    };\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack://tennis_game/./src/moving_object.js?");

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