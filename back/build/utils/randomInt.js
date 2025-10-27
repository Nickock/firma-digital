"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getRandomInt;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=randomInt.js.map