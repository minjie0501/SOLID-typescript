"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FuelTank {
    constructor(maxFuelCapacity) {
        this._fuel = 0;
        this.MAXIMUM_FUEL_CAPACITY = maxFuelCapacity;
    }
    get fuel() {
        return this._fuel;
    }
    subtractFuel() {
        this._fuel -= 1;
    }
    addFuel(fuel) {
        this._fuel = Math.min(fuel + this._fuel, this.MAXIMUM_FUEL_CAPACITY);
    }
}
exports.default = FuelTank;
