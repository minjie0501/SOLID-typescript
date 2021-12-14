export default class FuelTank{
    private _fuel : number = 0;
    private readonly MAXIMUM_FUEL_CAPACITY;

    constructor(maxFuelCapacity: number){
        this.MAXIMUM_FUEL_CAPACITY = maxFuelCapacity
    }

    get fuel(): number {
        return this._fuel;
    }

    subtractFuel(){
        this._fuel -=1;
    }

    addFuel(fuel : number) {
        this._fuel = Math.min(fuel + this._fuel, this.MAXIMUM_FUEL_CAPACITY);
    }
}