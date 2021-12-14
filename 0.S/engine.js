"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Engine {
    constructor(fuel_milage) {
        this._status = false;
        this.FUEL_MILEAGE = fuel_milage;
    }
    get status() {
        return this._status;
    }
    get fuelMilage() {
        return this.FUEL_MILEAGE;
    }
    turnEngineOn() {
        this._status = true;
    }
    turnEngineOff() {
        this._status = false;
    }
}
exports.default = Engine;
