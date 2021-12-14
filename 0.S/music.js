"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Music {
    constructor() {
        this._level = 0;
        this._oldLevel = 50;
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
        this._oldLevel = value;
    }
    turnOn() {
        this._level = this._oldLevel;
    }
    turnOff() {
        this._level = 0;
    }
}
exports.default = Music;
